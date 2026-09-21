"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = {
  tagline: string;
  description: string;
};

export function Hero({ tagline, description }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink">
      <Image
        src="/brand/hero/cover.jpg"
        alt="Luxury interior by Refine & Rare"
        fill
        priority
        className="object-cover animate-ken-burns"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_20%,rgba(201,166,107,0.22),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(81,120,113,0.28),transparent_40%)]" />

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <span className="h-10 w-px animate-scroll-line bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>

      <div className="relative container-site flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:justify-center md:pb-24">
        <p
          className={`mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold transition duration-700 ${
            ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Luxury Interior Design · Bengaluru
        </p>
        <h1
          className={`max-w-3xl font-display text-4xl leading-[1.1] text-white transition duration-1000 delay-100 md:text-6xl lg:text-7xl ${
            ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Inspired Spaces.{" "}
          <em className="font-display not-italic text-gold">Elevated Living.</em>
        </h1>
        <p
          className={`mt-2 max-w-xl font-display text-xl italic text-cream-2/90 transition duration-1000 delay-200 md:text-2xl ${
            ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {tagline}
        </p>
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed text-white/80 transition duration-1000 delay-300 md:text-lg ${
            ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {description.slice(0, 180).trim()}…
        </p>
        <div
          className={`mt-8 flex flex-wrap gap-3 transition duration-1000 delay-500 ${
            ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <ButtonLink href="/contact" variant="gold" className="btn-shine">
            Get a Free Consultation
          </ButtonLink>
          <ButtonLink href="/gallery" variant="secondary" className="btn-shine">
            View Our Work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
