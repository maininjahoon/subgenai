import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  SESSION_SECRET: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  FRONTEND_URL: z.url("Invalid frontend URL").min(1),
  DEEPGRAM_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
