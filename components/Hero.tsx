import Image from "next/image";
import { Fragment } from "react";
import { hero, site } from "@/lib/content";
import { revealDelay } from "@/lib/motion";

export default function Hero() {
  const words = hero.heading.split(" ");

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="slide slide-hero relative overflow-hidden border-b-8 border-band py-12 md:py-20"
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p
            data-reveal
            style={revealDelay(0)}
            className="inline-flex items-center gap-3 border border-line bg-surface px-4 py-2 text-meta font-bold uppercase tracking-widest text-accent"
          >
            <span aria-hidden="true" className="size-2.5 animate-pulse rounded-full bg-band" />
            {site.availability}
          </p>

          {/* Each word reveals on its own stagger, so the headline arrives as
              a considered sequence rather than one flat block. */}
          <h1
            id="hero-heading"
            className="mt-8 max-w-[18ch] font-display text-h1 font-extrabold uppercase leading-[0.98] tracking-tight"
          >
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span data-reveal style={revealDelay(index + 1)} className="word-reveal">
                  {word === "problems" || word === "think." ? (
                    <em className="text-accent not-italic">{word}</em>
                  ) : (
                    word
                  )}
                </span>
                {/* The space lives outside the inline-block: a trailing space
                    inside one collapses and the words run together. */}
                {index < words.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </h1>

          <p
            data-reveal
            style={revealDelay(words.length + 1)}
            className="mt-8 max-w-[54ch] text-lead text-muted"
          >
            {hero.lede}
          </p>

          <p
            data-reveal
            style={revealDelay(words.length + 2)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <a
              href="#work"
              className="button-sweep bg-accent px-8 py-4 text-center font-display text-sm font-bold uppercase tracking-wide text-accent-ink transition-colors hover:text-text"
            >
              See selected work
            </a>
            <a
              href={site.cv}
              download
              className="border-2 border-accent px-8 py-4 text-center font-display text-sm font-bold uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-accent-ink"
            >
              Download CV (PDF)
            </a>
          </p>
        </div>

        {/* Arch frame: a red block offset behind the portrait, so the photo
            reads as cut out of a banded strip. */}
        <figure
          data-reveal
          data-reveal-distance="far"
          data-parallax="16"
          style={revealDelay(words.length + 2)}
          className="parallax relative mx-auto w-full max-w-xs sm:max-w-sm lg:ml-auto lg:mr-4 lg:max-w-md"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-b-xl rounded-t-full bg-band md:translate-x-4 md:translate-y-4"
          />
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            width={hero.portrait.width}
            height={hero.portrait.height}
            priority
            className="relative aspect-[810/1080] w-full rounded-b-xl rounded-t-full border-4 border-accent bg-surface object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
