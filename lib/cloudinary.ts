import { v2 as cloudinary } from "cloudinary";
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type CloudinaryUploadResult = UploadApiResponse | UploadApiErrorResponse;

export async function uploadToCloudinary(
  file: string,
  folder: string = "thanhlam_store"
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        folder,
        resource_type: "image",
        transformation: [
          { quality: "auto:good", fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

export function getCloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; crop?: string } = {}
): string {
  const { width, height, crop = "fill" } = options;
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      ...(width ? [{ width }] : []),
      ...(height ? [{ height }] : []),
      { crop },
      { quality: "auto:good", fetch_format: "auto" },
    ],
  });
}

export { cloudinary };
