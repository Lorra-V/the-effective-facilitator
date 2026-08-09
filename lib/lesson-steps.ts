import type { ScenarioView } from "@/lib/scenario-types";
import { splitClosingMarkdown } from "@/lib/split-closing";

export type ContentSection = { title: string; body: string };

export type LessonStep =
  | { type: "content"; id: string; title: string; markdown: string }
  | { type: "scenario"; id: string; title: string; scenario: ScenarioView }
  | {
      type: "knowledge_check";
      id: string;
      title: string;
      scenarios: ScenarioView[];
    }
  | { type: "closing"; id: string; title: string; markdown: string }
  | { type: "mark_viewed"; id: string; title: string }
  | { type: "complete"; id: string; title: string };

function isDilemmaTitle(title: string): boolean {
  return /^dilemma$/i.test(title.trim());
}

function isRecognitionTitle(title: string): boolean {
  return /^recognition activity/i.test(title.trim());
}

function isKnowledgeCheckTitle(title: string): boolean {
  return /^knowledge check$/i.test(title.trim());
}

function isClosingTitle(title: string): boolean {
  return /^closing\s+(statement|question)$/i.test(title.trim());
}

/** Parse ## sections from lesson markdown (closing already split out). */
export function parseContentSections(markdown: string): ContentSection[] {
  const text = markdown.replace(/\r\n/g, "\n").trim();
  if (!text) return [];

  const parts = text.split(/^## /m);
  const sections: ContentSection[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const nl = trimmed.indexOf("\n");
    if (nl === -1) {
      sections.push({ title: trimmed.trim(), body: "" });
      continue;
    }
    sections.push({
      title: trimmed.slice(0, nl).trim(),
      body: trimmed.slice(nl + 1).trim(),
    });
  }
  return sections;
}

/**
 * Strip Dilemma / Recognition option blocks from content_md.
 * Keeps the ## heading with empty body (interactive step supplies Q+options).
 */
export function stripInteractiveProseFromContent(markdown: string): string {
  const { body, closing } = splitClosingMarkdown(markdown);
  const sections = parseContentSections(body);
  const rebuilt = sections
    .map((s) => {
      if (isDilemmaTitle(s.title) || isRecognitionTitle(s.title)) {
        return `## ${s.title}\n`;
      }
      if (isKnowledgeCheckTitle(s.title)) {
        return `## ${s.title}\n`;
      }
      return s.body ? `## ${s.title}\n\n${s.body}\n` : `## ${s.title}\n`;
    })
    .join("\n");

  if (closing) {
    return `${rebuilt.trimEnd()}\n\n${closing.trim()}\n`;
  }
  return `${rebuilt.trimEnd()}\n`;
}

export function buildLessonSteps(
  contentMd: string,
  scenarios: ScenarioView[],
): LessonStep[] {
  const { body, closing } = splitClosingMarkdown(contentMd);
  const sections = parseContentSections(body);

  const dilemmas = scenarios
    .filter((s) => s.kind === "dilemma")
    .sort((a, b) => a.id.localeCompare(b.id));
  const recognitions = scenarios
    .filter((s) => s.kind === "recognition")
    .sort((a, b) => a.id.localeCompare(b.id));
  const knowledgeChecks = scenarios
    .filter((s) => s.kind === "knowledge_check")
    .sort((a, b) => a.id.localeCompare(b.id));
  const previews = scenarios
    .filter((s) => s.kind === "preview_scenario")
    .sort((a, b) => a.id.localeCompare(b.id));

  let dilemmaIdx = 0;
  let recognitionIdx = 0;
  const steps: LessonStep[] = [];
  let usedKnowledge = false;
  let usedClosing = false;

  for (const section of sections) {
    if (isDilemmaTitle(section.title)) {
      const scenario = dilemmas[dilemmaIdx++];
      if (scenario) {
        steps.push({
          type: "scenario",
          id: `dilemma-${scenario.id}`,
          title: "Dilemma",
          scenario,
        });
      }
      continue;
    }

    if (isRecognitionTitle(section.title)) {
      const scenario = recognitions[recognitionIdx++];
      if (scenario) {
        steps.push({
          type: "scenario",
          id: `recognition-${scenario.id}`,
          title: section.title,
          scenario,
        });
      }
      continue;
    }

    if (isKnowledgeCheckTitle(section.title)) {
      if (knowledgeChecks.length > 0) {
        steps.push({
          type: "knowledge_check",
          id: "knowledge-check",
          title: "Knowledge Check",
          scenarios: knowledgeChecks,
        });
        usedKnowledge = true;
      }
      continue;
    }

    if (isClosingTitle(section.title)) {
      // Closing handled via splitClosingMarkdown body below
      continue;
    }

    const md = section.body
      ? `## ${section.title}\n\n${section.body}`
      : `## ${section.title}`;
    steps.push({
      type: "content",
      id: `content-${steps.length}-${section.title}`,
      title: section.title,
      markdown: md,
    });
  }

  // Any leftover interactive scenarios (e.g. preview modules, or content without headings)
  while (dilemmaIdx < dilemmas.length) {
    const scenario = dilemmas[dilemmaIdx++];
    steps.push({
      type: "scenario",
      id: `dilemma-${scenario.id}`,
      title: "Dilemma",
      scenario,
    });
  }
  while (recognitionIdx < recognitions.length) {
    const scenario = recognitions[recognitionIdx++];
    steps.push({
      type: "scenario",
      id: `recognition-${scenario.id}`,
      title: "Recognition Activity",
      scenario,
    });
  }
  if (!usedKnowledge && knowledgeChecks.length > 0) {
    steps.push({
      type: "knowledge_check",
      id: "knowledge-check",
      title: "Knowledge Check",
      scenarios: knowledgeChecks,
    });
  }
  for (const scenario of previews) {
    steps.push({
      type: "scenario",
      id: `preview-${scenario.id}`,
      title: "Preview Scenario",
      scenario,
    });
  }

  if (closing) {
    steps.push({
      type: "closing",
      id: "closing",
      title: "Closing Statement",
      markdown: closing.replace(
        /^#{1,3}\s*Closing\s+(Question|Statement)\s*\n+/i,
        "",
      ),
    });
    usedClosing = true;
  }
  void usedClosing;

  steps.push({
    type: "mark_viewed",
    id: "mark-viewed",
    title: "Mark Content As Viewed",
  });
  steps.push({
    type: "complete",
    id: "complete",
    title: "Complete Module",
  });

  return steps;
}
