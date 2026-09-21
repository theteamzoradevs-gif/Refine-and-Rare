"use client";

import { PROCESS_STEPS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessCards() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {PROCESS_STEPS.map((step, i) => (
        <Reveal key={step.step} delay={i * 90}>
          <article className="process-card group cursor-default">
            <p className="font-display text-3xl text-gold transition duration-500 group-hover:scale-110 group-hover:text-teal">
              {step.step}
            </p>
            <h3 className="mt-3 font-display text-2xl transition group-hover:text-teal">
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
