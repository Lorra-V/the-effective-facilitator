import Link from "next/link";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import {
  PROFILE_DISCIPLINES,
  SCORING_FORMULA_PLAIN,
  getProfileDiscipline,
  summarizeProfile,
  type ProfileBand,
  type ProfileDisciplineKey,
  type ProfileScores,
} from "@/lib/baseline-profile";
import { createAdminClient } from "@/lib/supabase/admin";

function isBand(value: unknown): value is ProfileBand {
  return value === "Emerging" || value === "Developing" || value === "Established";
}

function parseScores(raw: unknown): ProfileScores | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const scores = {} as ProfileScores;

  for (const discipline of PROFILE_DISCIPLINES) {
    const block = obj[discipline.key];
    if (!block || typeof block !== "object") return null;
    const { score, band, behaviouralScore, scenarioScore } = block as {
      score?: unknown;
      band?: unknown;
      behaviouralScore?: unknown;
      scenarioScore?: unknown;
    };
    if (typeof score !== "number" || !isBand(band)) return null;
    scores[discipline.key] = {
      score,
      band,
      behaviouralScore: typeof behaviouralScore === "number" ? behaviouralScore : score,
      scenarioScore: typeof scenarioScore === "number" ? scenarioScore : score,
    };
  }

  return scores;
}

export default async function AssessmentResultsPage() {
  const session = await requireSession();
  if (!session) redirect("/get-started");

  const supabase = createAdminClient();
  const { data: rows } = await supabase
    .from("profile_results")
    .select("id, scores, completed_at")
    .eq("user_id", session.userId)
    .order("completed_at", { ascending: false })
    .limit(1);

  const data = rows?.[0];
  if (!data) {
    redirect("/paths/assessment");
  }

  const scores = parseScores(data.scores);
  if (!scores) {
    redirect("/paths/assessment");
  }

  const summary = summarizeProfile(scores);
  const startHere = getProfileDiscipline(summary.startHereKey);

  return (
    <div className="tef-main-inner">
      <h1 style={{ margin: "0 0 0.5rem" }}>Your TEF Facilitator Profile</h1>
      <p
        className="tef-subtitle"
        style={{ margin: "0 0 1.25rem", color: "var(--tef-muted)" }}
      >
        A starting point for reflection, practice, and development.
      </p>
      <p style={{ margin: "0 0 1.5rem", color: "var(--tef-muted)" }}>
        This profile reflects how you currently report responding in selected
        situations. It is not a diagnosis or a fixed description of who you are.
      </p>

      <section className="tef-profile-summary" aria-label="Profile summary">
        <div>
          <p className="tef-callout-label" style={{ margin: 0 }}>
            Overall pattern
          </p>
          <p style={{ margin: "0.4rem 0 0" }}>{summary.overallPattern}</p>
        </div>
        <div>
          <p className="tef-callout-label" style={{ margin: 0 }}>
            Start here
          </p>
          <p style={{ margin: "0.4rem 0 0", fontWeight: 600 }}>
            {summary.startHereTitle}
          </p>
        </div>
      </section>

      <div className="tef-profile-rows">
        {PROFILE_DISCIPLINES.map((discipline) => {
          const result = scores[discipline.key as ProfileDisciplineKey];
          return (
            <article key={discipline.key} className="tef-profile-row">
              <p className="tef-callout-label" style={{ margin: 0 }}>
                {discipline.pathTitle}
              </p>
              <div className="tef-profile-row-head">
                <h2 style={{ margin: 0, fontSize: "1.2rem" }}>{discipline.title}</h2>
                <span
                  className={`tef-badge tef-profile-band-badge tef-profile-band-${result.band.toLowerCase()}`}
                >
                  {result.band}
                </span>
              </div>
              <p style={{ margin: "0.35rem 0 0", color: "var(--tef-muted)" }}>
                {result.score} / 100
              </p>
              <p style={{ margin: "0.65rem 0 0" }}>
                {discipline.bandDescription[result.band]}
              </p>
            </article>
          );
        })}
      </div>

      <p
        style={{
          margin: "1.5rem 0 0",
          color: "var(--tef-muted)",
          fontSize: "0.9rem",
        }}
      >
        {SCORING_FORMULA_PLAIN}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginTop: "1.75rem",
        }}
      >
        <Link
          href="/paths/assessment"
          className="tef-btn tef-btn-secondary"
          style={{ textDecoration: "none" }}
        >
          Back
        </Link>
        <Link
          href={startHere.href}
          className="tef-btn"
          style={{ textDecoration: "none" }}
        >
          Continue with {startHere.title}
        </Link>
      </div>
    </div>
  );
}
