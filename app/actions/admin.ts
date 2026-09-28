"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EnquiryStatus, MediaType } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/projectSlug";
import { serializeBlogBody } from "@/lib/staticContent";

async function assertAdmin() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

function adminMessage(path: string, status: "success" | "error", message: string) {
  return `${path}?status=${status}&message=${encodeURIComponent(message)}`;
}

function isChecked(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

export async function saveService(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  const data = {
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || ""),
    shortDesc: String(formData.get("shortDesc") || ""),
    longDesc: String(formData.get("longDesc") || ""),
    imageUrl: String(formData.get("imageUrl") || ""),
    sortOrder: Number(formData.get("sortOrder") || 0),
    highlightsJson: JSON.stringify([1, 2, 3, 4].map((index) => String(formData.get(`highlight${index}`) || ""))),
  };

  try {
    if (id) {
      await prisma.service.update({ where: { id }, data });
    } else {
      await prisma.service.create({ data });
    }
  } catch {
    redirect(adminMessage(id ? `/admin/services/${id}` : "/admin/services/new", "error", "Service could not be saved. Check the details and try again."));
  }
  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect(adminMessage("/admin/services", "success", id ? "Service updated successfully." : "Service added successfully."));
}

export async function deleteService(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  try {
    await prisma.service.delete({ where: { id } });
  } catch {
    redirect(adminMessage("/admin/services", "error", "Service could not be deleted. Please try again."));
  }
  revalidatePath("/admin/services");
  redirect(adminMessage("/admin/services", "success", "Service deleted successfully."));
}

export async function saveProject(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  const errorPath = id ? `/admin/projects/${id}` : "/admin/projects/new";
  const title = String(formData.get("title") || "");
  const slug =
    slugify(String(formData.get("slug") || "")) || slugify(title);
  const description = String(formData.get("description") || "");
  const categoryId = String(formData.get("categoryId") || "");
  const featured = isChecked(formData.get("featured"));
  const sortOrder = Number(formData.get("sortOrder") || 0);
  if (featured) {
    const featuredCount = await prisma.project.count({
      where: {
        featured: true,
        ...(id ? { id: { not: id } } : {}),
      },
    });

    if (featuredCount >= 5) {
      redirect(
        adminMessage(
          errorPath,
          "error",
          "You can have a maximum of 5 featured projects."
        )
      );
    }
  }
  const mediaJson = String(formData.get("mediaJson") || "[]");
  const highlightsJson = JSON.stringify([1, 2, 3, 4].map((index) => String(formData.get(`highlight${index}`) || "")));
  if (!title || !description || !categoryId) {
    redirect(`${errorPath}?status=error&message=${encodeURIComponent("Please complete all required project fields.")}`);
  }

  let media: { url: string; type: "IMAGE" | "VIDEO"; alt: string }[];
  try {
    media = JSON.parse(mediaJson);
  } catch {
    redirect(`${errorPath}?status=error&message=${encodeURIComponent("The project media data is invalid. Please try again.")}`);
  }

  const mediaCreate = {
    create: media.map((m, i) => ({
      url: m.url,
      type: m.type as MediaType,
      alt: m.alt || "",
      sortOrder: i,
    })),
  };

  try {
    if (id) {
      await prisma.projectMedia.deleteMany({ where: { projectId: id } });
      await prisma.project.update({
        where: { id },
        data: { title, slug, description, categoryId, featured, sortOrder, highlightsJson, media: mediaCreate },
      });
    } else {
      await prisma.project.create({
        data: { title, slug, description, categoryId, featured, sortOrder, highlightsJson, media: mediaCreate },
      });
    }
  } catch {
    redirect(`${errorPath}?status=error&message=${encodeURIComponent("Project could not be saved. Check the slug and category, then try again.")}`);
  }

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect(`/admin/projects?status=success&message=${encodeURIComponent(id ? "Project updated successfully." : "Project added successfully.")}`);
}

export async function deleteProject(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  try {
    await prisma.project.delete({ where: { id } });
  } catch {
    redirect(`/admin/projects?status=error&message=${encodeURIComponent("Project could not be deleted. Please try again.")}`);
  }
  revalidatePath("/admin/projects");
  redirect(`/admin/projects?status=success&message=${encodeURIComponent("Project deleted successfully.")}`);
}

export async function saveTestimonial(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  const data = {
    name: String(formData.get("name") || ""),
    quote: String(formData.get("quote") || ""),
    photoUrl: String(formData.get("photoUrl") || "") || null,
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  try {
    if (id) {
      await prisma.testimonial.update({ where: { id }, data });
    } else {
      await prisma.testimonial.create({ data });
    }
  } catch {
    redirect(adminMessage(id ? `/admin/testimonials/${id}` : "/admin/testimonials/new", "error", "Testimonial could not be saved. Check the details and try again."));
  }
  revalidatePath("/testimonials");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect(adminMessage("/admin/testimonials", "success", id ? "Testimonial updated successfully." : "Testimonial added successfully."));
}

export async function deleteTestimonial(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  try {
    await prisma.testimonial.delete({ where: { id } });
  } catch {
    redirect(adminMessage("/admin/testimonials", "error", "Testimonial could not be deleted. Please try again."));
  }
  revalidatePath("/admin/testimonials");
  redirect(adminMessage("/admin/testimonials", "success", "Testimonial deleted successfully."));
}

export async function updateEnquiryStatus(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "PENDING") as EnquiryStatus;
  try {
    await prisma.enquiry.update({ where: { id }, data: { status } });
  } catch {
    redirect(adminMessage("/admin/enquiries", "error", "Enquiry status could not be updated. Please try again."));
  }
  revalidatePath("/admin/enquiries");
  redirect(adminMessage("/admin/enquiries", "success", "Enquiry status updated successfully."));
}

export async function saveBlog(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const slug =
    slugify(String(formData.get("slug") || "")) || slugify(title);
  const publishedAtRaw = String(formData.get("publishedAt") || "");
  const publishedAt = publishedAtRaw
    ? new Date(publishedAtRaw)
    : new Date();

  const data = {
    title,
    slug,
    excerpt: String(formData.get("excerpt") || ""),
    body: serializeBlogBody(String(formData.get("body") || "")),
    imageUrl: String(formData.get("imageUrl") || ""),
    category: String(formData.get("category") || ""),
    published: formData.get("published") === "on",
    publishedAt: Number.isNaN(publishedAt.getTime())
      ? new Date()
      : publishedAt,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  try {
    if (id) {
      await prisma.blogPost.update({ where: { id }, data });
    } else {
      await prisma.blogPost.create({ data });
    }
  } catch {
    redirect(adminMessage(id ? `/admin/blogs/${id}` : "/admin/blogs/new", "error", "Blog post could not be saved. Check the slug and details, then try again."));
  }

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${slug}`);
  revalidatePath("/admin/blogs");
  redirect(adminMessage("/admin/blogs", "success", id ? "Blog post updated successfully." : "Blog post added successfully."));
}

export async function deleteBlog(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  try {
    await prisma.blogPost.delete({ where: { id } });
  } catch {
    redirect(adminMessage("/admin/blogs", "error", "Blog post could not be deleted. Please try again."));
  }
  revalidatePath("/blogs");
  revalidatePath("/admin/blogs");
  redirect(adminMessage("/admin/blogs", "success", "Blog post deleted successfully."));
}

export async function saveSettings(formData: FormData) {
  await assertAdmin();
  const hours = {
    monday: String(formData.get("monday") || ""),
    tuesday: String(formData.get("tuesday") || ""),
    wednesday: String(formData.get("wednesday") || ""),
    thursday: String(formData.get("thursday") || ""),
    friday: String(formData.get("friday") || ""),
    saturday: String(formData.get("saturday") || ""),
    sunday: String(formData.get("sunday") || ""),
  };

  const data = {
    businessName: String(formData.get("businessName") || ""),
    tagline: String(formData.get("tagline") || ""),
    description: String(formData.get("description") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    whatsapp: String(formData.get("whatsapp") || ""),
    instagram: String(formData.get("instagram") || ""),
    city: String(formData.get("city") || ""),
    address: String(formData.get("address") || ""),
    whatsappMessage: String(formData.get("whatsappMessage") || ""),
    hoursJson: JSON.stringify(hours),
  };

  try {
    await prisma.siteSettings.upsert({
      where: { id: "main" },
      update: data,
      create: { id: "main", ...data },
    });
  } catch {
    redirect(adminMessage("/admin/settings", "error", "Settings could not be saved. Please check the details and try again."));
  }

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  redirect(adminMessage("/admin/settings", "success", "Settings saved successfully."));
}
