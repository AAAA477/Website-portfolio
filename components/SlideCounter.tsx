"use client";

import { usePathname } from "next/navigation";

const SLIDE_COUNT = 5;

/**
 * Decorative echo of scroll position, bottom-left, like a deck's page
 * number. Motion.tsx updates the current number every scroll frame; the
 * rail (not this) is the accessible way to navigate, so this is
 * aria-hidden rather than a live region.
 *
 * Only meaningful on the homepage's five-slide deck — see SlideRail for
 * why this checks the route.
 */
export default function SlideCounter() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="slide-counter" aria-hidden="true">
      <span className="slide-counter__current">01</span>
      <span className="slide-counter__total">/ {String(SLIDE_COUNT).padStart(2, "0")}</span>
    </div>
  );
}
