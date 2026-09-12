import AboutPhoto from "@/components/AboutPhoto";
import { about, site } from "@/lib/content";
import { revealDelay } from "@/lib/motion";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 md:grid-cols-[1.25fr_1fr]">
        <div data-reveal>
          <p className="kicker">04 · Who's asking</p>
          <h2 id="about-heading" className="font-display text-h2 leading-tight tracking-tight">
            About
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-4 max-w-[62ch] text-lead text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div data-reveal style={revealDelay(1)} className="grid gap-10">
          <AboutPhoto />

          <div>
            <h3 className="mb-4 text-meta font-semibold uppercase tracking-widest text-accent">
              Education
            </h3>
            <dl>
              {about.education.map((entry) => (
                <div key={entry.detail}>
                  <dt className="text-meta tabular-nums text-muted">{entry.period}</dt>
                  <dd className="mb-4 border-b border-line pb-4">{entry.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="mb-4 text-meta font-semibold uppercase tracking-widest text-accent">
              Leadership
            </h3>
            <dl>
              {about.leadership.map((entry) => (
                <div key={entry.org}>
                  <dt className="text-meta text-muted">{entry.period}</dt>
                  <dd className="mb-4 border-b border-line pb-4">
                    {entry.role}, {entry.org}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="mb-4 text-meta font-semibold uppercase tracking-widest text-accent">
              Elsewhere
            </h3>
            <ul className="grid gap-2 text-muted">
              <li>
                <a href={site.linkedin} className="link-draw">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.github} className="link-draw">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
