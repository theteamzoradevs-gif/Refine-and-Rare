"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SearchItem = {
  type: "service" | "project";
  title: string;
  description: string;
  href: string;
};

export function HeaderSearch({
  items,
  scrolled,
}: {
  items: SearchItem[];
  scrolled: boolean;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [items, q]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div ref={wrapRef} className="relative hidden md:block">
      <form onSubmit={onSubmit}>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search projects & services"
          className={cn(
            "h-9 w-44 rounded-full border px-3 text-xs outline-none transition focus:w-56 lg:w-52 lg:focus:w-64",
            scrolled
              ? "border-line bg-white/90 text-ink placeholder:text-muted"
              : "border-white/25 bg-white/10 text-white placeholder:text-white/60"
          )}
          aria-label="Search projects and services"
        />
      </form>
      {open && results.length > 0 && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-[60] w-72 overflow-hidden rounded-xl border border-line bg-cream shadow-xl">
          <ul className="max-h-72 overflow-y-auto py-1">
            {results.map((item) => (
              <li key={item.href + item.title}>
                <Link
                  href={item.href}
                  onClick={() => {
                    setOpen(false);
                    setQ("");
                  }}
                  className="block px-3 py-2.5 hover:bg-white"
                >
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gold">
                    {item.type === "service" ? "Service" : "Project"}
                  </p>
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <p className="line-clamp-1 text-xs text-muted">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              router.push(`/search?q=${encodeURIComponent(q.trim())}`);
            }}
            className="w-full border-t border-line bg-white px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.12em] text-teal"
          >
            View all results
          </button>
        </div>
      )}
    </div>
  );
}
