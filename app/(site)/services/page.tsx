import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Interior design, modular kitchens, renovation, painting, electrical, plumbing, POP ceilings, and turnkey execution in Bengaluru.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="bg-ink pb-14 pt-32 text-cream">
        <div className="container-site">
          <p className="section-label">Services</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-5xl lg:text-6xl">
            Complete interior solutions, thoughtfully delivered.
          </h1>
          <p className="mt-5 max-w-2xl text-cream/70">
            Clear offerings, clear next steps — explore a service and enquire when ready.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 60}>
              <article className="flex h-full flex-col overflow-hidden border border-line bg-white">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                    0{i + 1}
                  </p>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">
                    {service.longDesc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <ButtonLink
                      href={`/contact?service=${service.slug}`}
                      variant="primary"
                    >
                      Get a Quote
                    </ButtonLink>
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn-outline"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
