"use client";

import { VALUE_PILLARS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { PillarFlipCard } from "@/components/ui/PillarFlipCard";

export function ValuePillars() {
  return (
    <section className="bg-section-fade py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="section-label">Why Refine & Rare</p>
          <h2 className="heading-display mt-3 max-w-2xl">
            Design that looks beautiful.{" "}
            <em className="not-italic text-teal">Execution that feels effortless.</em>
          </h2>
          <p className="mt-4 text-sm text-muted">
            Flip each pillar to learn what shapes our work.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {VALUE_PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 90}>
              <PillarFlipCard
                title={pillar.title}
                body={pillar.body}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
