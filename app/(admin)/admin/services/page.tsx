import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteService } from "@/app/actions/admin";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  if (!isDatabaseEnabled()) return null;

  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <AdminShell title="Services">
      <div className="mb-6 flex justify-end">
        <Link href="/admin/services/new" className="btn-primary">
          Add service
        </Link>
      </div>
      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col gap-3 border border-line bg-white p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-medium">{service.title}</p>
              <p className="text-xs text-muted">/{service.slug}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/services/${service.id}`}
                className="text-sm text-teal hover:underline"
              >
                Edit
              </Link>
              <form action={deleteService}>
                <input type="hidden" name="id" value={service.id} />
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
