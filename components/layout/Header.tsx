"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, telUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavService = { slug: string; title: string };

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.46a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Header({
  services = [],
  phone,
  instagram,
}: {
  services?: NavService[];
  phone: string;
  instagram: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const linkClass = cn(
    "text-sm tracking-wide transition hover:text-gold",
    scrolled ? "text-ink/80" : "text-white/90"
  );

  const iconBtnClass = cn(
    "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
    scrolled
      ? "border-ink/15 text-ink hover:border-teal hover:text-teal"
      : "border-white/35 text-white hover:border-gold hover:text-gold"
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/60 bg-cream/95 shadow-sm backdrop-blur"
          : "bg-transparent"
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-3">
        <Link
          href="/"
          className="relative z-10 flex min-w-0 shrink items-center gap-2 sm:gap-3"
        >
          <Image
            src="/brand/logo.png"
            alt="Refine & Rare"
            width={48}
            height={48}
            className="h-9 w-9 shrink-0 object-contain sm:h-11 sm:w-11"
            priority
          />
          <div className="min-w-0">
            <div
              className={cn(
                "font-display text-base tracking-wide sm:text-lg",
                scrolled ? "text-ink" : "text-white"
              )}
            >
              Refine & Rare
            </div>
            <div
              className={cn(
                "hidden text-[10px] uppercase tracking-[0.18em] sm:block",
                scrolled ? "text-muted" : "text-white/70"
              )}
            >
              Interior Design & Renovation
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {NAV_LINKS.map((link) => {
            if (link.href === "/services") {
              return (
                <div key={link.href} className="relative" ref={servicesRef}>
                  <button
                    type="button"
                    className={cn(linkClass, "inline-flex items-center gap-1.5")}
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((v) => !v)}
                    onMouseEnter={() => setServicesOpen(true)}
                  >
                    {link.label}
                    <svg
                      viewBox="0 0 20 20"
                      className={cn(
                        "h-3.5 w-3.5 transition",
                        servicesOpen && "rotate-180"
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M5 7.5l5 5 5-5" strokeLinecap="round" />
                    </svg>
                  </button>
                  {servicesOpen && (
                    <div
                      className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-line/80 bg-cream py-2 shadow-[0_24px_50px_-28px_rgba(28,36,33,0.45)]"
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href="/services"
                        className="block px-4 py-2.5 text-sm font-semibold text-teal transition hover:bg-white"
                        onClick={() => setServicesOpen(false)}
                      >
                        All services
                      </Link>
                      <div className="mx-3 my-1 h-px bg-line/80" />
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block px-4 py-2.5 text-sm text-ink/80 transition hover:bg-white hover:text-teal"
                          onClick={() => setServicesOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href={telUrl(phone)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition sm:px-3.5",
              scrolled
                ? "border-ink/15 bg-white/80 text-ink hover:border-teal hover:text-teal"
                : "border-white/35 bg-white/10 text-white hover:border-gold hover:text-gold"
            )}
            aria-label="Call now"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Call Now</span>
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtnClass}
            aria-label="Instagram"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl border xl:hidden",
              scrolled
                ? "border-ink/20 text-ink"
                : "border-white/40 text-white"
            )}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-cream xl:hidden">
          <div className="container-site space-y-1 py-4">
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => {
                if (link.href === "/services") {
                  return (
                    <div key={link.href} className="border-b border-line/50 py-1">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-2 text-sm text-ink"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                      >
                        {link.label}
                        <span className="text-muted">
                          {mobileServicesOpen ? "−" : "+"}
                        </span>
                      </button>
                      {mobileServicesOpen && (
                        <div className="mb-2 space-y-1 rounded-xl bg-white/70 px-3 py-2">
                          <Link
                            href="/services"
                            className="block py-2 text-sm font-semibold text-teal"
                            onClick={() => setOpen(false)}
                          >
                            All services
                          </Link>
                          {services.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              className="block py-2 text-sm text-ink/80"
                              onClick={() => setOpen(false)}
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-b border-line/50 py-3 text-sm text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={telUrl(phone)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                  onClick={() => setOpen(false)}
                >
                  <PhoneIcon className="h-4 w-4" />
                  Call Now
                </a>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink"
                  onClick={() => setOpen(false)}
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
