"use client";

import { Reveal } from "@/components/ui/Reveal";

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
    <Reveal>
      <div className="overflow-hidden border-y border-line/50 bg-cream-2/40 py-3.5 text-ink">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-4">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-10 text-[11px] font-medium uppercase tracking-[0.2em] text-muted"
            >
              <span className="text-gold/80">·</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
