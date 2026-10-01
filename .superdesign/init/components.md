# Shared UI components

Stack: Next.js 15 (App Router, static export) + React 19 + TypeScript + Tailwind v4 (tokens in `app/globals.css` `@theme`). No component library; no shared primitives directory — buttons/chips/cards are Tailwind class patterns plus CSS helper classes (`.chip`, `.entry-card`, `.button-sweep`, `.link-draw`, `.kicker`, `.tab-pill`, `.browser-frame`) defined in globals.css.

### `components/ThemeToggle.tsx`
```tsx
"use client";

import { useEffect, useState } from "react";
import { THEME_BG } from "@/lib/theme";

type Theme = "light" | "dark";

/**
 * Cosmetic, JavaScript-only by design — the rest of the page is already
 * complete without JS (light/dark both render correctly on first paint via
 * the blocking script in layout.tsx and the prefers-color-scheme fallback
 * in globals.css), so there's nothing broken to hand this control without
 * a script to run it. Rendering null until mounted, rather than an inert
 * button, means JS-off visitors never see a control that looks live but
 * does nothing.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    const stored = attr === "light" || attr === "dark" ? attr : null;
    const system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(stored ?? system);
  }, []);

  if (theme === null) return null;

  const next: Theme = theme === "light" ? "dark" : "light";

  const toggle = () => {
    document.documentElement.setAttribute("data-theme", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_BG[next]);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or a blocked storage API: the toggle still works
      // for this page view, it just won't be remembered next visit.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      className="grid size-9 shrink-0 place-items-center rounded-sm border border-line-strong text-text transition-colors hover:border-accent"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

```

### `components/VentureEmbed.tsx`
```tsx
"use client";

import { useEffect, useRef, useState } from "react";

// The real site renders at a desktop viewport, then is scaled to the card.
const VIEWPORT_WIDTH = 1280;
const VIEWPORT_HEIGHT = 800;

type Props = { href: string; name: string; status: string };

/**
 * Live, non-interactive preview of a venture's site.
 *
 * Server-rendered (and without JavaScript) it is just the monogram fallback;
 * the iframe mounts after the card is measured, lazy-loads, and fades in over
 * the fallback once it has loaded. Visiting the site is the job of the link
 * overlaid by Work.tsx, so the frame itself is removed from the tab order.
 */
export default function VentureEmbed({ href, name, status }: Props) {
  const box = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / VIEWPORT_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={box}
      className="venture-embed block"
      style={{ aspectRatio: `${VIEWPORT_WIDTH} / ${VIEWPORT_HEIGHT}` }}
    >
      <span className="venture-embed__fallback" aria-hidden="true">
        <span className="browser-frame__mark">{name.charAt(0).toUpperCase()}</span>
        <span className="browser-frame__soon">{status}</span>
      </span>

      {scale > 0 && (
        <iframe
          src={href}
          title={`Live preview of ${name}`}
          loading="lazy"
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={`venture-embed__frame${loaded ? " is-loaded" : ""}`}
          style={{
            width: VIEWPORT_WIDTH,
            height: VIEWPORT_HEIGHT,
            transform: `scale(${scale})`,
          }}
        />
      )}
    </span>
  );
}

```

