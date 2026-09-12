"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { projects, research, ventures, workExperience } from "@/lib/content";
import { revealDelay } from "@/lib/motion";

const TABS = ["Work experience", "Research", "Projects"] as const;
type Tab = (typeof TABS)[number];

const num = (index: number) => String(index + 1).padStart(2, "0");

function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2 text-meta">
      {tags.map((tag) => (
        <li key={tag} className="chip rounded-sm border border-line px-2 py-0.5 text-muted">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function EntryHeader({ title, period }: { title: string; period: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pr-16">
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
          <p className="kicker">02 · What I do</p>
          <h2 id="work-heading" className="font-display text-h2 leading-tight tracking-tight">
            Work
          </h2>
          <p className="mt-2 max-w-[62ch] text-muted">
            What I get paid to build, what I research, and what I build for myself. Use the
            arrow keys to move between tabs.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Work, research and projects"
          onKeyDown={onKeyDown}
          data-reveal
          className="mb-10 inline-flex gap-1 rounded-full border border-line bg-surface p-1"
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
                className="tab-pill rounded-full px-4 py-2 text-meta font-medium uppercase tracking-widest text-muted data-[selected=true]:text-accent-ink"
                data-selected={selected}
              >
                <span aria-hidden="true" className="tab-pill__bg" />
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
              <li
                key={entry.org}
                data-reveal
                style={revealDelay(index)}
                className="entry-card border-t border-line pt-8 first:border-t-0 first:pt-0"
              >
                <span aria-hidden="true" className="entry-card__index">
                  {num(index)}
                </span>
                <EntryHeader title={entry.org} period={entry.period} />
                <p className="text-muted">
                  {entry.role} · {entry.location}
                </p>
                <p className="mt-3 max-w-[62ch] text-lead text-muted">{entry.story}</p>
                <TagList tags={entry.tags} />
              </li>
            ))}
          </ul>

          {ventures.length > 0 && (
            <div className="mt-14 border-t border-line pt-10">
              <p className="kicker">Side projects</p>
              <h3 className="mb-6 font-display text-h3">Founder ventures</h3>
              <ul className="grid gap-6 md:grid-cols-2">
                {ventures.map((venture) => (
                  <li key={venture.name}>
                    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-display text-h3 leading-tight">
                        <a href={venture.href} className="transition-colors hover:text-accent">
                          {venture.name}
                        </a>
                      </h4>
                      <span className="rounded-full border border-line-strong px-2 py-0.5 text-meta text-muted">
                        {venture.status}
                      </span>
                    </div>

                    <a
                      href={venture.href}
                      className="block"
                      aria-label={`Visit ${venture.name}`}
                    >
                      <span className="browser-frame block border border-line bg-surface">
                        <span className="browser-frame__bar">
                          <span aria-hidden="true" className="browser-frame__dot" />
                          <span aria-hidden="true" className="browser-frame__dot" />
                          <span aria-hidden="true" className="browser-frame__dot" />
                          <span className="browser-frame__url">{venture.name}</span>
                        </span>
                        <span className="browser-frame__embed">
                          <iframe
                            src={venture.href}
                            title={`Live preview of ${venture.name}`}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin"
                            tabIndex={-1}
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </a>

                    <p className="mt-3 text-muted">{venture.description}</p>
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
              <li
                key={entry.org}
                data-reveal
                style={revealDelay(index)}
                className="entry-card border-t border-line pt-8 first:border-t-0 first:pt-0"
              >
                <span aria-hidden="true" className="entry-card__index">
                  {num(index)}
                </span>
                <EntryHeader title={entry.org} period={entry.period} />
                <p className="text-muted">
                  {entry.role} · {entry.location}
                </p>
                <p className="mt-3 max-w-[62ch] text-lead text-muted">{entry.story}</p>
                <TagList tags={entry.tags} />
                {entry.recognition && entry.recognition.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2 text-meta">
                    {entry.recognition.map((item) => (
                      <li
                        key={item}
                        className="chip rounded-sm border border-accent/40 px-2 py-0.5 text-accent"
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
              <li
                key={project.slug}
                data-reveal
                style={revealDelay(index)}
                className="entry-card border border-line p-6"
              >
                <span aria-hidden="true" className="entry-card__index">
                  {num(index)}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pr-14">
                  <h3 className="font-display text-h3 leading-tight">{project.title}</h3>
                </div>
                {project.status && (
                  <span className="text-meta text-muted">{project.status}</span>
                )}
                <p className="mt-2 text-lead text-muted">{project.story}</p>
                <TagList tags={project.tags} />
                {project.links.length > 0 && (
                  <p className="mt-3 flex flex-wrap gap-6 text-meta">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} className="link-draw">
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
