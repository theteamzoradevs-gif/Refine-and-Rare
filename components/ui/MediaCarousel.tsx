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
    <div
      className={cn(
        "group relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-ink/5 shadow-[0_24px_60px_-36px_rgba(28,36,33,0.45)] md:aspect-[21/10]",
        className
      )}
    >
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
            aria-label="Previous media"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-ink/50 text-white backdrop-blur-sm transition hover:bg-ink/80 sm:left-4"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M13 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next media"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-ink/50 text-white backdrop-blur-sm transition hover:bg-ink/80 sm:right-4"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/45 px-2.5 py-1.5 backdrop-blur-sm">
            {items.map((item, i) => (
              <button
                key={item.id || item.url}
                type="button"
                aria-label={`Show media ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-gold" : "w-1.5 bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
