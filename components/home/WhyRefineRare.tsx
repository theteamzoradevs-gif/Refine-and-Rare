"use client";

import { DIFFERENCE_POINTS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

const accentStyles = {
  gold: {
    number: "text-gold",
    title: "text-gold",
    bar: "bg-gold",
    border: "hover:border-gold/50",
  },
  teal: {
    number: "text-teal",
    title: "text-teal",
    bar: "bg-teal",
    border: "hover:border-teal/50",
  },
  ink: {
    number: "text-ink/45",
    title: "text-ink",
    bar: "bg-ink",
    border: "hover:border-ink/30",
  },
} as const;

export function WhyRefineRare() {
  return (
    <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_85%_20%,rgba(201,166,107,0.12),transparent_35%),radial-gradient(circle_at_10%_75%,rgba(81,120,113,0.1),transparent_40%)]" />

      <div className="container-site relative">
        <Reveal variant="blur">
          <p className="section-label">Why Refine & Rare</p>
          <TextReveal
            text="The Refine & Rare Difference"
            className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink md:text-5xl"
          />
        </Reveal>

        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {DIFFERENCE_POINTS.map((point, i) => {
            const accent = accentStyles[point.accent];
            return (
              <Reveal key={point.title} delay={i * 70} variant="scale">
                <article
                  className={cn(
                    "premium-card group relative flex h-full flex-col p-5 md:p-6",
                    accent.border
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-1 w-0 transition-all duration-500 group-hover:w-full",
                      accent.bar
                    )}
                  />
                  <p
                    className={cn(
                      "font-display text-3xl md:text-4xl",
                      accent.number
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={cn(
                      "mt-4 font-display text-lg uppercase tracking-[0.05em] md:text-xl",
                      accent.title
                    )}
                  >
                    {point.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {point.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
