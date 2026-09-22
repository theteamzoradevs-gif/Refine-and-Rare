import type { Metadata } from "next";
import Image from "next/image";
import { getSettings } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Vision, mission, and founder’s note from Refine & Rare — Bengaluru luxury interior design and turnkey renovation.",
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-cream md:pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_80%_20%,rgba(197,178,138,0.18),transparent_40%),radial-gradient(circle_at_15%_80%,rgba(27,58,47,0.2),transparent_45%)]" />
        <div className="container-site relative z-10">
          <Reveal variant="blur">
            <p className="section-label">About Us</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
              The studio behind{" "}
              <span className="gold-shimmer">spaces that feel like home.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
              {settings.description} We design and deliver residential interiors
              across Bengaluru with clarity, craft, and care.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-grain relative overflow-hidden bg-cream py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_10%_20%,rgba(197,178,138,0.12),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(27,58,47,0.1),transparent_40%)]" />
        <div className="container-site relative">
          <Reveal>
            <p className="section-label">What We Stand For</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-ink md:text-5xl">
              Vision &amp; Mission
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal variant="left">
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 md:p-9">
                <span className="absolute left-0 top-0 h-full w-1 bg-gold" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Vision
                </p>
                <h3 className="mt-4 font-display text-2xl text-ink md:text-3xl">
                  Homes that feel rare — and remain refined for years.
                </h3>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted md:text-base">
                  To become Bengaluru&apos;s most trusted interior studio for
                  thoughtful, timeless residential design — where beauty,
                  function, and craftsmanship come together in every room we
                  create.
                </p>
              </article>
            </Reveal>

            <Reveal variant="right" delay={80}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink p-7 text-cream md:p-9">
                <span className="absolute left-0 top-0 h-full w-1 bg-teal" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Mission
                </p>
                <h3 className="mt-4 font-display text-2xl md:text-3xl">
                  Design with intention. Deliver with integrity.
                </h3>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-cream/70 md:text-base">
                  We listen deeply, plan precisely, and execute end-to-end —
                  from concept and materials to site coordination — so every
                  homeowner experiences a calm, clear journey from first
                  conversation to final reveal.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="relative overflow-hidden bg-ink py-14 text-cream md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background:radial-gradient(circle_at_20%_30%,rgba(197,178,138,0.14),transparent_40%),radial-gradient(circle_at_85%_70%,rgba(27,58,47,0.18),transparent_45%)]" />
        <div className="container-site relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="left" className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/brand/hero/cover.jpg"
                alt="Refine & Rare founder’s studio work"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-2xl text-cream">Raja Sharma</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Founder, Refine &amp; Rare
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={100} className="lg:col-span-7">
            <p className="section-label">Founder&apos;s Note</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-5xl">
              A personal word from the{" "}
              <span className="gold-shimmer">studio.</span>
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-cream/75 md:text-base">
              <p>
                When I started Refine &amp; Rare, it was with a simple belief —
                a home should feel like you. Not a trend, not a template, but a
                space that quietly supports how you live every day.
              </p>
              <p>
                Luxury, to us, is never loud. It lives in proportion, light,
                materials, and the care taken in every detail. From modular
                kitchens to full renovations across Bengaluru, our promise is
                the same: honest design, precise execution, and a journey you
                can trust.
              </p>
              <p>
                Thank you for considering us for your home. We would be honoured
                to shape it with you.
              </p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="font-display text-xl italic text-cream">
                — Raja Sharma
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-cream/45">
                Founder &amp; Creative Lead
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="gold" className="btn-shine">
                Start a Conversation
              </ButtonLink>
              <ButtonLink
                href="/projects"
                variant="secondary"
                className="btn-shine"
              >
                View Our Work
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
