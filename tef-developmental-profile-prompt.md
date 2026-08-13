# TEF Developmental Profile — Scoped Baseline Assessment

## Context

This replaces the "TEF Developmental Profile → Coming Soon" stub at `/paths/assessment`
with a real, working feature. This is a DELIBERATELY SCOPED-DOWN version of the full
Baseline Assessment Blueprint (docs/curriculum/TEF_-_Baseline_Assessment_Blueprint.docx,
if present in repo) — that blueprint covers all nine disciplines with 36 items, 9
scenarios, weighted cross-cutting scoring, module recommendations, and a full report.
NONE of that full scope ships this week. Build only what's specified below.

This is real product work, not throwaway — it replaces the app's primary homepage CTA
destination ("Discover Your Facilitator Profile" should eventually feel like it leads
somewhere real), so build it cleanly, but keep it small.

**Forward-looking note, do NOT implement now:** the founder is considering a future
freemium model where these three disciplines' profile stays free and further
disciplines/depth become paid. Don't build any payment or gating logic this week —
just avoid decisions that would make adding a paywall boundary later awkward (e.g.,
keep the profile's own routes/components self-contained rather than deeply
entangled with the free module content).

---

## Scope — exactly this, nothing more

**Content:** the three ALREADY-WRITTEN full disciplines only — Detachment,
Intentionality, Sense of Wonder. Do not write new content for the other six.

**Self-assessment items:** reuse the 12 existing self-assessment items already seeded
in each discipline's `content_md` (4 items per discipline × 3 = 12). Do not write new
items. Present as a 1–5 rating scale, same as the in-module Self-Assessment step
already built (reuse that UI component if practical).

**Scenarios:** reuse the three existing Dilemma prompts (Detachment, Intentionality,
Sense of Wonder) for situational-judgment scoring — BUT this is important:

**Architecture decision, follow exactly:** do NOT write profile responses into the
existing `scenarios` / `progress` tables that drive in-module completion gating. The
profile must be fully independent of module progress — a user should be able to take
the profile without it affecting their module completion state, and vice versa (e.g.,
someone who already completed Detachment's module should still be able to take the
profile fresh, and taking the profile should not silently mark Detachment's dilemma
as "answered" for module-completion purposes).

Simplest safe approach: hardcode the three dilemma prompts + options + scores
directly into a new file (e.g., `lib/baseline-profile.ts`), copied from the existing
seeded scenario content — do not query the live `scenarios` table for this feature at
all. This avoids any cross-contamination risk with module gating logic, which must
NOT be touched by this work.

**New table**, print SQL for review (do not run):

```sql
create table profile_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id) not null,
  answers jsonb not null,       -- { "detachment": { likert: [1-5 x4], dilemma_choice: "C" }, ... }
  scores jsonb not null,        -- { "detachment": { score: number, band: "Underused"|"Balanced"|"Overused" }, ... }
  completed_at timestamptz not null default now()
);

alter table profile_results enable row level security;
grant select, insert, update, delete on public.profile_results to service_role;
```

**Scoring — keep simple:**
- Per discipline: average the 4 Likert ratings (reverse-score any item flagged
  `Reverse-scored` / `Distortion indicator` / `Overuse indicator` in that
  discipline's source content — invert the 1–5 value before averaging), plus the
  dilemma choice's existing score (4/3/2/1), combined into one 0–100 scale by your
  own reasonable formula — show your formula in the report rather than picking
  silently.
- Band per discipline: map the 0–100 score to "Underused" / "Balanced" / "Overused"
  using roughly even thirds — reuse this exact three-state language, it already
  appears in every module's Central Tension section, don't invent new labels.

**Flow:**
1. `/paths/assessment` — intro screen: what this is (3 disciplines, ~5 minutes),
   start button.
2. 12 Likert items, grouped visually by discipline (Detachment first, then
   Intentionality, then Sense of Wonder — same order as elsewhere in the app),
   one screen or step-by-step, your call on which reads better given the existing
   step-flow pattern used in modules.
3. 3 dilemma scenarios (same prompt/options text as the real modules, sourced from
   the hardcoded file, not the DB) — single-select each.
4. Submit → compute scores → write one row to `profile_results` → show results page:
   three discipline bands with a one-line description each (pull the description
   from that discipline's existing Central Tension "Underused/Balanced/Overused"
   bullet lists — reuse existing text, don't write new copy), and a closing CTA
   pointing at the path/discipline pages to go deeper.
5. No event firing to Ludwitt for this feature — it's not a `lesson`, don't fire
   `lesson_started`/`lesson_completed`/`quiz_submitted` for profile activity. This is
   intentional; don't add events here.

**Do NOT build:** the other six disciplines' items, module recommendations, a
downloadable report, confidence ratings, retake history, or any payment/access gating.

## Report back

Print the SQL for review — don't run it. Show me the scoring formula you chose in
plain language before I approve. Confirm module completion logic (progress,
scenarios tables, lesson_completed events) is completely untouched by this work.
