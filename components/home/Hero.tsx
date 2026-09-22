"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroEnquireForm } from "@/components/home/HeroEnquireForm";

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
    <section className="relative min-h-[80svh] overflow-hidden bg-ink">
      <Image
        src="/brand/hero/cover.jpg"
        alt="Luxury interior by Refine & Rare"
        fill
        priority
        className="object-cover object-[68%_center] sm:object-center animate-ken-burns"
        sizes="100vw"
      />
      <div className="absolute inset-0 hidden bg-hero-overlay md:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,36,33,0.55)_0%,rgba(28,36,33,0.45)_45%,rgba(28,36,33,0.55)_100%)] md:hidden" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_20%,rgba(197,178,138,0.22),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(27,58,47,0.28),transparent_40%)]" />

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <span className="h-10 w-px animate-scroll-line bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>

      <div className="relative container-site flex min-h-[80svh] items-center pb-12 pt-24 sm:pb-16 sm:pt-28 md:pt-32">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16">
          <div>
            <p
              className={`mb-2 font-display text-2xl tracking-wide text-white transition duration-700 sm:mb-3 sm:text-3xl md:hidden ${
                ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Refine &amp; Rare
            </p>
            <p
              className={`mb-3 hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-gold transition duration-700 sm:mb-4 sm:text-xs md:block ${
                ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Luxury Interior Design
            </p>
            <h1
              className={`max-w-3xl font-display text-[1.85rem] leading-[1.15] text-white transition duration-1000 delay-100 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${
                ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Where Design{" "}
              <em className="font-display not-italic">
                <span className="gold-shimmer">Meets Distinction.</span>
              </em>
            </h1>
            <p
              className={`mt-3 max-w-md text-sm leading-relaxed text-cream-2/90 transition duration-1000 delay-200 sm:mt-2 sm:max-w-xl sm:font-display sm:text-lg sm:italic md:text-2xl ${
                ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {tagline}
            </p>
            <p
              className={`mt-4 hidden max-w-xl text-base leading-relaxed text-white/80 transition duration-1000 delay-300 lg:block lg:text-lg ${
                ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {description.slice(0, 180).trim()}…
            </p>
            <div
              className={`mt-6 flex w-full flex-col gap-2.5 transition duration-1000 delay-500 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3 ${
                ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <ButtonLink
                href="/projects"
                variant="secondary"
                className="btn-shine w-full justify-center px-5 py-3.5 text-[11px] sm:w-auto sm:text-sm"
              >
                View Our Work
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="gold"
                className="btn-shine w-full justify-center px-5 py-3.5 text-[11px] sm:w-auto sm:text-sm lg:hidden"
              >
                Get a Free Consultation
              </ButtonLink>
            </div>
          </div>

          <HeroEnquireForm
            className={`justify-self-center transition duration-1000 delay-300 lg:justify-self-end ${
              ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
