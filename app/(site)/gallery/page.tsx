import { redirect } from "next/navigation";

export default function GalleryRedirectPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const category = searchParams?.category;
  redirect(category ? `/projects?category=${encodeURIComponent(category)}` : "/projects");
}
