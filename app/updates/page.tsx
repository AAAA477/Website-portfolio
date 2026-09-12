import type { Metadata } from "next";
import { site, updates } from "@/lib/content";

export const metadata: Metadata = {
  title: `Updates · ${site.name}`,
  description: `A running log of what ${site.shortName} is working on.`,
};

export default function UpdatesPage() {
  return (
    <main id="main" className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="mb-14">
          <p className="kicker">06 · As it happens</p>
          <h1 className="font-display text-h1 leading-tight tracking-tight">Updates</h1>
          <p className="mt-2 max-w-[62ch] text-muted">
            A running, dated log of real milestones, not a blog. New entries go at the top.
          </p>
        </header>

        <ol className="relative grid gap-10 border-l border-line pl-8">
          {updates.map((update) => (
            <li key={update.date} className="entry-card relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.32rem] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent"
              />
              <p className="text-meta tabular-nums uppercase tracking-widest text-accent">
                {update.date}
              </p>
              <p className="mt-2 max-w-[62ch] text-lead text-muted">{update.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
