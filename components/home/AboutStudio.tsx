"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AboutStudio({ description }: { description: string }) {
  return (
    <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_80%_15%,rgba(81,120,113,0.1),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(201,166,107,0.12),transparent_40%)]" />

      <div className="container-site relative grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="left" className="lg:col-span-5">
          <div className="group relative aspect-[4/5] overflow-hidden border border-line">
            <Image
              src="/brand/hero/cover.jpg"
              alt="Refine & Rare interior studio work"
              fill
              className="object-cover transition duration-1000 ease-premium group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent opacity-0 transition duration-700 group-hover:opacity-100" />
          </div>
        </Reveal>

        <Reveal variant="blur" delay={120} className="lg:col-span-7">
          <p className="section-label">About the Studio</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-5xl">
            <span className="text-ink">Crafting </span>
            <span className="text-teal">exceptional </span>
            <span className="text-ink">spaces with </span>
            <span className="gold-shimmer">timeless elegance.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/about" variant="primary" className="btn-shine">
              Our Story
            </ButtonLink>
            <ButtonLink href="/gallery" variant="outline" className="btn-shine">
              View Projects
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
