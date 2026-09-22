"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const STEP_ICONS = [
  <path
    key="d"
    d="M8 10h8M8 14h5M7 6h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H12l-4 3v-3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path
    key="c"
    d="M9 5h6M10 3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 1-1zm-2 4h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm2 5h6m-6 4h4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path
    key="v"
    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12zm10-2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path
    key="r"
    d="M5 8h6M15 8h4M11 6v4M17 16h2M5 16h8M13 14v4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path
    key="e"
    d="M14.5 4.5l5 5-2.5 1-3.5-3.5-1 2.5-5-5L10 3l1.5 1.5M4 16l4-4 2 2-4 4H4v-2zm11 1l3 3"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path
    key="rv"
    d="M4 11.5L12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1v-8.5z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(clamp(-rect.top / total, 0, 1));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const stepCount = PROCESS_STEPS.length;
  const activeIndex = Math.min(
    stepCount - 1,
    Math.floor(progress * (stepCount - 1) + 0.2)
  );
  const fillPercent = clamp(progress * 100, 0, 100);

  return (
    <>
      {/* Mobile / tablet: normal vertical timeline */}
      <section className="relative bg-ink py-12 text-cream lg:hidden">
        <div className="container-site">
          <Reveal>
            <p className="section-label">Our Process</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight">
              <span className="text-cream">From First Conversation to </span>
              <span className="gold-shimmer">Final Reveal.</span>
            </h2>
          </Reveal>

          <ol className="relative mt-10 space-y-0">
            <div className="absolute bottom-6 left-[27px] top-4 w-px bg-white/15" />
            {PROCESS_STEPS.map((item, i) => (
              <Reveal key={item.step} delay={i * 70}>
                <li className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-gold text-ink">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                      {STEP_ICONS[i]}
                    </svg>
                  </div>
                  <div className="min-w-0 pt-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                      Step {item.step}
                    </p>
                    <h3 className="mt-1 font-display text-xl text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">
                      {item.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Desktop: scroll-driven horizontal timeline */}
      <section
        ref={sectionRef}
        className="relative hidden h-[220vh] bg-ink lg:block"
      >
        <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden py-16">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_30%,rgba(201,166,107,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(81,120,113,0.16),transparent_45%)]" />

          <div className="container-site relative w-full">
            <Reveal>
              <p className="section-label">Our Process</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-cream md:text-5xl">
                <span className="text-cream">From First Conversation to </span>
                <span className="gold-shimmer">Final Reveal.</span>
              </h2>
            </Reveal>

            <div className="relative mt-12 px-4">
              <div className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-[32px] h-px bg-white/15" />
              <div
                className="absolute left-[calc(100%/12)] top-[32px] h-px bg-gold transition-[width] duration-100 ease-linear"
                style={{
                  width: `calc((100% - 100%/6) * ${fillPercent / 100})`,
                }}
              />

              <ol className="relative grid grid-cols-6">
                {PROCESS_STEPS.map((item, i) => {
                  const active = i <= activeIndex;
                  return (
                    <li
                      key={item.step}
                      className="flex flex-col items-center px-1 text-center"
                    >
                      <div
                        className={cn(
                          "relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ink transition-all duration-500",
                          active
                            ? "scale-105 bg-gold text-ink shadow-[0_0_0_4px_rgba(201,166,107,0.22)]"
                            : "bg-ink-2 text-gold/65 ring-1 ring-white/20"
                        )}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-7 w-7"
                          aria-hidden
                        >
                          {STEP_ICONS[i]}
                        </svg>
                      </div>
                      <p
                        className={cn(
                          "mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500",
                          active ? "text-gold" : "text-cream/35"
                        )}
                      >
                        Step {item.step}
                      </p>
                      <h3
                        className={cn(
                          "mt-2 font-display text-xl transition-colors duration-500",
                          active ? "text-cream" : "text-cream/30"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 max-w-[10.5rem] text-sm leading-relaxed transition-colors duration-500",
                          active ? "text-cream/70" : "text-cream/25"
                        )}
                      >
                        {item.body}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
