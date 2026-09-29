"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Testimonial = {
  id?: string;
  name: string;
  quote: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Ganesh Malla",
    quote:
      "The product quality is excellent and feels very strong and durable. The team is polite, responsive, and always ready to help. Any small issue is resolved quickly, and their after-sales service is impressive.",
  },
  {
    id: "2",
    name: "Amit Singh",
    quote:
      "The installation process was smooth and completed on time. Their after-sales service is also excellent, with staff polite and quick to resolve any issues. The kitchen's finish and quality feel premium, making it long-lasting.",
  },
  {
    id: "3",
    name: "ESP Eshwitha Sand Plant",
    quote:
      "The craftsmanship is top-notch, and the surface has a premium look that instantly elevates the entire kitchen space. The surface resists stains well and cleaning is effortless, which is a big advantage for daily kitchen use. The design options are also quite elegant, blending both modern and classic styles seamlessly.",
  },
  {
    id: "4",
    name: "Rishi Agrawal",
    quote:
      "Great quality and the finish and fittings feel premium, and the overall kitchen space has completely transformed the home. Really happy with the service and outcome. Highly recommended.",
  },
  {
    id: "5",
    name: "Garima Jain",
    quote:
      "The installation process by the team was absolutely seamless and impressive. The team worked with great precision, ensured every detail was taken care of, and delivered exactly as promised.",
  },
];

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function FiveStars() {
  return (
    <div className="flex gap-0.5" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]"
          aria-hidden
        >
          <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.22L10 13.77 5.3 15.94l.9-5.22-3.8-3.7 5.25-.76L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function AuthorAvatar({ name }: { name: string }) {
  const initial = name ? name.charAt(0).toUpperCase() : "C";
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#18181b] text-sm font-semibold text-white shadow-sm">
      {initial}
    </div>
  );
}

function useWindowWidth() {
  const [width, setWidth] = useState<number>(1200);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export function TestimonialHighlight({
  testimonials = [],
}: {
  testimonials?: Testimonial[];
  variant?: string;
}) {
  const list =
    testimonials && testimonials.length >= 3
      ? testimonials
      : DEFAULT_TESTIMONIALS;

  const [activeIndex, setActiveIndex] = useState(0);
  const width = useWindowWidth();

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  }, [list.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  }, [list.length]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  // Responsive arc dimensions
  const isMobile = width < 640;
  const isTablet = width < 1024;

  const stepX = isMobile ? 150 : isTablet ? 220 : 290;
  const rotateStep = isMobile ? 4.5 : isTablet ? 5.5 : 7;
  const arcYFactor = isMobile ? 10 : isTablet ? 14 : 18;

  const count = list.length;

  return (
    <section className="relative overflow-hidden bg-[#F6F5F2] py-16 md:py-24">
      {/* Soft ambient background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_40%,rgba(215,205,185,0.25),transparent_60%)]" />

      {/* Header section */}
      <div className="container-site relative z-10 text-center">
        <Reveal variant="blur">
          <span className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            Client Voices
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-5xl">
            What clients say about{" "}
            <span className="gold-shimmer">Refine &amp; Rare</span>
          </h2>
        </Reveal>
      </div>

      {/* Rotatable Circular Arc Wheel Container */}
      <div className="relative mt-12 h-[420px] sm:h-[450px] md:h-[480px] w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {list.map((item, index) => {
            // Shortest distance calculation on circle
            let diff = (index - activeIndex) % count;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;

            const absDiff = Math.abs(diff);
            const isVisible = absDiff <= (isMobile ? 2 : 3);
            const isCenter = diff === 0;

            const x = diff * stepX;
            const y = Math.pow(absDiff, 1.6) * arcYFactor;
            const rotate = diff * rotateStep;
            const scale = isCenter ? 1 : Math.max(0.82, 1 - absDiff * 0.05);
            const opacity = isVisible ? (absDiff === 3 ? 0.35 : 1) : 0;
            const zIndex = 50 - absDiff;

            return (
              <motion.div
                key={item.id || `${item.name}-${index}`}
                initial={false}
                animate={{
                  x,
                  y,
                  rotate,
                  scale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                  mass: 0.9,
                }}
                style={{
                  zIndex,
                  position: "absolute",
                  transformOrigin: "center bottom",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                onClick={() => setActiveIndex(index)}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group relative flex h-[270px] w-[290px] flex-col justify-between rounded-2xl bg-white p-6 sm:h-[290px] sm:w-[330px] sm:p-7 md:h-[310px] md:w-[360px]",
                  "border border-stone-200/80 shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]",
                  "cursor-pointer select-none"
                )}
              >
                {/* Subtle Decorative Quote Icon at Top Right */}
                <div className="absolute right-5 top-4 font-serif text-3xl leading-none text-stone-300/80 select-none">
                  &#8221;
                </div>

                {/* Quote Text */}
                <div className="pr-4">
                  <p className="line-clamp-6 text-xs sm:text-sm leading-relaxed text-stone-600">
                    {item.quote}
                  </p>
                </div>

                {/* Card Footer: Author details & Google logo */}
                <div className="mt-4 flex items-end justify-between border-t border-stone-100 pt-4">
                  <div className="flex items-center gap-3">
                    <AuthorAvatar name={item.name} />
                    <div>
                      <h3 className="font-display text-sm font-semibold text-stone-900 md:text-base">
                        {item.name}
                      </h3>
                      <div className="mt-0.5">
                        <FiveStars />
                      </div>
                    </div>
                  </div>
                  <GoogleIcon className="h-5 w-5 shrink-0 opacity-90" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Circular Navigation Arrow Buttons & Link */}
      <div className="container-site relative z-20 -mt-4 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300/80 bg-white/90 text-stone-700 shadow-sm backdrop-blur-sm transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900 active:scale-95"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300/80 bg-white/90 text-stone-700 shadow-sm backdrop-blur-sm transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900 active:scale-95"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>


      </div>
    </section>
  );
}
