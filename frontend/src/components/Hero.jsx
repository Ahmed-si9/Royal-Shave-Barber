import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getOpenStatus, scrollToId, IMAGES } from "../lib/site";
import { CrownMark } from "./Logo";

const lineVariants = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.25 + i * 0.16 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (d) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: d },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.18]);
  const crownY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const crownRotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const status = getOpenStatus();

  return (
    <section id="home" ref={ref} className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden" data-testid="hero-section">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Precision barbering at Royal Shave Barbers"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/40" />

      <motion.div
        style={{ y: crownY, rotate: crownRotate }}
        className="pointer-events-none absolute right-[6%] top-[16%] hidden opacity-25 lg:block"
      >
        <div className="animate-float-slow">
          <CrownMark className="h-40 w-60" strokeWidth={1} />
        </div>
      </motion.div>

      <div className="relative z-10 w-full px-6 pb-24 md:px-12 md:pb-28 lg:px-20">
        <motion.p
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 text-[11px] font-semibold tracking-[0.4em] text-gold md:text-xs"
          data-testid="hero-eyebrow"
        >
          HOLT ACT · CANBERRA · WALK-INS WELCOME
        </motion.p>

        <h1 className="font-display font-semibold leading-[0.92] tracking-tight text-white text-scrim">
          {["ROYAL SHAVE", "BARBERS"].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="show"
                className="block text-5xl sm:text-7xl lg:text-8xl"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          custom={0.85}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 font-display text-2xl italic text-gold md:text-3xl text-scrim"
          data-testid="hero-subtitle"
        >
          Experience the Royal Treatment
        </motion.p>

        <motion.div
          custom={1.05}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <button
            data-testid="hero-book-cta"
            onClick={() => scrollToId("#book")}
            className="group relative overflow-hidden border border-gold bg-gold px-10 py-4 text-xs font-bold tracking-[0.3em] text-coal transition-colors duration-500 hover:text-gold"
          >
            <span className="absolute inset-0 -translate-x-full bg-coal transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">BOOK YOUR SERVICE</span>
          </button>

          <div
            data-testid="open-status-badge"
            className="inline-flex items-center gap-3 border border-gold-hairline bg-black/50 px-5 py-4 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  status.isOpen ? "bg-emerald-400" : "bg-red-400"
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  status.isOpen ? "bg-emerald-400" : "bg-red-400"
                }`}
              />
            </span>
            <span className="text-[11px] font-semibold tracking-[0.25em] text-white">
              {status.isOpen ? "CURRENTLY OPEN" : "CURRENTLY CLOSED"}
            </span>
            <span className="hidden text-[11px] tracking-wider text-zinc-400 sm:inline">
              · Today {status.todayLabel}
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        custom={1.4}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="absolute bottom-8 right-8 hidden items-center gap-3 md:flex"
        data-testid="hero-scroll-cue"
      >
        <span className="text-[10px] tracking-[0.4em] text-zinc-400 [writing-mode:vertical-lr]">SCROLL</span>
        <span className="h-16 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
