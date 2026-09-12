"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { about } from "@/lib/content";

/**
 * The graduation photo, click-to-expand. A small, contained interaction
 * rather than a full gallery/lightbox library. Escape and a backdrop click
 * both close it, and the trigger regains focus so keyboard users don't lose
 * their place.
 */
export default function AboutPhoto() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-parallax="10"
        className="parallax entry-card block w-40 border border-line bg-surface p-1.5 text-left sm:w-48"
        aria-label="Expand graduation photo"
      >
        <Image
          src={about.photo.src}
          alt={about.photo.alt}
          width={about.photo.width}
          height={about.photo.height}
          className="aspect-[408/612] w-full object-cover object-top"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={about.photo.alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-bg/90 p-6"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 rounded-sm border border-line-strong px-3 py-2 text-meta uppercase tracking-widest text-text"
            autoFocus
          >
            Close
          </button>
          <Image
            src={about.photo.src}
            alt={about.photo.alt}
            width={about.photo.width}
            height={about.photo.height}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[80vh] w-auto border border-line-strong object-contain"
          />
        </div>
      )}
    </>
  );
}
