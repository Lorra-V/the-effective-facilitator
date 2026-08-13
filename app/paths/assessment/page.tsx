import { redirect } from "next/navigation";
import { AssessmentClient } from "@/app/paths/assessment/AssessmentClient";
import { requireSession } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AssessmentPage() {
  const session = await requireSession();
  if (!session) redirect("/get-started");

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("profile_results")
    .select("id")
    .eq("user_id", session.userId)
    .order("completed_at", { ascending: false })
    .limit(1);
  const hasExistingResult = Boolean(data?.[0]);

  return <AssessmentClient hasExistingResult={hasExistingResult} />;
}
