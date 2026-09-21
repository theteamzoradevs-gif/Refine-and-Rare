import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/auth";
import { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const isVideo = file.type.startsWith("video/");

  if (isCloudinaryConfigured()) {
    const result = await uploadToCloudinary(
      bytes,
      "refine-and-rare",
      isVideo ? "video" : "image"
    );
    return NextResponse.json({
      url: result.url,
      type: isVideo ? "VIDEO" : "IMAGE",
    });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`;
  await writeFile(path.join(uploadsDir, safeName), bytes);
  return NextResponse.json({
    url: `/uploads/${safeName}`,
    type: isVideo ? "VIDEO" : "IMAGE",
  });
}
