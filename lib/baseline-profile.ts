/**
 * TEF Developmental Profile — hardcoded baseline content + scoring.
 *
 * Independent of `scenarios` / `progress`. Do not import this from module
 * completion paths, and do not write profile answers into those tables.
 */

export const PROFILE_DISCIPLINE_KEYS = [
  "detachment",
  "intentionality",
  "sense-of-wonder",
] as const;

export type ProfileDisciplineKey = (typeof PROFILE_DISCIPLINE_KEYS)[number];

export type ProfileBand = "Emerging" | "Developing" | "Established";

export type ProfileLikertItem = {
  id: string;
  text: string;
  reverseScored: boolean;
  distortionIndicator: boolean;
  overuseIndicator: boolean;
};

export type ProfileDilemmaOption = {
  key: string;
  text: string;
  score: number;
};

export type ProfileDilemma = {
  promptMd: string;
  options: ProfileDilemmaOption[];
};

export type ProfileDiscipline = {
  key: ProfileDisciplineKey;
  title: string;
  pathTitle: string;
  pathSlug: string;
  href: string;
  items: ProfileLikertItem[];
  dilemma: ProfileDilemma;
  /** One-line band copy reused from Central Tension / How it shows up. */
  bandDescription: Record<ProfileBand, string>;
  /** Overall-pattern sentence when this discipline is the lowest score. */
  overallPattern: string;
};

export type ProfileAnswers = Record<
  ProfileDisciplineKey,
  { likert: number[]; dilemma_choice: string }
>;

export type ProfileDisciplineScore = {
  score: number;
  band: ProfileBand;
  behaviouralScore: number;
  scenarioScore: number;
};

export type ProfileScores = Record<ProfileDisciplineKey, ProfileDisciplineScore>;

export type ProfileSummary = {
  startHereKey: ProfileDisciplineKey;
  startHereTitle: string;
  overallPattern: string;
};

/** Likert weight 60% + dilemma weight 40%, matching the curriculum spec. */
export const BEHAVIOURAL_WEIGHT = 0.6;
export const SCENARIO_WEIGHT = 0.4;

export const PROFILE_DISCIPLINES: ProfileDiscipline[] = [
  {
    key: "detachment",
    title: "Detachment",
    pathTitle: "Regarding Others",
    pathSlug: "regarding-others",
    href: "/paths/regarding-others/detachment",
    items: [
      {
        id: "d1",
        text: "I can discard an AI-generated answer after investing time refining it.",
        reverseScored: false,
        distortionIndicator: false,
        overuseIndicator: false,
      },
      {
        id: "d2",
        text: "I remain constructive when others reject my preferred solution.",
        reverseScored: false,
        distortionIndicator: false,
        overuseIndicator: false,
      },
      {
        id: "d3",
        text: "I separate the quality of an idea from who created it.",
        reverseScored: false,
        distortionIndicator: false,
        overuseIndicator: false,
      },
      {
        id: "d4",
        text: "I sometimes continue defending an answer because I have already presented it publicly.",
        reverseScored: true,
        distortionIndicator: false,
        overuseIndicator: false,
      },
    ],
    dilemma: {
      promptMd:
        "You lead a transformation team redesigning an internal approval process. After several days of prompting and refinement, you present an AI-generated workflow that is faster, cheaper and technically sophisticated.\n\nDuring the review, employees identify several situations the workflow does not handle well. They propose a simpler alternative that retains more human review.\n\nYou believe your design is more advanced. What should you do?",
      options: [
        {
          key: "A",
          text: "Defend the AI-generated workflow because the employees may be resisting change.",
          score: 2,
        },
        {
          key: "B",
          text: "Withdraw your proposal and leave the group to decide without further involvement.",
          score: 3,
        },
        {
          key: "C",
          text: "Help the group compare both approaches against agreed criteria, including operational performance, human impact and accountability.",
          score: 4,
        },
        {
          key: "D",
          text: "Ask AI to produce stronger arguments supporting your preferred workflow.",
          score: 1,
        },
      ],
    },
    bandDescription: {
      Emerging: "Defends preferred answers",
      Developing: "Evaluates evidence and ownership",
      Established:
        "I can care deeply about the quality of the outcome without needing the outcome to validate me.",
    },
    overallPattern:
      "Your responses suggest that stepping back from a preferred answer may be more difficult when you are already invested in the work.",
  },
  {
    key: "intentionality",
    title: "Intentionality",
    pathTitle: "Regarding Myself",
    pathSlug: "regarding-myself",
    href: "/paths/regarding-myself/intentionality",
    items: [
      {
        id: "i1",
        text: "I define the human outcome before selecting an AI tool.",
        reverseScored: false,
        distortionIndicator: false,
        overuseIndicator: false,
      },
      {
        id: "i2",
        text: "I can clearly explain why AI is appropriate for a task.",
        reverseScored: false,
        distortionIndicator: false,
        overuseIndicator: false,
      },
      {
        id: "i3",
        text: "I identify what should not be delegated.",
        reverseScored: false,
        distortionIndicator: false,
        overuseIndicator: false,
      },
      {
        id: "i4",
        text: "I usually start with what the tool can do rather than what the situation requires.",
        reverseScored: true,
        distortionIndicator: false,
        overuseIndicator: false,
      },
    ],
    dilemma: {
      promptMd:
        "A government department plans to introduce AI into its public-enquiry service. The stated objective is to improve access and reduce waiting times.\n\nDuring planning, the project gradually becomes focused on reducing staffing costs. The team proposes automating most interactions, including complex cases.\n\nWhat should happen next?",
      options: [
        {
          key: "A",
          text: "Continue, because cost reduction is a legitimate result of innovation.",
          score: 2,
        },
        {
          key: "B",
          text: "Pause and clarify whether the new design still serves the original public-service purpose.",
          score: 4,
        },
        {
          key: "C",
          text: "Ask AI to identify further opportunities to reduce human involvement.",
          score: 1,
        },
        {
          key: "D",
          text: "Launch the system and review the purpose after implementation.",
          score: 3,
        },
      ],
    },
    bandDescription: {
      Emerging: "Selects tools before defining outcomes",
      Developing: "Clarifies purpose first",
      Established:
        "I can remain committed to the purpose without becoming rigid about how it must be achieved.",
    },
    overallPattern:
      "Your responses suggest that clarifying purpose, and what responsibility must remain yours, may be less consistent than other patterns here.",
  },
  {
    key: "sense-of-wonder",
    title: "Sense of Wonder",
    pathTitle: "Regarding Myself",
    pathSlug: "regarding-myself",
    href: "/paths/regarding-myself/sense-of-wonder",
    items: [
      {
        id: "w1",
        text: "I form my own ideas before asking AI for examples.",
        reverseScored: false,
        distortionIndicator: false,
        overuseIndicator: false,
      },
      {
        id: "w2",
        text: "I can remain with a question without demanding immediate completion.",
        reverseScored: false,
        distortionIndicator: false,
        overuseIndicator: false,
      },
      {
        id: "w3",
        text: "I notice when an answer has narrowed my imagination.",
        reverseScored: false,
        distortionIndicator: false,
        overuseIndicator: false,
      },
      {
        id: "w4",
        text: "I assume the most polished idea is probably the strongest.",
        reverseScored: true,
        distortionIndicator: false,
        overuseIndicator: false,
      },
    ],
    dilemma: {
      promptMd:
        "A government agency is digitising a public-benefit application process.\n\nAI is used to analyse the current forms, approval criteria, rejection reasons and processing delays. It produces a redesigned workflow that is faster, less expensive and mostly automated.\n\nThe proposal preserves the existing eligibility categories and documentation requirements while moving them online.\n\nSenior leaders are impressed and want implementation to begin immediately.\n\nWhat is the most important question the project team has not yet asked?",
      options: [
        {
          key: "A",
          text: "Which AI platform will process applications fastest?",
          score: 1,
        },
        {
          key: "B",
          text: "How can the existing process be automated with fewer staff?",
          score: 2,
        },
        {
          key: "C",
          text: "What could the service become if it were redesigned around people's needs rather than the current procedure?",
          score: 4,
        },
        {
          key: "D",
          text: "How quickly can users be trained to complete the new digital form?",
          score: 3,
        },
      ],
    },
    bandDescription: {
      Emerging: "Accepts first plausible answer",
      Developing: "Explores several frames",
      Established:
        "I can remain open to what is possible without needing to pursue every possibility.",
    },
    overallPattern:
      "Your responses suggest that staying with a question may be harder once a first plausible answer is in view.",
  },
];

export const SCORING_FORMULA_PLAIN =
  "Each discipline score brings together your self-ratings and your dilemma response to show a current developmental pattern. Scores are reported on a 0–100 scale and interpreted as 0-59 Emerging, 60-74 Developing, or 75-100 Established.";

function shouldInvert(item: ProfileLikertItem): boolean {
  return (
    item.reverseScored || item.distortionIndicator || item.overuseIndicator
  );
}

/** Invert a 1–5 Likert so that higher always means stronger use of the discipline. */
export function invertLikert(rating: number): number {
  return 6 - rating;
}

export function bandForScore(score: number): ProfileBand {
  if (score <= 59) return "Emerging";
  if (score <= 74) return "Developing";
  return "Established";
}

export function getProfileDiscipline(
  key: ProfileDisciplineKey,
): ProfileDiscipline {
  const found = PROFILE_DISCIPLINES.find((d) => d.key === key);
  if (!found) {
    throw new Error(`Unknown profile discipline: ${key}`);
  }
  return found;
}

function isLikertRating(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5;
}

export function validateProfileAnswers(
  answers: unknown,
): { ok: true; answers: ProfileAnswers } | { ok: false; error: string } {
  if (!answers || typeof answers !== "object") {
    return { ok: false, error: "Answers are required." };
  }
  const raw = answers as Record<string, unknown>;
  const result = {} as ProfileAnswers;

  for (const discipline of PROFILE_DISCIPLINES) {
    const block = raw[discipline.key];
    if (!block || typeof block !== "object") {
      return { ok: false, error: `Missing answers for ${discipline.title}.` };
    }
    const { likert, dilemma_choice: choice } = block as {
      likert?: unknown;
      dilemma_choice?: unknown;
    };
    if (!Array.isArray(likert) || likert.length !== discipline.items.length) {
      return {
        ok: false,
        error: `Rate all ${discipline.items.length} items for ${discipline.title}.`,
      };
    }
    if (!likert.every(isLikertRating)) {
      return {
        ok: false,
        error: `Ratings for ${discipline.title} must be whole numbers from 1 to 5.`,
      };
    }
    if (typeof choice !== "string" || !discipline.dilemma.options.some((o) => o.key === choice)) {
      return { ok: false, error: `Choose a dilemma option for ${discipline.title}.` };
    }
    result[discipline.key] = {
      likert: likert as number[],
      dilemma_choice: choice,
    };
  }

  return { ok: true, answers: result };
}

export function scoreDiscipline(
  discipline: ProfileDiscipline,
  likert: number[],
  dilemmaChoice: string,
): ProfileDisciplineScore {
  let total = 0;
  for (let i = 0; i < discipline.items.length; i++) {
    const raw = likert[i] ?? 0;
    const item = discipline.items[i]!;
    total += shouldInvert(item) ? invertLikert(raw) : raw;
  }
  const behaviouralScore = (total / (discipline.items.length * 5)) * 100;

  const option = discipline.dilemma.options.find((o) => o.key === dilemmaChoice);
  const scenarioScore = ((option?.score ?? 0) / 4) * 100;

  const score = Math.round(
    behaviouralScore * BEHAVIOURAL_WEIGHT + scenarioScore * SCENARIO_WEIGHT,
  );

  return {
    score,
    band: bandForScore(score),
    behaviouralScore: Math.round(behaviouralScore),
    scenarioScore: Math.round(scenarioScore),
  };
}

export function computeProfileScores(answers: ProfileAnswers): ProfileScores {
  const scores = {} as ProfileScores;
  for (const discipline of PROFILE_DISCIPLINES) {
    const block = answers[discipline.key];
    scores[discipline.key] = scoreDiscipline(
      discipline,
      block.likert,
      block.dilemma_choice,
    );
  }
  return scores;
}

export function summarizeProfile(scores: ProfileScores): ProfileSummary {
  let startHere = PROFILE_DISCIPLINES[0]!;
  let lowest = scores[startHere.key].score;

  for (const discipline of PROFILE_DISCIPLINES) {
    const next = scores[discipline.key].score;
    if (next < lowest) {
      lowest = next;
      startHere = discipline;
    }
  }

  return {
    startHereKey: startHere.key,
    startHereTitle: startHere.title,
    overallPattern: startHere.overallPattern,
  };
}
