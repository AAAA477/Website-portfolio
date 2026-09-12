# ISSUES

Every known defect, papercut and idea. Updated continuously — see the loop in
[CLAUDE.md](CLAUDE.md). Roadmap work lives in [PLAN.md](PLAN.md); this file is
for things that are *wrong* or *missing*.

**Severity:** 🔴 blocker (broken / embarrassing in front of a recruiter) ·
🟠 major (real quality problem) · 🟡 minor (papercut) · 🔵 idea (not a defect)
**Status:** `open` · `in progress` · `resolved` · `wontfix`

**ID format:** `P-###`, never reused.

---

## Open

| ID | Sev | Area | Issue | Where | Status |
|---|---|---|---|---|---|
| P-001 | 🔴 | Content | Two portfolio cards are both titled "Social Media App" with near-identical copy — reads as filler | index.html portfolio | open |
| P-002 | 🔴 | Links | Dead `href="#"` links: three Services "Learn more", the "See more" button, two portfolio card links, all four social icons | index.html | open |
| P-003 | 🔴 | A11y | Tabs are `<p class="tab-links" onclick=...>` — not focusable, not keyboard operable, no `role="tab"`/`aria-selected` | index.html + inline script | open |
| P-004 | 🔴 | A11y | Hamburger and close control are `<i>` elements with `onclick` — invisible to keyboard and screen readers; no `aria-expanded`, no Esc to close | index.html | open |
| P-005 | 🟠 | Design | `--font-family: 'Poppins'` is declared but Poppins is never loaded — the whole site renders in the generic sans-serif fallback | style.css:14 | open |
| P-006 | 🟠 | Robustness | `.scroll-animate` content depends on `IntersectionObserver` + `DOMContentLoaded`; if JS fails, sections may never become visible | index.html script | open |
| P-007 | 🟠 | UX | Contact form failure is only `console.error` — a visitor whose message failed is told nothing. No loading state either | index.html script | open |
| P-008 | 🟠 | A11y | Section titles use `h1.sub-title`, so the page has five `h1`s — heading outline is meaningless | index.html | open |
| P-009 | 🟠 | Motion | No `prefers-reduced-motion` handling anywhere; animations run for everyone | style.css | open |
| P-010 | 🟠 | Perf | Images are unoptimised full-size PNGs with no `width`/`height` and no `loading="lazy"` → slow loads and layout shift | images/, index.html | open |
| P-011 | 🟠 | SEO | No `meta description`, no Open Graph / Twitter card tags, no favicon, no canonical URL — link previews look broken when shared | index.html head | open |
| P-012 | 🟡 | Assets | [images/](images/) is cluttered: duplicate png/webp pairs, `Add a heading.png`, `Untitled design.png`, `A4-1.png`, `5ecca87d-...(1).png`, `Screenshot 2024-10-13 180736.png` | images/ | open |
| P-013 | 🟡 | Content | Footer reads "Copyright © 2023" — three years stale | index.html footer | open |
| P-014 | 🟡 | Links | Fitness project points at a Netlify deploy-preview URL (`670c5c29...--thegym123.netlify.app`) rather than the stable site URL | index.html portfolio | open |
| P-015 | 🟡 | Structure | ~70 lines of JS live inline at the bottom of index.html — should be `js/main.js` | index.html | open |
| P-016 | 🟡 | Perf | The whole Font Awesome kit is loaded from CDN for roughly a dozen icons | index.html head | open |
| P-017 | 🟡 | Content | Services and skills are generic ("Designing Web/App interfaces") — they say nothing specific about Andrew | index.html | open |
| P-018 | 🟡 | Content | Experience is a single line, "2023 - current, Web Developer", with no context | index.html about | open |
| P-019 | 🟡 | A11y | Gold `#a89058` on `#080808` and the `#61b752` accent need a contrast check at small text sizes | style.css:9,13 | open |
| P-020 | 🟡 | Security | The Google Apps Script endpoint is hardcoded in public source — open to spam submissions, no rate limiting or honeypot | index.html script | open |
| P-021 | 🔵 | Feature | Light/dark theme toggle honouring `prefers-color-scheme` | — | open |
| P-022 | 🔵 | Feature | Per-project detail pages with problem / approach / stack / outcome | — | open |
| P-023 | 🔵 | Feature | Custom 404 page | — | open |
| P-024 | 🔵 | Ops | Deploy target not decided or documented (GitHub Pages? Netlify?) | — | open |

## Resolved

*(none yet — move items here with the date and a one-line note on the fix)*

| ID | Sev | Issue | Fixed | Note |
|---|---|---|---|---|

---

## How to use this file

- **Adding:** next free `P-###`, fill every column, be specific enough that
  someone else could fix it without asking you what you meant.
- **Fixing:** set `in progress`, then on completion move the row to Resolved
  with the date and a one-line note.
- **Found while doing something else:** log it here and carry on with the
  current task — don't widen the diff.
- **Not worth fixing:** mark `wontfix` and write down why, so it doesn't get
  re-raised in three months.
