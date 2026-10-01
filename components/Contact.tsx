"use client";

import { useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/content";

/**
 * The endpoint is a public Google Apps Script URL, carried over from the
 * previous site. It is not a secret and must not be treated as one.
 *
 * TODO (P-020): with a server runtime this could move behind a route handler,
 * which would close the open-spam hole. Static export has no server, so it
 * stays client-side for now.
 */
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbz2C8Ot1Df0LJ4e_GUzr_h-YWlGnl74oCUtBJdex1Q04HFljwuEsR8Bl2UdMqXkwcGX/exec";

type Status = {
  state: "idle" | "pending" | "success" | "error";
  message: string;
};

const STATUS_COLOR: Record<Status["state"], string> = {
  idle: "text-muted",
  pending: "text-muted",
  success: "text-accent",
  error: "text-danger",
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle", message: "" });
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto link beside it still works.
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    // noValidate is set, so this message is ours rather than the browser's.
    if (!form.checkValidity()) {
      setStatus({
        state: "error",
        message: "Please fill in your name, a valid email and a message.",
      });
      form.querySelector<HTMLInputElement>(":invalid")?.focus();
      return;
    }

    setStatus({ state: "pending", message: "Sending your message..." });

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      form.reset();
      setStatus({
        state: "success",
        message: "Thank you, your message was sent. I will reply by email.",
      });
    } catch {
      // Never fail silently: give the visitor a route that still works.
      setStatus({
        state: "error",
        message: `Something went wrong. Please email ${site.email} directly.`,
      });
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="slide border-b-8 border-band bg-surface py-16 md:py-28"
    >
      <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <div data-reveal>
          <p className="kicker">05 · Let's talk</p>
          <h2
            id="contact-heading"
            className="title-wipe mb-6 font-display text-h2 font-extrabold uppercase leading-none tracking-tight"
          >
            Get in touch
          </h2>
          <p className="mt-4 max-w-[62ch] text-muted">
            Open to internships, freelance projects and collaborations. The fastest route is email.
          </p>

          <ul className="mt-6 grid gap-2">
            <li className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="link-draw">
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-sm border border-line-strong px-2.5 py-1 text-meta text-muted transition-colors hover:border-accent hover:text-text"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <span role="status" aria-live="polite" className="sr-only">
                {copied ? "Email address copied" : ""}
              </span>
            </li>
            <li>
              <a href={`tel:${site.phoneHref}`} className="link-draw">
                {site.phone}
              </a>
            </li>
          </ul>
          {/* TODO (P-002): add real profile URLs, then restore a social links list here. */}
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          data-reveal
          className="border-4 border-line bg-bg p-6 md:p-10"
        >
          <p className="mb-6 grid gap-2">
            <label htmlFor="name" className="text-meta font-bold uppercase tracking-widest text-accent">
              Name
            </label>
            <input
              id="name"
              name="Name"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded-none border-2 border-line-strong bg-transparent px-4 py-3 text-lg transition-colors hover:border-muted focus:border-accent"
            />
          </p>

          <p className="mb-6 grid gap-2">
            <label htmlFor="email" className="text-meta font-bold uppercase tracking-widest text-accent">
              Email
            </label>
            <input
              id="email"
              name="Email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-none border-2 border-line-strong bg-transparent px-4 py-3 text-lg transition-colors hover:border-muted focus:border-accent"
            />
          </p>

          <p className="mb-6 grid gap-2">
            <label htmlFor="message" className="text-meta font-bold uppercase tracking-widest text-accent">
              Message
            </label>
            <textarea
              id="message"
              name="Message"
              rows={5}
              required
              className="w-full resize-y rounded-none border-2 border-line-strong bg-transparent px-4 py-3 text-lg transition-colors hover:border-muted focus:border-accent"
            />
          </p>

          <button
            type="submit"
            disabled={status.state === "pending"}
            className="button-sweep w-full bg-accent px-8 py-4 font-display text-sm font-bold uppercase tracking-wide sm:w-auto text-accent-ink transition-colors disabled:opacity-70"
          >
            Send message
          </button>

          {/* min-h reserves the line, so the status message never shifts layout. */}
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 min-h-[1.6em] text-meta ${STATUS_COLOR[status.state]}`}
          >
            {status.message}
          </p>
        </form>
      </div>
    </section>
  );
}
