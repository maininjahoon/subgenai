import { Link } from "react-router-dom";

export default function DashboardWelcome() {
  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl space-y-2">
          <p className="text-sm font-medium text-brand">
            Welcome to your workspace
          </p>

          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Good {getGreeting()}!
          </h2>

          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            Generate subtitles from your next audio or video file.
          </p>
        </div>

        <Link
          to="/account/new-request"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/20 transition-colors hover:bg-brand-hover sm:w-auto"
        >
          <span className="material-symbols-outlined size-5">add_box</span>
          <span>Generate Subtitles</span>
        </Link>
      </div>
    </section>
  );
}
