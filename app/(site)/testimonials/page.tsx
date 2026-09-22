import type { Metadata } from "next";
import { getPublishedTestimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Client Voices",
  description:
    "What clients say about Refine & Rare interior design and renovation in Bengaluru.",
};

const ROLES: Record<string, string> = {
  "Ankur Sharma": "Full Home Interiors · Bengaluru",
  "Priya Menon": "Modular Kitchen · Bengaluru",
  "Rohit & Neha Kapoor": "Living & Wardrobes · Bengaluru",
  "Sana Fernandes": "Bedroom Suite · Bengaluru",
  "Vikram Iyer": "Turnkey Residence · Bengaluru",
  "Meera Desai": "Residential Interiors · Bengaluru",
  "Arjun Nair": "Feature Wall & TV Unit · Bengaluru",
  "Kavya Reddy": "Design to Reveal · Bengaluru",
};

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-gold text-gold"
          aria-hidden
        >
          <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.22L10 13.77 5.3 15.94l.9-5.22-3.8-3.7 5.25-.76L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_50%_30%,rgba(201,166,107,0.18),transparent_40%)]" />
        <div className="container-site relative">
          <Reveal variant="blur">
            <p className="section-label">Client Voices</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl">
              What clients say about{" "}
              <span className="gold-shimmer">Refine &amp; Rare.</span>
            </h1>
          </Reveal>
        </div>
      </section>
      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 60} variant="scale">
              <article className="premium-card group flex h-full flex-col p-8">
                <span className="absolute left-0 top-0 h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                <div>
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {ROLES[t.name] || "Client · Bengaluru"}
                  </p>
                </div>
                <p className="mt-5 flex-1 text-base leading-relaxed text-muted md:text-lg">
                  “{t.quote}”
                </p>
                <div className="mt-6">
                  <Stars />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="container-site mt-10 text-center">
            <ButtonLink href="/contact" variant="primary" className="btn-shine">
              Start Your Project
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
