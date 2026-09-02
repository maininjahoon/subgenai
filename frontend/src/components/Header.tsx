import { Link } from "react-router-dom";
import LightDarkToggle from "@/components/LightDarkToggle";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-brand-foreground shadow-sm">
            S
          </span>

          <span className="text-base sm:text-lg">
            SubGen <span className="text-brand">AI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-2">
          <LightDarkToggle />

          <Link
            to="/signin"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:px-4"
          >
            Sign in
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-brand-foreground shadow-sm transition-colors hover:bg-brand-hover sm:px-4"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
