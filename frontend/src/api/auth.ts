import type { ApiValidationError } from "@/types/apiValidationError";
import {
  signinSchema,
  signupSchema,
  updateNameSchema,
  updatePasswordSchema,
} from "@/zodSchema";

const API_URL = import.meta.env.VITE_API_URL;

async function getCurrentUser() {
  const response = await fetch(`${API_URL}/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("User is not authenticated.");
    }
    throw new Error("Internal server error. Please try again later.");
  }

  const data = await response.json();
  return data.user;
}

async function signinUser(rawData: unknown) {
  const parsed = signinSchema.safeParse(rawData);
  if (!parsed.success) {
    const validationErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") {
        validationErrors[field] = issue.message;
      }
    }

    throw {
      isValidationError: true,
      errors: validationErrors,
    } as ApiValidationError;
  }

  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid email or password.");
    }

    if (response.status >= 500) {
      throw new Error("Internal server error. Please try again later.");
    }

    if (response.status === 400) {
      try {
        const data = await response.json();
        if (data.errors) {
          throw {
            isValidationError: true,
            errors: {
              email: data.errors.email?.[0],
              password: data.errors.password?.[0],
            },
          } as ApiValidationError;
        }
      } catch (err) {
        // Fall through if JSON parsing fails
      }
    }

    throw new Error("An unexpected error occurred.");
  }
}

async function signupUser(rawData: unknown): Promise<void> {
  const parsed = signupSchema.safeParse(rawData);
  if (!parsed.success) {
    const validationErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") {
        validationErrors[field] = issue.message;
      }
    }
    throw {
      isValidationError: true,
      errors: validationErrors,
    } as ApiValidationError;
  }

  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw {
        isValidationError: true,
        errors: { email: "Email already in use." },
      } as ApiValidationError;
    }

    if (response.status === 400) {
      try {
        const data = await response.json();
        throw {
          isValidationError: true,
          errors: {
            name: data.errors.name?.[0],
            email: data.errors.email?.[0],
            password: data.errors.password?.[0],
          },
        } as ApiValidationError;
      } catch (err) {
        // Fall through if JSON parsing fails
      }
    }

    if (response.status >= 500) {
      throw new Error("Internal server error. Please try again later.");
    }

    throw new Error("Signup failed.");
  }
}

async function updateName(rawData: unknown) {
  const parsed = updateNameSchema.safeParse(rawData);
  if (!parsed.success) {
    const validationErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") {
        validationErrors[field] = issue.message;
      }
    }
    throw {
      isValidationError: true,
      errors: validationErrors,
    } as ApiValidationError;
  }

  const response = await fetch(`${API_URL}/update-name`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!response.ok) {
    if (response.status === 400) {
      try {
        const data = await response.json();

        throw {
          isValidationError: true,
          errors: {
            name: data.errors.name?.[0],
            password: data.errors.password?.[0],
          },
        } as ApiValidationError;
      } catch (err) {
        // Fall through if JSON parsing fails
      }
    }

    if (response.status >= 500) {
      throw new Error("Internal server error. Please try again later.");
    }

    throw new Error("Update name failed.");
  }
}

async function updatePassword(rawData: unknown) {
  const parsed = updatePasswordSchema.safeParse(rawData);
  if (!parsed.success) {
    const validationErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") {
        validationErrors[field] = issue.message;
      }
    }
    throw {
      isValidationError: true,
      errors: validationErrors,
    } as ApiValidationError;
  }

  const response = await fetch(`${API_URL}/update-password`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!response.ok) {
    if (response.status === 400) {
      try {
        const data = await response.json();

        throw {
          isValidationError: true,
          errors: {
            currentPassword: data.errors.currentPassword?.[0],
            newPassword: data.errors.newPassword?.[0],
          },
        } as ApiValidationError;
      } catch (err) {
        // Fall through if JSON parsing fails
      }
    }

    if (response.status >= 500) {
      throw new Error("Internal server error. Please try again later.");
    }

    throw new Error("Update password failed.");
  }
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return response.json();
}

export { getCurrentUser, signinUser, signupUser, updateName, updatePassword };
