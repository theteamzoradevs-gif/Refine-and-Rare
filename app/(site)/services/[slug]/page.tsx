import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjects,
  getPublishedTestimonials,
  getServiceBySlug,
} from "@/lib/data";
import { staticServices } from "@/lib/staticContent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MediaCarousel } from "@/components/ui/MediaCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialHighlight } from "@/components/home/TestimonialHighlight";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return staticServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.shortDesc,
  };
}

const expectations = [
  "Personalized consultation and space assessment",
  "Material and finish guidance aligned to your lifestyle",
  "Coordinated execution with quality checks at each stage",
  "Clear communication from design through handover",
];

export default async function ServiceDetailPage({ params }: Props) {
  const [service, testimonials, relatedProjects] = await Promise.all([
    getServiceBySlug(params.slug),
    getPublishedTestimonials(),
    getProjects(params.slug),
  ]);
  if (!service) notFound();

  const gallery = [
    {
      id: `service-${service.id}`,
      url: service.imageUrl,
      type: "IMAGE" as const,
      alt: service.title,
    },
    ...relatedProjects.flatMap((project) =>
      project.media.map((m) => ({
        id: m.id,
        url: m.url,
        type: m.type as "IMAGE" | "VIDEO",
        alt: m.alt || project.title,
      }))
    ),
  ].filter(
    (item, index, arr) => arr.findIndex((x) => x.url === item.url) === index
  );

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-cream md:pb-16">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background:radial-gradient(circle_at_75%_20%,rgba(197,178,138,0.2),transparent_40%),radial-gradient(circle_at_15%_85%,rgba(42,83,68,0.35),transparent_45%)]" />
        <div className="container-site relative">
          <Reveal variant="blur">
            <Link
              href="/services"
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold/90 transition hover:text-gold"
            >
              ← All services
            </Link>
            <p className="section-label mt-5">Service</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-cream md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
              {service.shortDesc}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_10%_15%,rgba(197,178,138,0.14),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(27,58,47,0.08),transparent_40%)]" />

        <div className="container-site relative max-w-4xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              What you can expect
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              {service.longDesc}
            </p>
          </Reveal>

          <Reveal delay={100} variant="scale">
            <div className="mt-10 md:mt-12">
              <MediaCarousel items={gallery} title={service.title} />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12">
              {expectations.map((item, i) => (
                <li
                  key={item}
                  className="group flex gap-4 rounded-2xl border border-line/80 bg-white/90 p-5 shadow-[0_14px_40px_-30px_rgba(28,36,33,0.35)] transition duration-300 hover:-translate-y-0.5 hover:border-gold/45"
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
        </div>

        <div className="container-site relative mt-12">
          <Reveal delay={80}>
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-ink p-7 text-cream sm:p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_90%_10%,rgba(197,178,138,0.22),transparent_40%)]" />
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Next step
                </p>
                <h2 className="mt-3 font-display text-2xl leading-tight md:text-4xl">
                  Interested in {service.title.toLowerCase()}?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/70 md:text-base">
                  Tell us about your project and we&apos;ll prepare a thoughtful
                  next step — no pressure, just clarity.
                </p>
                <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink
                    href={`/contact?service=${service.slug}`}
                    variant="gold"
                    className="btn-shine w-full justify-center px-6 py-3.5 sm:w-auto sm:min-w-[11rem]"
                  >
                    Get a Quote
                  </ButtonLink>
                  <ButtonLink
                    href="/projects"
                    variant="secondary"
                    className="btn-shine w-full justify-center border-white/35 bg-transparent px-6 py-3.5 text-cream hover:border-white hover:bg-white hover:text-ink sm:w-auto sm:min-w-[11rem]"
                  >
                    View Projects
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TestimonialHighlight testimonials={testimonials} variant="static" />
      <FaqSection title="Questions about this service" />
      <CtaBanner />
    </>
  );
}
