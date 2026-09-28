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
        <div className="page-curtain" aria-hidden="true" />
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
