"use client";

import { useEffect, useState } from "react";
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
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/brand/hero/cover.jpg"
        aria-label="Luxury interior by Refine & Rare"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/brand/hero/herovideo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,36,33,0.58)_0%,rgba(28,36,33,0.64)_42%,rgba(28,36,33,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_20%,rgba(197,178,138,0.22),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(27,58,47,0.28),transparent_40%)]" />

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <span className="h-10 w-px animate-scroll-line bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>

      <div className="relative container-site flex min-h-[100svh] items-center justify-center py-24">
          <div className="mx-auto max-w-full text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.65)]">
            <p
              className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FBE8CE] transition duration-700 ${
                ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Refine &amp; Rare · Luxury Interior Design
            </p>
            <h1
              className={`whitespace-nowrap font-display text-[clamp(1.55rem,5.8vw,3rem)] leading-[1.1] text-white transition duration-1000 delay-100 ${
                ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Where Design{" "}
              <em className="font-display not-italic">
                <span className="gold-shimmer">Meets Distinction.</span>
              </em>
            </h1>
            <p
              className={`mt-3 max-w-lg text-sm leading-relaxed text-white/80 transition duration-1000 delay-200 sm:text-base ${
                ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {tagline}
            </p>
            <p
              className={`mt-3 max-w-lg text-xs leading-relaxed text-white/80 transition duration-1000 delay-300 sm:text-sm ${
                ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {description.slice(0, 180).trim()}…
            </p>
            <div
              className={`mt-5 flex w-full justify-center gap-3 transition duration-1000 delay-500 sm:w-auto ${
                ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <ButtonLink
                href="/projects"
                variant="secondary"
                className="btn-shine justify-center px-4 py-2.5 text-[10px] sm:text-xs"
              >
                View Our Work
              </ButtonLink>
            </div>
        </div>
      </div>
    </section>
  );
}
