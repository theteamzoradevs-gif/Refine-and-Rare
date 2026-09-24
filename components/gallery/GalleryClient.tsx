"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/projectSlug";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Media = {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  alt: string;
};

type Project = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  media: Media[];
  category: { slug: string; title: string };
};

export function GalleryClient({
  projects,
  categories,
  initialCategory,
}: {
  projects: Project[];
  categories: { slug: string; title: string }[];
  initialCategory?: string;
}) {
  const [filter, setFilter] = useState(initialCategory || "all");
  const [active, setActive] = useState<{
    project: Project;
    mediaIndex: number;
  } | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category.slug === filter);
  }, [projects, filter]);

  return (
    <>
      <ProjectFilterBar
        filter={filter}
        onFilterChange={setFilter}
        categories={categories}
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => {
          const cover =
            project.media.find((m) => m.type === "IMAGE") || project.media[0];
          if (!cover) return null;
          return (
            <Reveal key={project.id} delay={(i % 6) * 55} variant="scale">
              <article className="premium-card group flex h-full flex-col overflow-hidden">
                <button
                  type="button"
                  className="relative aspect-[5/4] w-full overflow-hidden text-left"
                  onClick={() => setActive({ project, mediaIndex: 0 })}
                >
                  {cover.type === "IMAGE" ? (
                    <Image
                      src={cover.url}
                      alt={cover.alt || project.title}
                      fill
                      className="object-cover transition duration-1000 ease-premium group-hover:scale-110"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  ) : (
                    <video
                      src={cover.url}
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

                  <div className="absolute left-4 top-4">
                    <span className="border border-white/25 bg-ink/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-sm">
                      {project.category.title}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-2xl text-white transition group-hover:text-gold md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-cream/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {project.description}
                    </p>
                  </div>
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <p className="line-clamp-3 flex-1 text-center text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="mt-5 flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                    <ButtonLink
                      href={`/projects/${project.slug || slugify(project.title) || project.id}`}
                      variant="outline"
                      className="w-full justify-center sm:w-auto"
                    >
                      View
                    </ButtonLink>
                    <ButtonLink
                      href={`/contact?service=${project.category.slug}`}
                      variant="primary"
                      className="btn-shine w-full justify-center sm:w-auto"
                    >
                      Get Similar Look
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">
          No projects in this category yet.
        </p>
      )}

      {active && (
        <Lightbox
          project={active.project}
          index={active.mediaIndex}
          onClose={() => setActive(null)}
          onIndexChange={(i) =>
            setActive({ project: active.project, mediaIndex: i })
          }
        />
      )}
    </>
  );
}

function ProjectFilterBar({
  filter,
  onFilterChange,
  categories,
}: {
  filter: string;
  onFilterChange: (value: string) => void;
  categories: { slug: string; title: string }[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateScrollState() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < max - 4);
  }

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [categories]);

  function scrollByDir(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(280, el.clientWidth * 0.7), behavior: "smooth" });
  }

  return (
    <div className="relative mb-8">
      {canScrollLeft && (
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-cream to-transparent" />
      )}
      {canScrollRight && (
        <div className="pointer-events-none absolute inset-y-0 right-12 z-10 w-10 bg-gradient-to-l from-cream to-transparent sm:right-14" />
      )}

      <div
        ref={scrollerRef}
        className="flex gap-2.5 overflow-x-auto scroll-smooth pr-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <FilterChip
          active={filter === "all"}
          onClick={() => onFilterChange("all")}
          label="All"
        />
        {categories.map((c) => (
          <FilterChip
            key={c.slug}
            active={filter === c.slug}
            onClick={() => onFilterChange(c.slug)}
            label={c.title}
          />
        ))}
      </div>

      {canScrollRight && (
        <button
          type="button"
          aria-label="Scroll filters right"
          onClick={() => scrollByDir(1)}
          className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_8px_24px_-12px_rgba(28,36,33,0.45)] transition hover:border-teal hover:text-teal"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Scroll filters left"
          onClick={() => scrollByDir(-1)}
          className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_8px_24px_-12px_rgba(28,36,33,0.45)] transition hover:border-teal hover:text-teal"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M13 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition",
        active
          ? "bg-teal text-white shadow-sm"
          : "border border-line bg-white text-ink/80 hover:border-teal/40 hover:text-teal"
      )}
    >
      {label}
    </button>
  );
}

function Lightbox({
  project,
  index,
  onClose,
  onIndexChange,
}: {
  project: Project;
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const media = project.media[index];
  if (!media) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-sm text-white/80 hover:text-white"
        >
          Close ✕
        </button>
        <div className="relative aspect-video overflow-hidden bg-black">
          {media.type === "IMAGE" ? (
            <Image
              src={media.url}
              alt={media.alt || project.title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          ) : (
            <video
              src={media.url}
              controls
              autoPlay
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <div className="mt-4 flex flex-col gap-4 text-white sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xl">{project.title}</p>
            <p className="mt-1 text-sm text-white/70">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.media.length > 1 && (
              <>
                <button
                  type="button"
                  className="rounded-xl border border-white/30 px-3 py-2 text-sm"
                  onClick={() =>
                    onIndexChange(
                      (index - 1 + project.media.length) % project.media.length
                    )
                  }
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-white/30 px-3 py-2 text-sm"
                  onClick={() =>
                    onIndexChange((index + 1) % project.media.length)
                  }
                >
                  Next
                </button>
              </>
            )}
            <Link
              href={`/contact?service=${project.category.slug}`}
              className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink"
              onClick={onClose}
            >
              Get Similar Look
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
