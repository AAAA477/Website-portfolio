# Layout components

Root shell wraps every route: skip link, Motion (progress bar + spotlight), sticky SiteHeader, SlideRail/SlideCounter (home only, xl+), page children, SiteFooter.

### `app/layout.tsx`
```tsx
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Motion from "@/components/Motion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SlideCounter from "@/components/SlideCounter";
import SlideRail from "@/components/SlideRail";
import { site } from "@/lib/content";
import { withBase } from "@/lib/paths";
import { THEME_BG } from "@/lib/theme";
import "./globals.css";

// Runs before first paint, so a stored theme choice applies immediately —
// without it, the page would render in the default dark palette for one
// frame and then jump to light. Reads localStorage directly rather than
// waiting for ThemeToggle to hydrate; matched by the fallback tokens in
// globals.css when no choice is stored yet or JavaScript never runs. Also
// syncs the theme-color meta tag, so a phone's browser chrome matches
// whichever palette actually rendered instead of always showing the dark
// default.
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';var r=(t==='light'||t==='dark')?t:m;if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}var c=document.querySelector('meta[name="theme-color"]');if(c)c.setAttribute('content',r==='light'?'${THEME_BG.light}':'${THEME_BG.dark}');}catch(e){}})();`;

export const metadata: Metadata = {
  title: `${site.name} · ${site.role}`,
  description: site.description,
  icons: {
    icon: [
      { url: withBase("/favicon-a4.png"), type: "image/png", sizes: "32x32" },
      { url: withBase("/favicon-a4.svg"), type: "image/svg+xml", sizes: "any" },
    ],
    apple: { url: withBase("/apple-touch-icon.png"), sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    title: `${site.name} · ${site.role}`,
    description: site.description,
    images: [{ url: withBase("/images/hero-headshot.jpg") }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description: site.description,
  },
  // TODO (P-024): set metadataBase once the deploy domain is decided, so the
  // Open Graph image resolves to an absolute URL.
};

// Default matches the dark palette; the blocking script above and
// ThemeToggle both update the rendered meta tag's content when the resolved
// theme is actually light.
export const viewport: Viewport = {
  themeColor: THEME_BG.dark,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="absolute left-4 top-4 z-100 -translate-y-[200%] bg-accent px-4 py-2 font-semibold text-accent-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <Motion />
        <SiteHeader />
        <SlideRail />
        <SlideCounter />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

```

### `components/SiteHeader.tsx`
```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, site } from "@/lib/content";
import { withBase } from "@/lib/paths";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    // Escape closes the menu and returns focus to the control that opened it.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };

    // Reset when crossing the breakpoint, so the desktop nav is never left
    // hidden by a stale toggle.
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onBreakpoint = () => close();

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, close]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <a href={withBase("/#top")} className="font-display text-lead tracking-tight">
          {site.shortName}
        </a>

        <div className="flex items-center gap-3 md:order-last">
          <ThemeToggle />

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((value) => !value)}
            className="rounded-sm border border-line-strong px-3 py-2 text-meta uppercase tracking-widest md:hidden"
          >
            Menu
          </button>
        </div>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={`${open ? "block" : "hidden"} basis-full md:block md:basis-auto`}
        >
          <ul className="flex flex-col items-start gap-4 pb-4 text-meta uppercase tracking-widest md:flex-row md:items-center md:pb-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={withBase("/#contact")}
                onClick={close}
                className="rounded-sm border border-line-strong px-3 py-2 text-text transition-colors hover:border-accent hover:bg-surface"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

```

### `components/SiteFooter.tsx`
```tsx
import { site } from "@/lib/content";
import { withBase } from "@/lib/paths";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-10 text-meta text-muted">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-4 px-6">
        {/* Rendered at build time, so the year is correct without client JS. */}
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>
          <a href={withBase("/#top")} className="transition-colors hover:text-text">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  );
}

```

### `components/SlideRail.tsx`
```tsx
"use client";

import { usePathname } from "next/navigation";

const SLIDES = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/**
 * The presentation's outline. Static markup — real anchor links that work
 * with JavaScript off — Motion.tsx adds the current-slide highlight as an
 * enhancement once it observes which slide is in view.
 *
 * Only the homepage is the five-slide deck this describes; on any other
 * route (/updates) these anchors don't exist, so the rail would show real-
 * looking links that go nowhere. usePathname is basePath-relative, so "/"
 * is correct regardless of the GitHub Pages sub-path.
 */
export default function SlideRail() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <nav aria-label="Sections" className="slide-rail">
      <ol className="flex flex-col">
        {SLIDES.map((slide) => (
          <li key={slide.id}>
            <a href={`#${slide.id}`} data-slide={slide.id} className="slide-rail__link">
              <span className="slide-rail__tick" aria-hidden="true" />
              <span className="slide-rail__label">{slide.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

```

### `components/SlideCounter.tsx`
```tsx
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

```

