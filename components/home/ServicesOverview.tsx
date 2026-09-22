"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  imageUrl: string;
};

export function ServicesOverview({ services }: { services: Service[] }) {
  return (
    <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
      <div className="container-site relative">
        <Reveal>
          <p className="section-label">Signature Services</p>
          <TextReveal
            text="Complete Interior Solutions"
            className="mt-3 max-w-2xl font-display text-3xl leading-tight text-ink md:text-5xl"
          />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            From a single space to a complete home, we create interiors with a
            refined point of view.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const index = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={service.slug} delay={i * 70} variant="scale">
                <article className="premium-card group flex h-full flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover transition duration-1000 ease-premium group-hover:scale-110"
                      sizes="(max-width:768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60 transition group-hover:opacity-80" />
                    <p className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                      {index}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl transition group-hover:text-teal md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {service.shortDesc}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-teal transition group-hover:text-gold"
                    >
                      Explore →
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-8">
            <ButtonLink href="/services" variant="outline" className="btn-shine">
              View All Services →
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
