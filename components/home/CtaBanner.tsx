"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-teal py-20 text-white md:py-24">
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 animate-float-soft rounded-full bg-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
      <div className="container-site relative text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Next step
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">
            Ready to transform your space?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Share your vision with us. We&apos;ll guide you from the first
            consultation to a beautifully finished home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="gold" className="btn-shine">
              Enquire Now
            </ButtonLink>
            <ButtonLink href="/gallery" variant="secondary" className="btn-shine">
              See Our Projects
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
