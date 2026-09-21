import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { prisma } from "@/lib/prisma";

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) notFound();

  return (
    <AdminShell title="Edit service">
      <ServiceForm initial={service} />
    </AdminShell>
  );
}
