import type { Metadata } from "next";
import { withBase } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Page not found · Andrew Ansah",
};

/**
 * Static export emits this as 404.html, which the host serves for any unknown
 * path — so it may render at any depth. Plain anchors with the base path
 * applied by hand, rather than next/link, keep the links correct wherever it
 * lands.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60svh] w-full max-w-7xl flex-col justify-center px-6 py-16 md:py-24"
    >
      <p className="kicker">Error 404</p>
      <h1 className="max-w-[16ch] font-display text-h1 font-extrabold uppercase leading-[0.98] tracking-tight">
        That page <span className="text-accent">doesn&apos;t exist.</span>
      </h1>
      <p className="mt-6 max-w-[54ch] text-lead text-muted">
        The link may be mistyped or out of date. Everything on this site is reachable from the
        home page.
      </p>
      <p className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <a
          href={withBase("/")}
          className="button-sweep bg-accent px-8 py-4 text-center font-display text-sm font-bold uppercase tracking-wide text-accent-ink transition-colors hover:text-text"
        >
          Back to home
        </a>
        <a
          href={withBase("/#work")}
          className="border-2 border-accent px-8 py-4 text-center font-display text-sm font-bold uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-accent-ink"
        >
          See selected work
        </a>
      </p>
    </main>
  );
}
