/**
 * Builds supabase/migrations/0008_review_batch_2.sql for manual review.
 * Does not execute anything against the database.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const md = readFileSync(
  resolve(root, "docs/curriculum/_derived_sense_of_wonder_content.md"),
  "utf8",
).replace(/\r\n/g, "\n");

const recognitionPrompt = `**Recognition activity — Automation or imagination?**

Classify each project question, then select which question best expresses imagination-focused Sense of Wonder?`;

const options = [
  {
    key: "A",
    text: "How can we move the existing approval process online?",
    score: 0,
  },
  {
    key: "B",
    text: "How can we automate the routing and status updates for each application??",
    score: 0,
  },
  {
    key: "C",
    text: "How can AI reject incomplete applications faster?",
    score: 0,
  },
  {
    key: "D",
    text: "How might the service help applicants provide what is needed before rejection occurs?",
    score: 1,
  },
];

const explanation =
  "D reframes the problem around helping applicants succeed before rejection — imagination-focused Sense of Wonder — rather than automating or accelerating the existing process.";

const sql = `-- 0008_review_batch_2.sql
-- REVIEW ONLY — do not auto-execute. Wait for explicit confirmation after manual run.
--
-- Changes:
-- 1) Sense of Wonder recognition: correct_key B→D, prompt wording, options aligned to
--    TEF_updated_sense_of_wonder.md (option B text + scores), explanation rewritten for D.
-- 2) Sense of Wonder content_md from _derived_sense_of_wonder_content.md:
--    - Balanced Expression under Central Tension
--    - AI-Era Failure Modes intro sentence
--    - Wonder and Creativity section NOT changed (source docx not available in repo)
-- 3) Knowledge Check Q4 option C text.

update disciplines
set content_md = $sow$
${md}
$sow$
where id = 'b2000000-0000-4000-8000-000000000005';

update scenarios
set
  prompt_md = $p$
${recognitionPrompt}
$p$,
  options = $j$${JSON.stringify(options)}$j$::jsonb,
  correct_key = 'D',
  explanation = $e$${explanation}$e$
where id = 'c3000000-0000-4000-8000-000000000015';

-- Knowledge Check Q4: "Wonder becomes distorted when" — option C wording
update scenarios
set options = (
  select jsonb_agg(
    case
      when elem->>'key' = 'C' then jsonb_set(
        elem,
        '{text}',
        to_jsonb('You generate endlessly but refuse to choose.'::text)
      )
      else elem
    end
    order by ord
  )
  from jsonb_array_elements(options) with ordinality as t(elem, ord)
)
where id = 'c3000000-0000-4000-8000-000000000019';
`;

const out = resolve(root, "supabase/migrations/0008_review_batch_2.sql");
writeFileSync(out, sql, "utf8");
console.log("Wrote", out);
