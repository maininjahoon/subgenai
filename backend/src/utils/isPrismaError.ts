import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientRustPanicError,
} from "@prisma/client/runtime/client";

import type { PrismaErrorTypes } from "../types/prismaErrorTypes.js";

export const isPrismaError = (error: unknown): error is PrismaErrorTypes => {
  return (
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientValidationError ||
    error instanceof PrismaClientRustPanicError
  );
};
