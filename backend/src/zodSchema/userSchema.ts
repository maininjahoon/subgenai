import { z } from "zod";

const signupSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(50)
    .trim()
    .transform((val) => val.replace(/\s+/g, " ")),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(32),
});

const signinSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1),
});

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(32),
  newPassword: z.string().min(8).max(32),
});

const updateNameSchema = z.object({
  name: z.string().min(1).max(50).trim(),
  password: z.string().min(1),
});

export { signupSchema, signinSchema, updatePasswordSchema, updateNameSchema };
