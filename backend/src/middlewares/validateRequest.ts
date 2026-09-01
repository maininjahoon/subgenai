import type { Request, Response, NextFunction } from "express";
import {
  signinSchema,
  signupSchema,
  updateNameSchema,
  updatePasswordSchema,
} from "../zodSchema/userSchema.js";
import { z } from "zod";

const validateSignupRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid SignUp request",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }
  req.body = result.data;
  next();
};

const validateSigninRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = signinSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid SignIn request",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }
  next();
};

const validateUpdatePasswordRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updatePasswordSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid Update Password request",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }
  next();
};

const validateUpdateNameRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updateNameSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid Update Name request",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }
  next();
};

const validAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId === undefined) {
    return res.status(401).json({
      message: "Unauthorized. Please log in.",
    });
  }
  next();
};

export {
  validateSignupRequest,
  validateSigninRequest,
  validateUpdatePasswordRequest,
  validateUpdateNameRequest,
  validAuth,
};
