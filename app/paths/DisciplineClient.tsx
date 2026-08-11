"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  ensureLessonStarted,
  markContentViewed,
  markLessonComplete,
  saveSelfAssessmentRating,
  submitScenarioAnswer,
} from "@/app/paths/actions";
import { SessionHeartbeat } from "@/app/paths/SessionHeartbeat";
import { CalloutBox } from "@/components/CalloutBox";
import { MarkdownContent } from "@/components/MarkdownContent";
import { buildLessonSteps, type LessonStep } from "@/lib/lesson-steps";
import type { ScenarioOption, ScenarioView } from "@/lib/scenario-types";

export type { ScenarioOption, ScenarioView };

type Props = {
  disciplineId: string;
  isFullModule: boolean;
  contentMd: string;
  centralQuestion: string;
  scenarios: ScenarioView[];
  initialAnswers: Record<string, string>;
  initialSelfAssessment: Record<string, number>;
  initialContentViewed: boolean;
  initialKnowledgeScore: number | null;
  initialCompletedAt: string | null;
};

function newSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function FeedbackBlock({
  kind,
  selectedKey,
  correctKey,
  explanation,
}: {
  kind: string;
  selectedKey: string;
  correctKey: string | null;
  explanation: string;
}) {
  // Recognition + Knowledge Check have genuine correct answers.
  // Dilemma (and preview) stay judgment-scored — never "Correct answer".
  if (kind === "knowledge_check" || kind === "recognition") {
    return (
      <div
        className="tef-feedback tef-feedback-kc"
        style={{
          marginTop: "1rem",
          padding: "0.85rem 1rem",
          background: "rgba(3, 94, 123, 0.08)",
          borderLeft: "3px solid var(--tef-accent)",
        }}
      >
        <p style={{ margin: 0, fontWeight: 600 }}>
          Correct answer: {correctKey ?? "—"}
        </p>
        {explanation ? (
          <p style={{ margin: "0.5rem 0 0", color: "var(--tef-muted)" }}>
            {explanation}
          </p>
        ) : null}
      </div>
    );
  }

  // Dilemma / preview — judgment feedback, not right/wrong
  return (
    <div
      className="tef-feedback tef-feedback-judgment"
      style={{
        marginTop: "1rem",
        padding: "0.85rem 1rem",
        background: "rgba(116, 82, 150, 0.08)",
        borderLeft: "3px solid var(--tef-action)",
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>Feedback</p>
      <p style={{ margin: "0.35rem 0 0", color: "var(--tef-muted)" }}>
        Your response: {selectedKey}
      </p>
      {explanation ? (
        <p style={{ margin: "0.5rem 0 0" }}>{explanation}</p>
      ) : (
        <p style={{ margin: "0.5rem 0 0", color: "var(--tef-muted)", fontStyle: "italic" }}>
          There is no single right answer — consider how this choice reflects the
          discipline.
        </p>
      )}
    </div>
  );
}

function ScenarioStepBody({
  scenario,
  saved,
  selected,
  pending,
  onSelect,
  onSubmit,
}: {
  scenario: ScenarioView;
  saved: string | undefined;
  selected: string;
  pending: boolean;
  onSelect: (key: string) => void;
  onSubmit: () => void;
}) {
  const options = Array.isArray(scenario.options) ? scenario.options : [];

  return (
    <div>
      <MarkdownContent markdown={scenario.prompt_md} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{ marginTop: "1rem" }}
      >
        {options.map((opt) => (
          <label key={opt.key} className="tef-option">
            <input
              type="radio"
              name={`scenario-${scenario.id}`}
              value={opt.key}
              checked={selected === opt.key}
              onChange={() => onSelect(opt.key)}
            />
            <strong>{opt.key}.</strong> {opt.text}
          </label>
        ))}
        <button
          type="submit"
          className="tef-btn"
          disabled={pending || !selected}
          style={{ marginTop: "0.75rem" }}
        >
          {saved ? "Update Answer" : "Submit Answer"}
        </button>
      </form>
      {saved ? (
        <FeedbackBlock
          kind={scenario.kind}
          selectedKey={saved}
          correctKey={scenario.correct_key}
          explanation={scenario.explanation}
        />
      ) : null}
    </div>
  );
}

export function DisciplineClient({
  disciplineId,
  isFullModule,
  contentMd,
  centralQuestion,
  scenarios,
  initialAnswers,
  initialSelfAssessment,
  initialContentViewed,
  initialKnowledgeScore,
  initialCompletedAt,
}: Props) {
  const [sessionId] = useState(newSessionId);
  const [answers, setAnswers] = useState(initialAnswers);
  const [selfAssessment, setSelfAssessment] = useState(initialSelfAssessment);
  const [contentViewed, setContentViewed] = useState(initialContentViewed);
  const [knowledgeScore, setKnowledgeScore] = useState(initialKnowledgeScore);
  const [completedAt, setCompletedAt] = useState(initialCompletedAt);
  const [selections, setSelections] = useState<Record<string, string>>(initialAnswers);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(
    () => buildLessonSteps(contentMd, scenarios),
    [contentMd, scenarios],
  );

  const knowledgeChecks = useMemo(
    () =>
      scenarios
        .filter((s) => s.kind === "knowledge_check")
        .sort((a, b) => a.id.localeCompare(b.id)),
    [scenarios],
  );

  const dilemma = scenarios.find((s) => s.kind === "dilemma");
  const preview = scenarios.find((s) => s.kind === "preview_scenario");

  const canComplete = useMemo(() => {
    if (completedAt) return false;
    if (!contentViewed) return false;
    if (isFullModule) {
      const dilemmaDone = dilemma ? Boolean(answers[dilemma.id]) : false;
      return dilemmaDone && knowledgeScore != null && knowledgeScore >= 80;
    }
    return preview ? Boolean(answers[preview.id]) : false;
  }, [
    answers,
    completedAt,
    contentViewed,
    dilemma,
    isFullModule,
    knowledgeScore,
    preview,
  ]);

  const step: LessonStep | undefined = steps[stepIndex];
  const isLast = stepIndex >= steps.length - 1;

  useEffect(() => {
    startTransition(async () => {
      await ensureLessonStarted(disciplineId, sessionId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disciplineId, sessionId]);

  function onMarkContentViewed() {
    setMessage(null);
    startTransition(async () => {
      const result = await markContentViewed(disciplineId);
      if (!result.ok) {
        setMessage(result.error ?? "Could not mark content viewed");
        return;
      }
      setContentViewed(true);
      setMessage("Content marked as viewed.");
    });
  }

  function onSubmitScenario(scenarioId: string) {
    const selectedKey = selections[scenarioId];
    if (!selectedKey) {
      setMessage("Select an option first.");
      return;
    }
    setMessage(null);
    startTransition(async () => {
      const result = await submitScenarioAnswer(
        disciplineId,
        sessionId,
        scenarioId,
        selectedKey,
      );
      if (!result.ok) {
        setMessage(result.error ?? "Submit failed");
        return;
      }
      setAnswers((prev) => ({ ...prev, [scenarioId]: selectedKey }));
      if (result.knowledgeScore != null) {
        setKnowledgeScore(result.knowledgeScore);
      }
    });
  }

  function onRateSelfAssessment(itemIndex: number, rating: number) {
    setSelfAssessment((prev) => ({ ...prev, [String(itemIndex)]: rating }));
    startTransition(async () => {
      const result = await saveSelfAssessmentRating(
        disciplineId,
        itemIndex,
        rating,
      );
      if (!result.ok) {
        setMessage(result.error ?? "Could not save rating");
      }
    });
  }

  function onComplete() {
    setMessage(null);
    startTransition(async () => {
      const result = await markLessonComplete(disciplineId, sessionId);
      if (!result.ok) {
        setMessage(result.error ?? "Complete failed");
        return;
      }
      setCompletedAt(new Date().toISOString());
      setMessage("Module completed (lesson_completed).");
    });
  }

  function stepReadyToContinue(s: LessonStep | undefined): boolean {
    if (!s) return false;
    if (s.type === "scenario") {
      return Boolean(answers[s.scenario.id]);
    }
    if (s.type === "knowledge_check") {
      return s.scenarios.every((sc) => Boolean(answers[sc.id]));
    }
    if (s.type === "self_assessment") {
      return s.items.every((item) => selfAssessment[String(item.index)] != null);
    }
    if (s.type === "mark_viewed") {
      return contentViewed;
    }
    if (s.type === "complete") {
      return Boolean(completedAt) || canComplete;
    }
    return true;
  }

  function goNext() {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setMessage(null);
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      setMessage(null);
    }
  }

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <SessionHeartbeat disciplineId={disciplineId} sessionId={sessionId} />

      {!isFullModule ? (
        <p className="tef-coming-soon">Full Module Coming Soon</p>
      ) : null}

      <CalloutBox label="Core AI Question" sticky>
        <p style={{ margin: 0 }}>{centralQuestion}</p>
      </CalloutBox>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <p
          className="tef-callout-label"
          style={{ margin: 0 }}
        >
          Step {stepIndex + 1} of {steps.length}
          {step ? ` · ${step.title}` : ""}
        </p>
        {isFullModule && step?.type === "knowledge_check" ? (
          <p style={{ margin: 0, color: "var(--tef-muted)", fontSize: "0.9rem" }}>
            Knowledge score:{" "}
            {knowledgeScore == null ? "—" : `${knowledgeScore}%`}
            {knowledgeChecks.length
              ? ` (${knowledgeChecks.length} questions · need ≥ 80%)`
              : ""}
          </p>
        ) : null}
      </div>

      <div
        style={{
          background: "var(--tef-surface)",
          border: "1px solid var(--tef-border)",
          borderRadius: "var(--tef-card-radius)",
          padding: "1.5rem 1.35rem",
          minHeight: "12rem",
        }}
      >
        {step?.type === "content" ? (
          <div>
            <MarkdownContent markdown={step.markdown} />
            {step.balancedExpression ? (
              <CalloutBox label="Balanced Expression" variant="closing">
                <p style={{ margin: 0 }}>{step.balancedExpression}</p>
              </CalloutBox>
            ) : null}
          </div>
        ) : null}

        {step?.type === "self_assessment" ? (
          <div>
            <h2 style={{ marginTop: 0 }}>TEF Developmental Profile</h2>
            {step.intro ? (
              <MarkdownContent markdown={step.intro} />
            ) : (
              <p style={{ color: "var(--tef-muted)" }}>Rate from 1 to 5.</p>
            )}
            {step.items.map((item) => (
              <div key={item.index} className="tef-rating-row">
                <p className="tef-rating-prompt">
                  {item.index}. {item.text}
                </p>
                <div className="tef-rating-scale" role="radiogroup" aria-label={`Item ${item.index}`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <label key={n}>
                      <input
                        type="radio"
                        name={`self-assessment-${item.index}`}
                        value={n}
                        checked={selfAssessment[String(item.index)] === n}
                        onChange={() => onRateSelfAssessment(item.index, n)}
                        disabled={pending}
                      />
                      {n}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {step?.type === "closing" ? (
          <CalloutBox label="Closing Statement" variant="closing">
            <MarkdownContent markdown={step.markdown} />
          </CalloutBox>
        ) : null}

        {step?.type === "scenario" ? (
          <ScenarioStepBody
            scenario={step.scenario}
            saved={answers[step.scenario.id]}
            selected={selections[step.scenario.id] ?? ""}
            pending={pending}
            onSelect={(key) =>
              setSelections((prev) => ({
                ...prev,
                [step.scenario.id]: key,
              }))
            }
            onSubmit={() => onSubmitScenario(step.scenario.id)}
          />
        ) : null}

        {step?.type === "knowledge_check" ? (
          <div style={{ display: "grid", gap: "2rem" }}>
            <p style={{ margin: 0, color: "var(--tef-muted)" }}>
              Answer all {step.scenarios.length} questions, then continue.
            </p>
            {step.scenarios.map((scenario, i) => (
              <div key={scenario.id}>
                <p className="tef-callout-label" style={{ marginBottom: "0.75rem" }}>
                  Knowledge Check {i + 1}
                </p>
                <ScenarioStepBody
                  scenario={scenario}
                  saved={answers[scenario.id]}
                  selected={selections[scenario.id] ?? ""}
                  pending={pending}
                  onSelect={(key) =>
                    setSelections((prev) => ({ ...prev, [scenario.id]: key }))
                  }
                  onSubmit={() => onSubmitScenario(scenario.id)}
                />
              </div>
            ))}
          </div>
        ) : null}

        {step?.type === "mark_viewed" ? (
          <div>
            <h2 style={{ marginTop: 0 }}>Mark Content As Viewed</h2>
            <p style={{ color: "var(--tef-muted)" }}>
              Confirm you have worked through the lesson content. This is required
              before you can complete the module.
            </p>
            <button
              type="button"
              className="tef-btn tef-btn-secondary"
              onClick={onMarkContentViewed}
              disabled={pending || contentViewed}
            >
              {contentViewed ? "Content Viewed" : "Mark Content As Viewed"}
            </button>
          </div>
        ) : null}

        {step?.type === "complete" ? (
          <div>
            <h2 style={{ marginTop: 0 }}>Complete Module</h2>
            <p style={{ color: "var(--tef-muted)" }}>
              {isFullModule
                ? "Requires: content viewed + dilemma answered + knowledge score ≥ 80%."
                : "Requires: content viewed + preview scenario answered."}
            </p>
            {isFullModule ? (
              <p style={{ color: "var(--tef-muted)" }}>
                Current knowledge score:{" "}
                {knowledgeScore == null ? "—" : `${knowledgeScore}%`}
              </p>
            ) : null}
            <button
              type="button"
              className="tef-btn"
              onClick={onComplete}
              disabled={pending || Boolean(completedAt) || !canComplete}
            >
              {completedAt ? "Module Completed" : "Mark Completed"}
            </button>
            {!canComplete && !completedAt ? (
              <p style={{ marginTop: "0.75rem", color: "var(--tef-muted)", fontSize: "0.9rem" }}>
                Finish the required steps above before marking complete.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          className="tef-btn tef-btn-secondary"
          onClick={goBack}
          disabled={stepIndex === 0 || pending}
        >
          Back
        </button>
        {!isLast ? (
          <button
            type="button"
            className="tef-btn"
            onClick={goNext}
            disabled={pending || !stepReadyToContinue(step)}
          >
            Continue
          </button>
        ) : null}
      </div>

      {message ? (
        <p style={{ color: "var(--tef-ink)", fontSize: "0.95rem" }}>{message}</p>
      ) : null}
    </div>
  );
}
