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
      className="border-t border-line bg-surface py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 md:grid-cols-2">
        <div data-reveal>
          <h2 id="contact-heading" className="font-display text-h2 leading-tight tracking-tight">
            Get in touch
          </h2>
          <p className="mt-4 max-w-[62ch] text-muted">
            Open to internships, freelance projects and collaborations. The fastest route is email.
          </p>

          <ul className="mt-6 grid gap-2">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="border-b border-line-strong pb-0.5 text-accent transition-colors hover:border-accent"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phoneHref}`}
                className="border-b border-line-strong pb-0.5 text-accent transition-colors hover:border-accent"
              >
                {site.phone}
              </a>
            </li>
          </ul>
          {/* TODO (P-002): add real profile URLs, then restore a social links list here. */}
        </div>

        <form ref={formRef} onSubmit={onSubmit} noValidate data-reveal>
          <p className="mb-6 grid gap-2">
            <label htmlFor="name" className="text-meta uppercase tracking-widest text-muted">
              Name
            </label>
            <input
              id="name"
              name="Name"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded-sm border border-line-strong bg-bg px-4 py-3 transition-colors hover:border-muted"
            />
          </p>

          <p className="mb-6 grid gap-2">
            <label htmlFor="email" className="text-meta uppercase tracking-widest text-muted">
              Email
            </label>
            <input
              id="email"
              name="Email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-sm border border-line-strong bg-bg px-4 py-3 transition-colors hover:border-muted"
            />
          </p>

          <p className="mb-6 grid gap-2">
            <label htmlFor="message" className="text-meta uppercase tracking-widest text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="Message"
              rows={5}
              required
              className="w-full resize-y rounded-sm border border-line-strong bg-bg px-4 py-3 transition-colors hover:border-muted"
            />
          </p>

          <button
            type="submit"
            disabled={status.state === "pending"}
            className="rounded-sm bg-accent px-6 py-3 font-semibold text-accent-ink transition-colors hover:bg-text disabled:opacity-70"
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
