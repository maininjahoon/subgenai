import { Link } from "react-router-dom";

export default function Information() {
  return (
    <section className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-4xl flex-col items-center justify-center px-4 pt-24 text-center sm:px-6">
      <div className="mb-5 inline-flex items-center rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-medium text-brand-muted">
        AI-powered subtitle generation
      </div>

      <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Generate accurate subtitles from your{" "}
        <span className="text-brand">audio and video files.</span>
      </h1>

      <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
        Upload media, choose SRT or VTT, and get professional subtitles in
        seconds. Media is deleted immediately after processing for privacy.
      </p>

      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Link
          to="/signin"
          className="rounded-lg bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground shadow-sm transition-colors hover:bg-brand-hover"
        >
          Generate Subtitles
        </Link>

        <Link
          to="/signin"
          className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          Sign in
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-64 max-w-3xl bg-[radial-gradient(circle_at_center,var(--brand-soft),transparent_70%)] blur-2xl" />
    </section>
  );
}
