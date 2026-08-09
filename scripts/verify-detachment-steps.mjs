import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { createRequire } from "node:module";

dotenv.config({ path: ".env.local" });

// Use tsx-registered import via dynamic spawn alternative: duplicate minimal check via API data
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const { data: disc } = await sb
  .from("disciplines")
  .select("id, content_md")
  .eq("slug", "detachment")
  .single();

const { data: scenarios } = await sb
  .from("scenarios")
  .select("id, kind, prompt_md, options, correct_key, explanation")
  .eq("discipline_id", disc.id);

const md = disc.content_md;
console.log("content_md letter options?", /^\s*-\s*\*\*[A-D]\.\*\*/m.test(md));
console.log("content_md Best response?", /Best response/i.test(md));
console.log("Dilemma section snippet:", JSON.stringify(md.match(/## Dilemma[\s\S]{0,80}/)?.[0]));
console.log(
  "Recognition 1 snippet:",
  JSON.stringify(md.match(/## Recognition Activity 1[\s\S]{0,60}/)?.[0]),
);

const byKind = {};
for (const s of scenarios ?? []) {
  byKind[s.kind] ??= 0;
  byKind[s.kind]++;
}
console.log("scenarios by kind", byKind);

const dilemma = (scenarios ?? []).find((s) => s.kind === "dilemma");
console.log("dilemma options count", dilemma?.options?.length);
console.log("dilemma explanation", dilemma?.explanation);

const kc = (scenarios ?? []).filter((s) => s.kind === "knowledge_check");
console.log("kc count", kc.length);

// Reconstruct expected step titles in order from content headings + interactive inserts
const sections = md
  .replace(/\r\n/g, "\n")
  .split(/^## /m)
  .map((p) => p.trim())
  .filter(Boolean)
  .map((p) => p.split("\n")[0].trim());

const expected = [];
for (const title of sections) {
  if (/^dilemma$/i.test(title)) expected.push("Dilemma [interactive]");
  else if (/^recognition activity/i.test(title))
    expected.push(`${title} [interactive]`);
  else if (/^knowledge check$/i.test(title))
    expected.push("Knowledge Check [interactive]");
  else if (/^closing/i.test(title)) expected.push("Closing Statement");
  else expected.push(title);
}
expected.push("Mark Content As Viewed", "Complete Module");
console.log("EXPECTED STEP FLOW:");
expected.forEach((t, i) => console.log(`${i + 1}. ${t}`));
