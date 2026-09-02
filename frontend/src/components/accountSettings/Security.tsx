import { updatePassword } from "@/api/auth";
import Button from "@/components/Button";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/context/AuthContext";
import { isApiValidationError } from "@/types/apiValidationError";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type PasswordFormErrors = {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  form?: string;
};

export default function Security() {
  const { clearAuth } = useAuth();

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<PasswordFormErrors>({});

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChangePassword = async () => {
    try {
      setErrors({});

      if (newPassword !== confirmNewPassword) {
        setErrors({
          confirmNewPassword:
            "New password and confirm new password do not match.",
        });
        return;
      }

      setIsSubmitting(true);

      await updatePassword({
        currentPassword,
        newPassword,
      });

      toast.add({
        title: "Password updated",
        description:
          "Your password has been changed successfully. Please sign in again with your new password.",
        type: "success",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      /*
       * updatePassword destroys the current session on the backend.
       * Therefore there is no reason to call logoutUser() here.
       */
      clearAuth();

      navigate("/signin", {
        replace: true,
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
          err instanceof Error ? err.message : "Failed to update password.";

        setErrors({
          form: errorMessage,
        });

        toast.add({
          title: "Password update failed",
          description: "We couldn't update your password. Please try again.",
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold">Security</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Change your account password.
        </p>
      </div>

      <div className="flex flex-col gap-5 p-5 sm:p-6">
        {/* Current password */}
        <div>
          <label htmlFor="current-password" className="text-sm font-medium">
            Current Password
          </label>

          <div className="relative mt-2">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="current-password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  currentPassword: "",
                  form: "",
                }));
              }}
              placeholder="Enter your current password"
              disabled={isSubmitting}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              disabled={isSubmitting}
              aria-label={
                showCurrentPassword
                  ? "Hide current password"
                  : "Show current password"
              }
              className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[19px]">
                {showCurrentPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {errors.currentPassword && (
            <p className="mt-1.5 text-sm text-destructive">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New password */}
        <div>
          <label htmlFor="new-password" className="text-sm font-medium">
            New Password
          </label>

          <div className="relative mt-2">
            <input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  newPassword: "",
                  form: "",
                }));
              }}
              placeholder="Enter your new password"
              disabled={isSubmitting}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              disabled={isSubmitting}
              aria-label={
                showNewPassword ? "Hide new password" : "Show new password"
              }
              className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground  hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[19px]">
                {showNewPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {errors.newPassword && (
            <p className="mt-1.5 text-sm text-destructive">
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm new password */}
        <div>
          <label htmlFor="confirm-new-password" className="text-sm font-medium">
            Confirm New Password
          </label>

          <div className="relative mt-2">
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              id="confirm-new-password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  confirmNewPassword: "",
                  form: "",
                }));
              }}
              placeholder="Confirm your new password"
              disabled={isSubmitting}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() => setShowConfirmNewPassword((prev) => !prev)}
              disabled={isSubmitting}
              aria-label={
                showConfirmNewPassword
                  ? "Hide confirm new password"
                  : "Show confirm new password"
              }
              className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[19px]">
                {showConfirmNewPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {errors.confirmNewPassword && (
            <p className="mt-1.5 text-sm text-destructive">
              {errors.confirmNewPassword}
            </p>
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
            onClick={handleChangePassword}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>
    </section>
  );
}
