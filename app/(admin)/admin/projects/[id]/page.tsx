import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isDatabaseEnabled()) return null;

  const [project, services] = await Promise.all([
    prisma.project.findUnique({
      where: { id: params.id },
      include: { media: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!project) notFound();

  return (
    <AdminShell
      title="Edit project"
      description="Update gallery media, category, and homepage feature."
    >
      <ProjectForm
        services={services}
        initial={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          description: project.description,
          categoryId: project.categoryId,
          sortOrder: project.sortOrder,
          featured: project.featured,
          media: project.media.map((m) => ({
            url: m.url,
            type: m.type,
            alt: m.alt,
          })),
        }}
      />
    </AdminShell>
  );
}
