import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects, getProjectSlug } from "@/lib/data";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: getProjectSlug(p) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const cover =
    project.media.find((m) => m.type === "IMAGE") || project.media[0];
  const gallery = project.media;

  return (
    <>
      <section className="relative min-h-[55vh] overflow-hidden bg-ink">
        {cover?.type === "IMAGE" ? (
          <Image
            src={cover.url}
            alt={cover.alt || project.title}
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
        ) : cover?.type === "VIDEO" ? (
          <video
            src={cover.url}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="relative container-site flex min-h-[55vh] items-end pb-14 pt-32">
          <Reveal variant="blur">
            <p className="section-label">{project.category.title}</p>
            <h1 className="mt-3 font-display text-4xl text-white md:text-6xl">
              {project.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-12">
          <Reveal variant="left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Project story
            </p>
            <p className="mt-4 prose-muted">{project.description}</p>

            {gallery.length > 0 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-ink/5"
                  >
                    {item.type === "IMAGE" ? (
                      <Image
                        src={item.url}
                        alt={item.alt || project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 40vw"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="h-full w-full object-cover"
                        controls
                        playsInline
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Space planning tailored to how you live",
                "Curated materials and finish selections",
                "Coordinated site execution and quality checks",
                "A calm handover with details considered",
              ].map((item, i) => (
                <li
                  key={item}
                  className="group flex gap-4 rounded-2xl border border-line bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-gold/45 sm:p-5"
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

          <Reveal variant="right" delay={120}>
            <aside className="premium-card sticky top-28 p-8">
              <h2 className="font-display text-2xl">Love this look?</h2>
              <p className="mt-3 text-sm text-muted">
                Tell us about your home and we&apos;ll explore a similar direction
                — materials, layout, and next steps included.
              </p>
              <div className="mt-6 space-y-3">
                <ButtonLink
                  href={`/contact?service=${project.category.slug}`}
                  variant="primary"
                  className="btn-shine w-full"
                >
                  Get Similar Look
                </ButtonLink>
                <ButtonLink
                  href="/projects"
                  variant="outline"
                  className="w-full"
                >
                  Back to Projects
                </ButtonLink>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
