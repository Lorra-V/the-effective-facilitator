import type { ScenarioView } from "@/lib/scenario-types";
import { splitClosingMarkdown } from "@/lib/split-closing";

export type ContentSection = { title: string; body: string };

export type SelfAssessmentItem = {
  index: number;
  text: string;
  /** Author-only scoring hints retained in data, never shown to participants */
  reverseScored: boolean;
  distortionIndicator: boolean;
  overuseIndicator: boolean;
};

export type LessonStep =
  | {
      type: "content";
      id: string;
      title: string;
      markdown: string;
      /** Dark callout at end of section (e.g. Balanced Expression) */
      balancedExpression?: string | null;
    }
  | { type: "scenario"; id: string; title: string; scenario: ScenarioView }
  | {
      type: "knowledge_check";
      id: string;
      title: string;
      scenarios: ScenarioView[];
    }
  | {
      type: "self_assessment";
      id: string;
      title: string;
      intro: string;
      items: SelfAssessmentItem[];
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

function isSelfAssessmentTitle(title: string): boolean {
  return /^self-?assessment$/i.test(title.trim());
}

function isIntroductionTitle(title: string): boolean {
  return /^introduction$/i.test(title.trim());
}

/** Pull trailing Balanced Expression block out for CalloutBox (closing style). */
export function splitBalancedExpression(markdown: string): {
  markdown: string;
  balancedExpression: string | null;
} {
  const match = markdown.match(/^#{2,3}\s*Balanced\s+Expression\s*$/im);
  if (!match || match.index == null) {
    return { markdown, balancedExpression: null };
  }
  const before = markdown.slice(0, match.index).trimEnd();
  const after = markdown.slice(match.index).replace(
    /^#{2,3}\s*Balanced\s+Expression\s*\n+/i,
    "",
  );
  const text = after.trim();
  return {
    markdown: before,
    balancedExpression: text || null,
  };
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

export function parseSelfAssessmentItems(body: string): {
  intro: string;
  items: SelfAssessmentItem[];
} {
  const text = body.replace(/\r\n/g, "\n").trim();
  const itemRe =
    /^(\d+)\.\s+(.+?)(?:\s*\*\*(Reverse-scored|Distortion indicator|Overuse indicator)\*\*)?\s*$/gim;
  const items: SelfAssessmentItem[] = [];
  let introEnd = text.length;

  for (const match of text.matchAll(itemRe)) {
    if (items.length === 0 && match.index != null) {
      introEnd = match.index;
    }
    const index = Number(match[1]);
    let line = match[2].trim();
    let reverseScored = false;
    let distortionIndicator = false;
    let overuseIndicator = false;
    if (/\*\*Reverse-scored\*\*/i.test(match[0]) || /reverse-scored/i.test(line)) {
      reverseScored = true;
    }
    if (
      /\*\*Distortion indicator\*\*/i.test(match[0]) ||
      /distortion indicator/i.test(line)
    ) {
      distortionIndicator = true;
    }
    if (
      /\*\*Overuse indicator\*\*/i.test(match[0]) ||
      /overuse indicator/i.test(line)
    ) {
      overuseIndicator = true;
    }
    line = line
      .replace(/\s*\*\*Reverse-scored\*\*/gi, "")
      .replace(/\s*\*\*Distortion indicator\*\*/gi, "")
      .replace(/\s*\*\*Overuse indicator\*\*/gi, "")
      .replace(/\s*Reverse-scored\.?/gi, "")
      .replace(/\s*Distortion indicator\.?/gi, "")
      .replace(/\s*Overuse indicator\.?/gi, "")
      .trim();
    items.push({
      index,
      text: line,
      reverseScored,
      distortionIndicator,
      overuseIndicator,
    });
  }

  const intro = text.slice(0, introEnd).trim();
  return { intro, items };
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

/**
 * Drop standalone Introduction step; merge the next two content sections
 * (typically Foundation + AI-Era Definition) into the new opening step.
 */
function coalesceOpeningContentSteps(steps: LessonStep[]): LessonStep[] {
  const out = [...steps];
  const firstInteractive = out.findIndex((s) =>
    s.type === "scenario" ||
    s.type === "knowledge_check" ||
    s.type === "self_assessment",
  );
  const end = firstInteractive === -1 ? out.length : firstInteractive;
  const opening = out.slice(0, end);
  const rest = out.slice(end);

  const contentIdxs = opening
    .map((s, i) => (s.type === "content" ? i : -1))
    .filter((i) => i >= 0);

  if (contentIdxs.length === 0) return out;

  let working = [...opening];
  const introAt = working.findIndex(
    (s) => s.type === "content" && isIntroductionTitle(s.title),
  );
  if (introAt !== -1 && working[introAt]?.type === "content") {
    const intro = working[introAt];
    if (intro.type === "content") {
      const nextContentAt = working.findIndex(
        (s, i) => i > introAt && s.type === "content",
      );
      if (nextContentAt !== -1 && working[nextContentAt]?.type === "content") {
        const next = working[nextContentAt];
        if (next.type === "content") {
          const introBody = intro.markdown
            .replace(/^##\s+Introduction\s*\n*/i, "")
            .trim();
          const nextBody = next.markdown.replace(/^##\s+[^\n]+\n*/, "").trim();
          working[nextContentAt] = {
            ...next,
            markdown: introBody
              ? `## ${next.title}\n\n${introBody}\n\n${nextBody}`
              : next.markdown,
          };
        }
      }
      working.splice(introAt, 1);
    }
  }

  const contentPositions = working
    .map((s, i) => (s.type === "content" ? i : -1))
    .filter((i) => i >= 0);
  if (contentPositions.length >= 2) {
    const a = contentPositions[0]!;
    const b = contentPositions[1]!;
    const stepA = working[a];
    const stepB = working[b];
    if (stepA?.type === "content" && stepB?.type === "content") {
      const bodyA = stepA.markdown.replace(/^##\s+[^\n]+\n*/, "").trim();
      const bodyB = stepB.markdown.replace(/^##\s+[^\n]+\n*/, "").trim();
      const mergedTitle =
        stepA.title === stepB.title
          ? stepA.title
          : `${stepA.title} · ${stepB.title}`;
      working[a] = {
        type: "content",
        id: stepA.id,
        title: mergedTitle,
        markdown: `## ${stepA.title}\n\n${bodyA}\n\n## ${stepB.title}\n\n${bodyB}`,
        balancedExpression:
          stepA.balancedExpression ?? stepB.balancedExpression ?? null,
      };
      working.splice(b, 1);
    }
  }

  return [...working, ...rest];
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

    if (isSelfAssessmentTitle(section.title)) {
      const { intro, items } = parseSelfAssessmentItems(section.body);
      if (items.length > 0) {
        steps.push({
          type: "self_assessment",
          id: "self-assessment",
          // Display label only — not the deferred Baseline Assessment product.
          title: "TEF Developmental Profile",
          intro,
          items,
        });
      } else {
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
      continue;
    }

    const md = section.body
      ? `## ${section.title}\n\n${section.body}`
      : `## ${section.title}`;
    const { markdown, balancedExpression } = splitBalancedExpression(md);
    steps.push({
      type: "content",
      id: `content-${steps.length}-${section.title}`,
      title: section.title,
      markdown,
      balancedExpression,
    });
  }

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

  return coalesceOpeningContentSteps(steps);
}
