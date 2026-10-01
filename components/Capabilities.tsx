import { capabilities } from "@/lib/content";
import { revealDelay } from "@/lib/motion";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="slide border-b-8 border-band bg-surface py-16 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <header data-reveal className="mb-12 md:mb-16">
          <p className="kicker">03 · Under the hood</p>
          <h2
            id="capabilities-heading"
            className="title-wipe font-display text-h2 font-extrabold uppercase leading-none tracking-tight"
          >
            Capabilities and tech stack
          </h2>
          <p className="mt-4 max-w-[62ch] text-lead text-muted">
            What I reach for, grouped by where it sits in the stack.
          </p>
        </header>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
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
                  className="border-b-4 border-accent pb-3 font-display text-xl font-bold uppercase tracking-wide"
                >
                  {group.title}
                </h3>
                <ul className="mt-6 grid gap-3 font-medium text-muted">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
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
