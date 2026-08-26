import { motion } from "framer-motion";

export default function ChapterHeader({ number, kicker, title, testId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="mb-14 flex items-end justify-between gap-6 border-b border-gold-hairline pb-8 md:mb-20"
      data-testid={testId}
    >
      <div>
        <p className="mb-4 text-[11px] font-semibold tracking-[0.4em] text-gold">
          {number} — {kicker}
        </p>
        <h2 className="font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      <span className="hidden font-display text-lg italic text-zinc-500 md:block">
        Royal Shave Barbers
      </span>
    </motion.div>
  );
}
