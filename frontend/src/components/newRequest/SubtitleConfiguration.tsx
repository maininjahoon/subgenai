type Props = {
  fileName: string;
  fileFormat: "srt" | "vtt";
  isProcessing: boolean;
  onFileNameChange: (value: string) => void;
  onFileFormatChange: (format: "srt" | "vtt") => void;
};

export default function SubtitleConfiguration({
  fileName,
  fileFormat,
  isProcessing,
  onFileNameChange,
  onFileFormatChange,
}: Props) {
  return (
    <section className="rounded-xl border border-border bg-background p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold">Subtitle Configuration</h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Configure how your generated subtitle file should be named and
          formatted.
        </p>
      </div>

      <div className="mt-5 space-y-5">
        {/* Subtitle name */}
        <div>
          <label htmlFor="subtitleName" className="text-sm font-medium">
            Subtitle name
          </label>

          <p className="mt-1 text-xs text-muted-foreground">
            Choose a name for the generated subtitle file.
          </p>

          <input
            type="text"
            id="subtitleName"
            value={fileName}
            onChange={(e) => onFileNameChange(e.target.value)}
            placeholder="e.g. my-video-subtitles"
            disabled={isProcessing}
            className="mt-2 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* Format */}
        <fieldset>
          <legend className="text-sm font-medium">Subtitle format</legend>

          <p className="mt-1 text-xs text-muted-foreground">
            Select the format you want to download.
          </p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label
              htmlFor="srtFormat"
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                isProcessing
                  ? "cursor-not-allowed opacity-50"
                  : fileFormat === "srt"
                    ? "border-brand bg-brand-soft"
                    : "border-border hover:bg-muted/50"
              }`}
            >
              <input
                type="radio"
                id="srtFormat"
                name="captionFormat"
                value="srt"
                checked={fileFormat === "srt"}
                onChange={() => onFileFormatChange("srt")}
                disabled={isProcessing}
                className="mt-0.5 accent-brand"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium">SRT</p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Standard subtitle format with broad compatibility.
                </p>
              </div>
            </label>

            <label
              htmlFor="vttFormat"
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                isProcessing
                  ? "cursor-not-allowed opacity-50"
                  : fileFormat === "vtt"
                    ? "border-brand bg-brand-soft"
                    : "border-border hover:bg-muted/50"
              }`}
            >
              <input
                type="radio"
                id="vttFormat"
                name="captionFormat"
                value="vtt"
                checked={fileFormat === "vtt"}
                onChange={() => onFileFormatChange("vtt")}
                disabled={isProcessing}
                className="mt-0.5 accent-brand"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium">VTT</p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Web Video Text Tracks format for web video players.
                </p>
              </div>
            </label>
          </div>
        </fieldset>
      </div>
    </section>
  );
}
