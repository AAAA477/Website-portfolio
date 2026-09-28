import type { Metadata } from "next";
import type { ReactNode } from "react";
import Motion from "@/components/Motion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SlideCounter from "@/components/SlideCounter";
import SlideRail from "@/components/SlideRail";
import { site } from "@/lib/content";
import { withBase } from "@/lib/paths";
import "./globals.css";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
