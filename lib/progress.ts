/** Shape stored in progress.scenario_response (JSON text). */

export type ProgressAnswers = {
  contentViewed?: boolean;
  /** scenario_id → selected option key */
  answers?: Record<string, string>;
  /** self-assessment item index (1-based) → rating 1–5 */
  selfAssessment?: Record<string, number>;
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
      return {
        contentViewed: Boolean(parsed.contentViewed),
        answers:
          parsed.answers && typeof parsed.answers === "object"
            ? parsed.answers
            : {},
        selfAssessment,
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
  });
}
