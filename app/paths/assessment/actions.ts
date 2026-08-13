"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import {
  computeProfileScores,
  validateProfileAnswers,
  type ProfileAnswers,
} from "@/lib/baseline-profile";
import { createAdminClient } from "@/lib/supabase/admin";

export type ProfileActionResult = {
  ok: boolean;
  error?: string;
};

/**
 * Persist one Developmental Profile completion.
 * Writes only to `profile_results`. Does not touch progress, scenarios,
 * path_completions, or Ludwitt lesson/quiz events.
 */
export async function submitProfileAnswers(
  answers: ProfileAnswers,
): Promise<ProfileActionResult> {
  const session = await requireSession();
  if (!session) return { ok: false, error: "unauthorized" };

  const validated = validateProfileAnswers(answers);
  if (!validated.ok) return { ok: false, error: validated.error };

  const scores = computeProfileScores(validated.answers);
  const supabase = createAdminClient();

  const { error } = await supabase.from("profile_results").insert({
    user_id: session.userId,
    answers: validated.answers,
    scores,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/paths/assessment");
  revalidatePath("/paths/assessment/results");
  return { ok: true };
}
