"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { projects, research, ventures, workExperience } from "@/lib/content";
import { revealDelay } from "@/lib/motion";

const TABS = ["Work experience", "Research", "Projects"] as const;
type Tab = (typeof TABS)[number];

function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2 text-meta">
      {tags.map((tag) => (
        <li key={tag} className="rounded-sm border border-line px-2 py-0.5 text-muted">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function EntryHeader({ title, period }: { title: string; period: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h3 className="font-display text-h3 leading-tight">{title}</h3>
      <p className="text-meta tabular-nums text-muted">{period}</p>
    </div>
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
    <section id="work" aria-labelledby="work-heading" className="border-t border-line py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header data-reveal className="mb-10">
          <h2 id="work-heading" className="font-display text-h2 leading-tight tracking-tight">
            Work
          </h2>
          <p className="mt-2 max-w-[62ch] text-muted">
            What I get paid to build, what I research, and what I build for myself.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Work, research and projects"
          onKeyDown={onKeyDown}
          data-reveal
          className="mb-8 flex flex-wrap gap-2 border-b border-line"
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
                className={`-mb-px border-b-2 px-1 py-3 text-meta uppercase tracking-widest transition-colors ${
                  selected
                    ? "border-accent text-text"
                    : "border-transparent text-muted hover:text-text"
                }`}
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
          <ul className="grid gap-10">
            {workExperience.map((entry, index) => (
              <li key={entry.org} data-reveal style={revealDelay(index)}>
                <EntryHeader title={entry.org} period={entry.period} />
                <p className="text-muted">
                  {entry.role} · {entry.location}
                </p>
                <ul className="mt-3 grid gap-2 text-muted">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 40)} className="pl-4 -indent-4">
                      — {bullet}
                    </li>
                  ))}
                </ul>
                <TagList tags={entry.tags} />
              </li>
            ))}
          </ul>

          {ventures.length > 0 && (
            <div className="mt-14 border-t border-line pt-10">
              <h3 className="mb-6 text-meta font-semibold uppercase tracking-widest text-accent">
                Founder ventures
              </h3>
              <ul className="grid gap-6 md:grid-cols-2">
                {ventures.map((venture) => (
                  <li key={venture.name} className="border border-line p-5">
                    <p className="flex items-center justify-between gap-4">
                      <a
                        href={venture.href}
                        className="font-display text-h3 leading-tight text-text transition-colors hover:text-accent"
                      >
                        {venture.name}
                      </a>
                      <span className="rounded-full border border-line-strong px-2 py-0.5 text-meta text-muted">
                        {venture.status}
                      </span>
                    </p>
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
          <ul className="grid gap-10">
            {research.map((entry, index) => (
              <li key={entry.org} data-reveal style={revealDelay(index)}>
                <EntryHeader title={entry.org} period={entry.period} />
                <p className="text-muted">
                  {entry.role} · {entry.location}
                </p>
                <ul className="mt-3 grid gap-2 text-muted">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 40)} className="pl-4 -indent-4">
                      — {bullet}
                    </li>
                  ))}
                </ul>
                <TagList tags={entry.tags} />
                {entry.recognition && entry.recognition.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2 text-meta">
                    {entry.recognition.map((item) => (
                      <li
                        key={item}
                        className="rounded-sm border border-accent/40 px-2 py-0.5 text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
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
          <ul className="grid gap-10 md:grid-cols-2">
            {projects.map((project, index) => (
              <li key={project.slug} data-reveal style={revealDelay(index)}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-h3 leading-tight">{project.title}</h3>
                  {project.status && (
                    <span className="text-meta text-muted">{project.status}</span>
                  )}
                </div>
                <p className="mt-2 text-muted">{project.problem}</p>
                {project.bullets && (
                  <ul className="mt-3 grid gap-2 text-muted">
                    {project.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 40)} className="pl-4 -indent-4">
                        — {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                <TagList tags={project.tags} />
                {project.links.length > 0 && (
                  <p className="mt-3 flex flex-wrap gap-6 text-meta">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="border-b border-line-strong pb-0.5 text-accent transition-colors hover:border-accent"
                      >
                        {link.label}
                      </a>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
