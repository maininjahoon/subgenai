export type ApiValidationError = {
  isValidationError: true;
  errors: Record<string, string>;
};

export function isApiValidationError(
  error: unknown,
): error is ApiValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isValidationError" in error &&
    (error as any).isValidationError === true
  );
}
