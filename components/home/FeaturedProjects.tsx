"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { TiltProjectCard } from "@/components/ui/TiltProjectCard";

type Media = { url: string; type: "IMAGE" | "VIDEO"; alt: string };
type Project = {
  id: string;
  title: string;
  description: string;
  media: Media[];
  category: { title: string };
};

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="relative overflow-hidden bg-ink py-12 text-cream md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_70%_20%,rgba(201,166,107,0.18),transparent_40%)]" />
      <div className="container-site relative">
        <Reveal variant="blur">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-label">Featured Projects</p>
              <TextReveal
                text="Our collection of refined interiors."
                className="mt-3 font-display text-3xl text-cream md:text-5xl"
              />
              <p className="mt-2 text-gold">Spaces shaped with quiet luxury.</p>
            </div>
            <ButtonLink href="/projects" variant="gold" className="btn-shine">
              View Full Gallery
            </ButtonLink>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i * 80}
              variant="scale"
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <TiltProjectCard project={project} large={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
