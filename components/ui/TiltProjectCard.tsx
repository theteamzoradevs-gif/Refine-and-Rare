"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Media = { url: string; type: "IMAGE" | "VIDEO"; alt: string };
type Project = {
  id: string;
  title: string;
  description: string;
  media: Media[];
  category: { title: string };
};

export function TiltProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const cover = project.media.find((m) => m.type === "IMAGE");

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / rect.height) * -8;
    const rotY = ((x - rect.width / 2) / rect.width) * 8;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }

  return (
    <Link
      ref={ref}
      href="/gallery"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative block overflow-hidden transition-transform duration-200 ease-out will-change-transform ${
        large
          ? "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[280px]"
          : "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[280px]"
      }`}
    >
      {cover ? (
        <Image
          src={cover.url}
          alt={cover.alt || project.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width:768px) 100vw, 40vw"
        />
      ) : (
        <div className="h-full w-full bg-ink-2" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition duration-500 group-hover:opacity-95" />
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 [background:radial-gradient(600px_circle_at_var(--x,50%)_var(--y,50%),rgba(201,166,107,0.18),transparent_40%)]" />
      <div className="absolute bottom-0 translate-y-2 p-5 transition duration-500 group-hover:translate-y-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
          {project.category.title}
        </p>
        <h3 className="mt-1 font-display text-xl text-white md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
          {project.description}
        </p>
        <span className="mt-3 inline-flex translate-y-2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View project →
        </span>
      </div>
    </Link>
  );
}
