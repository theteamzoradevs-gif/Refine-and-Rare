import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getServices, getSettings } from "@/lib/data";
import { telUrl } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact / Enquire",
  description:
    "Enquire with Refine & Rare for interior design, modular kitchens, and renovations in Bengaluru.",
};

function IconMail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path
        d="M6.6 3.8l2.2 2.2a1.2 1.2 0 0 1 0 1.7l-1.1 1.1a12.5 12.5 0 0 0 5.5 5.5l1.1-1.1a1.2 1.2 0 0 1 1.7 0l2.2 2.2a1.2 1.2 0 0 1 0 1.7l-1.3 1.3c-.7.7-1.7 1-2.7.8A16.5 16.5 0 0 1 3.7 7.3c-.2-1 .1-2 .8-2.7L5 3.8a1.2 1.2 0 0 1 1.6 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const [settings, services] = await Promise.all([
    getSettings(),
    getServices(),
  ]);

  const iconClass = "h-4 w-4";

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_70%_30%,rgba(197,178,138,0.16),transparent_40%)]" />
        <div className="container-site relative">
          <Reveal variant="blur">
            <p className="section-label">Contact</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-6xl">
              Let&apos;s design your{" "}
              <span className="gold-shimmer">next space.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-cream/70">
              Share a few details and we&apos;ll follow up with a thoughtful
              consultation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site">
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-4 transition hover:border-gold/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <IconMail className={iconClass} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Email
                </span>
                <span className="mt-0.5 block truncate text-sm text-ink">
                  {settings.email}
                </span>
              </span>
            </a>
            <a
              href={telUrl(settings.phone)}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-4 transition hover:border-gold/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <IconPhone className={iconClass} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Phone
                </span>
                <span className="mt-0.5 block text-sm text-ink">
                  {settings.phone}
                </span>
              </span>
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <IconPin className={iconClass} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Location
                </span>
                <span className="mt-0.5 block text-sm text-ink">
                  {settings.address}
                </span>
              </span>
            </div>
          </div>

          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <Reveal variant="left" className="h-full">
              <div className="premium-card flex h-full min-h-[520px] flex-col p-6 md:p-8">
                <h2 className="font-display text-3xl">Send a message</h2>
                <p className="mt-2 text-sm text-muted">
                  We typically respond within one business day.
                </p>
                <div className="mt-6 flex-1">
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

            <Reveal variant="right" delay={100} className="h-full">
              <div className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-line bg-ink text-cream">
                <div className="p-6 md:p-8">
                  <h2 className="font-display text-3xl">Find us</h2>
                  <p className="mt-2 text-sm text-cream/70">
                    Serving residential interiors across Bengaluru. Site visits
                    can be arranged after your initial message.
                  </p>
                </div>
                <div className="relative min-h-[280px] flex-1 bg-ink-2">
                  <iframe
                    title="Bengaluru map"
                    src="https://maps.google.com/maps?q=Bengaluru%2C%20Karnataka&t=&z=11&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 h-full w-full border-0 grayscale contrast-125"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
