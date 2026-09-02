type Props = {
  downloadUrl: string;
};

export default function GenerationSuccess({ downloadUrl }: Props) {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
            <span className="material-symbols-outlined text-lg text-emerald-500">
              check_circle
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium">
              Subtitles generated successfully
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Your subtitle file is ready to download.
            </p>
          </div>
        </div>

        <a
          href={downloadUrl}
          download
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
        >
          Download
        </a>
      </div>
    </div>
  );
}
