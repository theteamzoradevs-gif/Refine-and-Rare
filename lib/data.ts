import { prisma } from "./prisma";
import { cache } from "react";

export const getSettings = cache(async () => {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  if (!settings) {
    throw new Error("Site settings missing. Run npm run db:seed");
  }
  return settings;
});

export const getServices = cache(async () => {
  return prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
});

export const getFeaturedProjects = cache(async (take = 4) => {
  return prisma.project.findMany({
    where: { featured: true },
    include: { media: { orderBy: { sortOrder: "asc" } }, category: true },
    orderBy: { sortOrder: "asc" },
    take,
  });
});

export const getProjects = cache(async (categorySlug?: string) => {
  return prisma.project.findMany({
    where: categorySlug
      ? { category: { slug: categorySlug } }
      : undefined,
    include: { media: { orderBy: { sortOrder: "asc" } }, category: true },
    orderBy: { sortOrder: "asc" },
  });
});

export const getPublishedTestimonials = cache(async () => {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
});
