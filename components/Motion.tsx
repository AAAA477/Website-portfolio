"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement motion layer.
 *
 * Renders the scroll progress bar and the roaming spotlight. Everything
 * else it does is attach behaviour to elements that already exist in the
 * DOM: `[data-reveal]` fade-ups, `[data-parallax]` displacement, and which
 * `.slide` currently sits nearest the viewport centre — which in turn
 * drives that slide's recede/arrive state, the rail's current link, the
 * page-number counter, and the spotlight's position, all from one measure
 * per scroll frame rather than four separate observers.
 *
 * Gated twice over: the CSS that hides revealable content applies only under
 * `html.js-motion`, and that class is added only when JavaScript runs and the
 * visitor has not asked for reduced motion. If either is false the page renders
 * complete and static; nothing is ever stranded at opacity 0.
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
      const parallaxEls = Array.prototype.slice.call(
        document.querySelectorAll<HTMLElement>("[data-parallax]"),
      );
      const slides = Array.prototype.slice.call(
        document.querySelectorAll<HTMLElement>(".slide"),
      ) as HTMLElement[];
      const railLinks = Array.prototype.slice.call(
        document.querySelectorAll<HTMLAnchorElement>(".slide-rail__link"),
      ) as HTMLAnchorElement[];
      const counter = document.querySelector<HTMLElement>(".slide-counter__current");
      let ticking = false;

      // Read inside rAF so scrolling never forces synchronous layout.
      const onFrame = () => {
        const scrollable = root.scrollHeight - window.innerHeight;
        const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;

        progress?.style.setProperty("--progress", Math.min(1, Math.max(0, ratio)).toFixed(4));
        header?.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");

        // Small, contained displacement: how far an element's centre sits
        // from the viewport centre, scaled by its own strength. Reading
        // getBoundingClientRect here is fine: it's inside rAF, and there are
        // only ever a handful of parallax elements on the page.
        const viewportMid = window.innerHeight / 2;
        parallaxEls.forEach((el) => {
          const strength = Number(el.dataset.parallax || 12);
          const rect = el.getBoundingClientRect();
          const elMid = rect.top + rect.height / 2;
          const offset = ((viewportMid - elMid) / viewportMid) * strength;
          el.style.setProperty("--parallax", offset.toFixed(2));
        });

        // Whichever slide's centre is closest to the viewport centre is
        // "the" current slide — everything below reads off that one index.
        let nearestIndex = 0;
        let nearestDistance = Infinity;
        slides.forEach((slide, index) => {
          const rect = slide.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          const distance = Math.abs(viewportMid - mid);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        const current = slides[nearestIndex];

        slides.forEach((slide, index) => {
          slide.classList.toggle("is-active", index === nearestIndex);
        });

        railLinks.forEach((link) => {
          link.classList.toggle("is-current", link.dataset.slide === current?.id);
        });

        if (counter) {
          counter.textContent = String(nearestIndex + 1).padStart(2, "0");
        }

        if (current && root.getAttribute("data-spotlight") !== current.id) {
          root.setAttribute("data-spotlight", current.id);
        }

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
      // Anything mid-reveal stays visible rather than stranded. The
      // recede/spotlight/counter styling is scoped to html.js-motion,
      // which is now gone, so leaving their classes/attributes as-is
      // doesn't matter — none of it renders without that class.
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

  // Keyboard advance: a presentation clicker. Down/PageDown/Space moves to
  // the next slide, Up/PageUp to the previous — independent of the motion
  // preference above, since this is navigation, not decoration; only the
  // scroll itself (smooth vs. instant) respects prefers-reduced-motion.
  // Left/Right are deliberately not mapped here: Work's tablist already
  // uses them to switch tabs, and this must never fight that.
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forward = new Set(["ArrowDown", "PageDown", " "]);
    const backward = new Set(["ArrowUp", "PageUp"]);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) {
        return;
      }

      const direction = forward.has(event.key) ? 1 : backward.has(event.key) ? -1 : 0;
      if (direction === 0) return;

      const slides = Array.from(document.querySelectorAll<HTMLElement>(".slide"));
      if (slides.length === 0) return;

      const viewportMid = window.innerHeight / 2;
      const currentIndex = slides.reduce((closest, slide, index) => {
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(viewportMid - (rect.top + rect.height / 2));
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: 0, distance: Infinity }).index;

      const next = slides[currentIndex + direction];
      if (!next) return;

      event.preventDefault();
      next.scrollIntoView({ behavior: calm.matches ? "auto" : "smooth", block: "start" });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />
    </>
  );
}
