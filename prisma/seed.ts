import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  staticBlogPosts,
  staticProjects,
  staticServices,
  staticSettings,
  staticTestimonials,
} from "../lib/staticContent";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@refineandrare.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  const {
    id: settingsId,
    updatedAt: _updatedAt,
    ...settingsData
  } = staticSettings;

  await prisma.siteSettings.upsert({
    where: { id: settingsId },
    update: settingsData,
    create: { id: settingsId, ...settingsData },
  });

  const serviceRecords = [];
  for (const service of staticServices) {
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = service;
    const record = await prisma.service.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    });
    serviceRecords.push(record);
  }

  const keepSlugs = staticServices.map((s) => s.slug);
  await prisma.service.deleteMany({
    where: { slug: { notIn: keepSlugs } },
  });

  const bySlug = Object.fromEntries(serviceRecords.map((s) => [s.slug, s]));

  await prisma.projectMedia.deleteMany();
  await prisma.project.deleteMany();

  for (const project of staticProjects) {
    const category = bySlug[project.category.slug];
    if (!category) {
      throw new Error(`Missing service for project: ${project.title}`);
    }

    await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        description: project.description,
        featured: project.featured,
        sortOrder: project.sortOrder,
        categoryId: category.id,
        media: {
          create: project.media.map((m) => ({
            url: m.url,
            type: m.type,
            alt: m.alt,
            sortOrder: m.sortOrder,
          })),
        },
      },
    });
  }

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: staticTestimonials.map(
      ({ name, quote, photoUrl, published, sortOrder }) => ({
        name,
        quote,
        photoUrl,
        published,
        sortOrder,
      })
    ),
  });

  await prisma.blogPost.deleteMany();
  for (const post of staticBlogPosts) {
    const {
      id: _id,
      createdAt: _c,
      updatedAt: _u,
      ...data
    } = post;
    await prisma.blogPost.create({ data });
  }

  console.log("Seed complete.");
  console.log(`Admin: ${email} / ${password}`);
  console.log(
    `Services: ${serviceRecords.length}, Projects: ${staticProjects.length}, Blogs: ${staticBlogPosts.length}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
