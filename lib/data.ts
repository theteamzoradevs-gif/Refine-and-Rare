import { cache } from "react";
import { isDatabaseEnabled } from "./database";
import { prisma } from "./prisma";
import {
  getStaticServiceBySlug,
  staticProjects,
  staticServices,
  staticSettings,
  staticTestimonials,
} from "./staticContent";

export const getSettings = cache(async () => {
  if (!isDatabaseEnabled()) return staticSettings;

  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  if (!settings) {
    throw new Error("Site settings missing. Run npm run db:seed");
  }
  return settings;
});

export const getServices = cache(async () => {
  if (!isDatabaseEnabled()) return staticServices;
  return prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
});

export const getServiceBySlug = cache(async (slug: string) => {
  if (!isDatabaseEnabled()) return getStaticServiceBySlug(slug);
  return prisma.service.findUnique({ where: { slug } });
});

export const getFeaturedProjects = cache(async (take = 4) => {
  if (!isDatabaseEnabled()) {
    return staticProjects.filter((p) => p.featured).slice(0, take);
  }
  return prisma.project.findMany({
    where: { featured: true },
    include: { media: { orderBy: { sortOrder: "asc" } }, category: true },
    orderBy: { sortOrder: "asc" },
    take,
  });
});

export const getProjects = cache(async (categorySlug?: string) => {
  if (!isDatabaseEnabled()) {
    if (!categorySlug) return staticProjects;
    return staticProjects.filter((p) => p.category.slug === categorySlug);
  }
  return prisma.project.findMany({
    where: categorySlug
      ? { category: { slug: categorySlug } }
      : undefined,
    include: { media: { orderBy: { sortOrder: "asc" } }, category: true },
    orderBy: { sortOrder: "asc" },
  });
});

export const getPublishedTestimonials = cache(async () => {
  if (!isDatabaseEnabled()) {
    return staticTestimonials.filter((t) => t.published);
  }
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
});
