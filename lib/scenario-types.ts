export type ScenarioOption = { key: string; text: string; score?: number };

export type ScenarioView = {
  id: string;
  kind: string;
  prompt_md: string;
  options: ScenarioOption[];
  correct_key: string | null;
  explanation: string;
};
