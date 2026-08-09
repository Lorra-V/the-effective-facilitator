import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

const id = "c3000000-0000-4000-8000-000000000002";
const prompt_md = `**Recognition activity 1 — Output or authority?**

Which statement best demonstrates balanced Detachment?`;

const options = [
  {
    key: "A",
    text: "The model reviewed more information than any individual could, so its recommendation should carry greater authority.",
    score: 0,
  },
  {
    key: "B",
    text: "The recommendation is useful, but we still need to verify its assumptions and decide whether it fits this context.",
    score: 1,
  },
  {
    key: "C",
    text: "I disagree with the group, so I will step back and let them deal with the consequences.",
    score: 0,
  },
  {
    key: "D",
    text: "I will help the group test the decision, even though it is not the option I preferred.",
    score: 1,
  },
];

const { error } = await sb
  .from("scenarios")
  .update({ prompt_md, options })
  .eq("id", id);

if (error) {
  console.error(error);
  process.exit(1);
}
console.log("Updated Detachment recognition 1: prompt framing only; options hold statements; correct_key unchanged.");
