"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Testimonial = {
  name: string;
  quote: string;
};

export function TestimonialHighlight({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  const active = testimonials[index] || testimonials[0];
  if (!active) return null;

  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div className="container-site relative max-w-4xl text-center">
        <Reveal>
          <p className="section-label">Client Voices</p>
          <div key={active.name + index} className="animate-float-in">
            <blockquote className="mt-8 font-display text-2xl leading-snug text-ink md:text-4xl">
              “{active.quote}”
            </blockquote>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-teal">
              — {active.name}
            </p>
          </div>
          {testimonials.length > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index ? "scale-125 bg-gold" : "bg-line hover:bg-teal"
                  }`}
                />
              ))}
            </div>
          )}
          <div className="mt-10">
            <ButtonLink href="/testimonials" variant="outline" className="btn-shine">
              Read more stories
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
