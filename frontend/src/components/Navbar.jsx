import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { scrollToId } from "../lib/site";

const LINKS = [
  { label: "HOME", href: "#home", testId: "nav-home" },
  { label: "SERVICES", href: "#services", testId: "nav-services" },
  { label: "GALLERY", href: "#gallery", testId: "nav-gallery" },
  { label: "REVIEWS", href: "#reviews", testId: "nav-reviews" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const go = (href) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-gold-hairline bg-black/60 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 py-3 md:px-10">
        <button
          data-testid="brand-home-button"
          onClick={() => go("#home")}
          className="flex items-center gap-3 text-left"
        >
          <Logo size={46} />
          <span className="hidden sm:block leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-white">
              ROYAL SHAVE
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.45em] text-gold">
              BARBERS
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-9 md:flex" data-testid="nav-links">
          {LINKS.map((l) => (
            <button
              key={l.label}
              data-testid={l.testId}
              onClick={() => go(l.href)}
              className="group relative text-xs font-semibold tracking-[0.25em] text-white transition-colors duration-300 hover:text-gold"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-[width] duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            data-testid="nav-book-now"
            onClick={() => go("#book")}
            className="border border-gold bg-gold px-6 py-2.5 text-xs font-bold tracking-[0.25em] text-coal transition-colors duration-300 hover:bg-transparent hover:text-gold"
          >
            BOOK NOW
          </button>
        </nav>

        <button
          data-testid="mobile-menu-toggle"
          className="text-gold md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-gold-hairline bg-[#0D0D0D]/95 px-6 py-6 md:hidden" data-testid="mobile-menu">
          {[...LINKS, { label: "BOOK NOW", href: "#book", testId: "mobile-nav-book" }].map((l) => (
            <button
              key={l.label}
              data-testid={l.testId}
              onClick={() => go(l.href)}
              className="block w-full py-3 text-left text-sm font-semibold tracking-[0.25em] text-white hover:text-gold"
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
