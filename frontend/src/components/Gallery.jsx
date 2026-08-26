import { motion } from "framer-motion";
import ChapterHeader from "./ChapterHeader";
import { IMAGES } from "../lib/site";

export default function Gallery() {
  return (
    <section id="gallery" className="px-6 py-24 md:px-12 md:py-36 lg:px-20" data-testid="gallery-section">
      <ChapterHeader number="02" kicker="THE CRAFT" title="Recent Work" testId="gallery-header" />

      <div className="grid gap-6 md:grid-cols-12">
        {IMAGES.gallery.map((item, i) => (
          <motion.figure
            key={item.title}
            data-testid={`gallery-item-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: (i % 2) * 0.12 }}
            className={`group gold-frame relative overflow-hidden p-2 ${item.span}`}
          >
            <div className={`relative overflow-hidden ${item.height}`}>
              <img
                src={item.url}
                alt={`${item.title} haircut at Royal Shave Barbers`}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[30%] transition-[transform,filter] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/25 transition-opacity duration-700 group-hover:opacity-0" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 35%, rgba(212,175,55,0.12), transparent 60%)" }}
              />
              <figcaption className="absolute bottom-0 left-0 flex w-full items-end justify-between bg-gradient-to-t from-black/85 to-transparent p-5">
                <span className="font-display text-xl italic text-white md:text-2xl">{item.title}</span>
                <span className="text-[10px] font-semibold tracking-[0.35em] text-gold">{item.num}</span>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
