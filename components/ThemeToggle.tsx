"use client";

import { useEffect, useState } from "react";

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
