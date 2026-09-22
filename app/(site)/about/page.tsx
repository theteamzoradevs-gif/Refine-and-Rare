import type { Metadata } from "next";
import Image from "next/image";
import { getSettings } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProcessCards } from "@/components/home/ProcessCards";
import { VALUE_PILLARS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Refine & Rare — Bengaluru luxury interior design, modular kitchens, and turnkey renovation craftsmanship.",
};

const accentStyles = {
  gold: { title: "text-gold", bar: "bg-gold" },
  teal: { title: "text-teal", bar: "bg-teal" },
  ink: { title: "text-ink", bar: "bg-ink" },
} as const;

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-cream">
        <div className="container-site relative z-10">
          <Reveal variant="blur">
            <p className="section-label">About Us</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-6xl">
              Design rooted in craft.{" "}
              <span className="gold-shimmer">Execution you can trust.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-cream/75">{settings.description}</p>
          </Reveal>
        </div>
        <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 animate-float-soft rounded-full bg-teal/30 blur-3xl" />
      </section>

      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal variant="left">
            <div className="group relative aspect-[4/5] overflow-hidden border border-line">
              <Image
                src="/brand/hero/cover.jpg"
                alt="Refine & Rare interior project"
                fill
                className="object-cover transition duration-1000 ease-premium group-hover:scale-105"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          </Reveal>
          <Reveal variant="right" delay={100}>
            <p className="section-label">Our Philosophy</p>
            <h2 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
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

      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site">
          <Reveal>
            <p className="section-label">What Guides Us</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">
              Four words.{" "}
              <span className="gold-shimmer">One standard.</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PILLARS.map((pillar, i) => {
              const accent = accentStyles[pillar.accent];
              return (
                <Reveal key={pillar.title} delay={i * 70} variant="scale">
                  <article className="premium-card group relative flex h-full flex-col p-6">
                    <span
                      className={cn(
                        "absolute left-0 top-0 h-1 w-0 transition-all duration-500 group-hover:w-full",
                        accent.bar
                      )}
                    />
                    <p className="font-display text-4xl text-gold/70">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className={cn(
                        "mt-4 font-display text-2xl uppercase tracking-[0.06em]",
                        accent.title
                      )}
                    >
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {pillar.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site">
          <Reveal variant="blur">
            <p className="section-label">Our Process</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">
              A journey tailored for you.
            </h2>
            <p className="mt-3 text-sm text-muted">
              From first conversation to final reveal.
            </p>
          </Reveal>
          <ProcessCards />
          <Reveal delay={200}>
            <div className="mt-10">
              <ButtonLink href="/contact" variant="primary" className="btn-shine">
                Start Your Consultation
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
