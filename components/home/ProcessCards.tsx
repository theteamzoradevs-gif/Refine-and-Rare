"use client";

import { PROCESS_STEPS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessCards() {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PROCESS_STEPS.map((step, i) => (
        <Reveal key={step.step} delay={i * 80} variant="scale">
          <article className="premium-card group relative h-full cursor-default p-6">
            <span className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-teal to-gold transition-all duration-500 group-hover:w-full" />
            <p className="font-display text-4xl text-gold transition duration-500 group-hover:scale-110 group-hover:text-teal">
              {step.step}
            </p>
            <h3 className="mt-4 font-display text-2xl transition group-hover:text-teal">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            <div className="mt-5 h-px w-10 bg-gold/50 transition-all duration-500 group-hover:w-full group-hover:bg-teal" />
          </article>
        </Reveal>
      ))}
    </div>
  );
}
