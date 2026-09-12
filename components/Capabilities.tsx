import { capabilities } from "@/lib/content";
import { revealDelay } from "@/lib/motion";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="border-t border-line py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <header data-reveal className="mb-10">
          <p className="kicker">03 · Under the hood</p>
          <h2
            id="capabilities-heading"
            className="font-display text-h2 leading-tight tracking-tight"
          >
            Capabilities and tech stack
          </h2>
          <p className="mt-2 max-w-[62ch] text-muted">
            What I reach for, grouped by where it sits in the stack.
          </p>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((group, index) => {
            const headingId = `cap-${group.title.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <section
                key={group.title}
                aria-labelledby={headingId}
                data-reveal
                style={revealDelay(index)}
              >
                <h3
                  id={headingId}
                  className="border-b border-line pb-2 text-meta font-semibold uppercase tracking-widest text-accent"
                >
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="chip rounded-full border border-line px-3 py-1 text-meta text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
