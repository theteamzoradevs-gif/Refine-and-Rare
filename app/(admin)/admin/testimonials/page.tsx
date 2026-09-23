import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteTestimonial } from "@/app/actions/admin";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  if (!isDatabaseEnabled()) return null;

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell
      title="Testimonials"
      description="Client voices shown across the site."
    >
      <div className="mb-6 flex justify-end">
        <Link href="/admin/testimonials/new" className="btn-primary">
          Add testimonial
        </Link>
      </div>
      <div className="grid gap-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="admin-card flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-display text-xl text-ink">{t.name}</p>
                <span
                  className={
                    t.published ? "admin-badge-teal" : "admin-badge-gold"
                  }
                >
                  {t.published ? "Published" : "Hidden"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                “{t.quote}”
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="admin-link"
              >
                Edit
              </Link>
              <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" className="admin-danger">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
