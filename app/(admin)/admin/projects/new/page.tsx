import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  if (!isDatabaseEnabled()) return null;

  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell
      title="Add project"
      description="Create a new gallery piece for the site."
    >
      <ProjectForm services={services} />
    </AdminShell>
  );
}
