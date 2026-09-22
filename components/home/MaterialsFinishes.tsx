"use client";

import Image from "next/image";
import { MATERIAL_FINISHES } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function MaterialsFinishes() {
  return (
    <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
      <div className="container-site relative">
        <Reveal>
          <p className="section-label">Material & Finishes</p>
          <TextReveal
            text="Where Materials Become Design."
            className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink md:text-5xl"
          />
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Every material has a role. Every finish has a purpose.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3">
          {MATERIAL_FINISHES.map((material, i) => (
            <Reveal key={material.title} delay={i * 50} variant="scale">
              <article className="premium-card group relative aspect-[4/3]">
                <Image
                  src={material.imageUrl}
                  alt={material.title}
                  fill
                  className="object-cover transition duration-1000 ease-premium group-hover:scale-110"
                  sizes="(max-width:768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent transition duration-500 group-hover:from-ink/90" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-sm text-white transition group-hover:text-gold sm:text-lg md:text-xl">
                    {material.title}
                  </h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
