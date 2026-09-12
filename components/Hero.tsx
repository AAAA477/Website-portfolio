import Image from "next/image";
import { hero, site } from "@/lib/content";
import { revealDelay } from "@/lib/motion";

export default function Hero() {
  const words = hero.heading.split(" ");

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden py-24">
      {/* Soft accent halo, contained to the hero, not an ambient page glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p
            data-reveal
            style={revealDelay(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-meta text-muted"
          >
            <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-accent" />
            {site.availability}
          </p>

          {/* Each word reveals on its own stagger, so the headline arrives as
              a considered sequence rather than one flat block. */}
          <h1
            id="hero-heading"
            className="mt-6 max-w-[20ch] font-display text-h1 leading-[1.05] tracking-tight"
          >
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                data-reveal
                style={revealDelay(index + 1)}
                className="word-reveal"
              >
                {word === "problems" || word === "think." ? (
                  <em className="text-accent not-italic">{word}</em>
                ) : (
                  word
                )}
                {index < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p
            data-reveal
            style={revealDelay(words.length + 1)}
            className="mt-6 max-w-[62ch] text-lead text-muted"
          >
            {hero.lede}
          </p>

          <p
            data-reveal
            style={revealDelay(words.length + 2)}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="button-sweep rounded-sm bg-accent px-6 py-3 font-semibold text-accent-ink transition-colors hover:text-text"
            >
              See selected work
            </a>
            <a
              href={site.cv}
              download
              className="link-draw rounded-sm border border-line-strong px-6 py-3 font-semibold !text-text transition-colors hover:border-accent"
            >
              Download CV (PDF)
            </a>
          </p>
        </div>

        <figure
          data-reveal
          data-reveal-distance="far"
          data-parallax="16"
          style={revealDelay(words.length + 2)}
          className="parallax border border-line bg-surface p-2"
        >
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            width={hero.portrait.width}
            height={hero.portrait.height}
            priority
            className="aspect-[810/1080] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
