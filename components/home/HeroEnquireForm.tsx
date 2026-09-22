"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitChatEnquiry } from "@/app/actions/enquiry";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full border-0 border-b border-white/25 bg-transparent px-0 py-2 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-gold";

export function HeroEnquireForm({ className }: { className?: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    startTransition(async () => {
      const result = await submitChatEnquiry({
        name,
        phone,
        interest: "Free consultation — hero form",
        note: "Requested a callback from the homepage hero.",
      });
      if (result.ok) {
        setSuccess(true);
      } else {
        setError(result.error);
      }
    });
  }

  const shell = cn(
    "relative w-full max-w-[20.5rem] overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:max-w-[22rem] sm:p-5",
    "before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/70 before:to-transparent",
    "after:pointer-events-none after:absolute after:-right-12 after:-top-12 after:h-28 after:w-28 after:rounded-full after:bg-gold/10 after:blur-3xl",
    className
  );

  if (success) {
    return (
      <div className={shell}>
        <div className="relative text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
            Confirmed
          </p>
          <p className="mt-2 font-display text-xl text-white sm:text-2xl">
            You&apos;re booked in
          </p>
          <p className="mx-auto mt-2 max-w-[15rem] text-xs leading-relaxed text-white/70">
            Our team will call you shortly to plan your free consultation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={shell}>
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-gold/80" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">
            Free consultation
          </p>
        </div>
        <h2 className="mt-2 font-display text-xl leading-tight text-white sm:text-[1.35rem]">
          Talk to our team
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-white/65">
          Enter your details.
        </p>

        <div className="mt-5 space-y-3.5">
          <label className="block">
            <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Name
            </span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Phone
            </span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 …"
              className={fieldClass}
            />
          </label>
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-300">{error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group relative mt-5 flex w-full items-center justify-center overflow-hidden rounded-xl bg-gold px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-gold-light disabled:opacity-70"
        >
          <span className="relative z-10">
            {pending ? "Sending…" : "Book Free Consultation"}
          </span>
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition duration-700 group-hover:translate-x-full" />
        </button>

      
      </div>
    </form>
  );
}
