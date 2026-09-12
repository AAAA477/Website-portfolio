import Image from "next/image";
import type { CSSProperties } from "react";
import { hero, site } from "@/lib/content";

/** Staggers a reveal by one 90ms step per index. */
const delay = (step: number): CSSProperties =>
  ({ "--reveal-delay": `${step * 90}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="py-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p
            data-reveal
            style={delay(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-meta text-muted"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            {site.availability}
          </p>

          <h1
            id="hero-heading"
            data-reveal
            style={delay(1)}
            className="mt-6 max-w-[20ch] font-display text-h1 leading-[1.05] tracking-tight"
          >
            {hero.heading}
          </h1>

          <p
            data-reveal
            style={delay(2)}
            className="mt-6 max-w-[62ch] text-lead text-muted"
          >
            {hero.lede}
          </p>

          <p data-reveal style={delay(3)} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="rounded-sm bg-accent px-6 py-3 font-semibold text-accent-ink transition-colors hover:bg-text"
            >
              See selected work
            </a>
            <a
              href={site.cv}
              download
              className="rounded-sm border border-line-strong px-6 py-3 font-semibold transition-colors hover:border-accent hover:bg-surface"
            >
              Download CV (PDF)
            </a>
          </p>
        </div>

        <figure
          data-reveal
          data-reveal-distance="far"
          style={delay(3)}
          className="border border-line bg-surface p-2"
        >
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            width={hero.portrait.width}
            height={hero.portrait.height}
            priority
            className="aspect-[624/811] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
