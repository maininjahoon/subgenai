import { useAuth } from "@/context/AuthContext";
import LightDarkToggle from "@/components/LightDarkToggle";

export default function AccountHeader() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      {/* Mobile logo */}
      <div className="md:hidden">
        <p className="text-base font-bold tracking-tight">
          SubGen <span className="text-brand">AI</span>
        </p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* Theme toggle */}
        <LightDarkToggle />

        {/* User info */}
        <div className="hidden text-right sm:block">
          <p className="text-xs text-muted-foreground">Welcome back</p>
          <p className="text-sm font-semibold">{user?.name}</p>
        </div>

        {/* Avatar */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
