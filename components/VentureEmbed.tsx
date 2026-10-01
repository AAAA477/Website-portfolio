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
