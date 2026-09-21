import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteTestimonial } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell title="Testimonials">
      <div className="mb-6 flex justify-end">
        <Link href="/admin/testimonials/new" className="btn-primary">
          Add testimonial
        </Link>
      </div>
      <div className="space-y-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="border border-line bg-white p-4 md:flex md:items-start md:justify-between md:gap-6"
          >
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="mt-2 text-sm text-muted line-clamp-3">“{t.quote}”</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-teal">
                {t.published ? "Published" : "Hidden"}
              </p>
            </div>
            <div className="mt-3 flex gap-3 md:mt-0">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="text-sm text-teal hover:underline"
              >
                Edit
              </Link>
              <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" className="text-sm text-red-700 hover:underline">
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
