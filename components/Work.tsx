"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import VentureEmbed from "@/components/VentureEmbed";
import { projects, research, ventures, workExperience } from "@/lib/content";

const TABS = ["Work experience", "Research", "Projects"] as const;
type Tab = (typeof TABS)[number];

function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2 text-meta font-bold uppercase tracking-wider">
      {tags.map((tag) => (
        <li key={tag} className="chip border border-line bg-surface px-3 py-1.5 text-accent">
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** One banded row: who and when on the left, the story on the right. */
function EntryRow({
  title,
  meta,
  period,
  children,
}: {
  title: string;
  meta?: string;
  period?: string;
  children: ReactNode;
}) {
  return (
    <li data-reveal className="border-b border-line py-10 first:pt-0">
      <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-h3 font-bold uppercase leading-tight">{title}</h3>
          {meta && (
            <p className="text-meta font-bold uppercase tracking-widest text-accent">{meta}</p>
          )}
          {period && <p className="text-meta font-medium tabular-nums text-muted">{period}</p>}
        </div>
        <div>{children}</div>
      </div>
    </li>
  );
}

export default function Work() {
  const [active, setActive] = useState<Tab>("Work experience");
  const baseId = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = TABS.indexOf(active);
    let next = index;

    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    else return;

    event.preventDefault();
    setActive(TABS[next]);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="slide border-b-8 border-band py-16 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <header data-reveal className="mb-12 md:mb-16">
          <p className="kicker">02 · What I do</p>
          <h2
            id="work-heading"
            className="title-wipe font-display text-h2 font-extrabold uppercase leading-none tracking-tight"
          >
            Work
          </h2>
          <p className="mt-4 max-w-[62ch] text-lead text-muted">
            What I get paid to build, what I research, and what I build for myself.
            <span className="sr-only"> Use the arrow keys to move between tabs.</span>
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Work, research and projects"
          onKeyDown={onKeyDown}
          data-reveal
          className="mb-12 flex w-full max-w-full overflow-x-auto border-b-2 border-line"
        >
          {TABS.map((tab, index) => {
            const selected = tab === active;
            return (
              <button
                key={tab}
                id={`${baseId}-tab-${index}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab)}
                className="tab-underline whitespace-nowrap px-4 py-3 text-meta font-bold uppercase tracking-widest text-muted hover:text-text sm:px-6"
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Work experience */}
        <div
          id={`${baseId}-panel-0`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-0`}
          hidden={active !== "Work experience"}
        >
          <ul>
            {workExperience.map((entry) => (
              <EntryRow
                key={entry.org}
                title={entry.org}
                meta={`${entry.role} · ${entry.location}`}
                period={entry.period}
              >
                <p className="max-w-[62ch] text-lead">{entry.story}</p>
                <TagList tags={entry.tags} />
              </EntryRow>
            ))}
          </ul>

          {ventures.length > 0 && (
            <div className="mt-16 md:mt-24">
              <p className="kicker">Side projects</p>
              <h3 className="mb-10 font-display text-h2 font-extrabold uppercase leading-none tracking-tight">
                Founder ventures
              </h3>
              <ul className="grid gap-12 lg:grid-cols-2">
                {ventures.map((venture) => (
                  <li key={venture.name}>
                    <div className="venture-preview relative">
                      <span className="browser-frame block border-4 border-accent bg-surface">
                        <span className="browser-frame__bar" aria-hidden="true">
                          <span className="browser-frame__dot" />
                          <span className="browser-frame__dot" />
                          <span className="browser-frame__dot" />
                          <span className="browser-frame__url">{venture.name}</span>
                        </span>
                        <VentureEmbed
                          href={venture.href}
                          name={venture.name}
                          status={venture.status}
                        />
                      </span>
                      {/* The preview is inert (pointer-events: none, not
                          focusable); this overlay is the real, accessible link. */}
                      <a
                        href={venture.href}
                        aria-label={`Visit ${venture.name}`}
                        className="absolute inset-0 z-10"
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                      <h4 className="font-display text-h3 font-bold leading-tight">
                        <a href={venture.href} className="transition-colors hover:text-accent">
                          {venture.name}
                        </a>
                      </h4>
                      <span className="border border-line-strong px-2.5 py-1 text-meta font-bold uppercase tracking-widest text-accent">
                        {venture.status}
                      </span>
                    </div>
                    <p className="mt-2 text-muted">{venture.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Research */}
        <div
          id={`${baseId}-panel-1`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-1`}
          hidden={active !== "Research"}
        >
          <ul>
            {research.map((entry) => (
              <EntryRow
                key={entry.org}
                title={entry.org}
                meta={`${entry.role} · ${entry.location}`}
                period={entry.period}
              >
                <p className="max-w-[62ch] text-lead">{entry.story}</p>
                <TagList tags={entry.tags} />
                {entry.recognition && entry.recognition.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2 text-meta font-bold uppercase tracking-wider">
                    {entry.recognition.map((item) => (
                      <li key={item} className="chip border border-band px-3 py-1.5 text-text">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </EntryRow>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div
          id={`${baseId}-panel-2`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-2`}
          hidden={active !== "Projects"}
        >
          <ul>
            {projects.map((project) => (
              <EntryRow key={project.slug} title={project.title} meta={project.status}>
                <p className="max-w-[62ch] text-lead">{project.story}</p>
                <TagList tags={project.tags} />
                {project.links.length > 0 && (
                  <p className="mt-5 flex flex-wrap gap-6 text-meta font-bold">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} className="link-draw">
                        {link.label}
                      </a>
                    ))}
                  </p>
                )}
              </EntryRow>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
