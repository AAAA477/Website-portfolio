import { about, site } from "@/lib/content";
import { revealDelay } from "@/lib/motion";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 md:grid-cols-[1.25fr_1fr]">
        <div data-reveal>
          <h2 id="about-heading" className="font-display text-h2 leading-tight tracking-tight">
            About
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-4 max-w-[62ch] text-lead text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div data-reveal style={revealDelay(1)}>
          <h3 className="mb-4 text-meta font-semibold uppercase tracking-widest text-accent">
            Education
          </h3>
          <dl className="mb-10">
            {about.education.map((entry) => (
              <div key={entry.detail}>
                <dt className="text-meta tabular-nums text-muted">{entry.period}</dt>
                <dd className="mb-4 border-b border-line pb-4">{entry.detail}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mb-4 text-meta font-semibold uppercase tracking-widest text-accent">
            Elsewhere
          </h3>
          <ul className="grid gap-2 text-muted">
            <li>
              <a
                href={site.linkedin}
                className="border-b border-line-strong pb-0.5 text-accent transition-colors hover:border-accent"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.github}
                className="border-b border-line-strong pb-0.5 text-accent transition-colors hover:border-accent"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
