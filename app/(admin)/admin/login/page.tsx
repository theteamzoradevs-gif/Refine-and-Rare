import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,178,138,0.22),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(42,83,68,0.45),transparent_45%)]" />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-cream/95 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-sm md:p-10">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/20 blur-2xl" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Admin
        </p>
        <h1 className="mt-2 font-display text-4xl text-ink">Refine & Rare</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Sign in to manage projects, blogs, enquiries, and site content.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
