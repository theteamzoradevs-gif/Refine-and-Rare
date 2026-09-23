import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteBlog } from "@/app/actions/admin";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  if (!isDatabaseEnabled()) return null;

  const posts = await prisma.blogPost.findMany({
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
  });

  return (
    <AdminShell
      title="Blogs"
      description="Studio notes and guides published on the website."
    >
      <div className="mb-6 flex justify-end">
        <Link href="/admin/blogs/new" className="btn-primary">
          Add blog post
        </Link>
      </div>
      <div className="grid gap-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="admin-card flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={
                    post.published ? "admin-badge-teal" : "admin-badge-gold"
                  }
                >
                  {post.published ? "Published" : "Draft"}
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                  {post.category}
                </span>
              </div>
              <p className="mt-2 font-display text-xl text-ink">{post.title}</p>
              <p className="mt-1 text-xs text-muted">/{post.slug}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link href={`/admin/blogs/${post.id}`} className="admin-link">
                Edit
              </Link>
              <form action={deleteBlog}>
                <input type="hidden" name="id" value={post.id} />
                <button type="submit" className="admin-danger">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {!posts.length && (
          <div className="admin-panel text-sm text-muted">No blog posts yet.</div>
        )}
      </div>
    </AdminShell>
  );
}
