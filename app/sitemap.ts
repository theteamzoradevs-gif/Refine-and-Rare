import type { MetadataRoute } from "next";
import { getProjectSlug, getProjects, getPublishedBlogs, getServices } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [services, blogs, projects] = await Promise.all([
    getServices(),
    getPublishedBlogs(),
    getProjects(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blogs",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${getProjectSlug(p)}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const blogRoutes = blogs.map((p) => ({
    url: `${base}/blogs/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
