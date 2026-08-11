import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { buildLessonSteps } from "../lib/lesson-steps.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const md = readFileSync(
  resolve(root, "docs/curriculum/_derived_detachment_content.md"),
  "utf8",
);
const steps = buildLessonSteps(md, [
  { id: "d1", kind: "dilemma", prompt_md: "x", options: [], correct_key: "C", explanation: "" },
  { id: "r1", kind: "recognition", prompt_md: "x", options: [], correct_key: "D", explanation: "" },
  { id: "r2", kind: "recognition", prompt_md: "x", options: [], correct_key: "C", explanation: "" },
  { id: "k1", kind: "knowledge_check", prompt_md: "x", options: [], correct_key: "B", explanation: "" },
]);
for (let i = 0; i < steps.length; i++) {
  const s = steps[i];
  console.log(`${i + 1}. ${s.type} :: ${s.title}`);
}
const sa = steps.find((s) => s.type === "self_assessment");
if (sa?.type === "self_assessment") {
  console.log(
    "self items",
    sa.items.length,
    sa.items.slice(6).map((i) => ({
      i: i.index,
      rev: i.reverseScored,
      dist: i.distortionIndicator,
      text: i.text.slice(0, 50),
    })),
  );
}
