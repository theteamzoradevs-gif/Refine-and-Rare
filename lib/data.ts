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
    return staticProjects
      .filter((p) => p.featured)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .slice(0, take);
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

export const getProjectBySlug = cache(async (slug: string) => {
  if (isDatabaseEnabled()) {
    const bySlug = await prisma.project.findUnique({
      where: { slug },
      include: { media: { orderBy: { sortOrder: "asc" } }, category: true },
    });
    if (bySlug) return bySlug;
  }

  const projects = await getProjects();
  return (
    projects.find((p) => getProjectSlug(p) === slug || p.id === slug) || null
  );
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

export const getPublishedBlogs = cache(async () => {
  if (!isDatabaseEnabled()) {
    return staticBlogPosts
      .filter((p) => p.published)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(toBlogView);
  }

  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
  });
  return posts.map(toBlogView);
});

export const getBlogBySlug = cache(async (slug: string) => {
  if (!isDatabaseEnabled()) {
    const post = getStaticBlogBySlug(slug);
    return post && post.published ? toBlogView(post) : null;
  }

  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !post.published) return null;
  return toBlogView(post);
});
