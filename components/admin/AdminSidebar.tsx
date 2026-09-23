"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <Icon>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </Icon>
    ),
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 4v5" />
      </Icon>
    ),
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: (
      <Icon>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </Icon>
    ),
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    icon: (
      <Icon>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </Icon>
    ),
  },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    icon: (
      <Icon>
        <path d="M7 8h5M7 12h3" />
        <path d="M5 5h10a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9l-4 3v-3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" />
      </Icon>
    ),
  },
  {
    href: "/admin/enquiries",
    label: "Enquiries",
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </Icon>
    ),
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2.2M12 18.8V21M4.9 6.3l1.6 1.6M17.5 16.1l1.6 1.6M3 12h2.2M18.8 12H21M4.9 17.7l1.6-1.6M17.5 7.9l1.6-1.6" />
      </Icon>
    ),
  },
];

export function AdminSidebar({
  email,
  logoutAction,
}: {
  email: string;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-ink via-ink to-teal-dark text-cream md:min-h-screen md:border-b-0 md:border-r md:border-white/10">
      <div className="pointer-events-none absolute -right-16 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-teal-light/30 blur-3xl" />

      <div className="relative px-5 py-7">
        <p className="font-display text-2xl tracking-tight">Refine & Rare</p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/90">
          Studio CMS
        </p>
        <p className="mt-4 truncate rounded-full bg-white/5 px-3 py-1.5 text-[11px] text-cream/55">
          {email}
        </p>
      </div>

      <nav className="relative flex gap-1 overflow-x-auto px-3 pb-5 md:flex-col md:gap-1">
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm transition duration-200 ${
                active
                  ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(197,178,138,0.35)]"
                  : "text-cream/70 hover:bg-white/8 hover:text-white"
              }`}
            >
              <span
                className={active ? "text-gold" : "text-cream/45"}
                aria-hidden
              >
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}

        <div className="mt-2 hidden h-px bg-white/10 md:mt-4 md:block" />

        <form action={logoutAction} className="mt-1 px-0 md:mt-2">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-cream/60 transition hover:bg-white/8 hover:text-white"
          >
            <Icon>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </Icon>
            Log out
          </button>
        </form>
        <Link
          href="/"
          className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-gold transition hover:bg-white/8"
          target="_blank"
        >
          <Icon>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
          </Icon>
          View live site
        </Link>
      </nav>
    </aside>
  );
}
