"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  imageUrl: string;
};

export function ServiceFlipCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flip-scene h-[380px] w-full"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <button
        type="button"
        aria-label={`${service.title} — ${flipped ? "show cover" : "flip for details"}`}
        className={cn("flip-card h-full w-full text-left", flipped && "is-flipped")}
        onClick={() => setFlipped((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
      >
        {/* Front */}
        <div className="flip-face overflow-hidden border border-line/60 shadow-[0_20px_50px_-28px_rgba(16,20,22,0.55)]">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
          <div className="absolute inset-0 bg-teal/0 transition duration-500 hover:bg-teal/10" />
          <div className="absolute bottom-0 w-full p-6 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              0{index + 1} · Flip for details
            </p>
            <h3 className="mt-2 font-display text-2xl md:text-3xl">{service.title}</h3>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream/90">
              Discover
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                ↻
              </span>
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 [background:linear-gradient(120deg,transparent_30%,rgba(201,166,107,0.22)_50%,transparent_70%)] hover:opacity-100" />
        </div>

        {/* Back */}
        <div className="flip-face flip-face-back flex flex-col justify-between border border-gold/30 bg-ink p-6 text-cream shadow-[0_20px_50px_-28px_rgba(16,20,22,0.7)]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              Service
            </p>
            <h3 className="mt-3 font-display text-2xl text-cream">{service.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/75">
              {service.shortDesc}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-6">
            <Link
              href={`/services/${service.slug}`}
              className="btn-gold text-[11px]"
              onClick={(e) => e.stopPropagation()}
            >
              Explore
            </Link>
            <Link
              href={`/contact?service=${service.slug}`}
              className="btn-secondary text-[11px]"
              onClick={(e) => e.stopPropagation()}
            >
              Get Quote
            </Link>
          </div>
        </div>
      </button>
    </div>
  );
}
