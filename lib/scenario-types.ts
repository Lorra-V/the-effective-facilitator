export type ScenarioOption = {
  key: string;
  text: string;
  score?: number;
  /** Per-option dilemma feedback. Absent on scenarios that use a shared `explanation`. */
  feedback?: string;
  /** Correct label for a `classification` statement (no single correct_key exists). */
  classification?: string;
};

export type ScenarioView = {
  id: string;
  kind: string;
  prompt_md: string;
  options: ScenarioOption[];
  correct_key: string | null;
  explanation: string;
  /** `classification` scenarios carry their allowed labels here as a JSON array. */
  rubric_md?: string;
};

/** Fallback labels when a classification scenario has no rubric_md list. */
export const DEFAULT_CLASSIFICATION_LABELS = [
  "Underused",
  "Balanced",
  "Overused",
];

/** Allowed labels for a classification scenario, from rubric_md JSON. */
export function parseClassificationLabels(
  rubricMd: string | null | undefined,
): string[] {
  if (!rubricMd) return DEFAULT_CLASSIFICATION_LABELS;
  try {
    const parsed = JSON.parse(rubricMd) as unknown;
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed.every((l) => typeof l === "string" && l.trim())
    ) {
      return parsed as string[];
    }
  } catch {
    // Not a JSON list — fall back to the standard three labels.
  }
  return DEFAULT_CLASSIFICATION_LABELS;
}
