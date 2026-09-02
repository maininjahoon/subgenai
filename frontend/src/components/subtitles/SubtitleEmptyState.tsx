export default function SubtitleEmptyState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <span className="material-symbols-outlined text-[24px]">
          description
        </span>
      </div>

      <div className="mt-3">
        <p className="font-medium">No subtitles found</p>

        <p className="mt-1 max-w-sm text-sm leading-5 text-muted-foreground">
          Try changing your search or format filter.
        </p>
      </div>
    </div>
  );
}
