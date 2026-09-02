import { Suspense } from "react";
import DashboardStatsSkeleton from "../skeletons/DashboardStatsSkeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/api/subtitles";

export default function DashboardStats() {
  return (
    <Suspense fallback={<DashboardStatsSkeleton />}>
      <DashboardStatsContent />
    </Suspense>
  );
}

function DashboardStatsContent() {
  const { data } = useSuspenseQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  const { totalSubtitles, completedSubtitles, processingSubtitles } = data;

  const successRate =
    totalSubtitles === 0
      ? 0
      : Math.round((completedSubtitles / totalSubtitles) * 100);

  const stats = [
    {
      title: "Total Subtitles",
      value: totalSubtitles,
    },
    {
      title: "Success Rate",
      value: successRate + "%",
    },
    {
      title: "In Progress",
      value: processingSubtitles,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ title, value }) => (
        <div
          key={title}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-brand/30"
        >
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
      ))}
    </section>
  );
}
