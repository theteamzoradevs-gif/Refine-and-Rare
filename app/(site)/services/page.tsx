import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full home interiors, luxury living spaces, modular kitchens, bespoke wardrobes, bedrooms, TV units, ceiling & lighting, and turnkey execution in Bengaluru.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_70%_20%,rgba(197,178,138,0.18),transparent_40%)]" />
        <div className="container-site relative">
          <Reveal variant="blur">
            <p className="section-label">Signature Services</p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-cream md:text-5xl lg:text-6xl">
              Complete Interior{" "}
              <span className="gold-shimmer">Solutions.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-cream/70">
              From a single space to a complete home, we create interiors with a
              refined point of view.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site space-y-6 md:space-y-8">
          {services.map((service, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal
                key={service.id}
                delay={i * 50}
                variant={reverse ? "right" : "left"}
              >
                <article className="premium-card group grid overflow-hidden md:grid-cols-2">
                  <div
                    className={`relative aspect-[16/11] md:aspect-auto md:min-h-[320px] ${
                      reverse ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover transition duration-1000 ease-premium group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-50 transition group-hover:opacity-70" />
                    <p className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <h2 className="font-display text-2xl transition group-hover:text-teal md:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                      {service.longDesc}
                    </p>
                    <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      <ButtonLink
                        href={`/contact?service=${service.slug}`}
                        variant="primary"
                        className="btn-shine w-full justify-center sm:w-auto"
                      >
                        Get a Quote
                      </ButtonLink>
                      <Link
                        href={`/services/${service.slug}`}
                        className="btn-outline w-full justify-center sm:w-auto"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
