/**
 * Applies 0005 content updates via Supabase service-role API.
 * DDL (ALTER TABLE paths ADD description) requires a Postgres connection /
 * SQL Editor — attempted first via optional DATABASE_URL / SUPABASE_DB_URL.
 */
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import pg from "pg";
import { fileURLToPath } from "node:url";

dotenv.config({ path: ".env.local" });

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const curriculum = path.join(root, "docs", "curriculum");

function readMd(name) {
  return (
    fs.readFileSync(path.join(curriculum, name), "utf8").replace(/\r\n/g, "\n").trimEnd() +
    "\n"
  );
}

const pathUpdates = [
  {
    slug: "regarding-others",
    title: "Regarding Others — Authority, Participation and Ownership",
    description: `The **Regarding Others** path explores how we influence people without taking away their agency. It holds the tension between **Detachment**—releasing the need to control the answer, receive recognition or prove ourselves right—and **Engagement**—caring enough to remain responsible and involved. **Focus** provides the balance: staying committed to the purpose while allowing others to contribute to, shape and own the outcome.

In AI-supported work, this path helps us decide when to offer direction, when to challenge an output, when to step back and when participation matters more than producing the fastest or most technically impressive answer. It asks:

**How do I use intelligence and influence without taking control away from others?**
`,
  },
  {
    slug: "regarding-myself",
    title: "Regarding Myself — Agency, Imagination and Intention",
    description: `The **Regarding Myself** path concerns our ability to remain the authors of our own thinking and choices. **Interior Dialogue** helps us recognise and examine the different voices, assumptions, emotions and motives influencing us. **Intentionality** enables us to clarify what we are trying to accomplish, why it matters and what responsibility must remain ours. **Sense of Wonder** preserves our openness to inspiration, possibility and ideas that have not yet been formed.

In an era when AI can generate answers before we have fully explored the question, this path protects independent judgment and creative agency. It helps us use AI to extend our thinking without allowing its fluency, speed or apparent certainty to replace the inner work of discernment and imagination. It asks:

**How do I remain the author of my choices when systems can think and generate for me?**
`,
  },
  {
    slug: "regarding-life",
    title: "Regarding Life — Perception, Uncertainty and Action",
    description: `The **Regarding Life** path explores how we respond to situations that are complex, changing and never fully known. **Awareness** helps us notice what is happening within ourselves, between people and across the wider context. **Action** develops our capacity to intervene with courage, judgment and appropriate force. **Presence** brings these together, allowing us to remain attentive to reality while responding deliberately rather than automatically.

In AI-mediated environments, information may be abundant while certainty remains limited. This path strengthens our ability to see beyond a complete-looking output, remain attentive to what data may miss and act responsibly without pretending that every uncertainty has been resolved. It asks:

**How do I respond wisely when information is abundant but certainty is not?**
`,
  },
];

const contentUpdates = [
  { slug: "detachment", file: "_derived_detachment_content.md" },
  { slug: "intentionality", file: "_derived_intentionality_content.md" },
  { slug: "sense-of-wonder", file: "_derived_sense_of_wonder_content.md" },
];

async function tryRunSqlFile() {
  const url = process.env.SUPABASE_DB_URL || process.env.SUPABASE_DATABASE_URL;
  if (!url) {
    console.log(
      "DDL: no SUPABASE_DB_URL — will apply DML via service role; ALTER may need SQL Editor",
    );
    return false;
  }
  // Refuse Cursor-injected Neon URL that is not this project's Supabase DB
  if (url.includes("neon.tech") && !url.includes("uuhxczacsmmpfmqirwao")) {
    console.log("DDL: refusing non-Supabase DATABASE_URL host");
    return false;
  }
  const sql = fs.readFileSync(
    path.join(root, "supabase/migrations/0005_content_update.sql"),
    "utf8",
  );
  const client = new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("Full 0005 SQL executed via Postgres connection");
  return true;
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const ranFull = await tryRunSqlFile();
if (ranFull) {
  process.exit(0);
}

// --- DML via PostgREST ---
console.log("Applying path titles…");
for (const p of pathUpdates) {
  const { error } = await sb.from("paths").update({ title: p.title }).eq("slug", p.slug);
  if (error) {
    console.error("path title failed", p.slug, error.message);
    process.exit(1);
  }
  console.log("  title ok", p.slug);
}

console.log("Attempting paths.description column…");
{
  const probe = await sb.from("paths").select("description").limit(1);
  if (probe.error?.message?.includes("description")) {
    console.log(
      "  description column missing — applying ALTER is required in SQL Editor:",
    );
    console.log(
      "  alter table paths add column if not exists description text not null default '';",
    );
  } else if (!probe.error) {
    for (const p of pathUpdates) {
      const { error } = await sb
        .from("paths")
        .update({ description: p.description })
        .eq("slug", p.slug);
      if (error) {
        console.error("description failed", p.slug, error.message);
        process.exit(1);
      }
      console.log("  description ok", p.slug);
    }
  } else {
    console.error(probe.error.message);
    process.exit(1);
  }
}

console.log("Updating content_md for full modules…");
for (const c of contentUpdates) {
  const md = readMd(c.file);
  const { error } = await sb
    .from("disciplines")
    .update({ content_md: md })
    .eq("slug", c.slug);
  if (error) {
    console.error("content_md failed", c.slug, error.message);
    process.exit(1);
  }
  console.log("  content_md ok", c.slug, md.length, "chars");
}

// Verify
const { data: discs, error: vErr } = await sb
  .from("disciplines")
  .select("slug, content_md")
  .in("slug", ["detachment", "intentionality", "sense-of-wonder"]);
if (vErr) {
  console.error(vErr.message);
  process.exit(1);
}
console.log("VERIFY closings:");
for (const d of discs ?? []) {
  const m = d.content_md.match(/## Closing Statement\s*\n+([^\n#]+)/);
  console.log(
    `  ${d.slug}: has_closing=${d.content_md.includes("## Closing Statement")} body=${JSON.stringify((m?.[1] || "").trim())}`,
  );
  console.log(
    `           has_shows_up=${/How .+ Shows Up/.test(d.content_md)} old_continuum=${d.content_md.includes("Behavioural continuum")}`,
  );
}

const { data: dilemmas } = await sb
  .from("scenarios")
  .select("kind, correct_key, disciplines!inner(slug)")
  .eq("kind", "dilemma")
  .in("disciplines.slug", ["detachment", "intentionality", "sense-of-wonder"]);
console.log("VERIFY dilemma keys (untouched):");
for (const s of dilemmas ?? []) {
  console.log(" ", s.disciplines.slug, s.correct_key);
}

const { data: paths } = await sb
  .from("paths")
  .select("slug, title")
  .order("sort_order");
console.log("VERIFY path titles:");
for (const p of paths ?? []) console.log(" ", p.slug, p.title);

console.log("DONE (service-role DML). If description column was missing, run ALTER + description UPDATEs from 0005 in SQL Editor.");
