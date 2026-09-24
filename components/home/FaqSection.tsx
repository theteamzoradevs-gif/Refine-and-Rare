"use client";

import { useState } from "react";
import { FAQS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

export function FaqSection({
  title = "Frequently asked questions",
  items = FAQS,
}: {
  title?: string;
  items?: readonly { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-45 [background:radial-gradient(circle_at_15%_20%,rgba(197,178,138,0.12),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(27,58,47,0.08),transparent_40%)]" />
      <div className="container-site relative">
        <Reveal variant="blur">
          <p className="section-label">FAQ</p>
          <TextReveal
            text={title}
            className="mt-3 max-w-2xl font-display text-3xl text-ink md:text-5xl"
          />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Clear answers about how we design, plan, and deliver your home.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line/80 border-y border-line/80">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.question} delay={i * 40}>
                <div>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left transition hover:text-teal"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-display text-lg text-ink md:text-xl">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-sm transition",
                        isOpen && "border-teal bg-teal text-cream"
                      )}
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <p className="overflow-hidden text-sm leading-relaxed text-muted md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
