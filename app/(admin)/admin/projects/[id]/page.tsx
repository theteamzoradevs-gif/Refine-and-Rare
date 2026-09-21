import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { saveProject } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, services] = await Promise.all([
    prisma.project.findUnique({
      where: { id: params.id },
      include: { media: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!project) notFound();

  return (
    <AdminShell title="Edit project">
      <form action={saveProject} className="max-w-3xl space-y-4 border border-line bg-white p-6">
        <input type="hidden" name="id" value={project.id} />
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
            Title
          </label>
          <input
            name="title"
            required
            defaultValue={project.title}
            className="w-full border border-line px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={project.description}
            className="w-full border border-line px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
            Service category
          </label>
          <select
            name="categoryId"
            required
            defaultValue={project.categoryId}
            className="w-full border border-line px-3 py-2 text-sm"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
            Sort order
          </label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={project.sortOrder}
            className="w-full border border-line px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={project.featured} />
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
