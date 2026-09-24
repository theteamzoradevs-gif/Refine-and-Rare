import { AdminShell } from "@/components/admin/AdminShell";
import { BlogForm } from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default function NewBlogPage() {
  return (
    <AdminShell
      title="Add blog post"
      description="Write and publish a new article for the site."
    >
      <BlogForm />
    </AdminShell>
  );
}
