import type { CSSProperties } from "react";

/** Staggers a reveal by one 90ms step per index. Matches app/globals.css. */
export function revealDelay(step: number): CSSProperties {
  return { "--reveal-delay": `${step * 90}ms` } as CSSProperties;
}
