import type { Metadata } from "next";
import Image from "next/image";
import { getSettings } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProcessCards } from "@/components/home/ProcessCards";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Refine & Rare — Bengaluru luxury interior design, modular kitchens, and turnkey renovation craftsmanship.",
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-32 text-cream">
        <div className="container-site relative z-10">
          <p className="section-label">About Us</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-6xl">
            Design rooted in craft.{" "}
            <span className="text-gold">Execution you can trust.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-cream/75">{settings.description}</p>
        </div>
        <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 animate-float-soft rounded-full bg-teal/30 blur-3xl" />
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="group relative aspect-[4/5] overflow-hidden">
              <Image
                src="/brand/hero/cover.jpg"
                alt="Refine & Rare interior project"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-label">Our Philosophy</p>
            <h2 className="heading-display mt-3">
              Timeless. Functional.{" "}
              <span className="text-teal">Refined.</span>
            </h2>
            <p className="mt-5 prose-muted">
              Every Refine & Rare project begins with how you live — not just
              what looks beautiful in a mood board. We blend smart space
              planning, premium materials, and precise turnkey execution to
              create interiors that feel personal, durable, and quietly
              luxurious.
            </p>
            <p className="mt-4 prose-muted">
              From modular kitchens and POP ceilings to full renovations, our
              Bengaluru team manages the journey with clarity and
              craftsmanship — so your home arrives finished, not fragmented.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-section-fade py-20 md:py-28">
        <div className="container-site">
          <Reveal>
            <p className="section-label">Our Process</p>
            <h2 className="heading-display mt-3">A journey tailored for you.</h2>
            <p className="mt-3 text-sm text-muted">
              Hover each step — the path from consultation to handover.
            </p>
          </Reveal>
          <ProcessCards />
          <div className="mt-12">
            <ButtonLink href="/contact" variant="primary" className="btn-shine">
              Start Your Consultation
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
