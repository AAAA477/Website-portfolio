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
    <header className="site-header sticky top-0 z-50 border-b-4 border-accent bg-bg">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <a href={withBase("/#top")} className="font-display text-xl font-bold uppercase tracking-tight text-accent">
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
            className="border-2 border-accent px-3 py-2 text-meta font-bold uppercase tracking-widest text-accent md:hidden"
          >
            Menu
          </button>
        </div>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={`${open ? "block" : "hidden"} basis-full md:block md:basis-auto`}
        >
          <ul className="flex flex-col items-start gap-1 pb-4 md:gap-8 text-meta font-bold uppercase tracking-widest md:flex-row md:items-center md:pb-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block py-2 text-muted transition-colors hover:text-text md:py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={withBase("/#contact")}
                onClick={close}
                className="inline-block bg-accent px-5 py-2.5 text-accent-ink transition-colors hover:bg-text"
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
