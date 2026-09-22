import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!isDatabaseEnabled()) return null;

  const [pendingEnquiries, totalProjects, totalServices, totalTestimonials] =
    await Promise.all([
      prisma.enquiry.count({ where: { status: "PENDING" } }),
      prisma.project.count(),
      prisma.service.count(),
      prisma.testimonial.count({ where: { published: true } }),
    ]);

  const cards = [
    { label: "New enquiries", value: pendingEnquiries, href: "/admin/enquiries" },
    { label: "Projects in gallery", value: totalProjects, href: "/admin/projects" },
    { label: "Services", value: totalServices, href: "/admin/services" },
    { label: "Testimonials", value: totalTestimonials, href: "/admin/testimonials" },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-line bg-white p-6 transition hover:border-teal"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {card.label}
            </p>
            <p className="mt-3 font-display text-4xl text-ink">{card.value}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
