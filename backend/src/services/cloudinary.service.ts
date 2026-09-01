import {
  v2 as cloudinary,
  type DeleteApiResponse,
  type UploadApiErrorResponse,
  type UploadApiResponse,
} from "cloudinary";
import { env } from "../config/env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const generateVideoUploadSignature = () => {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "subtitles-dashboard/videos",
    },
    env.CLOUDINARY_API_SECRET,
  );
  return {
    timestamp,
    signature,
    folder: "subtitles-dashboard/videos",
  };
};

const uploadSubtile = async (subtitleFile: string) => {
  const result: UploadApiResponse = await cloudinary.uploader.upload(
    subtitleFile,
    {
      resource_type: "raw",
      folder: "subtitles-dashboard/subtitles",
      use_filename: true,
      unique_filename: true,
    },
  );
  return result;
};

const deleteFile = async (public_id: string) => {
  const result = await cloudinary.uploader.destroy(public_id, {
    resource_type: "video",
    invalidate: true,
  });

  return result;
};
export { generateVideoUploadSignature, uploadSubtile, deleteFile };
