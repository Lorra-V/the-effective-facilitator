import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "node:url";

dotenv.config({ path: ".env.local" });

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const curriculum = path.join(root, "docs", "curriculum");

function splitClosing(markdown) {
  const match = markdown.match(/^#{1,3}\s*Closing\s+(Question|Statement)\s*$/im);
  if (!match || match.index == null) {
    return { body: markdown, closing: null };
  }
  return {
    body: markdown.slice(0, match.index).trimEnd(),
    closing: markdown.slice(match.index).trim(),
  };
}

function parseSections(markdown) {
  const text = markdown.replace(/\r\n/g, "\n").trim();
  if (!text) return [];
  const parts = text.split(/^## /m);
  const sections = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const nl = trimmed.indexOf("\n");
    if (nl === -1) {
      sections.push({ title: trimmed.trim(), body: "" });
      continue;
    }
    sections.push({
      title: trimmed.slice(0, nl).trim(),
      body: trimmed.slice(nl + 1).trim(),
    });
  }
  return sections;
}

function stripInteractiveProse(markdown) {
  const { body, closing } = splitClosing(markdown);
  const sections = parseSections(body);
  const rebuilt = sections
    .map((s) => {
      const t = s.title.trim();
      if (
        /^dilemma$/i.test(t) ||
        /^recognition activity/i.test(t) ||
        /^knowledge check$/i.test(t)
      ) {
        return `## ${s.title}\n`;
      }
      return s.body ? `## ${s.title}\n\n${s.body}\n` : `## ${s.title}\n`;
    })
    .join("\n");
  if (closing) return `${rebuilt.trimEnd()}\n\n${closing.trim()}\n`;
  return `${rebuilt.trimEnd()}\n`;
}

const files = {
  detachment: "_derived_detachment_content.md",
  intentionality: "_derived_intentionality_content.md",
  "sense-of-wonder": "_derived_sense_of_wonder_content.md",
};

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

for (const [slug, file] of Object.entries(files)) {
  const raw = fs.readFileSync(path.join(curriculum, file), "utf8");
  const cleaned = stripInteractiveProse(raw);
  fs.writeFileSync(path.join(curriculum, file), cleaned);
  const { error } = await sb
    .from("disciplines")
    .update({ content_md: cleaned })
    .eq("slug", slug);
  if (error) {
    console.error(slug, error.message);
    process.exit(1);
  }
  console.log(
    JSON.stringify({
      slug,
      chars: cleaned.length,
      hasLetterOptions: /^\s*-\s*\*\*[A-D]\.\*\*/m.test(cleaned),
      hasBest: /Best response/i.test(cleaned),
      hasCorrect: /\*\*Correct:/i.test(cleaned),
      dilemmaHeadingOnly: /## Dilemma\n\n## /m.test(cleaned) || /## Dilemma\n## /m.test(cleaned),
    }),
  );
}

const { data } = await sb
  .from("scenarios")
  .select("explanation, correct_key, disciplines!inner(slug)")
  .eq("kind", "dilemma")
  .in("disciplines.slug", ["detachment", "intentionality", "sense-of-wonder"]);

console.log("DILEMMA EXPLANATIONS:");
for (const r of data ?? []) {
  console.log(
    JSON.stringify({
      slug: r.disciplines.slug,
      correct_key: r.correct_key,
      explanation: r.explanation,
    }),
  );
}
