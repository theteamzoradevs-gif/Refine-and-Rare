"use client";

import Image from "next/image";
import { useEffect, useState, useTransition, type FormEvent } from "react";
import { submitChatEnquiry } from "@/app/actions/enquiry";
import { telUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "rr_lead_popup_dismissed";

export function LeadPopup({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    const timer = window.setTimeout(() => setOpen(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const number = String(data.get("phone") || "").trim();

    startTransition(async () => {
      const result = await submitChatEnquiry({
        name,
        phone: number,
        interest: "Free design consultation — popup",
        note: "Lead captured from homepage popup (name + number).",
      });
      if (result.ok) {
        setSuccess(true);
        window.setTimeout(dismiss, 1800);
      } else {
        setError(result.error);
      }
    });
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/65 backdrop-blur-[2px]"
        aria-label="Close popup"
        onClick={dismiss}
      />

      <div className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-[0_40px_100px_-40px_rgba(28,36,33,0.7)] md:grid-cols-2">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink shadow-md transition hover:bg-cream md:bg-ink/40 md:text-white md:hover:bg-ink/70"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Left visual */}
        <div className="relative hidden min-h-[22rem] md:block md:min-h-[28rem]">
          <Image
            src="/brand/services/LuxuryLivingSpaces.png"
            alt="Refine & Rare interiors"
            fill
            className="object-cover"
            sizes="(max-width:768px) 0vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
          <div className="absolute inset-0 flex flex-col justify-between p-7 text-cream">
            <span className="inline-flex w-fit rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
              Premium design experience
            </span>
            <div>
              <h2 className="font-display text-3xl leading-tight xl:text-4xl">
                End-to-End Turnkey Interiors
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/80">
                Thoughtful design, refined materials, and complete execution —
                without the coordination stress.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 rounded-xl bg-ink/50 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-cream/90 backdrop-blur-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Check /> 3D design preview
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check /> Quality finishes
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check /> End-to-end delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="relative flex flex-col justify-center bg-cream px-6 py-8 sm:px-8 md:px-9 md:py-10">
          {success ? (
            <div className="text-center">
              <p className="font-display text-3xl text-ink">Thank you</p>
              <p className="mt-3 text-sm text-muted">
                We&apos;ve received your enquiry and will call you shortly.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
                Free consultation
              </p>
              <h2
                id="lead-popup-title"
                className="mt-2 font-display text-3xl text-ink md:text-[2rem]"
              >
                Get a free design consultation
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Share your name and number — our team will get in touch.
              </p>

              <form onSubmit={onSubmit} className="mt-7 space-y-4">
                <div>
                  <label
                    htmlFor="lead-name"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/50 focus:border-teal focus:ring-4 focus:ring-teal/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lead-phone"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    Number
                  </label>
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 ..."
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/50 focus:border-teal focus:ring-4 focus:ring-teal/10"
                  />
                </div>

                {error ? (
                  <p className="text-sm text-red-700">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={pending}
                  className={cn(
                    "w-full rounded-xl bg-gold px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-gold-dark hover:text-white disabled:opacity-70"
                  )}
                >
                  {pending ? "Sending…" : "Enquire Now"}
                </button>
              </form>

              <div className="relative my-5 text-center">
                <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
                <span className="relative bg-cream px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Or
                </span>
              </div>

              <a
                href={telUrl(phone)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-ink"
              >
                <PhoneIcon />
                Call Now
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-gold" fill="none" aria-hidden>
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.46a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
