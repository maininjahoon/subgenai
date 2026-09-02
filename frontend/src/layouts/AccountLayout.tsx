import AccountHeader from "@/components/AccountHeader";
import SidePanel from "@/components/SidePanel";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <div>
      <SidePanel />

      <main className="min-h-screen bg-background pb-20 md:ml-60 md:pb-0">
        <AccountHeader />
        <Outlet />
      </main>
    </div>
  );
}
