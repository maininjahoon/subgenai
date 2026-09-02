export default function SubtitlePreview() {
  return (
    <section className="relative mx-auto w-full max-w-2xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/5">
        {/* Window header */}
        <div className="flex h-10 items-center border-b border-border bg-muted/50 px-3">
          <div className="flex gap-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="size-2 rounded-full bg-muted-foreground/30"
              />
            ))}
          </div>

          <div className="mx-auto h-2.5 w-1/3 rounded-full bg-muted-foreground/10" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="mb-5 h-5 w-1/3 rounded bg-muted" />

          <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-soft">
              <span className="material-symbols-outlined size-5 text-brand-muted">
                video_file
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[67%] rounded-full bg-brand" />
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">
                  Processing
                </span>

                <span className="text-xs font-medium text-brand">67%</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="size-2 shrink-0 animate-pulse rounded-full bg-brand" />
            <p className="text-xs font-medium text-brand">
              Generating subtitles...
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-full h-40 bg-[radial-gradient(circle_at_50%_0%,var(--brand-soft),transparent_70%)]" />
      </div>
    </section>
  );
}
