/** Shape stored in progress.scenario_response (JSON text). */

export type ProgressAnswers = {
  contentViewed?: boolean;
  /** scenario_id → selected option key */
  answers?: Record<string, string>;
  /** self-assessment item index (1-based) → rating 1–5 */
  selfAssessment?: Record<string, number>;
  /** classification scenario_id → statement key → chosen label */
  classifications?: Record<string, Record<string, string>>;
};

export function parseProgressAnswers(raw: string | null | undefined): ProgressAnswers {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as ProgressAnswers;
    if (parsed && typeof parsed === "object") {
      const selfAssessment: Record<string, number> = {};
      if (parsed.selfAssessment && typeof parsed.selfAssessment === "object") {
        for (const [key, value] of Object.entries(parsed.selfAssessment)) {
          if (typeof value === "number" && value >= 1 && value <= 5) {
            selfAssessment[key] = value;
          }
        }
      }
      const classifications: Record<string, Record<string, string>> = {};
      if (parsed.classifications && typeof parsed.classifications === "object") {
        for (const [scenarioId, labels] of Object.entries(parsed.classifications)) {
          if (!labels || typeof labels !== "object") continue;
          const byStatement: Record<string, string> = {};
          for (const [statementKey, label] of Object.entries(labels)) {
            if (typeof label === "string" && label) {
              byStatement[statementKey] = label;
            }
          }
          if (Object.keys(byStatement).length > 0) {
            classifications[scenarioId] = byStatement;
          }
        }
      }
      return {
        contentViewed: Boolean(parsed.contentViewed),
        answers:
          parsed.answers && typeof parsed.answers === "object"
            ? parsed.answers
            : {},
        selfAssessment,
        classifications,
      };
    }
  } catch {
    // Legacy free-text responses from Phase A placeholder — ignore.
  }
  return {};
}

export function serializeProgressAnswers(data: ProgressAnswers): string {
  return JSON.stringify({
    contentViewed: Boolean(data.contentViewed),
    answers: data.answers ?? {},
    selfAssessment: data.selfAssessment ?? {},
    classifications: data.classifications ?? {},
  });
}
