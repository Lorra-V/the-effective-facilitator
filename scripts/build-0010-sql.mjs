/**
 * Builds supabase/migrations/0010_intentionality_failure_modes_intro.sql
 * for manual review. Does not execute against the database.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const md = readFileSync(
  resolve(root, "docs/curriculum/_derived_intentionality_content.md"),
  "utf8",
).replace(/\r\n/g, "\n");

const intro =
  "AI-era failure modes are recurring patterns of behaviour that can weaken judgment, participation or decision-making when people work with AI. They are not fixed personal traits, but tendencies to recognise and manage through deliberate practice.";

if (!md.includes(intro)) {
  console.error("Derived Intentionality content missing AI-Era Failure Modes intro");
  process.exit(1);
}

const sql = `-- 0010_intentionality_failure_modes_intro.sql
-- REVIEW ONLY — do not auto-execute. Wait for explicit confirmation after manual run.
--
-- Adds the shared AI-Era Failure Modes intro sentence to Intentionality
-- (matches Detachment / Sense of Wonder).
-- Note: stripping "Overuse indicator" from participant view is a code-only change
-- in lib/lesson-steps.ts — no SQL required for that.

update disciplines
set content_md = $int$
${md}
$int$
where id = 'b2000000-0000-4000-8000-000000000006';
`;

const out = resolve(
  root,
  "supabase/migrations/0010_intentionality_failure_modes_intro.sql",
);
writeFileSync(out, sql, "utf8");
console.log("Wrote", out);
