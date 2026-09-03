// READ-ONLY dry run: parse the content_md inside 0014_interior_council.sql
// through the live lesson-steps parser. Touches no database.
import fs from "node:fs";
import path from "node:path";
import {
  buildLessonSteps,
  parseContentSections,
  parseSelfAssessmentItems,
} from "../lib/lesson-steps";
import { splitClosingMarkdown } from "../lib/split-closing";

const sql = fs.readFileSync(
  path.join(process.cwd(), "supabase", "migrations", "0014_interior_council.sql"),
  "utf8",
);

const m = sql.match(/\$ic\$([\s\S]*?)\$ic\$/);
if (!m) throw new Error("content_md block not found");
const contentMd = m[1];

// Simulate the scenario rows this migration inserts.
const scenarios = [
  { id: "c3000000-0000-4000-8000-000000000026", kind: "dilemma" },
  { id: "c3000000-0000-4000-8000-000000000027", kind: "classification" },
  { id: "c3000000-0000-4000-8000-000000000028", kind: "knowledge_check" },
  { id: "c3000000-0000-4000-8000-000000000029", kind: "knowledge_check" },
  { id: "c3000000-0000-4000-8000-000000000030", kind: "knowledge_check" },
  { id: "c3000000-0000-4000-8000-000000000031", kind: "knowledge_check" },
  { id: "c3000000-0000-4000-8000-000000000032", kind: "knowledge_check" },
].map((s) => ({
  ...s,
  prompt_md: "",
  options: [],
  correct_key: null,
  explanation: "",
}));

console.log("=== content_md sections (## level) ===");
const { body, closing } = splitClosingMarkdown(contentMd);
parseContentSections(body).forEach((s, i) =>
  console.log(`  ${String(i + 1).padStart(2)}. ${s.title}${s.body ? "" : "   [EMPTY BODY]"}`),
);
console.log(`  closing split out: ${closing ? "yes" : "NO — PROBLEM"}`);

console.log("\n=== Self-Assessment parse ===");
const sa = parseContentSections(body).find((s) => /^self-?assessment$/i.test(s.title));
if (!sa) {
  console.log("  PROBLEM: no Self-Assessment section found");
} else {
  const { intro, items } = parseSelfAssessmentItems(sa.body);
  console.log(`  intro: "${intro.slice(0, 90)}…"`);
  console.log(`  items parsed: ${items.length}`);
  for (const it of items) {
    console.log(
      `   ${it.index}. reverse=${it.reverseScored} distortion=${it.distortionIndicator} overuse=${it.overuseIndicator}`,
    );
    console.log(`      text: ${it.text}`);
    console.log(
      `      tag stripped from learner text: ${/reverse-scored/i.test(it.text) ? "NO — PROBLEM" : "yes"}`,
    );
  }
}

console.log("\n=== buildLessonSteps (with TODAY'S parser, pre-Phase-3) ===");
const steps = buildLessonSteps(contentMd, scenarios as never);
steps.forEach((st, i) => {
  const extra =
    st.type === "scenario"
      ? ` (${st.scenario.kind})`
      : st.type === "knowledge_check"
        ? ` (${st.scenarios.length} questions)`
        : st.type === "self_assessment"
          ? ` (${st.items.length} items)`
          : st.type === "content" && st.balancedExpression
            ? " (+ Balanced Expression callout)"
            : "";
  console.log(`  ${String(i + 1).padStart(2)}. [${st.type}] ${st.title}${extra}`);
});

const hasClassificationStep = steps.some(
  (s) => s.type === "scenario" && s.scenario.kind === "classification",
);
console.log(
  `\n  classification step rendered by today's parser: ${hasClassificationStep ? "yes" : "NO (expected — Phase 3 wires it)"}`,
);

console.log("\n=== Naming audit inside content_md ===");
const dialogueHits = [...contentMd.matchAll(/Interior Dialogue/g)].length;
const headingHits = [...contentMd.matchAll(/^#{2,3}.*Interior Dialogue.*$/gim)].map((x) => x[0]);
console.log(`  "Interior Council" occurrences: ${[...contentMd.matchAll(/Interior Council/g)].length}`);
console.log(`  "Interior Dialogue" (title-case) occurrences: ${dialogueHits}`);
console.log(`  headings containing "Interior Dialogue": ${headingHits.length ? headingHits.join(" | ") : "none"}`);
console.log(
  `  lowercase in-copy "interior dialogue": ${[...contentMd.matchAll(/interior dialogue/g)].length}`,
);
