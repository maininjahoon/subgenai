import type { NavigateOptions, URLSearchParamsInit } from "react-router-dom";
import {
  SelectValue,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "./ui/select";

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit?:
      | URLSearchParamsInit
      | ((prev: URLSearchParams) => URLSearchParamsInit),
    navigateOptions?: NavigateOptions,
  ) => void;
};

const formats = [
  { label: "All Formats", value: "all" },
  { label: "SRT", value: "srt" },
  { label: "VTT", value: "vtt" },
];

export default function SelectFormat({ searchParams, setSearchParams }: Props) {
  const selectedFormat = searchParams.get("format") ?? "all";

  const handleFormatChange = (value: string | null) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (value === null || value === "all") {
        newParams.delete("format");
      } else {
        newParams.set("format", value);
      }

      newParams.set("page", "1");

      return newParams;
    });
  };

  return (
    <Select
      items={formats}
      value={selectedFormat}
      onValueChange={handleFormatChange}
    >
      <SelectTrigger className="h-10 w-full sm:w-40">
        <SelectValue placeholder="All Formats" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subtitle Format</SelectLabel>

          {formats.map((format) => (
            <SelectItem key={format.value} value={format.value}>
              {format.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
