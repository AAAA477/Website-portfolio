# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

Andrew Adrian Ansah's personal portfolio website. A hand-written static site —
HTML, CSS, vanilla JS, no build step. The purpose is stated in
[INTENT.md](INTENT.md): it must be beautiful, it must demonstrate real frontend
skill, and a visitor must leave knowing who Andrew is. The site's own quality
*is* the deliverable, so "it works" is not the bar — "it's well made" is.

## The document set

| File | Role | Changes |
|---|---|---|
| [INTENT.md](INTENT.md) | Why the project exists, who it's for, what success means | Rarely — only when Andrew's goals change |
| [PLAN.md](PLAN.md) | Phases, tasks, working agreement, **session log** | Every session |
| CLAUDE.md | How to work here (this file) | When the workflow itself changes |
| [AGENTS.md](AGENTS.md) | Who does what when work is split up | When roles change |
| [ISSUES.md](ISSUES.md) | Every known defect, papercut and idea | Continuously |

Precedence when they disagree: **INTENT → PLAN → CLAUDE → ISSUES.**

---

## The loop

The point of this loop is continuity. Each session starts by reading what past
sessions learned and ends by writing down what this session learned, so context
survives past the end of a context window.

```
   ┌──────────────────────────────────────────────────────────┐
   │                                                          │
   ▼                                                          │
1. ORIENT   read INTENT → PLAN (incl. last session log) → ISSUES
   │
   ▼
2. PICK     choose the smallest valuable next step from the
            current phase in PLAN.md. State it out loud before starting.
   │
   ▼
3. BUILD    make the change. Small, focused, main stays deployable.
   │
   ▼
4. VERIFY   open the page, click it, keyboard it, resize it.
            No "should work" — look at it.
   │
   ▼
5. RECORD   tick the PLAN checkbox · update ISSUES (fixed / newly found)  ─┘
            · append a session-log entry to PLAN.md · commit
```

### 1. Orient (start of every session)

Read, in order: [INTENT.md](INTENT.md), [PLAN.md](PLAN.md) — pay attention to
**Current phase** and the newest **session log** entry — then
[ISSUES.md](ISSUES.md). Only then look at code. If the docs contradict what the
code actually does, the code is the truth and the docs get corrected.

### 2. Pick

Take the next unchecked item in the current phase. Don't skip ahead to a later
phase because it's more fun — broken foundations make polish worthless. If
something urgent appears mid-phase, add it to ISSUES.md and keep going unless
it blocks the current task.

### 3. Build

Follow the conventions below. Keep the diff small enough to read in one sitting.

### 4. Verify

Every change gets looked at in a browser before it is called done:
- Does it work at ~360px wide, at tablet, at desktop?
- Can you reach and operate it with Tab and Enter alone?
- Does it survive JavaScript being disabled without hiding content?
- Do animations stop when `prefers-reduced-motion: reduce` is set?

Report honestly. If something is half-done, say it's half-done.

### 5. Record (end of every session — never skip this)

This step is what makes the loop a loop:

1. Tick completed checkboxes in [PLAN.md](PLAN.md).
2. Move fixed items to the Resolved section of [ISSUES.md](ISSUES.md); add
   anything new that was noticed along the way, even if it wasn't worked on.
3. Append a **session log** entry at the top of the log in PLAN.md:
   - **Did** — what actually changed
   - **Learned** — the non-obvious thing discovered (this is the most valuable line)
   - **Next** — the specific next step, so the next session starts moving immediately
4. Update **Current phase** / **Last updated** in PLAN.md if they moved.
5. Commit.

If a session is about to run out of context, do step 5 *first*, then stop.
An unrecorded session is a lost session.

---

## Code conventions

**HTML** — semantic elements (`header`, `main`, `section`, `nav`, `footer`).
One `h1` per page. Every image gets meaningful `alt`, plus `width`/`height` to
prevent layout shift. Interactive things are `<button>` or `<a>`, never a `<p>`
or `<i>` with an `onclick`.

**CSS** — single [style.css](style.css) for now; split into partials only if it
becomes genuinely hard to navigate. All colours, spacing and timing go through
the custom properties in `:root` — never hardcode a hex that duplicates a token.
Mobile-first media queries. Prefer Grid/Flexbox over absolute positioning.
Every animation sits behind a `prefers-reduced-motion` guard.

**JavaScript** — vanilla ES6+, no dependencies, in `js/main.js` (extracting it
from the inline `<script>` is a Phase 0 task). `addEventListener`, never inline
`onclick`. The page must remain readable and navigable if the script fails.

**Assets** — live in [images/](images/) with descriptive kebab-case names.
Serve WebP/AVIF with sensible dimensions; don't ship a 2MB PNG as a thumbnail.

**Commits** — imperative present tense, one concern per commit
("Extract inline script into js/main.js"). `main` deployable at every commit.

## Things to be careful about

- **The Apps Script endpoint** in the contact form is a public URL committed to
  this repo. Don't treat it as a secret and don't add real secrets to the repo.
- **Andrew's real contact details** are on the page by design. Don't add more
  personal data than the site already exposes.
- **Don't invent content.** Project descriptions, dates, skill levels and links
  must come from Andrew. Placeholder text is marked `TODO`, never passed off as real.
- **Don't rewrite the site into a framework** without an explicit decision
  recorded in [PLAN.md](PLAN.md).

## Quick reference

- Preview: open [index.html](index.html) in a browser, or `python -m http.server 8000`
- No build, no tests, no lint configured — verification is manual and visual
- Deploy target: TBD (Phase 0)
