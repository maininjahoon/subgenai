import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 5;

export default function SubtitlesSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 pb-24 sm:px-6 md:gap-6 md:py-6 md:pb-8">
      {/* Header */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 space-y-2">
            <Skeleton className="h-4 w-16" />

            <Skeleton className="h-7 w-40 sm:h-8 sm:w-48" />

            <Skeleton className="h-5 w-72 max-w-full" />
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            {/* Search skeleton */}
            <Skeleton className="h-10 w-full rounded-lg sm:w-64" />

            {/* Format select skeleton */}
            <Skeleton className="h-10 w-full rounded-lg sm:w-32" />
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3.5 sm:px-5">
                  <Skeleton className="h-3 w-20" />
                </th>

                <th className="px-4 py-3.5 sm:px-5">
                  <Skeleton className="h-3 w-14" />
                </th>

                <th className="px-4 py-3.5 sm:px-5">
                  <Skeleton className="h-3 w-10" />
                </th>

                <th className="px-4 py-3.5 sm:px-5">
                  <div className="flex justify-end">
                    <Skeleton className="h-3 w-16" />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-border/60 last:border-b-0"
                >
                  {/* Filename */}
                  <td className="px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-9 shrink-0 rounded-lg" />

                      <Skeleton
                        className={`h-4 ${
                          index % 2 === 0 ? "w-48" : "w-36"
                        } max-w-full`}
                      />
                    </div>
                  </td>

                  {/* Format */}
                  <td className="px-4 py-4 sm:px-5">
                    <Skeleton className="h-6 w-12 rounded-md" />
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                    <Skeleton className="h-4 w-24" />
                  </td>

                  {/* Download */}
                  <td className="px-4 py-4 sm:px-5">
                    <div className="flex justify-end">
                      <Skeleton className="size-9 rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-border bg-muted/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <Skeleton className="h-5 w-36" />

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Skeleton className="h-9 w-20 rounded-lg" />

            <Skeleton className="size-9 rounded-lg" />

            <Skeleton className="h-9 w-20 rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
