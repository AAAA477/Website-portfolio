/**
 * Mirrors --color-bg from each palette in app/globals.css. Kept here, not
 * computed from the CSS, so the browser-chrome theme-color meta tag can be
 * set synchronously (the blocking init script, before paint) and from a
 * plain client component (ThemeToggle) without reading computed styles.
 */
export const THEME_BG = {
  light: "#F6F1E4",
  dark: "#0C2A20",
} as const;
