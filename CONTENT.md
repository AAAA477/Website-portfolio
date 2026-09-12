# CONTENT

> The single source of truth for everything the site says about Andrew.
> [lib/content.ts](lib/content.ts) is the code copy of this file — when one
> changes, update the other in the same sitting. See [CLAUDE.md](CLAUDE.md)
> for the doc set and the loop that keeps them honest.

**Last updated:** 2026-09-12
**Source:** `cv-andrew-ansah-plain-2026-09-11.pdf` + Andrew's own notes, same date.

Anything not sourced from those two places is marked `TODO` — never invented.
See the note on [INTENT.md](INTENT.md)'s principle: *honest content, real
projects, real dates.*

---

## Identity

| Field | Value |
|---|---|
| Name | Andrew Ansah (full: Andrew Adrian Ansah) |
| Titles | Undergraduate Researcher · Full-Stack Developer |
| Location | Edmonton, Canada |
| Email | aaaansah@gmail.com |
| Phone | 780-710-9134 |
| LinkedIn | linkedin.com/in/andrew-adrian-ansah |
| GitHub | github.com/AAAA477 |

## Professional summary (source of the hero + about copy)

> CS student at the University of Alberta working across AI research and
> software engineering: mechanistic interpretability of language models and
> full-stack delivery of production web systems.

## About me (in Andrew's words, lightly punctuated — not rewritten)

I'm a computer science student who likes to solve problems. I was recently in
the Edmonton Unlimited Student Founders Launch program. I'm the founder of
heavy-spoon.com and instafurnish.shop — we're still prelaunch but getting
there. I also play guitar for fun, and work on projects. I work at EW
Analytics building software solutions to people's problems, and I'm the VP
Secretary of the ColorStack UofA chapter.

**Threads to weave into the About section prose:**
- Problem-solver first — the CS identity is about solving things, not a stack.
- Edmonton Unlimited Student Founders Launch program — recent, worth naming.
- Two prelaunch ventures (below) — founder, not just contributor.
- Guitar, for fun — the one non-technical, human detail. Keep it, keep it short.
- ColorStack UofA — VP Secretary. A leadership/community role, distinct from
  the paid work and research below.

**TODO:** exact dates for the Founders Launch program and for the ColorStack
role — not in the CV, need Andrew to confirm before publishing.

---

## Work experience

### EW Analytics Consult — Full-Stack Developer
**Nov 2025 – Present · Remote**

- Leads a team of 3 delivering full-stack software across GIS portals,
  management systems, and automation tooling using GeoNode, Google Apps
  Script, React, and Java.
- Built automation software that eliminated repetitive manual workflows,
  reducing deployment time by 40%.
- Customized the MapStore (React) UI and built repeatable data pipelines in
  PostGIS/GeoServer, cutting manual publishing time in half.

*Stack:* GeoNode, Google Apps Script, React, Java, PostGIS, GeoServer, MapStore

### Neubahar Labs — Undergraduate Researcher
**Sep 2026 – Present · Edmonton, Canada**

- Building an analysis framework for learned representations, used to study
  feature absorption and feature splitting in sparse autoencoders (SAEs).
- Investigating how one SAE latent can absorb a more general concept, and how
  a single concept fragments across latents as dictionary size grows — and
  what that means for the reliability of SAE latents as interpretability units.

*Field:* mechanistic interpretability, sparse autoencoders

### Algoverse AI Research — Researcher
**May 2025 – Present · Remote**

- Investigated emergent misalignment in language models (0.5B–32B parameters),
  demonstrating it occurs reliably across model scales using LoRA fine-tuning
  and activation steering.
- Built linear probes and early-warning indicators on adapter weights to
  detect misaligned behavior before it manifests at the output level.
- Co-authored and open-sourced models on HuggingFace. Recognized work:
  **MechInterp (Spotlight)**, **CogInterp**, **UniReps (Honorable Mention)**.

*Field:* AI alignment, interpretability. *Stack:* LoRA, activation steering,
linear probes, HuggingFace

> **Note on ordering:** the CV lists these Neubahar → Algoverse → EW Analytics
> by most-recent start date. Neubahar's start date (Sep 2026) is after today
> (2026-09-12) — confirm with Andrew whether that's an upcoming/just-started
> role before publishing; if it's correct, it's genuinely his newest position
> and should stay first wherever the site sorts by recency.

---

## Founder ventures

Distinct from the "Work experience" list above — these are ventures Andrew
started, not roles he was hired into. Worth their own presentation weight,
likely their own card style within Work or a dedicated subsection.

### heavy-spoon.com
**Status:** Prelaunch
**Role:** Founder
**Description:** TODO — Andrew to provide a one/two-sentence description of
what this is (product, audience, problem it solves).

### instafurnish.shop
**Status:** Prelaunch
**Role:** Founder
**Description:** TODO — same as above.

**Context:** Both came out of, or were being developed around, the **Edmonton
Unlimited Student Founders Launch program** (TODO: confirm exact program name
and dates). Worth mentioning that connection once the program dates are
confirmed — it's a credibility signal recruiters and other founders recognize.

---

## Research recognition

Standalone list, useful for a "Research" tab distinct from prose. Pull these
into badges/chips rather than paragraphs — they're citations, not stories.

| Work | Recognition | Venue |
|---|---|---|
| Emergent misalignment across model scales (Algoverse) | Spotlight | MechInterp |
| Emergent misalignment across model scales (Algoverse) | — | CogInterp |
| Emergent misalignment across model scales (Algoverse) | Honorable Mention | UniReps |

**TODO:** paper titles, arXiv/OpenReview links, co-author list, HuggingFace
model links. The CV names the venues but not the URLs — needed before these
can be clickable.

---

## Projects

Ordered as in the CV. `HomeBatch` is the flagship — most detail, most recent,
in active development. The other three are smaller/completed builds.

### HomeBatch
**Status:** In development, not yet public

Marketplace connecting Edmonton home cooks with customers buying single meals,
bulk freezer batches, and recurring subscriptions.

- 15 feature modules across customer, vendor, and admin roles
- 8-migration Postgres schema with row-level security
- 6 Supabase edge functions for Stripe checkout, payouts, and email

*Stack:* React, TypeScript, Supabase (Postgres/Auth/Storage), Stripe Connect,
Vitest, Playwright

*Links:* none yet (not public). **TODO:** add a repo link if it becomes
public, or a waitlist/landing link if one exists.

### Study Buddy AI

Educational bot that helps students revise notes, using Retrieval Augmented
Generation for information extraction and LangChain for natural language
processing.

*Stack:* Python, LangChain, Google AI, NumPy

*Links:* **TODO** — no URL given in the CV.

### Ace Budget AI
*(Hackathon project — CV links the title itself, source below)*

AI-powered personal finance platform with receipt scanning, email parsing,
and predictive budgeting.

*Stack:* Next.js, TypeScript, Python Flask, TensorFlow, spaCy, Hugging Face,
Docker

*Links:* CV has this title hyperlinked but the destination URL wasn't
extractable from the PDF text layer. **TODO:** get the actual URL (repo or
devpost) from Andrew.

### HandMouseApp
*(CV links the title itself, source below)*

Real-time hand-gesture mouse control: webcam-based cursor, click,
double-click, and drag.

*Stack:* Python, OpenCV, Mediapipe, PyQt5

*Links:* Same as above — CV hyperlinks the title but the URL didn't extract
from the PDF text. **TODO:** get the actual URL from Andrew (likely a GitHub
repo, given the naming pattern).

---

## Education

**University of Alberta** — Computer Science, Bachelor's
Sep 2023 – May 2027 · Edmonton, Canada

*(Supersedes the placeholder education list previously on the site, which had
NCUK Accra and GCIHS. Confirm with Andrew whether those earlier entries should
stay as a "before university" line, or be dropped now that the CV only lists
UAlberta.)*

**TODO:** confirm whether to keep pre-university education (GCIHS 2019–2022,
NCUK Accra 2022–2023) anywhere on the site, or whether the CV's
university-only listing reflects the intended public story now.

---

## Skills

Grouped exactly as the CV groups them — this replaces the three generic
Capabilities buckets currently in [lib/content.ts](lib/content.ts).

**Languages:** Python, C/C++, JavaScript, TypeScript, HTML5, CSS

**ML & Research:** LoRA fine-tuning, activation steering, linear probes,
sparse autoencoders, RAG, LangChain, TensorFlow, spaCy, Hugging Face, NumPy,
Pandas, OpenCV

**Web & Backend:** React, Next.js, Node.js, Vite, Tailwind CSS, Supabase,
PostgreSQL, PostGIS, GeoServer, Flask

**Tools & Testing:** Git, Docker, GitHub Actions, Jupyter Notebook, Vitest,
Playwright

---

## Community & personal

Short, human section — not a fifth work-experience entry. Give it a small
footprint (a line in About, or a compact list), not its own full section.

- **VP Secretary, ColorStack UofA chapter** — leadership/community
  involvement, distinct from paid work. TODO: confirm term/dates.
- **Guitar** — plays for fun. The one deliberately non-technical detail;
  keep it to a single line, don't overwrite it into something it isn't.

---

## Site structure implication

This content is dense enough that the current single "Selected work" grid
undersells it. Recommended section shape, to implement in
[lib/content.ts](lib/content.ts) and the components:

1. **Hero** — updated with the real professional summary, not the generic
   "computer science student... Python... AI" placeholder.
2. **Work** — becomes a tabbed section with three tabs, all reading from this
   file:
   - **Work Experience** — EW Analytics, Neubahar Labs, Algoverse (role,
     dates, bullets, stack)
   - **Research** — the recognition table, plus the two research roles told
     as research rather than employment (emphasis on findings, not "worked at")
   - **Projects** — HomeBatch, Study Buddy AI, Ace Budget AI, HandMouseApp
3. **Founder ventures** — a small dedicated block for heavy-spoon.com and
   instafurnish.shop, once descriptions exist. Until then, keep it in Work as
   a labeled two-card row so absent description TODOs don't block the rest of
   Work from shipping.
4. **Capabilities/Skills** — replace the current three generic buckets with
   the four CV categories verbatim (Languages / ML & Research / Web & Backend
   / Tools & Testing).
5. **About** — rewritten using the "about me" text above as its actual voice,
   not a paraphrase — problem-solver framing, Founders Launch program,
   ColorStack, guitar.

This is a design/IA decision, not just a copy swap — tracked as a task in
[PLAN.md](PLAN.md) and logged as new issues in [ISSUES.md](ISSUES.md).

---

## Outstanding TODOs (collected)

- [ ] Confirm Neubahar Labs start date (Sep 2026 — after "today" as tracked
      in PLAN.md; likely correct but worth a sanity check)
- [ ] One/two-sentence description for heavy-spoon.com
- [ ] One/two-sentence description for instafurnish.shop
- [ ] Exact name and dates for the Edmonton Unlimited Student Founders
      Launch program
- [ ] ColorStack UofA VP Secretary — term/dates
- [ ] Paper titles, links (arXiv/OpenReview/HuggingFace) for the
      MechInterp/CogInterp/UniReps recognitions
- [ ] Live/repo URL for Ace Budget AI
- [ ] Live/repo URL for HandMouseApp
- [ ] Live/repo URL for Study Buddy AI (if any)
- [ ] Decision: keep or drop pre-university education (GCIHS, NCUK Accra)
- [ ] CV download on the site should be re-synced to
      `cv-andrew-ansah-plain-2026-09-11.pdf` once content above is confirmed
