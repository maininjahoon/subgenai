import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "@/api/auth";
import { toast } from "./ui/toast";
import { useAuth } from "@/context/AuthContext";

const SidePanelContent = [
  {
    title: "Dashboard",
    mobileTitle: "Dashboard",
    icon: "dashboard",
    path: "/account/dashboard",
  },
  {
    title: "New Request",
    mobileTitle: "New",
    icon: "add_box",
    path: "/account/new-request",
  },
  {
    title: "My Subtitles",
    mobileTitle: "Subtitles",
    icon: "subtitles",
    path: "/account/subtitles",
  },
  {
    title: "Settings",
    mobileTitle: "Settings",
    icon: "settings",
    path: "/account/settings",
  },
];

export default function SidePanel() {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();

      clearAuth();

      navigate("/signin", { replace: true });

      toast.add({
        title: "Logout successful",
        description: "You have been successfully logged out.",
        type: "success",
      });
    } catch (err) {
      toast.add({
        title: "Logout failed",
        description:
          "We couldn't log you out. Please check your connection and try again.",
        type: "error",
      });
    }
  };

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50
        flex h-16 w-full items-stretch
        border-t border-border
        bg-background/95
        backdrop-blur-md

        md:top-0 md:right-auto md:bottom-auto
        md:h-screen md:w-56
        md:flex-col md:items-stretch
        md:border-t-0 md:border-r
        md:bg-background/95
        md:backdrop-blur-none
      "
    >
      {/* Logo */}
      <div
        className="
          hidden
          md:mb-4 md:flex md:items-center md:gap-2 md:px-4 md:py-3
        "
      >
        <span
          className="
            flex size-8 items-center justify-center
            rounded-lg
            bg-brand
            text-sm font-bold
            text-brand-foreground
            shadow-sm
          "
        >
          S
        </span>

        <span className="text-base font-semibold tracking-tight">
          SubGen <span className="text-brand">AI</span>
        </span>
      </div>

      {/* Navigation */}
      {SidePanelContent.map(({ title, mobileTitle, icon, path }) => (
        <NavLink
          to={path}
          key={title}
          className={({ isActive }) =>
            `
              flex min-w-0 flex-1
              flex-col items-center justify-center gap-1
              px-1 py-1
              text-muted-foreground
              hover:bg-accent
              hover:text-foreground

              md:flex-none
              md:flex-row
              md:justify-start
              md:gap-3
              md:px-4
              md:py-2.5

              ${
                isActive
                  ? `
                    bg-brand-soft
                    text-brand
                  `
                  : ""
              }
            `
          }
        >
          <span className="material-symbols-outlined size-4.5 shrink-0 md:size-5">
            {icon}
          </span>

          {/* Mobile label */}
          <p className="max-w-full truncate text-[9px] font-medium md:hidden">
            {mobileTitle}
          </p>

          {/* Desktop label */}
          <p className="hidden text-sm font-medium md:block">{title}</p>
        </NavLink>
      ))}

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="
          flex min-w-0 flex-1
          flex-col items-center justify-center gap-1
          px-1 py-1
          text-muted-foreground
          hover:bg-destructive-soft
          hover:text-destructive

          md:mt-auto
          md:mb-4
          md:flex-none
          md:flex-row
          md:justify-start
          md:gap-3
          md:px-4
          md:py-2.5
        "
      >
        <span className="material-symbols-outlined size-4.5 shrink-0 md:size-5">
          logout
        </span>

        <p className="text-[9px] font-medium md:text-sm">Logout</p>
      </button>
    </div>
  );
}
