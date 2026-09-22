"use client";

import { VALUE_PILLARS } from "@/lib/constants";
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

export function ValuePillars() {
  return (
    <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_15%_20%,rgba(197,178,138,0.12),transparent_35%),radial-gradient(circle_at_85%_70%,rgba(27,58,47,0.1),transparent_40%)]" />

      <div className="container-site relative">
        <Reveal>
          <p className="section-label">Design Philosophy</p>
          <TextReveal
            text="Luxury Is in the Details."
            className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink md:text-5xl"
          />
          <div className="mt-5 max-w-2xl space-y-3 text-sm leading-relaxed text-muted md:text-base">
            <p>We believe true luxury doesn’t need to be excessive.</p>
            <p>
              It is found in proportion, material, craftsmanship, lighting and
              the thoughtful use of every inch of space.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PILLARS.map((pillar, i) => {
            const accent = accentStyles[pillar.accent];
            return (
              <Reveal key={pillar.title} delay={i * 80} variant="up">
                <article
                  className={cn(
                    "premium-card group relative flex h-full flex-col p-6",
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
                      "font-display text-4xl transition duration-500 md:text-5xl",
                      accent.number
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={cn(
                      "mt-5 font-display text-2xl uppercase tracking-[0.06em] md:text-[1.65rem]",
                      accent.title
                    )}
                  >
                    {pillar.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {pillar.body}
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
