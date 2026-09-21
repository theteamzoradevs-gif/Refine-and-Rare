import { v2 as cloudinary } from "cloudinary";

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return cloudinary;
}

export async function uploadToCloudinary(
  buffer: Buffer,
  folder = "refine-and-rare",
  resourceType: "image" | "video" | "auto" = "auto"
) {
  const cloud = configureCloudinary();
  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}
