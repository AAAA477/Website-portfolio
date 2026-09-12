"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/lib/content";

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
        <a href="/#top" className="font-display text-lead tracking-tight">
          {site.shortName}
        </a>

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
                href="/#contact"
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
