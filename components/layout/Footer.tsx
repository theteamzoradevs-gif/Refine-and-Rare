import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getSettings } from "@/lib/data";
import { NAV_LINKS, parseHours, whatsappUrl } from "@/lib/constants";

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

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.5 2 2 6.5 2 12.04c0 1.77.46 3.45 1.34 4.95L2 22l5.14-1.35A10.02 10.02 0 0 0 12.04 22C17.58 22 22 17.5 22 11.96 22 6.5 17.58 2 12.04 2zm0 18.15h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.15.66.68-3.14-.2-.32a8.28 8.28 0 0 1-1.27-4.39c0-4.58 3.73-8.3 8.32-8.3a8.27 8.27 0 0 1 8.3 8.3c0 4.58-3.73 8.31-8.3 8.31z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
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

function ContactLink({
  href,
  label,
  icon,
  external,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="group flex items-start gap-3 text-cream/80 transition hover:text-gold"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gold transition group-hover:border-gold/40">
        {icon}
      </span>
      <span className="pt-0.5 text-sm leading-snug">{label}</span>
    </a>
  );
}

const DAY_LABELS: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export async function Footer() {
  const settings = await getSettings();
  const hours = parseHours(settings.hoursJson);
  const iconClass = "h-3.5 w-3.5";

  return (
    <footer className="border-t border-white/10 bg-ink text-cream">
      <div className="container-site py-12 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.png"
                alt="Refine & Rare"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <div className="min-w-0">
                <div className="font-display text-xl leading-tight">
                  {settings.businessName}
                </div>
                <div className="mt-0.5 text-[11px] leading-snug text-cream/55">
                  Interior Design & Renovation
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
              Transforming Bengaluru interiors with smart design, premium
              modular kitchens, and complete renovation solutions.
            </p>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Explore
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/80">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <ContactLink
                  href={`mailto:${settings.email}`}
                  label={settings.email}
                  icon={<IconMail className={iconClass} />}
                />
              </li>
              <li>
                <ContactLink
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  label={settings.phone}
                  icon={<IconPhone className={iconClass} />}
                />
              </li>
              <li>
                <ContactLink
                  href={whatsappUrl(settings.whatsapp, settings.whatsappMessage)}
                  label="WhatsApp"
                  icon={<IconWhatsApp className={iconClass} />}
                  external
                />
              </li>
              <li>
                <ContactLink
                  href={
                    settings.instagram ||
                    "https://www.instagram.com/refineandrare"
                  }
                  label="@refineandrare"
                  icon={<IconInstagram className={iconClass} />}
                  external
                />
              </li>
              <li className="flex items-start gap-3 text-cream/60">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gold/80">
                  <IconPin className={iconClass} />
                </span>
                <span className="pt-0.5 text-sm leading-snug">
                  {settings.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Business Hours
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {Object.entries(hours).map(([day, value]) => (
                <li
                  key={day}
                  className="grid grid-cols-[2.75rem_1fr] items-baseline gap-3"
                >
                  <span className="text-cream/45">
                    {DAY_LABELS[day] || day.slice(0, 3)}
                  </span>
                  <span className="text-cream/80">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-cream/45 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {settings.businessName}. All rights
            reserved.
          </p>
          <p className="text-cream/35">Bengaluru, Karnataka</p>
        </div>
      </div>
    </footer>
  );
}
