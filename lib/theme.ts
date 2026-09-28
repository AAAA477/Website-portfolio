/**
 * Mirrors --color-bg from each palette in app/globals.css. Kept here, not
 * computed from the CSS, so the browser-chrome theme-color meta tag can be
 * set synchronously (the blocking init script, before paint) and from a
 * plain client component (ThemeToggle) without reading computed styles.
 */
export const THEME_BG = {
  light: "#f4efe6",
  dark: "#141312",
} as const;
