"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EnquiryStatus, MediaType } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function assertAdmin() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
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
  };

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }
  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function saveProject(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const categoryId = String(formData.get("categoryId") || "");
  const featured = formData.get("featured") === "on";
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const mediaJson = String(formData.get("mediaJson") || "[]");
  const media = JSON.parse(mediaJson) as {
    url: string;
    type: "IMAGE" | "VIDEO";
    alt: string;
  }[];

  if (id) {
    await prisma.projectMedia.deleteMany({ where: { projectId: id } });
    await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        categoryId,
        featured,
        sortOrder,
        media: {
          create: media.map((m, i) => ({
            url: m.url,
            type: m.type as MediaType,
            alt: m.alt || "",
            sortOrder: i,
          })),
        },
      },
    });
  } else {
    await prisma.project.create({
      data: {
        title,
        description,
        categoryId,
        featured,
        sortOrder,
        media: {
          create: media.map((m, i) => ({
            url: m.url,
            type: m.type as MediaType,
            alt: m.alt || "",
            sortOrder: i,
          })),
        },
      },
    });
  }

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
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

  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }
  revalidatePath("/testimonials");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateEnquiryStatus(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "PENDING") as EnquiryStatus;
  await prisma.enquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/enquiries");
  redirect("/admin/enquiries");
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

  await prisma.siteSettings.update({
    where: { id: "main" },
    data: {
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
    },
  });

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}
