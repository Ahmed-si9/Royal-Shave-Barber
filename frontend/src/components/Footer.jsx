import { Instagram, Facebook, Phone, Nfc } from "lucide-react";
import { ShieldMark } from "./Logo";
import { scrollToId, ADDRESS_1, ADDRESS_2, PHONE_DISPLAY, PHONE_LINK } from "../lib/site";

const NAV = [
  { label: "HOME", href: "#home", testId: "footer-nav-home" },
  { label: "SERVICES", href: "#services", testId: "footer-nav-services" },
  { label: "GALLERY", href: "#gallery", testId: "footer-nav-gallery" },
  { label: "REVIEWS", href: "#reviews", testId: "footer-nav-reviews" },
  { label: "BOOK NOW", href: "#book", testId: "footer-nav-book" },
];

const PAYMENTS = [
  { label: "NFC", icon: Nfc, testId: "payment-nfc" },
  { label: "Apple Pay", icon: null, testId: "payment-apple-pay" },
  { label: "VISA", icon: null, testId: "payment-visa" },
  { label: "Mastercard", icon: null, testId: "payment-mastercard" },
  { label: "EFTPOS", icon: null, testId: "payment-eftpos" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold-hairline bg-[#0A0A0A] px-6 py-20 md:px-12 md:py-24 lg:px-20" data-testid="site-footer">
      <div className="flex flex-col items-center text-center">
        <ShieldMark className="h-20 w-32" />
        <p className="mt-6 font-display text-2xl font-semibold tracking-wide text-white">
          ROYAL SHAVE BARBERS
        </p>
        <p className="mt-1 text-[10px] font-semibold tracking-[0.45em] text-gold">
          EXPERIENCE THE ROYAL TREATMENT
        </p>

        <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3" data-testid="footer-nav">
          {NAV.map((l) => (
            <button
              key={l.label}
              data-testid={l.testId}
              onClick={() => scrollToId(l.href)}
              className="text-[11px] font-semibold tracking-[0.25em] text-zinc-300 transition-colors duration-300 hover:text-gold"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="mt-10 flex items-center gap-4" data-testid="footer-socials">
          <a
            data-testid="social-instagram"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center border border-gold-hairline text-gold transition-colors duration-300 hover:bg-gold hover:text-coal"
          >
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a
            data-testid="social-facebook"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-11 w-11 items-center justify-center border border-gold-hairline text-gold transition-colors duration-300 hover:bg-gold hover:text-coal"
          >
            <Facebook size={18} strokeWidth={1.5} />
          </a>
          <a
            data-testid="social-phone"
            href={PHONE_LINK}
            aria-label="Call us"
            className="flex h-11 w-11 items-center justify-center border border-gold-hairline text-gold transition-colors duration-300 hover:bg-gold hover:text-coal"
          >
            <Phone size={18} strokeWidth={1.5} />
          </a>
        </div>

        <div className="mt-10 text-sm leading-relaxed text-zinc-400" data-testid="footer-contact">
          <p className="text-white">{ADDRESS_1}</p>
          <p>{ADDRESS_2}</p>
          <a href={PHONE_LINK} className="mt-1 inline-block text-gold hover:underline">
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3" data-testid="payment-badges">
          {PAYMENTS.map((p) => (
            <span
              key={p.label}
              data-testid={p.testId}
              className="flex items-center gap-2 border border-white/10 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-zinc-300"
            >
              {p.icon && <p.icon size={14} className="text-gold" />}
              {p.label}
            </span>
          ))}
        </div>

        <p className="mt-12 text-xs tracking-[0.2em] text-white" data-testid="footer-tagline">
          A Safe &amp; Welcoming Space for Everyone
        </p>
        <p className="mt-3 text-[10px] tracking-[0.25em] text-zinc-600">
          © 2026 ROYAL SHAVE BARBERS · HOLT ACT
        </p>
      </div>
    </footer>
  );
}
