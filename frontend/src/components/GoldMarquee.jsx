import Marquee from "react-fast-marquee";

const ITEMS = [
  "PRECISION FADES",
  "HOT TOWEL SHAVES",
  "KIDS CUTS",
  "WALK-INS WELCOME",
  "BEARD SCULPTING",
  "CUTS FROM $25",
];

export default function GoldMarquee() {
  return (
    <section className="border-y border-black/30 bg-gold py-4" data-testid="gold-marquee" aria-hidden="true">
      <Marquee speed={40} gradient={false} pauseOnHover>
        {ITEMS.map((item) => (
          <span key={item} className="mx-10 flex items-center gap-10 text-sm font-bold tracking-[0.35em] text-coal">
            {item}
            <span className="inline-block h-2 w-2 rotate-45 bg-coal" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
