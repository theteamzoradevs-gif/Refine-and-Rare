"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  imageUrl: string;
};

export function ServicesOverview({ services }: { services: Service[] }) {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="container-site relative">
        <Reveal>
          <p className="section-label">Our Services</p>
          <h2 className="heading-display mt-3 max-w-2xl">
            Everything under one roof —{" "}
            <span className="text-teal">design to turnkey execution.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 70}>
              <article className="group flex h-full flex-col overflow-hidden border border-line bg-white transition hover:border-teal/40">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.shortDesc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-teal hover:text-gold"
                    >
                      Explore →
                    </Link>
                    <Link
                      href={`/contact?service=${service.slug}`}
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 hover:text-teal"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
