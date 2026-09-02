import { deleteSubtitle, getSubtitles } from "@/api/subtitles";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import SubtitlesSkeleton from "@/components/skeletons/SubtitlesSkeleton";
import { toast } from "@/components/ui/toast";

import SubtitleHeader from "@/components/subtitles/SubtitleHeader";
import SubtitleTable from "@/components/subtitles/SubtitleTable";
import SubtitleMobileList from "@/components/subtitles/SubtitleMobileList";
import SubtitleEmptyState from "@/components/subtitles/SubtitleEmptyState";
import SubtitlePagination from "@/components/subtitles/SubtitlePagination";

const PAGE_SIZE = 5;

export default function Subtitles() {
  return (
    <Suspense fallback={<SubtitlesSkeleton />}>
      <SubtitlesContent />
    </Suspense>
  );
}

function SubtitlesContent() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const rawPage = searchParams.get("page");
  const parsedPage = Number(rawPage);
  const page =
    rawPage === null || !Number.isInteger(parsedPage) || parsedPage < 1
      ? 1
      : parsedPage;

  const searchTerm = searchParams.get("search") ?? "";

  const rawFormat = searchParams.get("format");
  const format = rawFormat === "srt" || rawFormat === "vtt" ? rawFormat : "";

  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ["subtitles", page, searchTerm, format],

    queryFn: () => {
      const params = new URLSearchParams();

      params.set("page", String(page));

      if (searchTerm) {
        params.set("search", searchTerm);
      }

      if (format) {
        params.set("format", format);
      }

      return getSubtitles(params.toString());
    },

    staleTime: 30_000,
  });

  const subtitles = data.subtitles;
  const totalSubtitles = data.totalSubtitles;

  const totalPages = Math.ceil(totalSubtitles / PAGE_SIZE);

  const start = totalSubtitles === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;

  const end = Math.min(page * PAGE_SIZE, totalSubtitles);

  useEffect(() => {
    const allowed = new Set(["page", "search", "format"]);
    const params = new URLSearchParams(searchParams);

    let changed = false;

    for (const key of params.keys()) {
      if (!allowed.has(key)) {
        params.delete(key);
        changed = true;
      }
    }

    const rawPage = params.get("page");
    const pageNumber = Number(rawPage);

    if (rawPage === null || !Number.isInteger(pageNumber) || pageNumber < 1) {
      params.set("page", "1");
      changed = true;
    }

    const rawFormat = params.get("format");

    if (rawFormat !== null && rawFormat !== "srt" && rawFormat !== "vtt") {
      params.delete("format");
      changed = true;
    }

    if (changed) {
      setSearchParams(params, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmedSearch = search.trim();
      const currentSearch = searchParams.get("search") ?? "";

      if (trimmedSearch === currentSearch) {
        return;
      }

      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);

          if (trimmedSearch) {
            params.set("search", trimmedSearch);
          } else {
            params.delete("search");
          }

          params.set("page", "1");

          return params;
        },
        { replace: true },
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search, searchParams, setSearchParams]);

  const handleDeleteSubtitle = async (id: number) => {
    try {
      await deleteSubtitle(id);

      const shouldGoToPreviousPage = subtitles.length === 1 && page > 1;

      if (shouldGoToPreviousPage) {
        setSearchParams((prev) => {
          prev.set("page", String(page - 1));
          return prev;
        });
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["subtitles"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["recent-subtitles"],
        }),
      ]);

      toast.add({
        title: "Subtitle deleted",
        description: "The subtitle was deleted successfully.",
        type: "success",
      });
    } catch (err) {
      toast.add({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to delete subtitle.",
        type: "error",
      });
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 pb-24 sm:px-6 md:gap-6 md:py-6 md:pb-8">
      <SubtitleHeader
        search={search}
        searchParams={searchParams}
        setSearch={setSearch}
        setSearchParams={setSearchParams}
      />

      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {subtitles.length > 0 ? (
          <>
            <SubtitleTable
              subtitles={subtitles}
              onDelete={handleDeleteSubtitle}
            />

            <SubtitleMobileList
              subtitles={subtitles}
              onDelete={handleDeleteSubtitle}
            />
          </>
        ) : (
          <SubtitleEmptyState />
        )}

        <SubtitlePagination
          page={page}
          totalPages={totalPages}
          totalSubtitles={totalSubtitles}
          start={start}
          end={end}
          setSearchParams={setSearchParams}
        />
      </section>
    </div>
  );
}
