import { cache } from "react";
import { isDatabaseEnabled } from "./database";
import { prisma } from "./prisma";
import { getProjectSlug } from "./projectSlug";
import {
  getStaticBlogBySlug,
  getStaticServiceBySlug,
  parseBlogBody,
  staticBlogPosts,
  staticProjects,
  staticServices,
  staticSettings,
  staticTestimonials,
} from "./staticContent";

export { getProjectSlug } from "./projectSlug";
export { parseBlogBody } from "./staticContent";

export type BlogPostView = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  imageUrl: string;
  category: string;
  published: boolean;
  publishedAt: Date;
  sortOrder: number;
  date: string;
};

function toBlogView(post: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  imageUrl: string;
  category: string;
  published: boolean;
  publishedAt: Date;
  sortOrder: number;
}): BlogPostView {
  return {
    ...post,
    body: parseBlogBody(post.body),
    date: post.publishedAt.toISOString().slice(0, 10),
  };
}

async function withDbFallback<T>(
  query: () => Promise<T>,
  fallback: () => T | Promise<T>
): Promise<T> {
  if (!isDatabaseEnabled()) return fallback();
  try {
    return await query();
  } catch (error) {
    console.warn("Database query failed — using static content.", error);
    return fallback();
  }
}

export const getSettings = cache(async () => {
  return withDbFallback(async () => {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });
    return settings ?? staticSettings;
  }, () => staticSettings);
});

export const getServices = cache(async () => {
  return withDbFallback(
    () => prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
    () => staticServices
  );
});

export const getServiceBySlug = cache(async (slug: string) => {
  return withDbFallback(
    () => prisma.service.findUnique({ where: { slug } }),
    () => getStaticServiceBySlug(slug)
  );
});

export const getFeaturedProjects = cache(async (take = 4) => {
  return withDbFallback(
    () =>
      prisma.project.findMany({
        where: {
          featured: true,
          slug: { not: "bespoke-wardrobe-suite" },
        },
        include: { media: { orderBy: { sortOrder: "asc" } }, category: true },
        orderBy: { sortOrder: "asc" },
        take,
      }),
    () =>
      staticProjects
        .filter((p) => p.featured)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .slice(0, take)
  );
});

export const getProjects = cache(async (categorySlug?: string) => {
  return withDbFallback(
    () =>
      prisma.project.findMany({
        where: categorySlug
          ? { category: { slug: categorySlug } }
          : undefined,
        include: { media: { orderBy: { sortOrder: "asc" } }, category: true },
        orderBy: { sortOrder: "asc" },
      }),
    () => {
      if (!categorySlug) return staticProjects;
      return staticProjects.filter((p) => p.category.slug === categorySlug);
    }
  );
});

export const getProjectBySlug = cache(async (slug: string) => {
  if (isDatabaseEnabled()) {
    try {
      const bySlug = await prisma.project.findUnique({
        where: { slug },
        include: { media: { orderBy: { sortOrder: "asc" } }, category: true },
      });
      if (bySlug) return bySlug;
    } catch (error) {
      console.warn("Database query failed — using static content.", error);
    }
  }

  const projects = await getProjects();
  return (
    projects.find((p) => getProjectSlug(p) === slug || p.id === slug) || null
  );
});

export const getPublishedTestimonials = cache(async () => {
  return withDbFallback(
    () =>
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      }),
    () => staticTestimonials.filter((t) => t.published)
  );
});

export const getPublishedBlogs = cache(async () => {
  return withDbFallback(
    async () => {
      const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
      });
      return posts.map(toBlogView);
    },
    () =>
      staticBlogPosts
        .filter((p) => p.published)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(toBlogView)
  );
});

export const getBlogBySlug = cache(async (slug: string) => {
  return withDbFallback(
    async () => {
      const post = await prisma.blogPost.findUnique({ where: { slug } });
      if (!post || !post.published) return null;
      return toBlogView(post);
    },
    () => {
      const post = getStaticBlogBySlug(slug);
      return post && post.published ? toBlogView(post) : null;
    }
  );
});
