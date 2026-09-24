import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(197,178,138,0.22),transparent_38%),radial-gradient(circle_at_88%_80%,rgba(27,58,47,0.1),transparent_42%),linear-gradient(180deg,#F5F0E6_0%,#EDE6D8_100%)]" />

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden bg-ink text-cream lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-12">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_30%_20%,rgba(197,178,138,0.28),transparent_40%),radial-gradient(circle_at_80%_75%,rgba(42,83,68,0.45),transparent_45%)]" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.png"
                alt="Refine & Rare"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
                priority
              />
              <div>
                <p className="font-display text-2xl tracking-tight">
                  Refine &amp; Rare
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/90">
                  Studio CMS
                </p>
              </div>
            </div>
          </div>

          <div className="relative max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Admin access
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight xl:text-5xl">
              Manage your studio with calm clarity.
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-cream/65 xl:text-base">
              Update projects, services, blogs, testimonials, and enquiries —
              then publish them to the live site.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-cream/70">
              {[
                "Projects & gallery media",
                "Services and homepage content",
                "Enquiries from the contact form",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-[10px] text-gold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative text-xs text-cream/40">
            Secure sign-in for Refine &amp; Rare team members only.
          </p>
        </aside>

        {/* Form panel */}
        <div className="relative flex items-center justify-center px-5 py-12 sm:px-8 md:py-16">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <Image
                src="/brand/logo.png"
                alt="Refine & Rare"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
              <div>
                <p className="font-display text-xl text-ink">Refine &amp; Rare</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
                  Studio CMS
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line/70 bg-white/95 p-7 shadow-[0_24px_60px_-36px_rgba(28,36,33,0.45)] backdrop-blur-sm sm:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Welcome back
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Sign in
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Enter your admin credentials to continue.
              </p>

              <div className="mt-8">
                <LoginForm />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 text-sm">
              <Link
                href="/"
                className="text-muted transition hover:text-teal"
              >
                ← Back to site
              </Link>
              <span className="text-xs text-muted/70">Admin only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
