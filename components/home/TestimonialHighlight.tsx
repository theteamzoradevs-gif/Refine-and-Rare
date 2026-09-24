"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";

type Testimonial = {
  id?: string;
  name: string;
  quote: string;
};

const ROLES: Record<string, string> = {
  "Ankur Sharma": "Full Home Interiors · Bengaluru",
  "Priya Menon": "Modular Kitchen · Bengaluru",
  "Rohit & Neha Kapoor": "Living & Wardrobes · Bengaluru",
  "Sana Fernandes": "Bedroom Suite · Bengaluru",
  "Vikram Iyer": "Turnkey Residence · Bengaluru",
  "Meera Desai": "Residential Interiors · Bengaluru",
  "Arjun Nair": "Feature Wall & TV Unit · Bengaluru",
  "Kavya Reddy": "Design to Reveal · Bengaluru",
};

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-gold text-gold"
          aria-hidden
        >
          <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.22L10 13.77 5.3 15.94l.9-5.22-3.8-3.7 5.25-.76L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function VoiceCard({
  name,
  quote,
  className,
}: {
  name: string;
  quote: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "premium-card group relative flex h-full flex-col rounded-2xl p-5 sm:p-6 md:p-7",
        className
      )}
    >
      <span className="absolute left-0 top-0 h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
      <div>
        <p className="font-semibold text-ink">{name}</p>
        <p className="mt-1 text-xs text-muted">
          {ROLES[name] || "Client · Bengaluru"}
        </p>
      </div>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">“{quote}”</p>
      <div className="mt-6">
        <Stars />
      </div>
    </article>
  );
}

function SlidingRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="group overflow-hidden">
      <div
        className={cn(
          "flex w-max gap-5 py-2 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {loop.map((item, i) => (
          <VoiceCard
            key={`${item.name}-${i}`}
            name={item.name}
            quote={item.quote}
            className="w-[min(300px,85vw)] shrink-0 md:w-[340px]"
          />
        ))}
      </div>
    </div>
  );
}

export function TestimonialHighlight({
  testimonials,
  variant = "marquee",
}: {
  testimonials: Testimonial[];
  variant?: "marquee" | "static";
}) {
  if (!testimonials.length) return null;

  const mid = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, mid);
  const rowTwo = testimonials.slice(mid);
  const bottomRow = rowTwo.length >= 2 ? rowTwo : [...testimonials].reverse();
  const staticItems = testimonials.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-cream py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_30%_20%,rgba(197,178,138,0.18),transparent_35%),radial-gradient(circle_at_70%_15%,rgba(27,58,47,0.14),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(234,216,185,0.45),transparent_45%)]" />

      <div className="container-site relative text-center">
        <Reveal variant="blur">
          <span className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            Client Voices
          </span>
          <h2 className="mt-5 font-display text-3xl leading-tight text-ink md:text-5xl">
            What clients say about{" "}
            <span className="gold-shimmer">Refine &amp; Rare</span>
          </h2>
        </Reveal>
      </div>

      {variant === "static" ? (
        <div className="container-site relative mt-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {staticItems.map((item, i) => (
              <Reveal key={item.id || item.name} delay={i * 60} variant="scale">
                <VoiceCard name={item.name} quote={item.quote} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mt-8 space-y-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-cream to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-cream to-transparent md:w-20" />

          <SlidingRow items={rowOne} />
          <SlidingRow items={bottomRow} reverse />
        </div>
      )}

      <div className="container-site relative mt-8 flex flex-col items-center gap-5">
        {variant === "marquee" ? (
          <div className="flex items-center gap-2" aria-hidden>
            <span className="h-1.5 w-8 rounded-full bg-gold" />
            <span className="h-1.5 w-5 rounded-full bg-line" />
            <span className="h-1.5 w-5 rounded-full bg-line" />
          </div>
        ) : null}
        <ButtonLink href="/testimonials" variant="outline" className="btn-shine">
          Read more stories
        </ButtonLink>
      </div>
    </section>
  );
}
