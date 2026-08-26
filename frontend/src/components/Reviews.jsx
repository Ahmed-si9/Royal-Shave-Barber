import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import ChapterHeader from "./ChapterHeader";
import { IMAGES } from "../lib/site";

const REVIEWS = [
  {
    name: "Prajeet Kumar",
    tag: "Regular",
    quote:
      "Come here for a cut every now and then and the boys never disappoint. Attention to detail is second to none — always walk out feeling fresh.",
    avatar: IMAGES.reviewers.prajeet,
    testId: "review-card-prajeet",
  },
  {
    name: "Waddah Al masri",
    tag: "Local Guide",
    quote:
      "Best barbershop in the area, hands down. The hot towel shave is an experience every man should treat himself to at least once.",
    avatar: IMAGES.reviewers.waddah,
    testId: "review-card-waddah",
  },
  {
    name: "Liam T.",
    tag: "Walk-in",
    quote:
      "Took my son in for his first proper haircut. Patient, welcoming, and the fade on me was razor sharp. We're both regulars now.",
    avatar: null,
    testId: "review-card-liam",
  },
];

function Stars({ size = 16 }) {
  return (
    <span className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} fill="#D4AF37" stroke="#D4AF37" strokeWidth={1} />
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="px-6 py-24 md:px-12 md:py-36 lg:px-20" data-testid="reviews-section">
      <ChapterHeader number="03" kicker="WORD OF MOUTH" title="Reviews" testId="reviews-header" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="mb-14 flex justify-center"
      >
        <div
          data-testid="rating-badge"
          className="flex flex-col items-center gap-3 border border-gold bg-charcoal px-12 py-8 md:px-16"
        >
          <Stars size={20} />
          <span className="font-display text-6xl font-semibold text-gold md:text-7xl">4.9</span>
          <span className="text-xs font-semibold tracking-[0.3em] text-zinc-300">(55 REVIEWS)</span>
        </div>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <motion.blockquote
            key={r.name}
            data-testid={r.testId}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }}
            className="flex flex-col border border-gold-hairline bg-charcoal p-8 transition-colors duration-500 hover:border-gold"
          >
            <Quote size={22} className="mb-5 text-gold" strokeWidth={1.5} />
            <p className="flex-1 font-display text-lg italic leading-relaxed text-zinc-200">
              “{r.quote}”
            </p>
            <footer className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6">
              {r.avatar ? (
                <img
                  src={r.avatar}
                  alt={r.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full border border-gold-hairline object-cover"
                />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-hairline font-display text-lg text-gold">
                  {r.name[0]}
                </span>
              )}
              <span>
                <span className="block text-sm font-semibold tracking-wider text-white">{r.name}</span>
                <span className="mt-0.5 flex items-center gap-2">
                  <Stars size={11} />
                  <span className="text-[10px] tracking-[0.25em] text-zinc-500">{r.tag}</span>
                </span>
              </span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
