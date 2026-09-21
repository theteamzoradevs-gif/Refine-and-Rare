import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const services = await prisma.service.findMany({ select: { slug: true, updatedAt: true } });

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/gallery",
    "/testimonials",
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

  return [...staticRoutes, ...serviceRoutes];
}
