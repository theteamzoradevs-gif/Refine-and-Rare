import Link from "next/link";
import { redirect } from "next/navigation";
import { destroySession, requireAdmin } from "@/lib/auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/settings", label: "Settings" },
];

async function logoutAction() {
  "use server";
  await destroySession();
  redirect("/admin/login");
}

export async function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-line bg-ink text-cream md:min-h-screen md:border-b-0 md:border-r md:border-white/10">
        <div className="px-5 py-6">
          <p className="font-display text-xl">Refine & Rare</p>
          <p className="text-xs text-cream/60">Admin Panel</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded px-3 py-2 text-sm text-cream/80 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <form action={logoutAction} className="mt-2 px-1 md:mt-6">
            <button
              type="submit"
              className="w-full rounded px-3 py-2 text-left text-sm text-cream/70 hover:bg-white/10 hover:text-white"
            >
              Log out
            </button>
          </form>
          <Link
            href="/"
            className="mt-2 px-3 py-2 text-xs text-gold hover:underline"
            target="_blank"
          >
            View live site →
          </Link>
        </nav>
      </aside>
      <div>
        <header className="border-b border-line bg-cream/80 px-6 py-5 backdrop-blur">
          <h1 className="font-display text-2xl">{title}</h1>
          <p className="text-sm text-muted">Signed in as {admin.email}</p>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
