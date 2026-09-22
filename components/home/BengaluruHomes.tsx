"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function BengaluruHomes() {
  return (
    <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_75%_25%,rgba(201,166,107,0.14),transparent_40%),radial-gradient(circle_at_15%_80%,rgba(81,120,113,0.1),transparent_40%)]" />

      <div className="container-site relative grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="left" className="lg:col-span-6">
          <div className="group relative aspect-[5/4] overflow-hidden border border-line">
            <Image
              src="/brand/gallery/project-4.jpg"
              alt="Premium residential interiors in Bengaluru"
              fill
              className="object-cover transition duration-1000 ease-premium group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            <p className="absolute bottom-5 left-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
              Residential Interiors · Bengaluru
            </p>
          </div>
        </Reveal>

        <Reveal variant="right" delay={100} className="lg:col-span-6">
          <p className="section-label">Bengaluru</p>
          <TextReveal
            text="Designed for Bengaluru Homes."
            className="mt-3 max-w-xl font-display text-3xl leading-tight text-ink md:text-5xl"
          />
          <div className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-muted md:text-base">
            <p>
              From contemporary apartments to spacious villas and independent
              residences, Refine & Rare creates premium interiors across
              Bengaluru.
            </p>
            <p>
              Whether you’re moving into a new home or transforming an existing
              one, we bring design, functionality and execution together under
              one vision.
            </p>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Residential Interiors · Bengaluru
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="primary" className="btn-shine">
              Plan Your Home
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
