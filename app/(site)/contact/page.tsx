import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getServices, getSettings } from "@/lib/data";
import { parseHours, whatsappUrl, telUrl } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact / Enquire",
  description:
    "Enquire with Refine & Rare for interior design, modular kitchens, and renovations in Bengaluru.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const [settings, services] = await Promise.all([
    getSettings(),
    getServices(),
  ]);
  const hours = parseHours(settings.hoursJson);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_70%_30%,rgba(201,166,107,0.16),transparent_40%)]" />
        <div className="container-site relative">
          <Reveal variant="blur">
            <p className="section-label">Contact</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-6xl">
              Let&apos;s design your{" "}
              <span className="gold-shimmer">next space.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-cream/70">
              Share a few details and we&apos;ll follow up with a thoughtful
              consultation. Prefer WhatsApp? We&apos;re a message away.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal variant="left">
            <div className="premium-card p-6 md:p-10">
              <h2 className="font-display text-3xl">Send an enquiry</h2>
              <p className="mt-2 text-sm text-muted">
                We typically respond within one business day.
              </p>
              <div className="mt-8">
                <EnquiryForm
                  services={services.map((s) => ({
                    id: s.id,
                    title: s.title,
                    slug: s.slug,
                  }))}
                  defaultServiceSlug={searchParams?.service}
                />
              </div>
            </div>
          </Reveal>

          <aside className="space-y-5">
            <Reveal variant="right" delay={80}>
              <div className="premium-card p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Direct Contact
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-ink">
                  <li>
                    <a
                      href={`mailto:${settings.email}`}
                      className="hover:text-teal"
                    >
                      {settings.email}
                    </a>
                  </li>
                  <li>
                    <a href={telUrl(settings.phone)} className="hover:text-teal">
                      {settings.phone}
                    </a>
                  </li>
                  <li>{settings.address}</li>
                </ul>
                <a
                  href={whatsappUrl(settings.whatsapp, settings.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-shine mt-6 w-full"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal variant="right" delay={140}>
              <div className="premium-card p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Business Hours
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {Object.entries(hours).map(([day, value]) => (
                    <li
                      key={day}
                      className="flex justify-between gap-4 capitalize text-muted"
                    >
                      <span className="text-ink">{day}</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal variant="right" delay={200}>
              <div className="overflow-hidden border border-line bg-ink p-6 text-cream transition duration-500 hover:-translate-y-1">
                <h3 className="font-display text-2xl">Bengaluru</h3>
                <p className="mt-2 text-sm text-cream/70">
                  Serving residential and commercial interiors across Bengaluru.
                  Site visits can be arranged after your initial enquiry.
                </p>
                <div className="mt-5 aspect-video overflow-hidden bg-ink-2">
                  <iframe
                    title="Bengaluru map"
                    src="https://maps.google.com/maps?q=Bengaluru%2C%20Karnataka&t=&z=11&ie=UTF8&iwloc=&output=embed"
                    className="h-full w-full border-0 grayscale contrast-125"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
