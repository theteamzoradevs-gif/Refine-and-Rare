import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-md border border-white/10 bg-cream p-8">
        <p className="section-label">Admin</p>
        <h1 className="mt-2 font-display text-3xl">Refine & Rare</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to manage projects, enquiries, and site content.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
