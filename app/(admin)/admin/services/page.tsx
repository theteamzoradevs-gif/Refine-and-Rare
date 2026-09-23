import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteService } from "@/app/actions/admin";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  if (!isDatabaseEnabled()) return null;

  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell
      title="Services"
      description="Offerings that appear on the homepage and services pages."
    >
      <div className="mb-6 flex justify-end">
        <Link href="/admin/services/new" className="btn-primary">
          Add service
        </Link>
      </div>
      <div className="grid gap-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="admin-card flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="min-w-0">
              <p className="font-display text-xl text-ink">{service.title}</p>
              <p className="mt-1 text-xs text-muted">/{service.slug}</p>
              <p className="mt-2 line-clamp-2 text-sm text-muted">
                {service.shortDesc}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/admin/services/${service.id}`}
                className="admin-link"
              >
                Edit
              </Link>
              <form action={deleteService}>
                <input type="hidden" name="id" value={service.id} />
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
