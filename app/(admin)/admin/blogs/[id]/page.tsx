import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlogForm } from "@/components/admin/BlogForm";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isDatabaseEnabled()) return null;

  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
  });
  if (!post) notFound();

  return (
    <AdminShell
      title="Edit blog post"
      description="Update content, cover, and publish settings."
    >
      <BlogForm initial={post} />
    </AdminShell>
  );
}
