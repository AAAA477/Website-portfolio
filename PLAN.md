# PLAN

> The "what and in what order". This is the **living** file — it is updated at
> the end of every working session. Derived from [INTENT.md](INTENT.md).
> Defects and papercuts live in [ISSUES.md](ISSUES.md), not here.

**Last updated:** 2026-09-12
**Current phase:** Phase 0 — groundwork

---

## Where things stand today

A single-page site — [index.html](index.html) + [style.css](style.css) — with
header, About (tabbed skills/experience/education), Services, Portfolio, Contact
and a footer. Dark theme driven by CSS custom properties (`--primary-color:
#a89058` gold on `#080808`). Scroll animations via `IntersectionObserver`,
inline `<script>` at the bottom, Font Awesome from CDN, contact form posting to
a Google Apps Script endpoint.

Honest assessment: the bones are decent, the finish is not there yet. The
Poppins font it's designed around is never actually loaded, several links go
nowhere, two portfolio cards are duplicates, and the interactive parts (tabs,
hamburger) aren't keyboard reachable. See [ISSUES.md](ISSUES.md).

## Stack decision

Stay on hand-written **HTML + CSS + vanilla JS**, no build step, deployed as
static files. Rationale: the source is part of the portfolio, it loads fast, and
it keeps the frontend skill visible rather than hidden behind a framework.
Revisit only if a phase below genuinely can't be done without tooling.

---

## Phases

### Phase 0 — Groundwork *(current)*
Make the project legible and safe to iterate on.

- [x] Write [INTENT.md](INTENT.md), PLAN.md, [CLAUDE.md](CLAUDE.md), [AGENTS.md](AGENTS.md), [ISSUES.md](ISSUES.md)
- [ ] Audit the current site end to end; log everything found in ISSUES.md
- [ ] Split the inline `<script>` out into `js/main.js`
- [ ] Add `<meta name="description">`, Open Graph / Twitter card tags, favicon
- [ ] Actually load the Poppins font (or pick a different type pairing and load that)
- [ ] Confirm the deploy target and get the current site live at a real URL

**Done when:** the site is deployed, the source is organised, and every known
defect is written down.

### Phase 1 — Correctness & accessibility
Nothing is broken, nothing is a dead end, everyone can use it.

- [ ] Remove or wire up every `href="#"` (services "Learn more", "See more", social icons)
- [ ] Rebuild tabs as real buttons with `role="tablist"` / `aria-selected`, keyboard operable
- [ ] Rebuild the hamburger as a `<button>` with `aria-expanded`, Esc to close, focus handling
- [ ] Fix heading hierarchy — one `h1` per page; section titles become `h2`
- [ ] Contact form: visible loading, success and **failure** states; never fail silently
- [ ] Honour `prefers-reduced-motion` across all animations
- [ ] Ensure content is visible when JS fails (no permanently hidden `.scroll-animate`)
- [ ] Colour contrast check on the gold-on-black palette

**Done when:** full keyboard pass works, contrast passes WCAG AA, Lighthouse
accessibility ≥ 95.

### Phase 2 — The design pass (the actual portfolio piece)
This is the phase that carries the intent. Take it slowly.

- [ ] Establish a real type scale and spacing scale as CSS custom properties
- [ ] Rework the hero into something memorable — not "photo + two lines of text"
- [ ] Give project cards a real treatment: thumbnail, role, stack chips, outcome
- [ ] Considered motion: entrance choreography, hover states, smooth section transitions
- [ ] Light/dark theme toggle honouring `prefers-color-scheme`, persisted per visitor
- [ ] Polish every breakpoint from ~360px to ultrawide
- [ ] Replace stock/placeholder imagery with real assets

**Done when:** someone who doesn't know Andrew says "who built this?"

### Phase 3 — Substance ("learn a lot about me")
- [ ] Rewrite About into a story with a voice — Ghana → NCUK Accra → UAlberta
- [ ] Replace duplicate portfolio entries with real case studies: problem,
      approach, what was learned, live link, source link
- [ ] A "what I'm learning now" section that is genuinely current
- [ ] Real skills with honest levels — Python first, then web, then AI/ML interests
- [ ] Refresh the CV download and keep it in sync with the page
- [ ] Update the footer year and keep it automatic

**Done when:** a stranger can describe Andrew accurately after two minutes.

### Phase 4 — Performance & ship quality
- [ ] Convert and size images properly (WebP/AVIF, `width`/`height`, `loading="lazy"`)
- [ ] Prune duplicate assets in [images/](images/) and give files real names
- [ ] Drop the full Font Awesome kit in favour of inlined SVGs for the few icons used
- [ ] Lighthouse ≥ 95 across performance, a11y, best practices, SEO on mobile
- [ ] Cross-browser check: Chrome, Firefox, Safari, iOS Safari, Android Chrome
- [ ] `sitemap.xml`, `robots.txt`, canonical URL

**Done when:** fast on a mid-range phone over 4G, verified with real numbers.

### Phase 5 — Beyond (only if the intent calls for it)
- [ ] Individual project detail pages
- [ ] A custom 404
- [ ] Writing / notes section
- [ ] Analytics that respect privacy

---

## Working agreement

- One phase at a time, top to bottom. Don't start Phase 2 polish while Phase 1
  is broken — polish on top of broken is wasted work.
- Every session ends with this file and [ISSUES.md](ISSUES.md) updated.
- Small commits, each one leaving `main` deployable.

## Session log

Newest first. One entry per working session — this is the memory that makes the
loop in [CLAUDE.md](CLAUDE.md) work.

### 2026-09-12 — Project groundwork
- **Did:** Read the existing site end to end. Created INTENT.md, PLAN.md,
  CLAUDE.md, AGENTS.md, ISSUES.md and the session loop that connects them.
  Logged the first round of real defects found while reading the source.
- **Learned:** The site targets Poppins but never loads it, so it has been
  rendering in the system sans-serif fallback all along. Several portfolio and
  service links are placeholders.
- **Next:** Finish the Phase 0 audit, split out `js/main.js`, add the meta tags
  and the font, confirm where this deploys.
