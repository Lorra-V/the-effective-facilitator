import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "node:url";

dotenv.config({ path: ".env.local" });

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const curriculum = path.join(root, "docs", "curriculum");

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const contentFiles = {
  detachment: "_derived_detachment_content.md",
  intentionality: "_derived_intentionality_content.md",
  "sense-of-wonder": "_derived_sense_of_wonder_content.md",
};

const disciplineIds = {
  detachment: "b2000000-0000-4000-8000-000000000001",
  intentionality: "b2000000-0000-4000-8000-000000000006",
  "sense-of-wonder": "b2000000-0000-4000-8000-000000000005",
};

const q5 = [
  {
    id: "c3000000-0000-4000-8000-000000000020",
    slug: "detachment",
    prompt_md:
      "A facilitator strongly prefers an AI-generated solution but recognises that the group needs more information before making a decision. Which response best demonstrates Detachment?",
    correct_key: "C",
    explanation:
      "Detachment does not require withdrawing from responsibility or rejecting a preferred solution. It means remaining engaged while allowing evidence, participation and the needs of the situation to determine what happens next.",
    options: [
      {
        key: "A",
        text: "Persuade the group to accept the solution because it appears to be the strongest",
        score: 0,
      },
      {
        key: "B",
        text: "Withdraw from the discussion to avoid influencing the group",
        score: 0,
      },
      {
        key: "C",
        text: "Present the solution as one option, invite scrutiny and remain willing to revise or release it",
        score: 1,
      },
      {
        key: "D",
        text: "Reject the solution to prove that the facilitator is not attached to it",
        score: 0,
      },
    ],
  },
  {
    id: "c3000000-0000-4000-8000-000000000021",
    slug: "sense-of-wonder",
    prompt_md:
      'What is the best way to prevent "premature completion" when using AI?',
    correct_key: "C",
    explanation:
      "Premature completion occurs when a polished AI response creates the impression that the thinking is finished. Sense of Wonder keeps possibility open by encouraging us to examine the situation, question the existing frame and consider what may still be missing.",
    options: [
      {
        key: "A",
        text: "Ask AI to produce a more detailed response",
        score: 0,
      },
      {
        key: "B",
        text: "Compare the output with answers from other AI tools",
        score: 0,
      },
      {
        key: "C",
        text: "Pause to examine the problem, question its assumptions and imagine alternatives before accepting an answer",
        score: 1,
      },
      {
        key: "D",
        text: "Continue prompting until the output sounds convincing",
        score: 0,
      },
    ],
  },
  {
    id: "c3000000-0000-4000-8000-000000000022",
    slug: "intentionality",
    prompt_md:
      "A team continues using an AI-generated plan even after new evidence shows that it may not achieve the intended outcome. Which response best demonstrates balanced Intentionality?",
    correct_key: "C",
    explanation:
      "Balanced Intentionality maintains a clear sense of purpose while remaining responsive to evidence, feedback and changing conditions.",
    options: [
      {
        key: "A",
        text: "Continue with the plan because changing direction would suggest that the original decision was wrong.",
        score: 0,
      },
      {
        key: "B",
        text: "Abandon the project and avoid using AI for similar work in the future.",
        score: 0,
      },
      {
        key: "C",
        text: "Revisit the purpose, assess the new evidence and adjust the plan while remaining committed to the desired outcome.",
        score: 1,
      },
      {
        key: "D",
        text: "Ask AI to decide whether the team should continue or change direction.",
        score: 0,
      },
    ],
  },
];

console.log("Updating content_md…");
for (const [slug, file] of Object.entries(contentFiles)) {
  const md =
    fs.readFileSync(path.join(curriculum, file), "utf8").replace(/\r\n/g, "\n").trimEnd() +
    "\n";
  const hasBest = /\*\*Best response/i.test(md);
  const hasCorrect = /\*\*Correct:/i.test(md);
  const hasStaticKcQ = /\*\*1\.\s/.test(
    md.slice(md.indexOf("## Knowledge Check")),
  );
  const { error } = await sb
    .from("disciplines")
    .update({ content_md: md })
    .eq("slug", slug);
  if (error) {
    console.error(slug, error.message);
    process.exit(1);
  }
  console.log(
    JSON.stringify({
      slug,
      hasBest,
      hasCorrect,
      hasStaticKcQuestions: hasStaticKcQ,
      chars: md.length,
    }),
  );
}

console.log("Upserting Q5 knowledge_check rows…");
for (const row of q5) {
  const payload = {
    id: row.id,
    discipline_id: disciplineIds[row.slug],
    prompt_md: row.prompt_md,
    rubric_md: "",
    kind: "knowledge_check",
    options: row.options,
    correct_key: row.correct_key,
    explanation: row.explanation,
  };
  const { error } = await sb.from("scenarios").upsert(payload, { onConflict: "id" });
  if (error) {
    console.error("q5", row.slug, error.message);
    process.exit(1);
  }
  console.log(
    JSON.stringify({
      slug: row.slug,
      id: row.id,
      correct_key: row.correct_key,
      options: row.options.length,
    }),
  );
}

const { data: counts } = await sb
  .from("scenarios")
  .select("id, correct_key, disciplines!inner(slug)")
  .eq("kind", "knowledge_check")
  .in("disciplines.slug", ["detachment", "intentionality", "sense-of-wonder"]);

const by = {};
for (const r of counts ?? []) {
  const s = r.disciplines.slug;
  by[s] ??= [];
  by[s].push(r.correct_key);
}
console.log("KC counts by module:", by);
for (const [slug, keys] of Object.entries(by)) {
  console.log(slug, keys.length, "keys", keys.sort().join(","));
}
