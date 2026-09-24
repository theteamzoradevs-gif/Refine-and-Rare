import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";
import { staticProjects } from "@/lib/staticContent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return staticProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description,
  };
}

const highlights = [
  "Thoughtful space planning tailored to how you live",
  "Material and finish choices that age gracefully",
  "Layered lighting for atmosphere and everyday comfort",
  "Execution details checked at every stage",
];

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const cover =
    project.media.find((m) => m.type === "IMAGE") || project.media[0];
  // Exclude cover so it isn't repeated when video is first / image is second
  const gallery = project.media.filter((m) => m.id !== cover?.id);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-cream md:pb-16">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background:radial-gradient(circle_at_75%_20%,rgba(197,178,138,0.2),transparent_40%),radial-gradient(circle_at_15%_85%,rgba(42,83,68,0.35),transparent_45%)]" />
        <div className="container-site relative">
          <Reveal variant="blur">
            <Link
              href="/projects"
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold/90 transition hover:text-gold"
            >
              ← All projects
            </Link>
            <p className="section-label mt-5">{project.category.title}</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-cream md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
              {project.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_10%_15%,rgba(197,178,138,0.14),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(27,58,47,0.08),transparent_40%)]" />

        <div className="container-site relative max-w-4xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Project story
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              {project.description} Designed as part of our{" "}
              {project.category.title.toLowerCase()} work — calm proportions,
              refined finishes, and details that feel intentional every day.
            </p>
          </Reveal>

          {cover ? (
            <Reveal delay={100} variant="scale">
              <div className="group relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-[0_24px_60px_-36px_rgba(28,36,33,0.45)] md:mt-12 md:aspect-[21/10]">
                {cover.type === "VIDEO" ? (
                  <video
                    src={cover.url}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={cover.alt || project.title}
                  />
                ) : (
                  <Image
                    src={cover.url}
                    alt={cover.alt || project.title}
                    fill
                    priority
                    className="object-cover transition duration-1000 ease-premium group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 896px"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              </div>
            </Reveal>
          ) : null}

          {gallery.length > 0 ? (
            <Reveal delay={140}>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {gallery.map((item) => (
                  <div
                    key={item.id || item.url}
                    className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-line"
                  >
                    {item.type === "VIDEO" ? (
                      <video
                        src={item.url}
                        className="absolute inset-0 h-full w-full object-cover"
                        muted
                        loop
                        playsInline
                        controls
                        aria-label={item.alt || project.title}
                      />
                    ) : (
                      <Image
                        src={item.url}
                        alt={item.alt || project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 448px"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={160}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12">
              {highlights.map((item, i) => (
                <li
                  key={item}
                  className="group flex gap-4 rounded-2xl border border-line/80 bg-white/90 p-5 shadow-[0_14px_40px_-30px_rgba(28,36,33,0.35)] transition duration-300 hover:-translate-y-0.5 hover:border-gold/45"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal text-sm font-semibold tracking-wide text-cream transition group-hover:bg-gold group-hover:text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-2 text-sm leading-relaxed text-muted transition group-hover:text-ink">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={220}>
            <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-ink p-7 text-cream sm:p-8 md:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_90%_10%,rgba(197,178,138,0.22),transparent_40%)]" />
              <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Next step
                </p>
                <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
                  Want a look like this?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/70 md:text-base">
                  Tell us about your space and we&apos;ll shape a similar
                  direction for your home.
                </p>
                <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink
                    href={`/contact?service=${project.category.slug}`}
                    variant="gold"
                    className="btn-shine w-full justify-center px-6 py-3.5 sm:w-auto sm:min-w-[11rem]"
                  >
                    Get Similar Look
                  </ButtonLink>
                  <ButtonLink
                    href="/projects"
                    variant="secondary"
                    className="btn-shine w-full justify-center border-white/35 bg-transparent px-6 py-3.5 text-cream hover:border-white hover:bg-white hover:text-ink sm:w-auto sm:min-w-[11rem]"
                  >
                    More Projects
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
