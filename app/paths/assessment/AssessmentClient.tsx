"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { submitProfileAnswers } from "@/app/paths/assessment/actions";
import { MarkdownContent } from "@/components/MarkdownContent";
import {
  PROFILE_DISCIPLINES,
  type ProfileAnswers,
  type ProfileDisciplineKey,
} from "@/lib/baseline-profile";

type Step =
  | { kind: "intro" }
  | { kind: "likert"; key: ProfileDisciplineKey }
  | { kind: "dilemma"; key: ProfileDisciplineKey };

const STEPS: Step[] = [
  { kind: "intro" },
  ...PROFILE_DISCIPLINES.map((d) => ({ kind: "likert" as const, key: d.key })),
  ...PROFILE_DISCIPLINES.map((d) => ({ kind: "dilemma" as const, key: d.key })),
];

function emptyAnswers(): ProfileAnswers {
  return {
    detachment: { likert: [], dilemma_choice: "" },
    intentionality: { likert: [], dilemma_choice: "" },
    "sense-of-wonder": { likert: [], dilemma_choice: "" },
  };
}

function disciplineByKey(key: ProfileDisciplineKey) {
  return PROFILE_DISCIPLINES.find((d) => d.key === key)!;
}

type Props = {
  hasExistingResult: boolean;
};

export function AssessmentClient({ hasExistingResult }: Props) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<ProfileAnswers>(emptyAnswers);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const step = STEPS[stepIndex]!;
  const isLast = stepIndex >= STEPS.length - 1;
  const stepTitle =
    step.kind === "intro"
      ? "Introduction"
      : step.kind === "likert"
        ? `${disciplineByKey(step.key).title} · Self-ratings`
        : `${disciplineByKey(step.key).title} · Dilemma`;

  const currentReady = useMemo(() => {
    if (step.kind === "intro") return true;
    const block = answers[step.key];
    if (step.kind === "likert") {
      const needed = disciplineByKey(step.key).items.length;
      return (
        block.likert.length === needed &&
        block.likert.every((n) => n >= 1 && n <= 5)
      );
    }
    return Boolean(block.dilemma_choice);
  }, [answers, step]);

  function setLikert(key: ProfileDisciplineKey, itemIndex: number, rating: number) {
    setAnswers((prev) => {
      const discipline = disciplineByKey(key);
      const next = [...prev[key].likert];
      while (next.length < discipline.items.length) next.push(0);
      next[itemIndex] = rating;
      return {
        ...prev,
        [key]: { ...prev[key], likert: next },
      };
    });
  }

  function setDilemma(key: ProfileDisciplineKey, choice: string) {
    setAnswers((prev) => ({
      ...prev,
      [key]: { ...prev[key], dilemma_choice: choice },
    }));
  }

  function goNext() {
    if (stepIndex < STEPS.length - 1) {
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

  function onSubmit() {
    setMessage(null);
    startTransition(async () => {
      const result = await submitProfileAnswers(answers);
      if (!result.ok) {
        setMessage(result.error ?? "Could not save your profile.");
        return;
      }
      router.push("/paths/assessment/results");
    });
  }

  return (
    <div className="tef-main-inner">
      <h1 style={{ margin: "0 0 0.5rem" }}>TEF Developmental Profile</h1>
      <p
        className="tef-subtitle"
        style={{ margin: "0 0 1.5rem", color: "var(--tef-muted)" }}
      >
        An initial assessment across three Disciplines · about 5 minutes
      </p>

      {step.kind !== "intro" ? (
        <p className="tef-callout-label" style={{ margin: "0 0 1rem" }}>
          Step {stepIndex} of {STEPS.length - 1} · {stepTitle}
        </p>
      ) : null}

      <div
        style={{
          background: "var(--tef-surface)",
          border: "1px solid var(--tef-border)",
          borderRadius: "var(--tef-card-radius)",
          padding: "1.5rem 1.35rem",
          minHeight: "12rem",
        }}
      >
        {step.kind === "intro" ? (
          <section className="tef-prose">
            <h2>What this is</h2>
            <p>
              This is an introductory profile across the three Disciplines:
              Detachment, Intentionality, and Sense of Wonder. It is a
              development snapshot, not a diagnosis or a fixed description of who
              you are.
            </p>
            <p>
              You will be asked to rate twelve statements on a scale of 1–5 and
              answer three workplace dilemmas. For the most useful reflection,
              respond according to how you currently tend to think and act — not
              how you believe you should respond.
            </p>
            {hasExistingResult ? (
              <p>
                <Link href="/paths/assessment/results">View your latest profile →</Link>
              </p>
            ) : null}
          </section>
        ) : null}

        {step.kind === "likert" ? (
          <div>
            <h2 style={{ marginTop: 0 }}>{disciplineByKey(step.key).title}</h2>
            <p style={{ color: "var(--tef-muted)" }}>Rate from 1 to 5.</p>
            {disciplineByKey(step.key).items.map((item, i) => (
              <div key={item.id} className="tef-rating-row">
                <p className="tef-rating-prompt">
                  {i + 1}. {item.text}
                </p>
                <div
                  className="tef-rating-scale"
                  role="radiogroup"
                  aria-label={`${disciplineByKey(step.key).title} item ${i + 1}`}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <label key={n}>
                      <input
                        type="radio"
                        name={`profile-${step.key}-${item.id}`}
                        value={n}
                        checked={answers[step.key].likert[i] === n}
                        onChange={() => setLikert(step.key, i, n)}
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

        {step.kind === "dilemma" ? (
          <div>
            <h2 style={{ marginTop: 0 }}>
              {disciplineByKey(step.key).title} · Dilemma
            </h2>
            <MarkdownContent markdown={disciplineByKey(step.key).dilemma.promptMd} />
            <div style={{ marginTop: "1rem" }}>
              {disciplineByKey(step.key).dilemma.options.map((opt) => (
                <label key={opt.key} className="tef-option">
                  <input
                    type="radio"
                    name={`profile-dilemma-${step.key}`}
                    value={opt.key}
                    checked={answers[step.key].dilemma_choice === opt.key}
                    onChange={() => setDilemma(step.key, opt.key)}
                    disabled={pending}
                  />
                  <strong>{opt.key}.</strong> {opt.text}
                </label>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginTop: "1.25rem",
        }}
      >
        {step.kind === "intro" ? (
          <Link
            href="/paths/welcome"
            className="tef-btn tef-btn-secondary"
            style={{ textDecoration: "none" }}
          >
            Back
          </Link>
        ) : (
          <button
            type="button"
            className="tef-btn tef-btn-secondary"
            onClick={goBack}
            disabled={pending}
          >
            Back
          </button>
        )}

        {step.kind === "intro" ? (
          <button type="button" className="tef-btn" onClick={goNext}>
            Start
          </button>
        ) : isLast ? (
          <button
            type="button"
            className="tef-btn"
            onClick={onSubmit}
            disabled={pending || !currentReady}
          >
            {pending ? "Saving…" : "See my profile"}
          </button>
        ) : (
          <button
            type="button"
            className="tef-btn"
            onClick={goNext}
            disabled={pending || !currentReady}
          >
            Continue
          </button>
        )}
      </div>

      {message ? (
        <p style={{ color: "var(--tef-ink)", fontSize: "0.95rem", marginTop: "1rem" }}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
