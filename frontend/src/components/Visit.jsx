import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import ChapterHeader from "./ChapterHeader";
import BookingForm from "./BookingForm";
import { HOURS, ADDRESS_1, ADDRESS_2, LANDMARK, getOpenStatus } from "../lib/site";

const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=149.0065%2C-35.2295%2C149.0275%2C-35.2175&layer=mapnik";

export default function Visit() {
  const status = getOpenStatus();

  return (
    <section id="book" className="px-6 py-24 md:px-12 md:py-36 lg:px-20" data-testid="visit-section">
      <ChapterHeader number="04" kicker="THE CHAIR AWAITS" title="Visit & Book" testId="visit-header" />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="gold-frame relative min-h-[420px] overflow-hidden lg:min-h-full"
          data-testid="location-map-wrapper"
        >
          <iframe
            title="Royal Shave Barbers location map — Holt ACT"
            data-testid="location-map"
            src={MAP_SRC}
            loading="lazy"
            className="map-dark absolute inset-0 h-full w-full border-0"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="relative flex items-center justify-center">
              <span className="absolute h-10 w-10 animate-pin-pulse rounded-full bg-gold/60" />
              <MapPin size={38} fill="#D4AF37" stroke="#0D0D0D" strokeWidth={1.2} className="relative drop-shadow" />
            </span>
          </div>
          <div className="absolute bottom-0 left-0 m-4 max-w-[280px] border border-gold-hairline bg-black/85 p-5 backdrop-blur">
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] text-gold">
              <MapPin size={12} /> FIND US
            </p>
            <p className="text-sm font-semibold text-white">{ADDRESS_1}</p>
            <p className="text-sm text-zinc-300">{ADDRESS_2}</p>
            <p className="mt-2 text-xs italic text-zinc-500">{LANDMARK}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
          className="flex flex-col gap-10"
        >
          <div className="border border-gold-hairline bg-charcoal p-8 md:p-10" data-testid="hours-card">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-3xl text-white">Opening Hours</h3>
              <span
                data-testid="hours-open-status"
                className={`border px-3 py-1.5 text-[10px] font-bold tracking-[0.25em] ${
                  status.isOpen
                    ? "border-emerald-400/40 text-emerald-400"
                    : "border-red-400/40 text-red-400"
                }`}
              >
                {status.isOpen ? "OPEN NOW" : "CLOSED"}
              </span>
            </div>
            <ul data-testid="hours-list">
              {HOURS.map((h) => {
                const isToday = h.day === status.weekday;
                return (
                  <li
                    key={h.day}
                    data-testid={`hours-row-${h.day.toLowerCase()}`}
                    className={`flex items-center justify-between border-b border-white/5 py-3.5 last:border-0 ${
                      isToday ? "text-gold" : "text-zinc-300"
                    }`}
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold tracking-wider">
                      {h.day}
                      {isToday && (
                        <span className="border border-gold px-2 py-0.5 text-[9px] font-bold tracking-[0.25em] text-gold">
                          TODAY
                        </span>
                      )}
                    </span>
                    <span className="text-sm tracking-wider">{h.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <BookingForm />
        </motion.div>
      </div>
    </section>
  );
}
