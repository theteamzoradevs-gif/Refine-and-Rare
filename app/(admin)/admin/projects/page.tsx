import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteProject } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { category: true, media: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell title="Projects">
      <div className="mb-6 flex justify-end">
        <Link href="/admin/projects/new" className="btn-primary">
          Add project
        </Link>
      </div>
      <div className="overflow-x-auto border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-cream/60 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Media</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-line/70">
                <td className="px-4 py-3 font-medium">{project.title}</td>
                <td className="px-4 py-3">{project.category.title}</td>
                <td className="px-4 py-3">{project.media.length}</td>
                <td className="px-4 py-3">{project.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-teal hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={project.id} />
                      <button type="submit" className="text-red-700 hover:underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
