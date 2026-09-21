"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

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
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="All" />
        {categories.map((c) => (
          <FilterChip
            key={c.slug}
            active={filter === c.slug}
            onClick={() => setFilter(c.slug)}
            label={c.title}
          />
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => {
          const cover =
            project.media.find((m) => m.type === "IMAGE") || project.media[0];
          if (!cover) return null;
          return (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden border border-line bg-white transition hover:border-teal/50 hover:shadow-[0_18px_40px_-28px_rgba(16,20,22,0.35)]"
            >
              <button
                type="button"
                className="relative aspect-[4/3] w-full overflow-hidden text-left"
                onClick={() => setActive({ project, mediaIndex: 0 })}
              >
                {cover.type === "IMAGE" ? (
                  <Image
                    src={cover.url}
                    alt={cover.alt || project.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                ) : (
                  <video src={cover.url} className="h-full w-full object-cover" muted playsInline />
                )}
              </button>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gold">
                  {project.category.title}
                </p>
                <h3 className="mt-1 font-display text-xl text-ink">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActive({ project, mediaIndex: 0 })}
                    className="border border-ink/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-teal hover:text-teal"
                  >
                    View
                  </button>
                  <Link
                    href={`/contact?service=${project.category.slug}`}
                    className="bg-teal px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-teal-dark"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">No projects in this category yet.</p>
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
            <video src={media.url} controls autoPlay className="h-full w-full object-contain" />
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
                  onClick={() => onIndexChange((index + 1) % project.media.length)}
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
