import { signinUser } from "@/api/auth";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type FormErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      await signinUser({ email, password });

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
          Sign in to your account
        </p>

        {/* Form card */}
        <div className="mt-7 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/5">
          <form
            noValidate
            className="space-y-5 p-5 sm:p-6"
            onSubmit={handleSubmit}
          >
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
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 ${
                  errors.email
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-input focus:border-brand focus:ring-brand/20"
                }`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((errors) => ({
                    ...errors,
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

              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 ${
                  errors.password
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-input focus:border-brand focus:ring-brand/20"
                }`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((errors) => ({
                    ...errors,
                    password: undefined,
                    form: undefined,
                  }));
                }}
              />

              {errors.password && (
                <p
                  id="password-error"
                  className="text-xs font-medium text-destructive"
                >
                  {errors.password}
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
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Sign up */}
          <div className="border-t border-border bg-muted/30 px-5 py-4 text-center sm:px-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                onClick={(e) => {
                  if (isSubmitting) {
                    e.preventDefault();
                  }
                }}
                className={`font-medium text-brand transition-colors hover:text-brand-hover ${
                  isSubmitting ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Sign Up
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
