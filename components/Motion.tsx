"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement motion layer.
 *
 * Renders only the scroll progress bar. Everything else it does is attach
 * behaviour to elements that already carry `data-reveal`.
 *
 * Gated twice over: the CSS that hides revealable content applies only under
 * `html.js-motion`, and that class is added only when JavaScript runs and the
 * visitor has not asked for reduced motion. If either is false the page renders
 * complete and static — nothing is ever stranded at opacity 0.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const supported = "IntersectionObserver" in window;

    let observer: IntersectionObserver | null = null;
    let detachScroll: (() => void) | null = null;

    const revealAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-revealed"));
    };

    const start = () => {
      root.classList.add("js-motion");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer?.unobserve(entry.target);
            }
          });
        },
        // Fire slightly before the element reaches the viewport edge, so the
        // motion finishes as it settles into view rather than after.
        { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
      );

      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => observer?.observe(el));

      const progress = document.querySelector<HTMLElement>(".scroll-progress");
      const header = document.querySelector<HTMLElement>(".site-header");
      let ticking = false;

      // Read inside rAF so scrolling never forces synchronous layout.
      const onFrame = () => {
        const scrollable = root.scrollHeight - window.innerHeight;
        const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;

        progress?.style.setProperty("--progress", Math.min(1, Math.max(0, ratio)).toFixed(4));
        header?.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");

        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(onFrame);
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onFrame();

      detachScroll = () => window.removeEventListener("scroll", onScroll);
    };

    const stop = () => {
      root.classList.remove("js-motion");
      observer?.disconnect();
      observer = null;
      detachScroll?.();
      detachScroll = null;
      // Anything mid-reveal stays visible rather than stranded.
      revealAll();
    };

    if (supported && !calm.matches) {
      start();
    } else {
      revealAll();
    }

    // Honour the preference changing mid-session.
    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stop();
      } else if (supported && !root.classList.contains("js-motion")) {
        start();
      }
    };

    calm.addEventListener("change", onPreferenceChange);

    return () => {
      calm.removeEventListener("change", onPreferenceChange);
      observer?.disconnect();
      detachScroll?.();
      root.classList.remove("js-motion");
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
