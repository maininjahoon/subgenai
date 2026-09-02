import z from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.email("Invalid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(32, "Password must be at most 32 characters long."),
});

const signinSchema = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

const backendSignatureSchema = z.object({
  timestamp: z.number().min(1),
  signature: z.string().min(1),
  folder: z.string().min(1),
  apiKey: z.string().min(1),
  cloudName: z.string().min(1),
});

const searchParamsSchema = z.object({
  page: z.number().min(1).optional(),
  search: z.string().optional(),
  format: z.enum(["srt", "vtt"]).optional(),
});

const updateNameSchema = z.object({
  name: z.string().min(1, "Name is required."),
  password: z.string().min(1, "Password is required."),
});

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters long.")
    .max(32, "New password must be at most 32 characters long."),
});

export {
  signupSchema,
  signinSchema,
  updateNameSchema,
  updatePasswordSchema,
  backendSignatureSchema,
  searchParamsSchema,
};
