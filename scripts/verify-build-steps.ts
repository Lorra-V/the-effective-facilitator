import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { buildLessonSteps } from "../lib/lesson-steps";

dotenv.config({ path: ".env.local" });

async function main() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const { data: d } = await sb
    .from("disciplines")
    .select("id, content_md")
    .eq("slug", "detachment")
    .single();
  const { data: s } = await sb
    .from("scenarios")
    .select("id, kind, prompt_md, options, correct_key, explanation")
    .eq("discipline_id", d!.id);

  const steps = buildLessonSteps(
    d!.content_md,
    (s ?? []).map((x) => ({
      ...x,
      options: Array.isArray(x.options) ? x.options : [],
      explanation: x.explanation ?? "",
    })),
  );

  console.log("LIVE buildLessonSteps for Detachment:");
  steps.forEach((st, i) => {
    const extra =
      st.type === "scenario"
        ? ` (${st.scenario.kind}, options=${st.scenario.options.length})`
        : st.type === "knowledge_check"
          ? ` (${st.scenarios.length} questions)`
          : "";
    console.log(`${i + 1}. [${st.type}] ${st.title}${extra}`);
  });
}

main();
