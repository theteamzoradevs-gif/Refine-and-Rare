"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { HeaderSearch, type SearchItem } from "./HeaderSearch";

export function Header({ searchItems = [] }: { searchItems?: SearchItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileQ, setMobileQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/60 bg-cream/95 shadow-sm backdrop-blur"
          : "bg-transparent"
      )}
    >
      <div className="container-site flex h-20 items-center justify-between gap-3">
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo.png"
            alt="Refine & Rare"
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
            priority
          />
          <div className="leading-tight">
            <div
              className={cn(
                "font-display text-lg tracking-wide",
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition hover:text-gold",
                scrolled ? "text-ink/80" : "text-white/90"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderSearch items={searchItems} scrolled={scrolled} />
          <Link
            href="/contact"
            className={cn(
              "hidden items-center bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-gold-dark hover:text-white lg:inline-flex"
            )}
          >
            Enquire Now
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center border xl:hidden",
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
          <div className="container-site space-y-3 py-4">
            <form
              action="/search"
              className="flex gap-2"
              onSubmit={() => setOpen(false)}
            >
              <input
                name="q"
                value={mobileQ}
                onChange={(e) => setMobileQ(e.target.value)}
                placeholder="Search projects & services"
                className="min-w-0 flex-1 border border-line bg-white px-3 py-2 text-sm outline-none focus:border-teal"
              />
              <button type="submit" className="bg-teal px-3 text-xs font-semibold uppercase tracking-wider text-white">
                Go
              </button>
            </form>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-sm text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-primary mt-2 text-center"
                onClick={() => setOpen(false)}
              >
                Enquire Now
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
