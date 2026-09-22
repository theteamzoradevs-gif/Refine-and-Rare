"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
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
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="All"
        />
        {categories.map((c) => (
          <FilterChip
            key={c.slug}
            active={filter === c.slug}
            onClick={() => setFilter(c.slug)}
            label={c.title}
          />
        ))}
      </div>

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
                    <button
                      type="button"
                      onClick={() => setActive({ project, mediaIndex: 0 })}
                      className="btn-outline w-full justify-center sm:w-auto"
                    >
                      View
                    </button>
                    <ButtonLink
                      href={`/contact?service=${project.category.slug}`}
                      variant="primary"
                      className="btn-shine w-full justify-center sm:w-auto"
                    >
                      Enquire
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
        "px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition",
        active
          ? "bg-teal text-white"
          : "border border-line bg-white text-muted hover:border-teal hover:text-teal"
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
                  className="border border-white/30 px-3 py-2 text-sm"
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
                  className="border border-white/30 px-3 py-2 text-sm"
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
              className="bg-gold px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink"
              onClick={onClose}
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
