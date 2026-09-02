import type { ProcessingStage } from "@/types/processingStage";

type Props = {
  processingStage: ProcessingStage;
  downloadUrl: string | null;
  error: string | null;
  onNewRequest: () => void;
  onRetry?: () => void;
};

const steps = [
  {
    key: "preparing",
    title: "Preparing your request",
    description: "Getting everything ready",
    icon: "tune",
  },
  {
    key: "processing",
    title: "Processing your media",
    description: "Processing the uploaded media",
    icon: "movie",
  },
  {
    key: "generating",
    title: "Generating subtitles",
    description: "Creating your subtitle file",
    icon: "subtitles",
  },
  {
    key: "finishing",
    title: "Finishing up",
    description: "Preparing your subtitle for download",
    icon: "auto_awesome",
  },
] as const;

const stageOrder = [
  "preparing",
  "processing",
  "generating",
  "finishing",
] as const;

export default function ProgressPanel({
  processingStage,
  downloadUrl,
  error,
  onNewRequest,
  onRetry,
}: Props) {
  const isCompleted = processingStage === "completed";
  const isFailed = processingStage === "failed";

  const currentStageIndex = stageOrder.indexOf(
    processingStage as (typeof stageOrder)[number],
  );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background/60 p-4 backdrop-blur-md">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-6 sm:px-6">
          {isCompleted ? (
            <>
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <span className="material-symbols-outlined text-[30px]">
                  check_circle
                </span>
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold tracking-tight">
                  Subtitles ready
                </h2>

                <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                  Your subtitle file has been generated successfully and is
                  ready to download.
                </p>
              </div>
            </>
          ) : isFailed ? (
            <>
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive-soft text-destructive">
                <span className="material-symbols-outlined text-[30px]">
                  error
                </span>
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold tracking-tight">
                  Generation failed
                </h2>

                <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                  We couldn't complete your subtitle request.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <span className="material-symbols-outlined text-[25px]">
                  subtitles
                </span>
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold tracking-tight">
                  Generating your subtitles
                </h2>

                <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                  This may take a moment. Please keep this page open.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Active progress */}
        {!isCompleted && !isFailed && (
          <div className="px-5 py-6 sm:px-6">
            <div className="space-y-1">
              {steps.map((step, index) => {
                const stepIndex = index;
                const isActive = step.key === processingStage;
                const isFinished = currentStageIndex > stepIndex;

                return (
                  <div key={step.key}>
                    <div className="flex items-center gap-3">
                      {/* Step icon */}
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isFinished
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : isActive
                              ? "border-brand/40 bg-brand-soft text-brand"
                              : "border-border bg-muted/30 text-muted-foreground"
                        }`}
                      >
                        {isFinished ? (
                          <span className="material-symbols-outlined text-[18px]">
                            check
                          </span>
                        ) : isActive ? (
                          <span className="size-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
                        ) : (
                          <span className="material-symbols-outlined text-[18px]">
                            {step.icon}
                          </span>
                        )}
                      </div>

                      {/* Step text */}
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-foreground"
                              : isFinished
                                ? "text-foreground"
                                : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Connector */}
                    {index < steps.length - 1 && (
                      <div
                        className={`ml-4.25 h-5 w-px transition-colors ${
                          isFinished ? "bg-emerald-500/30" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Success content */}
        {isCompleted && (
          <div className="px-5 py-6 sm:px-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <span className="material-symbols-outlined text-[20px]">
                    description
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">Subtitle file generated</p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Your file is ready to download.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error content */}
        {isFailed && (
          <div className="px-5 py-6 sm:px-6">
            <div className="rounded-xl border border-destructive/20 bg-destructive-soft p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined shrink-0 text-[20px] text-destructive">
                  error
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-destructive">
                    Something went wrong
                  </p>

                  {error && (
                    <p className="mt-1 text-xs leading-5 text-destructive/80">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="border-t border-border bg-muted/10 px-5 py-4 sm:px-6">
          {isCompleted ? (
            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover sm:w-auto"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    download
                  </span>
                  Download subtitle
                </a>
              )}

              <button
                type="button"
                onClick={onNewRequest}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-auto"
              >
                New request
              </button>
            </div>
          ) : isFailed ? (
            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    refresh
                  </span>
                  Try again
                </button>
              )}

              <button
                type="button"
                onClick={onNewRequest}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                New request
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-brand" />

              <p className="text-xs text-muted-foreground">
                Please don't close or refresh this page
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
