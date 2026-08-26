from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import uuid
import logging
import ipaddress
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")

logger = logging.getLogger(__name__)

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


class BookingCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=6, max_length=24)
    email: Optional[EmailStr] = None
    service: str = Field(min_length=2, max_length=80)
    date: str = Field(min_length=8, max_length=10)
    time: str = Field(min_length=4, max_length=8)
    notes: Optional[str] = Field(default=None, max_length=500)


def _booking_email_html(b: dict) -> str:
    rows = [
        ("Name", b["name"]),
        ("Phone", b["phone"]),
        ("Email", b.get("email") or "—"),
        ("Service", b["service"]),
        ("Date", b["date"]),
        ("Time", b["time"]),
        ("Notes", b.get("notes") or "—"),
    ]
    row_html = "".join(
        f'<tr><td style="padding:10px 16px;color:#A1A1AA;font-size:13px;letter-spacing:1px;'
        f'text-transform:uppercase;border-bottom:1px solid #2a2a2a">{escape(k)}</td>'
        f'<td style="padding:10px 16px;color:#FFFFFF;font-size:14px;border-bottom:1px solid #2a2a2a">'
        f'{escape(str(v))}</td></tr>'
        for k, v in rows
    )
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="background:#0D0D0D;padding:32px 0">'
        '<tr><td align="center">'
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" '
        'style="background:#1A1A1A;border:1px solid #D4AF37;font-family:Arial,sans-serif">'
        '<tr><td style="padding:28px 24px 8px;text-align:center;color:#D4AF37;font-size:22px;'
        'letter-spacing:4px">ROYAL SHAVE BARBERS</td></tr>'
        '<tr><td style="padding:0 24px 20px;text-align:center;color:#FFFFFF;font-size:14px">'
        'New Booking Request</td></tr>'
        f'<tr><td style="padding:0 16px 16px"><table role="presentation" width="100%" '
        f'cellpadding="0" cellspacing="0">{row_html}</table></td></tr>'
        f'<tr><td style="padding:16px;text-align:center;color:#777;font-size:11px">'
        f'Sent by the {escape(EMAIL_FROM_NAME)} booking system.</td></tr>'
        '</table></td></tr></table>'
    )


@api_router.get("/")
async def root():
    return {"message": "Royal Shave Barbers API"}


@api_router.post("/bookings")
async def create_booking(input: BookingCreate):
    booking = {
        "id": str(uuid.uuid4()),
        "name": input.name.strip(),
        "phone": input.phone.strip(),
        "email": input.email,
        "service": input.service.strip(),
        "date": input.date,
        "time": input.time,
        "notes": (input.notes or "").strip() or None,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.bookings.insert_one(dict(booking))

    email_sent = False
    if OWNER_EMAIL:
        try:
            subject = f"New booking: {booking['service']} — {booking['date']} {booking['time']}"
            await send_email(to=OWNER_EMAIL, subject=subject, html=_booking_email_html(booking))
            email_sent = True
        except Exception as e:
            logger.error(f"Owner notification email failed: {e}")
    else:
        logger.warning("OWNER_EMAIL not configured; booking stored without owner notification")

    return {"status": "confirmed", "booking": booking, "email_sent": email_sent}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
