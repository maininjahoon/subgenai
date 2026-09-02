import { toast } from "@/components/ui/toast";

type Subtitle = {
  id: number;
  title: string;
  format: "srt" | "vtt";
  createdAt: string;
  url: string;
};

type Props = {
  subtitles: Subtitle[];
  onDelete: (id: number) => void;
};

export default function SubtitleMobileList({ subtitles, onDelete }: Props) {
  return (
    <div className="sm:hidden">
      {subtitles.map((subtitle) => {
        const { id, title, format, createdAt, url } = subtitle;

        const creationTime = new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
          hour12: false,
        })
          .format(new Date(createdAt))
          .replace(", ", " · ");

        return (
          <div
            key={id}
            className="flex items-center gap-3 border-b border-border px-4 py-4 last:border-0"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
              <span className="material-symbols-outlined text-[20px] text-brand">
                description
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium" title={title}>
                {title}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                    format === "srt"
                      ? "border-violet-500/30 bg-violet-500/10 text-violet-400"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {format}
                </span>

                <span className="truncate text-xs text-muted-foreground">
                  {creationTime}
                </span>
              </div>
            </div>

            <a
              href={url}
              download
              aria-label={`Download ${title}`}
              title="Download subtitle"
              onClick={() => {
                toast.add({
                  title: "Download started",
                  description: `Downloading ${title}`,
                  type: "success",
                });
              }}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-brand"
            >
              <span className="material-symbols-outlined">download</span>
            </a>

            <button
              type="button"
              aria-label={`Delete ${title}`}
              title="Delete subtitle"
              onClick={() => onDelete(id)}
              className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-brand"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
