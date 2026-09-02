import SelectFormat from "@/components/SelectFormat";
import type { SetURLSearchParams } from "react-router-dom";

type Props = {
  search: string;
  searchParams: URLSearchParams;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSearchParams: SetURLSearchParams;
};

export default function SubtitleHeader({
  search,
  searchParams,
  setSearch,
  setSearchParams,
}: Props) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-brand">Library</p>

          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            My Subtitles
          </h1>

          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            Manage and download your generated subtitle files.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[19px] text-muted-foreground">
              search
            </span>

            <input
              type="text"
              placeholder="Search subtitles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <SelectFormat
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>
    </section>
  );
}
