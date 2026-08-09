/**
 * Builds supabase/migrations/0005_content_update.sql from derived content files.
 * Run: node scripts/build-0005-migration.mjs
 * Does NOT execute the migration.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const curriculum = path.join(root, "docs", "curriculum");

function readMd(name) {
  return fs.readFileSync(path.join(curriculum, name), "utf8").replace(/\r\n/g, "\n").trimEnd() + "\n";
}

function dollarQuote(tag, body) {
  if (body.includes(`$${tag}$`)) {
    throw new Error(`Content contains delimiter $${tag}$`);
  }
  return `$${tag}$${body}$${tag}$`;
}

const detachment = readMd("_derived_detachment_content.md");
const intentionality = readMd("_derived_intentionality_content.md");
const wonder = readMd("_derived_sense_of_wonder_content.md");

const pathDescriptions = {
  "regarding-others": `The **Regarding Others** path explores how we influence people without taking away their agency. It holds the tension between **Detachment**—releasing the need to control the answer, receive recognition or prove ourselves right—and **Engagement**—caring enough to remain responsible and involved. **Focus** provides the balance: staying committed to the purpose while allowing others to contribute to, shape and own the outcome.

In AI-supported work, this path helps us decide when to offer direction, when to challenge an output, when to step back and when participation matters more than producing the fastest or most technically impressive answer. It asks:

**How do I use intelligence and influence without taking control away from others?**
`,
  "regarding-myself": `The **Regarding Myself** path concerns our ability to remain the authors of our own thinking and choices. **Interior Dialogue** helps us recognise and examine the different voices, assumptions, emotions and motives influencing us. **Intentionality** enables us to clarify what we are trying to accomplish, why it matters and what responsibility must remain ours. **Sense of Wonder** preserves our openness to inspiration, possibility and ideas that have not yet been formed.

In an era when AI can generate answers before we have fully explored the question, this path protects independent judgment and creative agency. It helps us use AI to extend our thinking without allowing its fluency, speed or apparent certainty to replace the inner work of discernment and imagination. It asks:

**How do I remain the author of my choices when systems can think and generate for me?**
`,
  "regarding-life": `The **Regarding Life** path explores how we respond to situations that are complex, changing and never fully known. **Awareness** helps us notice what is happening within ourselves, between people and across the wider context. **Action** develops our capacity to intervene with courage, judgment and appropriate force. **Presence** brings these together, allowing us to remain attentive to reality while responding deliberately rather than automatically.

In AI-mediated environments, information may be abundant while certainty remains limited. This path strengthens our ability to see beyond a complete-looking output, remain attentive to what data may miss and act responsibly without pretending that every uncertainty has been resolved. It asks:

**How do I respond wisely when information is abundant but certainty is not?**
`,
};

const sql = `-- Phase C3 content reconciliation — DIFF-AND-REPLACE (not a fresh seed).
-- Source: docs/curriculum/TEF_developmental_paths.md,
--         TEF_updated_detachment.md, TEF_updated_intentionality.md,
--         TEF_updated_sense_of_wonder.md
-- Run manually in the Supabase SQL Editor AFTER 0004_seed_curriculum.sql.
-- Do NOT touch scenarios.options / correct_key / scores.
--
-- FLAGGED:
--   1) paths had no description column — this migration ADDS paths.description.
--   2) Closing Statement bodies were empty in TEF_updated_*.md (pandoc truncation).
--      Restored prior Phase A2 closing lines for the three full modules so the
--      Closing Question box is not blank. Confirm or replace if new closings arrive.
--   3) Sense of Wonder includes extra section "Wonder and Creativity" (in source
--      between Why It Matters and What It Is and What It Is Not) — kept.
--   4) Global rename "Behavioural Continuum" → "How [Discipline] Shows Up" is
--      covered by full content_md replacement for Detachment, Intentionality,
--      and Sense of Wonder (only disciplines that had that heading in 0004).
--   5) Welcome and Introduction is a static route (/paths/welcome), not a DB row.
--   6) Path title theme for Regarding Life: "intervention" → "Action" per TEF.

begin;

-- ---------------------------------------------------------------------------
-- Schema: path descriptions (verbatim TEF_developmental_paths.md bodies)
-- ---------------------------------------------------------------------------
alter table paths add column if not exists description text not null default '';

update paths
set
  title = $t$Regarding Others — Authority, Participation and Ownership$t$,
  description = ${dollarQuote("d1", pathDescriptions["regarding-others"])}
where slug = 'regarding-others';

update paths
set
  title = $t$Regarding Myself — Agency, Imagination and Intention$t$,
  description = ${dollarQuote("d2", pathDescriptions["regarding-myself"])}
where slug = 'regarding-myself';

update paths
set
  title = $t$Regarding Life — Perception, Uncertainty and Action$t$,
  description = ${dollarQuote("d3", pathDescriptions["regarding-life"])}
where slug = 'regarding-life';

-- ---------------------------------------------------------------------------
-- Full-module content_md re-derive (structure + wording only)
-- IDs from 0004_seed_curriculum.sql
-- ---------------------------------------------------------------------------
update disciplines
set content_md = ${dollarQuote("md_detach", detachment)}
where slug = 'detachment';

update disciplines
set content_md = ${dollarQuote("md_intent", intentionality)}
where slug = 'intentionality';

update disciplines
set content_md = ${dollarQuote("md_wonder", wonder)}
where slug = 'sense-of-wonder';

-- Explicit no-op guard comment: scenarios table intentionally untouched.
-- select id, kind, correct_key from scenarios where discipline_id in (...);

commit;
`;

const out = path.join(root, "supabase", "migrations", "0005_content_update.sql");
fs.writeFileSync(out, sql, "utf8");
console.log(`Wrote ${out} (${sql.length} bytes)`);
console.log(`Detachment content_md: ${detachment.length} chars`);
console.log(`Intentionality content_md: ${intentionality.length} chars`);
console.log(`Sense of Wonder content_md: ${wonder.length} chars`);
