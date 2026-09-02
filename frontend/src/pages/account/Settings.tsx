import AccountProfile from "@/components/accountSettings/AccountProfile";
import Security from "@/components/accountSettings/Security";

export default function Settings() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8">
      {/* Page header */}
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account information and security preferences.
        </p>
      </header>

      <AccountProfile />

      <Security />
    </div>
  );
}
