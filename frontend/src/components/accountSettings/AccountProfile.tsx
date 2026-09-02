import { updateName } from "@/api/auth";
import Button from "@/components/Button";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/context/AuthContext";
import { isApiValidationError } from "@/types/apiValidationError";
import { useState } from "react";

type NameFormErrors = {
  name?: string;
  password?: string;
  form?: string;
};

export default function AccountProfile() {
  const { user, checkAuth } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<NameFormErrors>({});

  const [showPassword, setShowPassword] = useState(false);

  const handleSaveChanges = async () => {
    try {
      setErrors({});

      if (user?.name === name) {
        setErrors({
          name: "New name cannot be the same as old name.",
        });
        return;
      }

      setIsSubmitting(true);

      await updateName({
        name,
        password,
      });

      await checkAuth();

      setPassword("");

      toast.add({
        title: "Name updated",
        description: "Your name has been changed successfully.",
        type: "success",
      });
    } catch (err) {
      if (isApiValidationError(err)) {
        const errorData = err.errors;

        for (const [field, message] of Object.entries(errorData)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: message,
          }));
        }
      } else {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update name.";

        setErrors({
          form: errorMessage,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold">Account Profile</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your name and account information.
        </p>
      </div>

      <div className="flex flex-col gap-5 p-5 sm:p-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              setErrors((prev) => ({
                ...prev,
                name: "",
                form: "",
              }));
            }}
            placeholder="e.g. John Doe"
            disabled={isSubmitting}
            className="mt-2 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {errors.name && (
            <p className="mt-1.5 text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            id="email"
            value={user?.email ?? ""}
            readOnly
            className="mt-2 h-10 w-full cursor-not-allowed rounded-lg border border-input bg-muted px-3 text-sm text-muted-foreground outline-none"
          />

          <p className="mt-1.5 text-xs text-muted-foreground">
            Email address cannot be changed.
          </p>
        </div>

        {/* Password confirmation */}
        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>

          <p className="mt-1 text-xs text-muted-foreground">
            Enter your password to confirm this change.
          </p>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                  form: "",
                }));
              }}
              placeholder="Enter your password"
              disabled={isSubmitting}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isSubmitting}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[19px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Action */}
        <div className="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          {errors.form ? (
            <p className="text-sm text-destructive">{errors.form}</p>
          ) : (
            <div />
          )}

          <Button
            type="button"
            onClick={handleSaveChanges}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </section>
  );
}
