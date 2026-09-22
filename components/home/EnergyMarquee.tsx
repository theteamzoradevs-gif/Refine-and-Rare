"use client";

const ITEMS = [
  "Interior Design",
  "Modular Kitchens",
  "Turnkey Renovation",
  "POP Ceilings",
  "Premium Finishes",
  "On-Time Delivery",
  "Bengaluru Craftsmanship",
];

export function EnergyMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 overflow-x-hidden border-y border-line/60 bg-gradient-to-r from-cream-2/40 via-cream to-cream-2/40 py-4 text-ink">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap px-4">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-[11px] font-semibold uppercase leading-none tracking-[0.22em] text-muted transition hover:text-teal"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
