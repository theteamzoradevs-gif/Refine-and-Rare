"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEnquiryEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Please share a bit more about your project"),
  serviceId: z.string().optional(),
});

export async function submitEnquiry(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    serviceId: formData.get("serviceId") || undefined,
  });

  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message || "Invalid form" };
  }

  return persistEnquiry(parsed.data);
}

const chatSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  interest: z.string().min(2),
  note: z.string().optional(),
  serviceId: z.string().optional(),
});

export async function submitChatEnquiry(input: {
  name: string;
  phone: string;
  email?: string;
  interest: string;
  note?: string;
  serviceId?: string;
}) {
  const parsed = chatSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message || "Invalid details",
    };
  }

  const data = parsed.data;
  const email =
    data.email && data.email.length > 0
      ? data.email
      : `chat-lead+${Date.now()}@refineandrare.local`;
  const message = [
    `Chat enquiry · Interest: ${data.interest}`,
    data.note ? `Details: ${data.note}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return persistEnquiry({
    name: data.name,
    phone: data.phone,
    email,
    message,
    serviceId: data.serviceId,
  });
}

async function persistEnquiry(data: {
  name: string;
  phone: string;
  email: string;
  message: string;
  serviceId?: string;
}) {
  const serviceId = data.serviceId || null;
  let serviceTitle: string | null = null;

  if (serviceId) {
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return { ok: false as const, error: "Selected service not found" };
    }
    serviceTitle = service.title;
  }

  await prisma.enquiry.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      serviceId,
    },
  });

  try {
    await sendEnquiryEmail({
      name: data.name,
      phone: data.phone,
      email: data.email.includes("@refineandrare.local")
        ? "Not provided in chat"
        : data.email,
      message: data.message,
      serviceTitle,
    });
  } catch (err) {
    console.error("Email send failed", err);
  }

  revalidatePath("/admin/enquiries");
  return { ok: true as const };
}
