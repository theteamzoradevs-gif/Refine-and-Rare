import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const services = await prisma.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });
  if (!service) notFound();

  return (
    <>
      <section className="relative min-h-[55vh] overflow-hidden bg-ink">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="relative container-site flex min-h-[55vh] items-end pb-14 pt-32">
          <div>
            <p className="section-label">Service</p>
            <h1 className="mt-3 font-display text-4xl text-white md:text-6xl">
              {service.title}
            </h1>
          </div>
        </div>
      </section>
      <section className="bg-cream py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="prose-muted">{service.longDesc}</p>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li>• Personalized consultation and space assessment</li>
              <li>• Material and finish guidance aligned to your lifestyle</li>
              <li>• Coordinated execution with quality checks at each stage</li>
              <li>• Clear communication from design through handover</li>
            </ul>
          </div>
          <aside className="border border-line bg-white p-8">
            <h2 className="font-display text-2xl">Interested in this service?</h2>
            <p className="mt-3 text-sm text-muted">
              Tell us about your project and we&apos;ll prepare a thoughtful next
              step — no pressure, just clarity.
            </p>
            <div className="mt-6">
              <ButtonLink
                href={`/contact?service=${service.slug}`}
                variant="primary"
                className="w-full"
              >
                Get a Quote
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
