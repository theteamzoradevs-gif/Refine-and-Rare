import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/data";
import { NAV_LINKS, parseHours, whatsappUrl } from "@/lib/constants";

export async function Footer() {
  const settings = await getSettings();
  const hours = parseHours(settings.hoursJson);

  return (
    <footer className="border-t border-line bg-ink text-cream">
      <div className="container-site grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt="Refine & Rare"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <div>
              <div className="font-display text-xl">{settings.businessName}</div>
              <div className="text-xs text-cream-2/80">{settings.tagline}</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-cream/70">
            Transforming Bengaluru interiors with smart design, premium modular
            kitchens, and complete renovation solutions.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-cream/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-gold">
                {settings.email}
              </a>
            </li>
            <li>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                {settings.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(settings.whatsapp, settings.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                Instagram
              </a>
            </li>
            <li className="pt-1 text-cream/60">{settings.address}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Business Hours
          </h3>
          <ul className="space-y-1.5 text-sm text-cream/80">
            {Object.entries(hours).map(([day, value]) => (
              <li key={day} className="flex justify-between gap-4 capitalize">
                <span>{day}</span>
                <span className="text-cream/60">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
