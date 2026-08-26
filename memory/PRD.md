# Royal Shave Barbers — PRD

## Original Problem Statement
High-end barber shop website for Royal Shave Barbers (Holt ACT, Canberra). Strict visual identity: matte black #0D0D0D background, metallic gold #D4AF37 accents, white typography. Sections: circular gold crown logo + dark nav (HOME, SERVICES, GALLERY, REVIEWS, BOOK NOW); hero with barber imagery, masked title reveal, gold subtitle "Experience the Royal Treatment", gold CTA, live "Currently OPEN" status; services grid (Men's Haircut from $25, Kids Haircuts, Hot Towel & Shave, Walk-Ins Welcome); 4-item gold-framed gallery (Skin Fade, Textured Crop, Modern Taper, Beard Trim); 4.9-star (55 reviews) badge + review cards (Prajeet Kumar, Waddah Al masri); two-column booking section (dark map near Pumping Station mural with gold marker + opening hours + booking form); footer with wing-and-crown shield, socials, contact, payment badges (NFC, Apple Pay, Cards), tagline "A Safe & Welcoming Space for Everyone".

## User Personas
- Local men seeking premium cuts/shaves in Holt/Belconnen, Canberra
- Parents booking kids haircuts
- Walk-in customers checking live open status and hours

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui, framer-motion (masked hero reveal, scroll reveals, micro-interactions), Lenis smooth scrolling, react-fast-marquee, Cormorant Garamond + Manrope
- Backend: FastAPI + Motor (MongoDB), POST /api/bookings stores bookings and emails owner via Emergent-managed Resend proxy (httpx, guardrail-gated)
- Map: OpenStreetMap embed, CSS dark filter, gold pin overlay at Hardwick Cres, Holt ACT 2615
- Live open status: computed client-side in Australia/Sydney timezone from stated hours

## Implemented (2026-08-26)
- Full single-page luxury site: Navbar, Hero (kinetic masked reveal, parallax, floating crown, live OPEN/CLOSED badge), gold marquee, Services (4 gold-bordered charcoal cards), Gallery (asymmetric 4-grid, spotlight hover), Reviews (4.9 badge + 3 cards), Visit & Book (dark OSM map, hours with TODAY highlight, booking form with confirmation state), Footer (shield, socials, payment chips, tagline)
- Booking API: validation, MongoDB persistence, owner email via managed Resend (pipeline verified with test send, 202 Accepted)
- Live open/closed status computed from opening hours in Canberra time

## Pending / Backlog
- P0: Set OWNER_EMAIL in backend/.env with the shop's real email (owner notifications currently skipped; email pipeline itself verified)
- P0: Replace placeholder phone number (02) 6254 1234 with the real number
- P1: Swap curated stock imagery for the shop's real photos (31720–31734 series) when uploaded
- P1: Point Instagram/Facebook footer links to real profiles
- P2: Admin view of bookings, SMS confirmations (Twilio), Google Business review sync

## Test Verification
- curl: GET /api/ OK; POST /api/bookings persists and returns confirmation
- Email send verified via delivered@resend.dev (id returned)
- Playwright: hero, marquee, services, gallery, reviews, map/hours, booking form submission → confirmation panel + toast, footer — all visually verified
