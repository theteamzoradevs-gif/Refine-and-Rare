"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function PillarFlipCard({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-scene h-[260px]">
      <button
        type="button"
        className={cn(
          "flip-card group h-full w-full text-left",
          flipped && "is-flipped"
        )}
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
      >
        <div className="flip-face flex flex-col justify-between border border-teal/25 bg-cream/90 p-6 shadow-[0_18px_40px_-30px_rgba(28,36,33,0.45)] transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_24px_50px_-28px_rgba(27,58,47,0.35)]">
          <div>
            <p className="font-display text-5xl text-gold/60 transition group-hover:text-gold">
              0{index + 1}
            </p>
            <h3 className="mt-4 font-display text-2xl text-ink">{title}</h3>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">
            Click to reveal →
          </p>
        </div>
        <div className="flip-face flip-face-back flex flex-col justify-between border border-gold/40 bg-teal p-6 text-white">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              Why it matters
            </p>
            <h3 className="mt-3 font-display text-2xl">{title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/85">{body}</p>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-2">
            Tap to flip back
          </p>
        </div>
      </button>
    </div>
  );
}
