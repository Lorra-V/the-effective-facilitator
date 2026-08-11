/**
 * Builds supabase/migrations/0009_detachment_balanced_expression.sql for manual review.
 * Does not execute against the database.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const md = readFileSync(
  resolve(root, "docs/curriculum/_derived_detachment_content.md"),
  "utf8",
).replace(/\r\n/g, "\n");

if (!md.includes("### Balanced Expression")) {
  console.error("Derived Detachment content is missing ### Balanced Expression");
  process.exit(1);
}
if (
  !md.includes(
    "I can care deeply about the quality of the outcome without needing the outcome to validate me.",
  )
) {
  console.error("Derived Detachment content is missing Balanced Expression body");
  process.exit(1);
}

const sql = `-- 0009_detachment_balanced_expression.sql
-- REVIEW ONLY — do not auto-execute. Wait for explicit confirmation after manual run.
--
-- Restores Detachment Balanced Expression at end of Central Tension
-- (Phase A 0004 wording; CalloutBox closing style via ### Balanced Expression heading).

update disciplines
set content_md = $det$
${md}
$det$
where id = 'b2000000-0000-4000-8000-000000000001';
`;

const out = resolve(
  root,
  "supabase/migrations/0009_detachment_balanced_expression.sql",
);
writeFileSync(out, sql, "utf8");
console.log("Wrote", out);
