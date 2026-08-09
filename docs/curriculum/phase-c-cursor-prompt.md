# Phase C — Public Explore Routes + Redesign + Content Reconciliation

## Context

Post-submission, non-deadline work. The Week 4 PR is merged. This phase brings the
live app in line with a finished design pass and updated curriculum copy. Seven new
source files are at `docs/curriculum/` in this repo:

- `TEF_updates.md` — palette, fonts, navigation model, explicit edit list
- `TEF_welcome_intro.md` — new course-level intro page content
- `TEF_developmental_paths.md` — UPDATED path descriptions (supersede what's seeded —
  wording has changed from the current `paths` table content, not just formatting)
- `TEF_updated_intentionality.md`, `TEF_updated_sense_of_wonder.md`,
  `TEF_updated_detachment.md` — updated module content with a DIFFERENT section
  order than currently seeded
- `TEF_-_Layout.pdf` (already in repo or re-attach if needed) — visual reference for
  the Coursera-style sidebar layout, hero page, and box styling for Core AI
  Question / Closing Question

Work through checkpoints in order. Stop and report after each. Print all SQL for
manual review/execution — never run migrations yourself. Do not touch
`execution/ludwitt-hult-api` or its Railway deployment — that instance must not be
redeployed or restarted (in-memory store, holds the merged submission's evidence).

---

## Checkpoint C1 — Public explore routes (architecture decision, confirmed)

This adds a new public route tree that sits OUTSIDE `middleware.ts`'s guard —
it does NOT loosen the existing guard on `/paths`. The two trees stay separate:

- `/explore` (public, no session) — landing-adjacent marketing pages: lists the
  three paths with their updated descriptions from `TEF_developmental_paths.md`
  and each path's discipline names (title only — no `content_md`, no scenario
  text, no completion state). A "Get Started" button here goes to wherever your
  existing sign-in/launch entry point lives (this cohort project's real auth
  door is the Ludwitt `/launch?token=` flow — "Get Started" should explain that
  the user arrives via Ludwitt, not present a fake local signup).
- `/paths` and below — UNCHANGED. Still fully gated by `middleware.ts`. Real
  `content_md`, real scenarios, real progress tracking only appear here, only
  post-launch.

Confirm in your report: `middleware.ts`'s matcher config still only covers
`/paths` and below, and `/explore` requires zero code changes to that file.

**Report back:** routes added, confirm the guard boundary is unchanged (paste
the matcher config), and a quick manual check that `/explore` renders with no
session while `/paths` still redirects to `/launch` with no session.

## Checkpoint C2 — Visual redesign

1. Apply the palette and type system from `TEF_updates.md` exactly: swatches
   `#035E7B` / `#FFFDF8` / `#F7934C` / `#141115` / `#745296`; Merriweather for
   main titles, Lora for sub-titles, Source Sans Pro for body, Source Sans Pro
   SemiBold for CTAs/buttons. This REPLACES the earlier palette
   (`#173F35`/`#EAF4F4`/`#D56F3E`/`#5E8C78`/`#C7A65A`) — swap, don't layer.
2. Build the Coursera-style layout per the reference PDF: fixed left sidebar
   (program title, "Today's Goal" checklist, path/module nav tree), main content
   area on the right.
3. "Core AI Question" box: fixed/sticky at the top of each discipline's lesson
   content. On the Welcome and Introduction page specifically, this box instead
   reads "Authority, Ambiguity and Control" per `TEF_updates.md`.
4. "Closing Question" also rendered as a box (same treatment as Core AI Question,
   placed at the end of lesson content).
5. Sidebar module list: "Preview" / "Full Module" shown on hover only (not
   always-visible badges like the current build). Preview module pages show
   "Full Module Coming Soon" prominently.
6. Hero page copy changes (landing, not `/explore`):
   - Tagline → "AI makes creation abundant; human judgment sets the limit"
   - Description → replace "...a developmental learning programme..." with
     "...a developmental programme..." (drop "learning")
7. All section titles/subtitles currently in sentence case → Title Case
   Each Word, sitewide, including inside rendered `content_md` headers.
8. Attribution: move the Jenkins & Jenkins attribution block from wherever it
   currently sits (landing page / `/about`) to render at the END of the course
   content — i.e., after a learner completes all disciplines in a path, or as
   the final section of `/paths` itself. Use your judgment on exact placement
   and flag your choice in the report.

**Report back:** screenshots or a route-by-route description of what changed,
and explicit confirmation that steps 1–8 above are each done (list them,
check them off) rather than a general "redesign complete" summary.

## Checkpoint C3 — Content reconciliation

This is a content DIFF-AND-REPLACE against what's currently seeded, not a
fresh seed. Write `supabase/migrations/0005_content_update.sql` and print it
for review.

1. **Global rename:** everywhere "Behavioural Continuum" (or "Behavioral
   Continuum") appears in any `content_md`, replace with "How [Discipline]
   Shows Up" — substituting the actual discipline name each time (e.g. "How
   Detachment Shows Up," "How Intentionality Shows Up").
2. **Path descriptions:** update all three `paths` rows' description content
   to match `TEF_developmental_paths.md` verbatim — this is NEW wording, not
   the same text reformatted. Diff against what's currently in the table
   before overwriting, and flag anything you're unsure whether to keep vs.
   replace.
3. **Intentionality, Sense of Wonder, and Detachment `content_md`:** re-derive
   from `TEF_updated_intentionality.md`, `TEF_updated_sense_of_wonder.md`, and
   `TEF_updated_detachment.md` respectively. These have BOTH new/adjusted
   wording AND a different section order than what's currently seeded. New
   order (confirm this matches what you find in the source docs before
   applying):
   Introduction → Foundation → AI-Era Definition → **Dilemma** → Why It
   Matters → What It Is and What It Is Not → Central Tension → How
   [Discipline] Shows Up → AI-Era Failure Modes → Applying [Discipline] →
   Recognition Activity (Detachment has Recognition Activity 1 → Recognition
   Activity 2) → Self-Assessment → Knowledge Check.
   Note Dilemma has MOVED (was later in the old order) and Applying now comes
   before Recognition Activity. Detachment's dilemma correct answer remains C
   — no change to options/correct_key/scores; only `content_md` structure and
   text, same as the other two full modules.
4. **New static page — Welcome and Introduction:** this is course-level, not
   a discipline — do not add it to the `disciplines` table. Build it as a
   static route (e.g. `/paths/welcome` or similar, your call, inside the
   authed tree since the mockup shows it alongside the path sidebar
   post-launch) using `TEF_welcome_intro.md` verbatim: Introduction, Course
   Objectives, Intended Outcome. No quiz, no completion event — informational
   only.
5. Do NOT touch the three full modules' Dilemma/Recognition/Knowledge Check
   `options`/`correct_key`/scores from Phase A2 — only `content_md` structure
   and the global rename apply here.

**Report back:** the migration SQL in full, and a summary table of exactly
what changed per discipline/path so it's reviewable at a glance before running.
