import { Link } from "react-router-dom";
import { Suspense } from "react";
import RecentSubtitlesSkeleton from "../skeletons/RecentSubtitlesSkeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecentSubtitles } from "@/api/subtitles";
import { toast } from "../ui/toast";

export default function RecentSubtitles() {
  return (
    <Suspense fallback={<RecentSubtitlesSkeleton />}>
      <RecentSubtitlesContent />
    </Suspense>
  );
}

function RecentSubtitlesContent() {
  const { data } = useSuspenseQuery({
    queryKey: ["recent-subtitles"],
    queryFn: getRecentSubtitles,
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-muted/35 px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">
            Recent Subtitles
          </h2>

          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Your latest generated subtitle files
          </p>
        </div>

        <Link
          to="/account/subtitles?page=1"
          className="hidden items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-hover sm:flex"
        >
          View all
          <span className="material-symbols-outlined size-4">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted/30 border-b border-border text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3">Filename</th>
              <th className="px-5 py-3">Format</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Download</th>
            </tr>
          </thead>

          <tbody>
            {data.subtitles.map(({ createdAt, format, id, title, url }) => (
              <tr
                key={id}
                className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
                      <span className="material-symbols-outlined szie-4 text-brand">
                        description
                      </span>
                    </div>

                    <span className="truncate text-sm font-medium">
                      {title}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${format === "srt" ? "border-violet-500/30 bg-violet-500/10 text-violet-400" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"}`}
                  >
                    {" "}
                    {format.toUpperCase()}{" "}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {new Date(createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 text-right">
                  <a
                    href={url}
                    download
                    aria-label={`Download ${title}`}
                    onClick={() => {
                      toast.add({
                        title: "Download started",
                        description: `Downloading ${title}`,
                        type: "success",
                      });
                    }}
                    className="group inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-brand"
                  >
                    <span className="material-symbols-outlined text-5">
                      download
                    </span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="sm:hidden">
        {data.subtitles.map(({ createdAt, format, id, title, url }) => (
          <div
            key={id}
            className="flex items-center gap-3 border-b border-border px-4 py-4 last:border-0"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
              <span className="material-symbols-outlined szie-4 text-brand">
                description
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="max-w-70 truncate text-sm font-medium">{title}</p>

              <div className="mt-1 flex items-center gap-2">
                <span className="rounded bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase text-brand">
                  {format}
                </span>

                <span className="truncate text-xs text-muted-foreground">
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <a
              href={url}
              download
              aria-label={`Download ${title}`}
              onClick={() => {
                toast.add({
                  title: "Download started",
                  description: `Downloading ${title}`,
                  type: "success",
                });
              }}
              className="group inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-brand"
            >
              <span className="material-symbols-outlined size-4">download</span>
            </a>
          </div>
        ))}
      </div>

      {/* Mobile View All */}
      <div className="border-t border-border p-3 sm:hidden">
        <Link
          to="/account/subtitles?page=1"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
        >
          View All Subtitles
          <span className="material-symbols-outlined size-4">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}
