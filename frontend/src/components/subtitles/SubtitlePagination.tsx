type Props = {
  page: number;
  totalPages: number;
  totalSubtitles: number;
  start: number;
  end: number;
  setSearchParams: (
    nextInit:
      | URLSearchParams
      | string
      | Record<string, string | string[]>
      | ((prev: URLSearchParams) => URLSearchParams),
  ) => void;
};

export default function SubtitlePagination({
  page,
  totalPages,
  totalSubtitles,
  start,
  end,
  setSearchParams,
}: Props) {
  return (
    <div className="flex flex-col gap-3 border-t border-border bg-muted/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <p className="text-sm text-muted-foreground">
        {totalSubtitles === 0 ? (
          "No files"
        ) : (
          <>
            Showing{" "}
            <span className="font-medium text-foreground">
              {start}-{end}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {totalSubtitles}
            </span>{" "}
            files
          </>
        )}
      </p>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => {
            setSearchParams((prev) => {
              prev.set("page", String(page - 1));
              return prev;
            });
          }}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[18px]">
            chevron_left
          </span>

          <span className="hidden xs:inline">Prev</span>
        </button>

        <div className="flex size-9 items-center justify-center rounded-lg bg-brand text-sm font-medium text-brand-foreground">
          {page}
        </div>

        <button
          type="button"
          disabled={page >= totalPages || totalSubtitles === 0}
          onClick={() => {
            setSearchParams((prev) => {
              prev.set("page", String(page + 1));
              return prev;
            });
          }}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden xs:inline">Next</span>

          <span className="material-symbols-outlined text-[18px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
