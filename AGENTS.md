# AGENTS.md

How work on this portfolio is divided when it's split across sessions or
sub-agents. High level — the workflow itself lives in [CLAUDE.md](CLAUDE.md).

Any agent, human or model, that touches this repo reads
[INTENT.md](INTENT.md) → [PLAN.md](PLAN.md) → [ISSUES.md](ISSUES.md) first and
records its results at the end. No exceptions: the loop only holds if every
participant writes back into it.

---

## The roles

These are hats, not job titles. One session usually wears several. Naming them
keeps a session from drifting — e.g. from "fix the tabs" into a full redesign.

### 🧭 Orchestrator
**Owns:** [PLAN.md](PLAN.md).
Reads the state of the project, decides what the next valuable step is, keeps
work inside the current phase, and writes the session log at the end. The only
role allowed to change the current phase or reorder the plan. When in doubt
about scope, this role asks Andrew rather than guessing.

### 🎨 Designer
**Owns:** visual language — type scale, spacing, colour, motion, layout.
Works mainly in Phase 2. Judges by eye, not by checklist: hierarchy, rhythm,
restraint. Has standing permission to say "this looks templated" and propose
something better. Constraint: beauty that breaks accessibility or performance
isn't beauty, it's a bug — hand those trade-offs back to the Orchestrator.

### 🔨 Builder
**Owns:** [index.html](index.html), [style.css](style.css), `js/main.js`.
Implements the picked task following the conventions in [CLAUDE.md](CLAUDE.md).
Keeps diffs small and `main` deployable. Doesn't expand scope mid-task — new
things noticed go into [ISSUES.md](ISSUES.md) instead.

### 🔍 Reviewer
**Owns:** [ISSUES.md](ISSUES.md).
Audits what exists against the bar in [INTENT.md](INTENT.md): correctness,
keyboard access, screen reader semantics, contrast, responsive behaviour,
performance, dead links, honest content. Logs findings with enough detail for
someone else to fix them. Never reports "looks good" without having actually
opened the page.

### ✍️ Content author
**Owns:** the words — About, project case studies, skills, CV sync.
Writes in Andrew's voice: direct, specific, no inflated claims. Crucially, this
role **cannot invent facts**. Anything it doesn't know — a project outcome, a
date, a link — becomes a `TODO` and a question for Andrew.

### 🚀 Shipper
**Owns:** deployment, meta tags, sitemap, favicon, asset pipeline, Lighthouse
numbers. Verifies the live site, not just localhost.

---

## Handoff protocol

When one role hands to another — across sub-agents or across sessions — the
handoff carries exactly this:

1. **What I did** — the actual change, by file.
2. **What I learned** — the non-obvious discovery. The most valuable line.
3. **What's next** — the specific next action.
4. **What's open** — anything unresolved, plus questions for Andrew.

That's the same shape as a session-log entry in [PLAN.md](PLAN.md), on purpose:
a handoff can be pasted straight into the log, and the log can be read as a
handoff by the next session. That symmetry is what gives the project a context
window longer than any single conversation.

## Rules that bind every role

- **Verify before claiming.** Open the page. Click the thing. Resize the window.
- **Report honestly.** Half-done is reported as half-done.
- **Stay in scope.** Interesting discoveries go to [ISSUES.md](ISSUES.md), not
  into the current diff.
- **Never fabricate content** about Andrew, his projects, or his experience.
- **Always close the loop.** A session that changed files but didn't update the
  docs has cost the project more than it gained.

## Escalate to Andrew when

- Content is needed that only he knows (project details, outcomes, links, CV).
- A change would alter the site's identity or direction (stack rewrite, tone shift).
- Two documents genuinely conflict and [INTENT.md](INTENT.md) doesn't settle it.
- Something requires an account, a domain, a deploy key, or money.
