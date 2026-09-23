import { redirect } from "next/navigation";
import { destroySession, requireAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

async function logoutAction() {
  "use server";
  await destroySession();
  redirect("/admin/login");
}

export async function AdminShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="admin-scope min-h-screen md:grid md:grid-cols-[260px_1fr]">
      <AdminSidebar email={admin.email} logoutAction={logoutAction} />
      <div className="relative min-w-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(197,178,138,0.16),transparent_42%),radial-gradient(circle_at_90%_10%,rgba(27,58,47,0.08),transparent_35%),linear-gradient(180deg,#F5F0E6_0%,#EDE6D8_100%)]" />
        <div className="relative">
          <header className="border-b border-line/60 bg-cream/55 px-5 py-6 backdrop-blur-md md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
              Admin
            </p>
            <h1 className="mt-1 font-display text-3xl text-ink md:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              {description || `Signed in as ${admin.email}`}
            </p>
          </header>
          <div className="px-5 py-7 md:px-8 md:py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
