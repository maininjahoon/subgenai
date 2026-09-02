import React from "react";

type Props = {
  file: File | null;
  isProcessing: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

export default function MediaUpload({
  file,
  isProcessing,
  onFileChange,
  onRemove,
}: Props) {
  return (
    <section>
      <div className="mb-2.5">
        <h2 className="text-sm font-semibold">Media File</h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Upload an audio or video file up to 100 MB.
        </p>
      </div>

      <label
        htmlFor="media-upload"
        className={`group flex min-h-52 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-8 text-center transition-colors ${
          isProcessing
            ? "cursor-not-allowed border-border bg-muted/30 opacity-60"
            : "cursor-pointer border-border bg-background hover:border-brand/50 hover:bg-brand-soft"
        }`}
      >
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-soft">
          <span className="material-symbols-outlined text-2xl text-brand">
            cloud_upload
          </span>
        </div>

        <p className="text-sm font-medium">Click to upload a file</p>

        <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
          MP3, WAV, MP4, MOV and other supported audio/video formats
        </p>

        <span className="mt-2 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          Maximum 100 MB
        </span>

        <input
          id="media-upload"
          type="file"
          accept="audio/*,video/*"
          onChange={onFileChange}
          disabled={isProcessing}
          className="hidden"
        />
      </label>

      {file && (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-3 sm:px-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
            <span className="material-symbols-outlined text-lg text-brand">
              description
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{file.name}</p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>

          {!isProcessing && (
            <button
              type="button"
              onClick={onRemove}
              className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive-soft hover:text-destructive"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </section>
  );
}
