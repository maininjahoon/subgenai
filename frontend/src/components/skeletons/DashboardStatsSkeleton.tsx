import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardStatsSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <Skeleton className="h-4 w-28" />

          <Skeleton className="mt-3 h-9 w-20" />
        </div>
      ))}
    </section>
  );
}
