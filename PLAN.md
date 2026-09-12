# PLAN

> The "what and in what order". This is the **living** file — it is updated at
> the end of every working session. Derived from [INTENT.md](INTENT.md).
> Defects and papercuts live in [ISSUES.md](ISSUES.md), not here.

**Last updated:** 2026-09-12
**Current phase:** Phase 1/2 on Next.js — build green, real content wired in, deploy workflow written; browser/keyboard verification still outstanding

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

**Next.js 15 (App Router) + TypeScript + Tailwind v4, static export.**
Decided 2026-09-12, superseding the earlier hand-written HTML/CSS/JS decision.

`output: "export"` emits plain static files to `out/`, so hosting is unchanged —
GitHub Pages, Netlify or anywhere else. What the framework buys: components and
typed content instead of one long HTML file, room for per-project pages
(Phase 5), and MDX later if a writing section appears.

What it costs, stated honestly: a build step, `node_modules`, and roughly 103KB
of shared JS that the old site did not ship. The prerendered HTML still contains
all content, so the page reads with JavaScript disabled.

The previous vanilla site is preserved in `legacy/` as a reference snapshot.

---

## Phases

### Phase 0 — Groundwork *(current)*
Make the project legible and safe to iterate on.

- [x] Write [INTENT.md](INTENT.md), PLAN.md, [CLAUDE.md](CLAUDE.md), [AGENTS.md](AGENTS.md), [ISSUES.md](ISSUES.md)
- [ ] Audit the current site end to end; log everything found in ISSUES.md
- [x] Split the inline `<script>` out into `js/main.js`
- [x] Add `<meta name="description">`, Open Graph / Twitter card tags, favicon
- [x] Type decision made: system serif + system sans, no webfont request (see below)
- [ ] Confirm the deploy target and get the current site live at a real URL

**Done when:** the site is deployed, the source is organised, and every known
defect is written down.

### Phase 1 — Correctness & accessibility
Nothing is broken, nothing is a dead end, everyone can use it.

- [x] Remove or wire up every `href="#"` (services "Learn more", "See more", social icons)
- [x] Tabs removed entirely — About is now plain content, no JS state machine
- [x] Rebuild the hamburger as a `<button>` with `aria-expanded`, Esc to close, focus handling
- [x] Fix heading hierarchy — one `h1` per page; section titles become `h2`
- [x] Contact form: visible loading, success and **failure** states; never fail silently
- [x] Honour `prefers-reduced-motion` across all animations
- [x] Ensure content is visible when JS fails — JS is now enhancement only
- [ ] Colour contrast check on the gold-on-black palette

**Done when:** full keyboard pass works, contrast passes WCAG AA, Lighthouse
accessibility ≥ 95.

### Phase 2 — The design pass (the actual portfolio piece)
This is the phase that carries the intent. Take it slowly.

- [x] Establish a real type scale and spacing scale as CSS custom properties
- [x] Hero rebuilt as a 2-column editorial layout with availability badge
- [x] Project cards: uniform-ratio thumbnail, problem statement, stack tags, text links
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

## Design direction (adopted 2026-09-12)

Reference: `dreammotion.framer.website` — used for **layout rhythm, type pairing
and motion vocabulary only**. We do not copy its markup, copy, imagery or
section list. It sells a SaaS product; this site introduces a person, so the
structure below is adapted, not transplanted.

### What we take

| Pattern | How it applies here |
|---|---|
| Serif display + clean sans UI | Big serif headlines against small, quiet sans body — instant hierarchy, feels editorial rather than templated |
| Near-black canvas, one bright accent | Keeps the existing dark base; **accent stays Andrew's gold `#a89058`**, not the reference's lime — same technique, own identity |
| Generous vertical rhythm | Sections breathe. Large, consistent spacing scale; whitespace does the work borders currently do |
| Card grid for content blocks | Reuse for project work and skills |
| Sticky minimal nav | Few links, always reachable, condenses on scroll |
| Staggered scroll entrances | Already have `IntersectionObserver` — replace ad-hoc `animation-delay` inline styles with a consistent stagger |
| Big closing CTA before the footer | Ends on "get in touch", not on a copyright line |
| Accordion (their FAQ) | Repurposed as expandable project detail, if Phase 5 detail pages aren't built |

### What we leave behind

Pricing, sign-up funnels, testimonial carousels, discount banners, product
feature grids — conversion furniture with nothing behind it on a personal site.
Fake testimonials are explicitly ruled out by [INTENT.md](INTENT.md).

### Concrete tokens

- **Display:** Instrument Serif (Google Fonts, open licence) — hero, section titles
- **UI / body:** DM Sans (Google Fonts, open licence) — nav, body, captions
- **Canvas:** `#0b0b0b` base, `#151515` raised surfaces
- **Accent:** `#a89058` (existing gold), used sparingly — one accent per viewport
- **Spacing scale:** 4 / 8 / 16 / 24 / 40 / 64 / 96 / 160px as custom properties
- **Motion:** 300–600ms, ease-out, 60–80ms stagger, all behind `prefers-reduced-motion`

Loading these two fonts resolves P-005 in [ISSUES.md](ISSUES.md).

### Revised section order

1. Sticky nav
2. Hero — serif statement of who Andrew is, one primary CTA
3. Selected work — the strongest 3 projects, card grid, real links
4. About — the story, with skills/experience/education
5. What I'm building / learning now
6. Closing CTA — contact form plus CV download
7. Minimal footer

Note this moves **work above about**: a recruiter should hit proof before biography.

---

## Working agreement

- One phase at a time, top to bottom. Don't start Phase 2 polish while Phase 1
  is broken — polish on top of broken is wasted work.
- Every session ends with this file and [ISSUES.md](ISSUES.md) updated.
- Small commits, each one leaving `main` deployable.

## Session log

Newest first. One entry per working session — this is the memory that makes the
loop in [CLAUDE.md](CLAUDE.md) work.

### 2026-09-12 — Real content wired in, deploy workflow written
- **Did:** Created [CONTENT.md](CONTENT.md) as the single source of truth for
  site copy, sourced from Andrew's CV (`cv-andrew-ansah-plain-2026-09-11.pdf`)
  and his own bio notes. Rewrote [lib/content.ts](lib/content.ts) to match:
  real work experience (EW Analytics), research (Neubahar Labs, Algoverse —
  with MechInterp/CogInterp/UniReps recognition), four real projects
  (HomeBatch, Study Buddy AI, Ace Budget AI, HandMouseApp), two founder
  ventures (heavy-spoon.com, instafurnish.shop), real skills grouped as the CV
  groups them, and a real About built from Andrew's own words (problem-solver
  framing, Edmonton Unlimited Student Founders Launch, ColorStack UofA VP
  Secretary, guitar). Rebuilt [components/Work.tsx](components/Work.tsx) as a
  keyboard-accessible tabbed section (Work experience / Research / Projects,
  arrow-key + Home/End navigation, `role="tablist"`) per the "tab for research
  and projects and work experience" request. Copied the actual CV PDF into
  `public/` so the Download CV link resolves to Andrew's real document rather
  than a placeholder. Wrote `.github/workflows/deploy.yml` — builds and
  publishes to GitHub Pages on every push to main. Started the dev server for
  live viewing.
- **Learned:** The CV lists Neubahar Labs starting Sep 2026, after today's
  date as tracked in this file — flagged as a TODO to confirm with Andrew
  rather than silently "corrected". Several links the CV visually hyperlinks
  (Ace Budget AI, HandMouseApp) didn't carry a extractable URL in the PDF text
  layer, so those stayed empty with a TODO instead of a guessed URL.
- **Next:** Open http://localhost:3000 and actually look at it — tab through
  the new Work tabs with a keyboard, resize to phone width, and check the
  reveal motion. Then work down CONTENT.md's TODO list with Andrew (venture
  descriptions, project URLs, program dates) — that's what's gating a real
  publish now, more than any remaining code work.

### 2026-09-12 — Migrated to Next.js, and added the motion layer

- **Did:** Two pieces of work. First, built the motion layer that the previous
  session left out: staggered fade-and-rise reveals, hero entrance, scroll
  progress bar, header scroll state, 2px card lift. Then migrated the whole site
  to Next.js 15 App Router + TypeScript + Tailwind v4 with `output: "export"`.
  Design tokens moved into Tailwind's `@theme`; copy moved into `lib/content.ts`;
  sections became components in `components/`; images moved to `public/images/`.
  Build passes and exports 4 static routes.
- **Learned:** Tailwind v4's `@theme` maps cleanly onto the custom properties
  the design system already used, so the port was mechanical rather than a
  redesign — the charcoal/brass palette and fluid type scale survived intact.
  The motion layer needed no rewrite either: it was already attribute-driven
  (`data-reveal`), so it became one client component observing the DOM rather
  than per-component animation state. Static export has no image optimisation
  server, so `images.unoptimized` is required and explicit dimensions still
  carry the anti-CLS work.
- **Next:** Still unverified in a browser (P-029) — that has now been true across
  two sessions and should be the first thing done. Then the deploy workflow
  (P-032) and the TODO-marked content (P-028).

### 2026-09-12 — Full refactor to the editorial design system
- **Did:** Rewrote [index.html](index.html) and [style.css](style.css) from
  scratch and added `js/main.js`. Semantic HTML5 throughout, one `h1`, sticky
  opaque nav (Work / Capabilities / About / Get in touch), 2-column hero with
  availability badge and framed portrait, 3-column uniform-ratio work grid with
  problem statements and stack tags, text-first Capabilities grid, About as
  prose plus definition lists, contact section with a real form state machine.
  Design system: warm charcoal `#141312`, brass accent `#c9a961`, system serif
  display over system sans, fluid `clamp()` type scale, flat surfaces and 1px
  borders — no glows, gradients, blurs or hover zooms. Closed 16 issues.
- **Learned:** The tabs, the Font Awesome kit and the whole `.scroll-animate`
  system could be deleted rather than fixed — removing them resolved four
  accessibility issues at once and cut every third-party request. Dropping
  webfonts entirely is what actually guarantees zero CLS; the Instrument Serif /
  DM Sans pairing recorded earlier was reversed for that reason.
  Also: the three work images are already a uniform 650x800, so a fixed-ratio
  grid costs nothing.
- **Next:** Open it in a browser — none of this has been visually verified yet
  (P-029). Then fill in the TODO-marked content (P-028), which is the only thing
  standing between this and a publishable site.

### 2026-09-12 — Design direction set
- **Did:** Reviewed `dreammotion.framer.website` as a reference and recorded an
  adapted design direction (see above): Instrument Serif + DM Sans, near-black
  canvas keeping the existing gold accent, spacing scale, stagger-based motion,
  and a revised section order that puts work above about.
- **Learned:** The reference is a SaaS product template — roughly half its
  sections (pricing, FAQ, testimonial carousel, sign-up funnel) have no honest
  equivalent on a personal portfolio, so the useful borrowing is rhythm and type,
  not structure. Its fonts are open-licensed, so the pairing is ours to use.
- **Next:** Phase 0 still gates this — load the two fonts, split out `js/main.js`,
  add meta tags. Then Phase 2 begins with the hero and the spacing scale.

### 2026-09-12 — Project groundwork
- **Did:** Read the existing site end to end. Created INTENT.md, PLAN.md,
  CLAUDE.md, AGENTS.md, ISSUES.md and the session loop that connects them.
  Logged the first round of real defects found while reading the source.
- **Learned:** The site targets Poppins but never loads it, so it has been
  rendering in the system sans-serif fallback all along. Several portfolio and
  service links are placeholders.
- **Next:** Finish the Phase 0 audit, split out `js/main.js`, add the meta tags
  and the font, confirm where this deploys.
