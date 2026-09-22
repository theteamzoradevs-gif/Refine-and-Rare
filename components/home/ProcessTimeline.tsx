"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROCESS_STEPS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const STEP_ICONS = [
  // Discover — chat
  <path
    key="d"
    d="M8 10h8M8 14h5M7 6h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H12l-4 3v-3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Concept — clipboard
  <path
    key="c"
    d="M9 5h6M10 3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 1-1zm-2 4h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm2 5h6m-6 4h4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Visualise — eye
  <path
    key="v"
    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12zm10-2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Refine — sliders
  <path
    key="r"
    d="M5 8h6M15 8h4M11 6v4M17 16h2M5 16h8M13 14v4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Execute — wrench (site work)
  <path
    key="e"
    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Reveal — home
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

const STEP_COUNT = PROCESS_STEPS.length;
/** Viewport heights of scroll travel per step after the first */
const VH_PER_STEP = 70;

const BG_IMAGE = "/brand/services/Bedrooms.png";

function ProcessBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-ink" />
      <Image
        src={BG_IMAGE}
        alt=""
        fill
        priority={false}
        className="object-cover opacity-50"
        sizes="100vw"
        aria-hidden
      />
      {/* Stronger wash so cream text stays sharp over the photo */}
      <div className="absolute inset-0 bg-ink/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/50" />
    </>
  );
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
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
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

  const activeIndex = Math.min(
    STEP_COUNT - 1,
    Math.round(progress * (STEP_COUNT - 1))
  );

  return (
    <>
      {/* Mobile / tablet: normal vertical timeline */}
      <section className="relative overflow-hidden py-12 text-cream lg:hidden">
        <ProcessBackdrop />
        <div className="container-site relative">
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
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-white/20 bg-gold text-ink">
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
        className="relative hidden lg:block"
        style={{
          height: `${100 + (STEP_COUNT - 1) * VH_PER_STEP}vh`,
        }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden py-16">
          <ProcessBackdrop />

          <div className="container-site relative w-full">
            <Reveal>
              <p className="section-label">Our Process</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-cream md:text-5xl">
                <span className="text-cream">From First Conversation to </span>
                <span className="gold-shimmer">Final Reveal.</span>
              </h2>
            </Reveal>

            <div className="relative mt-12 px-4">
              <div className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-[32px] h-px bg-white/20" />
              <div
                className="absolute left-[calc(100%/12)] top-[32px] h-px origin-left bg-gold will-change-transform"
                style={{
                  width: "calc(100% - 100% / 6)",
                  transform: `scaleX(${progress})`,
                }}
              />

              <ol className="relative grid grid-cols-6">
                {PROCESS_STEPS.map((item, i) => {
                  const active = i <= activeIndex;
                  const current = i === activeIndex;
                  return (
                    <li
                      key={item.step}
                      className="flex flex-col items-center px-1 text-center"
                    >
                      <div
                        className={cn(
                          "relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white/15 transition-all duration-300",
                          active
                            ? "bg-gold text-ink shadow-[0_0_0_4px_rgba(197,178,138,0.22)]"
                            : "bg-white/10 text-gold/80 ring-1 ring-white/25 backdrop-blur-sm",
                          current && "scale-110"
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
                          "mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                          active ? "text-gold" : "text-cream/40"
                        )}
                      >
                        Step {item.step}
                      </p>
                      <h3
                        className={cn(
                          "mt-2 font-display text-xl transition-colors duration-300",
                          active ? "text-cream" : "text-cream/35"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 max-w-[10.5rem] text-sm leading-relaxed transition-colors duration-300",
                          active ? "text-cream/75" : "text-cream/30"
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
