import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
      <section className="bg-ink pb-12 pt-32 text-cream">
        <div className="container-site flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Projects</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-5xl">
              A curated gallery of refined spaces.
            </h1>
            <p className="mt-4 max-w-2xl text-cream/70">
              Browse by category, open a project, then enquire for a similar look.
            </p>
          </div>
          <ButtonLink href="/contact" variant="gold">
            Start an enquiry
          </ButtonLink>
        </div>
      </section>
      <section className="bg-cream py-12 md:py-16">
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
