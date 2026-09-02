import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <section className="mx-auto my-24 w-full max-w-3xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-10 shadow-sm sm:px-10">
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to streamline your workflow?
          </h2>

          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Join developers and creators automating their subtitle generation.
          </p>

          <Link
            to="/signin"
            className="mt-2 rounded-lg bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground shadow-sm transition-colors hover:bg-brand-hover"
          >
            Start Generating Now
          </Link>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_50%_100%,var(--brand-soft),transparent_70%)]" />
      </div>
    </section>
  );
}
