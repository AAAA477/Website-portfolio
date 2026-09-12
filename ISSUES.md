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
| P-010 | 🟠 | Perf | Images are unoptimised full-size PNGs with no `width`/`height` and no `loading="lazy"` → slow loads and layout shift | images/, index.html | open |
| P-012 | 🟡 | Assets | [images/](images/) is cluttered: duplicate png/webp pairs, `Add a heading.png`, `Untitled design.png`, `A4-1.png`, `5ecca87d-...(1).png`, `Screenshot 2024-10-13 180736.png` | images/ | open |
| P-014 | 🟡 | Links | Fitness project points at a Netlify deploy-preview URL (`670c5c29...--thegym123.netlify.app`) rather than the stable site URL | lib/content.ts | open |
| P-017 | 🟡 | Content | Services and skills are generic ("Designing Web/App interfaces") — they say nothing specific about Andrew | index.html | open |
| P-018 | 🟡 | Content | Experience is a single line, "2023 - current, Web Developer", with no context | lib/content.ts | open |
| P-019 | 🟡 | A11y | Gold `#a89058` on `#080808` and the `#61b752` accent need a contrast check at small text sizes | app/globals.css | open |
| P-020 | 🟡 | Security | The Google Apps Script endpoint is hardcoded in public source — open to spam submissions, no rate limiting or honeypot. Fixable with a route handler, but static export has no server, so it would mean moving to Vercel | components/Contact.tsx | open |
| P-029 | 🟠 | Verification | The refactor passed static checks only; it has not yet been opened in a browser, keyboard-tested, or run through Lighthouse | — | open |
| P-030 | 🟡 | Links | Repository URLs unknown for all three projects, so no "View code" links exist yet | index.html | open |
| P-031 | 🟡 | Assets | work-1/2/3 are ~800KB PNGs; the fitness screenshot is 557KB. Convert to WebP and resize to displayed dimensions | images/ | open |
| P-033 | 🟡 | SEO | `metadataBase` unset, so the Open Graph image resolves against localhost at build time | app/layout.tsx | open |
| P-034 | 🟡 | Cleanup | `legacy/` holds the previous vanilla site as a reference snapshot. Delete once the Next.js version is live and trusted | legacy/ | open |
| P-035 | 🟡 | Perf | The site now ships ~103KB of shared JS it previously did not. Worth re-measuring against the old Lighthouse numbers once both are deployed | — | open |
| P-036 | 🟠 | Content | Several real-content TODOs remain, itemized in [CONTENT.md](CONTENT.md): venture descriptions, project repo/live URLs, Founders Launch program dates, ColorStack term dates, research paper links | CONTENT.md, lib/content.ts | open |
| P-037 | 🟡 | Assets | `work-1.png`/`work-2.png`/`work-3.png` are now unused — the new Work tabs show text-only project entries with no thumbnails | public/images/ | open |
| P-021 | 🔵 | Feature | Light/dark theme toggle honouring `prefers-color-scheme` | — | open |
| P-022 | 🔵 | Feature | Per-project detail pages with problem / approach / stack / outcome | — | open |
| P-023 | 🔵 | Feature | Custom 404 page | — | open |

## Resolved

| ID | Sev | Issue | Fixed | Note |
|---|---|---|---|---|
| P-001 | 🔴 | Two portfolio cards are both titled "Social Media App" with near-ident | 2026-09-12 | Duplicate cards replaced with distinct titles and problem statements |
| P-002 | 🔴 | Dead `href="#"` links: three Services "Learn more", the "See more" but | 2026-09-12 | All href="#" removed; unknown URLs are TODO comments, not dead links |
| P-003 | 🔴 | Tabs are `<p class="tab-links" onclick=...>` — not focusable, not keyb | 2026-09-12 | Tab widget removed entirely — About is now plain, JS-free content |
| P-004 | 🔴 | Hamburger and close control are `<i>` elements with `onclick` — invisi | 2026-09-12 | Nav toggle is a real <button> with aria-expanded and Esc handling |
| P-005 | 🟠 | `--font-family: 'Poppins'` is declared but Poppins is never loaded — t | 2026-09-12 | System serif + system sans stacks; no webfont request at all |
| P-006 | 🟠 | `.scroll-animate` content depends on `IntersectionObserver` + `DOMCont | 2026-09-12 | Content visible by default; JS is enhancement only |
| P-007 | 🟠 | Contact form failure is only `console.error` — a visitor whose message | 2026-09-12 | Form has pending/success/error states via aria-live region |
| P-008 | 🟠 | Section titles use `h1.sub-title`, so the page has five `h1`s — headin | 2026-09-12 | Single h1; section titles are h2, project titles h3 |
| P-009 | 🟠 | No `prefers-reduced-motion` handling anywhere; animations run for ever | 2026-09-12 | Global prefers-reduced-motion guard added |
| P-011 | 🟠 | No `meta description`, no Open Graph / Twitter card tags, no favicon,  | 2026-09-12 | Description, Open Graph, Twitter card and favicon added |
| P-013 | 🟡 | Footer reads "Copyright © 2023" — three years stale | 2026-09-12 | Footer year set from JS with a static fallback |
| P-015 | 🟡 | ~70 lines of JS live inline at the bottom of index.html — should be `j | 2026-09-12 | Extracted to js/main.js |
| P-016 | 🟡 | The whole Font Awesome kit is loaded from CDN for roughly a dozen icon | 2026-09-12 | Font Awesome dropped; no icon dependency remains |
| P-025 | 🟠 | Section entrance delays are hardcoded as inline `style="animation-dela | 2026-09-12 | Inline animation-delay values gone with the old animation system |
| P-026 | 🟡 | No spacing/type scale exists; padding and font sizes are ad-hoc values | 2026-09-12 | Spacing and fluid type scales defined as custom properties |
| P-027 | 🟡 | Work currently sits below About — a recruiter should reach proof befor | 2026-09-12 | Work now sits directly below the hero, above About |
| P-024 | 🔵 | Deploy target not decided or documented (GitHub Pages? Netlify?) | 2026-09-12 | Decided: GitHub Pages via Actions. .github/workflows/deploy.yml builds and publishes on push to main |
| P-032 | 🔴 | No deploy workflow for the Next.js build | 2026-09-12 | Workflow written; Andrew still needs to flip Settings → Pages → Source: GitHub Actions once, and uncomment basePath in next.config.ts if not using a custom domain |
| P-028 | 🟠 | Project problem statements, tech tags and the availability badge were placeholder drafts, not Andrew's own words | 2026-09-12 | Replaced with real content from his CV and his own bio notes, via CONTENT.md → lib/content.ts. Remaining gaps tracked separately as P-036 |

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
