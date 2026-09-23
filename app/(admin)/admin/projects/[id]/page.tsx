import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { saveProject } from "@/app/actions/admin";
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
      <form action={saveProject} className="admin-panel w-full space-y-5">
        <input type="hidden" name="id" value={project.id} />
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="admin-label">Title</label>
            <input name="title" required defaultValue={project.title} />
          </div>
          <div>
            <label className="admin-label">Slug</label>
            <input name="slug" required defaultValue={project.slug} />
          </div>
        </div>
        <div>
          <label className="admin-label">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={project.description}
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="admin-label">Service category</label>
            <select name="categoryId" required defaultValue={project.categoryId}>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="admin-label">Sort order</label>
            <input
              name="sortOrder"
              type="number"
              defaultValue={project.sortOrder}
            />
          </div>
        </div>
        <label className="flex items-center gap-2.5 text-sm text-ink">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project.featured}
          />
          Feature on homepage
        </label>
        <MediaUploader
          initial={project.media.map((m) => ({
            url: m.url,
            type: m.type,
            alt: m.alt,
          }))}
        />
        <button type="submit" className="btn-primary">
          Update project
        </button>
      </form>
    </AdminShell>
  );
}
