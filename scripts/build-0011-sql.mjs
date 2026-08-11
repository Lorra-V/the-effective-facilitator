/**
 * Builds supabase/migrations/0011_intentionality_balanced_expression.sql
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

const body =
  "I can remain committed to the purpose without becoming rigid about how it must be achieved.";

if (!md.includes("### Balanced Expression") || !md.includes(body)) {
  console.error("Derived Intentionality missing Balanced Expression");
  process.exit(1);
}

const sql = `-- 0011_intentionality_balanced_expression.sql
-- REVIEW ONLY — do not auto-execute. Wait for explicit confirmation after manual run.
--
-- Adds Intentionality Balanced Expression at end of Central Tension
-- (same CalloutBox closing treatment as Detachment / Sense of Wonder).
--
-- Note: If 0010 has not been applied yet, this full content_md replace also
-- includes the AI-Era Failure Modes intro from 0010.

update disciplines
set content_md = $int$
${md}
$int$
where id = 'b2000000-0000-4000-8000-000000000006';
`;

const out = resolve(
  root,
  "supabase/migrations/0011_intentionality_balanced_expression.sql",
);
writeFileSync(out, sql, "utf8");
console.log("Wrote", out);
