import type { Metadata } from "next";
import { getPublishedTestimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about Refine & Rare interior design and renovation in Bengaluru.",
};

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <section className="bg-ink pb-14 pt-32 text-cream">
        <div className="container-site">
          <p className="section-label">Testimonials</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">
            Built on trust and finishing quality.
          </h1>
        </div>
      </section>
      <section className="bg-cream py-16 md:py-24">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 60}>
              <article className="h-full border border-line bg-white p-8">
                <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
                  “{t.quote}”
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                  {t.name}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="container-site mt-12 text-center">
          <ButtonLink href="/contact" variant="primary">
            Start Your Project
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
