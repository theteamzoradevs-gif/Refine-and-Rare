"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type MediaItem = {
  id?: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  alt?: string;
};

export function MediaCarousel({
  items,
  title,
  className,
}: {
  items: MediaItem[];
  title: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  if (!items.length) return null;

  const current = items[index] || items[0];
  const hasMultiple = items.length > 1;

  function go(dir: 1 | -1) {
    setIndex((i) => (i + dir + items.length) % items.length);
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-ink/5 shadow-[0_24px_60px_-36px_rgba(28,36,33,0.45)] md:aspect-[21/10]">
        {current.type === "VIDEO" ? (
          <video
            key={current.url}
            src={current.url}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label={current.alt || title}
          />
        ) : (
          <Image
            key={current.url}
            src={current.url}
            alt={current.alt || title}
            fill
            priority={index === 0}
            className="object-cover transition duration-700 ease-premium"
            sizes="(max-width:768px) 100vw, 896px"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />

        {hasMultiple ? (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-ink/55 text-white backdrop-blur-sm transition hover:bg-ink/85 sm:left-4"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M13 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-ink/55 text-white backdrop-blur-sm transition hover:bg-ink/85 sm:right-4"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-teal hover:text-teal"
          >
            ← Prev
          </button>
          <p className="text-xs text-muted">
            {index + 1} / {items.length}
          </p>
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-teal hover:text-teal"
          >
            Next →
          </button>
        </div>
      ) : null}
    </div>
  );
}
