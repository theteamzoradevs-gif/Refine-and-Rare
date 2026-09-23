import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteProject } from "@/app/actions/admin";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  if (!isDatabaseEnabled()) return null;

  const projects = await prisma.project.findMany({
    include: { category: true, media: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell
      title="Projects"
      description="Curate gallery work shown across the homepage and projects page."
    >
      <div className="mb-6 flex justify-end">
        <Link href="/admin/projects/new" className="btn-primary">
          Add project
        </Link>
      </div>
      <div className="admin-table-wrap overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line/80 bg-cream/70 text-[11px] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-5 py-3.5">Title</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Media</th>
              <th className="px-5 py-3.5">Featured</th>
              <th className="px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-line/50 last:border-0 transition hover:bg-cream/40"
              >
                <td className="px-5 py-4 font-medium text-ink">
                  {project.title}
                </td>
                <td className="px-5 py-4 text-muted">{project.category.title}</td>
                <td className="px-5 py-4 text-muted">{project.media.length}</td>
                <td className="px-5 py-4">
                  {project.featured ? (
                    <span className="admin-badge-gold">Featured</span>
                  ) : (
                    <span className="text-xs text-muted">—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="admin-link"
                    >
                      Edit
                    </Link>
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={project.id} />
                      <button type="submit" className="admin-danger">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!projects.length && (
          <p className="px-5 py-8 text-sm text-muted">No projects yet.</p>
        )}
      </div>
    </AdminShell>
  );
}
