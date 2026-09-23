import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!isDatabaseEnabled()) return null;

  const [
    pendingEnquiries,
    totalProjects,
    totalServices,
    totalBlogs,
    totalTestimonials,
  ] = await Promise.all([
    prisma.enquiry.count({ where: { status: "PENDING" } }),
    prisma.project.count(),
    prisma.service.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.testimonial.count({ where: { published: true } }),
  ]);

  const cards = [
    {
      label: "New enquiries",
      value: pendingEnquiries,
      href: "/admin/enquiries",
      hint: "Awaiting reply",
    },
    {
      label: "Projects",
      value: totalProjects,
      href: "/admin/projects",
      hint: "Gallery pieces",
    },
    {
      label: "Services",
      value: totalServices,
      href: "/admin/services",
      hint: "Offerings live",
    },
    {
      label: "Blog posts",
      value: totalBlogs,
      href: "/admin/blogs",
      hint: "Published",
    },
    {
      label: "Testimonials",
      value: totalTestimonials,
      href: "/admin/testimonials",
      hint: "On site",
    },
  ];

  return (
    <AdminShell
      title="Dashboard"
      description="A quiet overview of your studio content and new leads."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="admin-stat group">
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {card.label}
            </p>
            <p className="relative mt-3 font-display text-4xl text-ink transition group-hover:text-teal">
              {card.value}
            </p>
            <p className="relative mt-2 text-xs text-muted">{card.hint}</p>
          </Link>
        ))}
      </div>

      <div className="admin-panel mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
          Quick links
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/projects/new" className="btn-primary">
            Add project
          </Link>
          <Link href="/admin/blogs/new" className="btn-outline">
            Write blog
          </Link>
          <Link href="/admin/enquiries" className="btn-outline">
            Review enquiries
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
