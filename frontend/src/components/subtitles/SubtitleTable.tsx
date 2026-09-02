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

export default function SubtitleTable({ subtitles, onDelete }: Props) {
  return (
    <div className="hidden sm:block">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
            <th className="px-5 py-3.5 font-medium">Filename</th>
            <th className="px-5 py-3.5 font-medium">Format</th>
            <th className="px-5 py-3.5 font-medium">Date</th>
            <th className="px-5 py-3.5 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
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
              <tr
                key={id}
                className="group border-b border-border transition-colors last:border-b-0 hover:bg-muted/50"
              >
                <td className="px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
                      <span className="material-symbols-outlined text-[20px] text-brand">
                        description
                      </span>
                    </div>

                    <p
                      className="max-w-100 truncate text-sm font-medium"
                      title={title}
                    >
                      {title}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${
                      format === "srt"
                        ? "border-violet-500/30 bg-violet-500/10 text-violet-400"
                        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {format.toUpperCase()}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-muted-foreground">
                  {creationTime}
                </td>

                <td className="px-5 py-4 text-right">
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
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-brand"
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
