import clsx from "clsx";

type Feature = {
  title: string;
  description: string;
  icon: string;
  className: string;
  supportedFormats?: string[];
};

export default function FeaturesSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for Performance & Privacy
        </p>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Everything you need to turn your media into production-ready
          subtitles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {features.map((feature) => {
          const { title, description, icon, className, supportedFormats } =
            feature;

          return (
            <article
              key={title}
              className={clsx(
                "group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 md:p-6",
                className,
              )}
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-brand-soft">
                <span className="material-symbols-outlined size-5 text-brand-muted">
                  {icon}
                </span>
              </div>

              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>

              {supportedFormats && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {supportedFormats.map((format) => (
                    <span
                      key={format}
                      className="rounded-md border border-border bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

const features: Feature[] = [
  {
    title: "Fast Generation",
    description:
      "Our high-performance pipeline processes media files faster than real-time, delivering accurate subtitles when you need them.",
    icon: "speed",
    className: "md:col-span-8",
  },
  {
    title: "Multiple Formats",
    description:
      "Download your generated subtitles in standard formats including SRT and VTT, ready for immediate use.",
    icon: "description",
    className: "md:col-span-4",
  },
  {
    title: "Privacy-First",
    description:
      "Your data is yours. Original media files are automatically and permanently deleted from our servers immediately after processing.",
    icon: "security",
    className: "md:col-span-5",
  },
  {
    title: "Audio & Video Support",
    description:
      "Seamlessly process a wide variety of formats. We support industry standard files.",
    icon: "audio_file",
    className: "md:col-span-7",
    supportedFormats: [".mp4", ".mov", ".avi", ".mp3", ".wav", ".flac"],
  },
];
