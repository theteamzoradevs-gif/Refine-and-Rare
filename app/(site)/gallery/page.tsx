import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { getProjects, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse Refine & Rare interior design, kitchen, and renovation projects across Bengaluru.",
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const [projects, services] = await Promise.all([
    getProjects(),
    getServices(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-12 pt-32 text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_40%,rgba(201,166,107,0.16),transparent_40%)]" />
        <div className="container-site relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal variant="blur">
            <p className="section-label">Projects</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-5xl">
              A curated gallery of{" "}
              <span className="gold-shimmer">refined spaces.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-cream/70">
              Browse by category, open a project, then enquire for a similar look.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ButtonLink href="/contact" variant="gold" className="btn-shine">
              Start an enquiry
            </ButtonLink>
          </Reveal>
        </div>
      </section>
      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site">
          <GalleryClient
            projects={projects}
            categories={services.map((s) => ({
              slug: s.slug,
              title: s.title,
            }))}
            initialCategory={searchParams?.category}
          />
        </div>
      </section>
    </>
  );
}
