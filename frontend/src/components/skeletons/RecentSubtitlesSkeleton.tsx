import { Skeleton } from "@/components/ui/skeleton";

export default function RecentSubtitlesSkeleton() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 sm:h-6 sm:w-40" />
          <Skeleton className="h-4 w-52 sm:w-64" />
        </div>

        {/* Desktop View All */}
        <Skeleton className="hidden h-5 w-20 sm:block" />
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3">
                <Skeleton className="h-3 w-16" />
              </th>

              <th className="px-5 py-3">
                <Skeleton className="h-3 w-12" />
              </th>

              <th className="px-5 py-3">
                <Skeleton className="h-3 w-10" />
              </th>

              <th className="px-5 py-3">
                <div className="flex justify-end">
                  <Skeleton className="h-3 w-16" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                {/* Filename */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 shrink-0 rounded-lg" />

                    <Skeleton
                      className={`h-4 ${index === 1 ? "w-40" : "w-52"}`}
                    />
                  </div>
                </td>

                {/* Format */}
                <td className="px-5 py-4">
                  <Skeleton className="h-6 w-12 rounded-md" />
                </td>

                {/* Date */}
                <td className="px-5 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>

                {/* Download */}
                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="sm:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-border px-4 py-4 last:border-0"
          >
            {/* File icon */}
            <Skeleton className="size-9 shrink-0 rounded-lg" />

            {/* Content */}
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton
                className={`h-4 ${index === 1 ? "w-40" : "w-52"} max-w-full`}
              />

              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-9 rounded" />

                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* Download */}
            <Skeleton className="size-8 shrink-0 rounded-md" />
          </div>
        ))}
      </div>

      {/* Mobile View All */}
      <div className="border-t border-border p-3 sm:hidden">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </section>
  );
}
