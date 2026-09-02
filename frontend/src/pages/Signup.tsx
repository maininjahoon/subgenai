import { signupUser } from "@/api/auth";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await signupUser({ name, email, password });

      await checkAuth();
      navigate("/account/dashboard", { replace: true });
    } catch (error: any) {
      if (error?.isValidationError) {
        setErrors(error.errors);
      } else if (error instanceof TypeError) {
        setErrors({
          form: "Unable to connect to the server. Please check your connection.",
        });
      } else {
        setErrors({
          form:
            error.message || "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_50%_0%,var(--brand-soft),transparent_70%)]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          SubGen <span className="text-brand">AI</span>
        </Link>

        <p className="mt-2 text-sm text-muted-foreground">
          Create an account to continue
        </p>

        {/* Form card */}
        <div className="mt-7 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/5">
          <form
            noValidate
            className="space-y-5 p-5 sm:p-6"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="John Doe"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                  errors.name
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-input focus:border-brand focus:ring-brand/20"
                }`}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    name: undefined,
                    form: undefined,
                  }));
                }}
              />

              {errors.name && (
                <p
                  id="name-error"
                  className="text-xs font-medium text-destructive"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="you@example.com"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                  errors.email
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-input focus:border-brand focus:ring-brand/20"
                }`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    email: undefined,
                    form: undefined,
                  }));
                }}
              />

              {errors.email && (
                <p
                  id="email-error"
                  className="text-xs font-medium text-destructive"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`h-10 w-full rounded-lg border bg-background px-3 pr-10 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                    errors.password
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : "border-input focus:border-brand focus:ring-brand/20"
                  }`}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      password: undefined,
                      form: undefined,
                    }));
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isSubmitting}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"
                  className="text-xs font-medium text-destructive"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? "confirm-password-error"
                      : undefined
                  }
                  className={`h-10 w-full rounded-lg border bg-background px-3 pr-10 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                    errors.confirmPassword
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : "border-input focus:border-brand focus:ring-brand/20"
                  }`}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined,
                      form: undefined,
                    }));
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  disabled={isSubmitting}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>

              {errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  className="text-xs font-medium text-destructive"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Form-level error */}
            {errors.form && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/20 bg-destructive-soft px-3 py-2.5"
              >
                <p className="text-xs font-medium leading-5 text-destructive">
                  {errors.form}
                </p>
              </div>
            )}

            {/* Submit */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          {/* Sign in */}
          <div className="border-t border-border bg-muted/30 px-5 py-4 text-center sm:px-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/signin"
                onClick={(e) => {
                  if (isSubmitting) {
                    e.preventDefault();
                  }
                }}
                className={`font-medium text-brand transition-colors hover:text-brand-hover ${
                  isSubmitting ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to use SubGen AI responsibly.
        </p>
      </div>
    </main>
  );
}
