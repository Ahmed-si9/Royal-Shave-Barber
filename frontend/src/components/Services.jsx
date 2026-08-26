import { motion } from "framer-motion";
import { Scissors, Baby, Flame, DoorOpen } from "lucide-react";
import ChapterHeader from "./ChapterHeader";
import { scrollToId } from "../lib/site";

const SERVICES = [
  {
    icon: Scissors,
    title: "Special Men's Haircut",
    price: "from $25",
    desc: "Precision scissor and clipper work, finished with a razor-sharp line-up and style.",
    testId: "service-card-haircut",
  },
  {
    icon: Baby,
    title: "Kids Haircuts",
    price: "Available",
    desc: "Patient, friendly cuts for young gentlemen — first visits welcome.",
    testId: "service-card-kids",
  },
  {
    icon: Flame,
    title: "Hot Towel & Shave",
    price: "Signature",
    desc: "The classic ritual: steamed towels, rich lather, straight-razor finish.",
    testId: "service-card-shave",
  },
  {
    icon: DoorOpen,
    title: "Walk-Ins Welcome!",
    price: "No booking needed",
    desc: "Rolling through Holt? Take a seat — the next chair could be yours.",
    testId: "service-card-walkins",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 py-24 md:px-12 md:py-36 lg:px-20" data-testid="services-section">
      <ChapterHeader number="01" kicker="THE MENU" title="Services & Pricing" testId="services-header" />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {SERVICES.map((s, i) => (
          <motion.button
            key={s.title}
            data-testid={s.testId}
            onClick={() => scrollToId("#book")}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group flex flex-col border border-gold-hairline bg-charcoal p-8 text-left transition-colors duration-500 hover:border-gold md:p-10"
          >
            <span className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold-hairline text-gold transition-colors duration-500 group-hover:border-gold">
              <s.icon size={24} strokeWidth={1.5} />
            </span>
            <span className="font-display text-2xl font-semibold text-white">{s.title}</span>
            <span className="mt-2 text-sm font-semibold tracking-[0.2em] text-gold">{s.price}</span>
            <span className="mt-5 text-sm leading-relaxed text-zinc-400">{s.desc}</span>
            <span className="mt-8 text-[10px] font-semibold tracking-[0.35em] text-zinc-500 transition-colors duration-500 group-hover:text-gold">
              BOOK THIS CHAIR →
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
