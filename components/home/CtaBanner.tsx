"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-teal py-12 text-white md:py-16">
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 animate-float-soft rounded-full bg-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
      <div className="container-site relative text-center">
        <Reveal variant="scale">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Next step
          </p>
          <TextReveal
            text="Ready to transform your space?"
            className="mt-3 font-display text-3xl md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Share your vision with us. We&apos;ll guide you from the first
            consultation to a beautifully finished home.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <ButtonLink href="/contact" variant="gold" className="btn-shine w-full justify-center sm:w-auto">
              Enquire Now
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary" className="btn-shine w-full justify-center sm:w-auto">
              See Our Projects
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
