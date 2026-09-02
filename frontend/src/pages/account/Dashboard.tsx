import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import RecentSubtitles from "@/components/dashboard/RecentSubtitles";

export default function Dashboard() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <DashboardWelcome />
      <DashboardStats />
      <RecentSubtitles />
    </div>
  );
}
