import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/lib/data";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <section className="relative min-h-[55vh] overflow-hidden bg-ink">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover opacity-60 transition duration-[2s] hover:scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="relative container-site flex min-h-[55vh] items-end pb-14 pt-32">
          <Reveal variant="blur">
            <p className="section-label">Service</p>
            <h1 className="mt-3 font-display text-4xl text-white md:text-6xl">
              {service.title}
            </h1>
          </Reveal>
        </div>
      </section>
      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <Reveal variant="left">
            <p className="prose-muted">{service.longDesc}</p>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              {[
                "Personalized consultation and space assessment",
                "Material and finish guidance aligned to your lifestyle",
                "Coordinated execution with quality checks at each stage",
                "Clear communication from design through handover",
              ].map((item, i) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-line/60 py-3 transition hover:border-gold/40 hover:text-ink"
                >
                  <span className="font-display text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <aside className="premium-card sticky top-28 p-8">
              <h2 className="font-display text-2xl">Interested in this service?</h2>
              <p className="mt-3 text-sm text-muted">
                Tell us about your project and we&apos;ll prepare a thoughtful next
                step — no pressure, just clarity.
              </p>
              <div className="mt-6">
                <ButtonLink
                  href={`/contact?service=${service.slug}`}
                  variant="primary"
                  className="btn-shine w-full"
                >
                  Get a Quote
                </ButtonLink>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
