<!--
Verbatim, seed-ready replacement for docs/curriculum/_derived_interior_council_content.md.
Matches the shape Cursor's Phase 1 report described for the three built
disciplines: content_md sections are marked CONTENT_MD; the dilemma,
recognition, and knowledge-check pieces that live in `scenarios` rows are
marked SCENARIOS and given explicit prompt/options/score/correct_key/
explanation fields so Phase 2 SQL can be drafted without guessing.
Source: TEF_-_Interior_Council.docx, final amended version (dilemma scoring
+ 4-item self-assessment with item 4 reverse-scored).
-->

# Discipline metadata

- Update existing row `b2000000-0000-4000-8000-000000000004`
  (currently slug `interior-dialogue`, title "Interior Dialogue",
  `is_full_module = false`) — do not insert a new row.
- slug → `interior-council`
- title → `Interior Council`
- subtitle → `Preserving independent judgment` (unchanged, still accurate)
- central_question → `Which inner voices are shaping this judgment—and has
  AI become the dominant one?` (replaces the old central_question; stored in
  `disciplines.central_question`, not in content_md)
- is_full_module → `true`
- sort_order → confirm placement relative to Sense of Wonder / Intentionality
  on "Regarding Myself" before finalizing (currently 1, first on the path)

---

# CONTENT_MD — opening step (## Introduction + ## Foundation + ## AI-Era Definition)

## Introduction

Listening to the inner voices that shape judgment

## Foundation

Jenkins and Jenkins describe an Interior Council: the advisers, ideas,
memories, images and people—living or dead, real or imagined—whose
influence we carry within us. Their central insight is that having such
a council is not itself the discipline. The discipline lies in choosing
carefully which influences we listen to and allow to shape our actions.

In this module, these influences are described as inner voices. They
develop over time through our mentors, relationships, culture, beliefs,
responsibilities and lived experiences. Some call us toward courage,
care and integrity. Others offer reassurance, self-protection or
justification. Interior dialogue is the process of noticing these
voices, understanding their conditioning and choosing deliberately how
we will respond.

## AI-Era Definition

Interior Council is the discipline of recognising and engaging the inner
voices that shape our thinking, then choosing consciously which
influences will guide an AI-assisted decision so that judgment remains
humane, accountable and genuinely our own.

Interior dialogue is the practice within the discipline: listening to
the voices, asking how they were formed, noticing what each is
protecting or promoting, testing their claims and choosing what should
guide action. AI may contribute information, challenge assumptions or
offer alternatives, but it must not become the dominant voice—or take
the chair of the Council.

---

# CONTENT_MD — extra step (not present in the other three modules; renders as an ordinary content step)

## Learning Objectives

By the end of this module, you will be able to:

- Explain "inner voices" as a reflective metaphor for self-talk,
  memories, emotions, values, bodily signals and internalised social
  influences.
- Distinguish observations from interpretations, emotions, assumptions,
  values and possible justifications.
- Identify how learning, experience and schemas may influence judgment
  without treating them as fixed causes.
- Detect anchoring, adopted framing, confirmation seeking, reassurance
  seeking and borrowed reasoning in AI-assisted work.
- Use a human-first process to test an AI-generated framing, consult
  affected people and document an accountable action.

## Evidence and Language

Research on inner speech, self-talk, schemas, metacognition, emotion
regulation and judgment bias helps explain why recurring thoughts and
internalised social messages can influence action. Inner speech can
support planning, self-regulation and reflection, but it varies greatly
between people and is not a single, infallible source of truth.

In this module, "inner voices" is a practical metaphor for recurring
thoughts, emotions, memories, values, bodily signals and socialised
expectations. It does not assume that everyone experiences literal
voices, distinct inner characters or separate personalities. A voice's
possible purpose—such as protection or reassurance—is a question to
explore, not a fact to presume.

---

# CONTENT_MD — ## Dilemma heading (leave body EMPTY; see SCENARIOS below for the actual text)

## Dilemma

(No body — interactive dilemma step is injected from the `scenarios` row.)

## Before Continuing

- What changed when the concerns were labelled "resistance"?
- What other explanations could fit the same observations?
- Which inner voices or perspectives became quieter after the AI response?
- What evidence would distinguish concern, confusion, distrust, workload
  pressure and resistance?
- What action becomes more likely under each interpretation?

---

# SCENARIOS — kind = 'dilemma'

**prompt_md:**

You are facilitating a team whose members have raised concerns about a
proposed AI-supported work allocation process. Before asking for advice,
you suspect that responsibilities are unclear and that some concerns
have not been heard.

You ask AI how to respond to the concerns raised by team members. AI
describes the team as "resistant" and produces a confident plan for
overcoming reluctance and securing commitment. The plan sounds
professional, and you feel relieved: you now have a clear way forward.

As you prepare the next meeting, you notice that the AI's voice now
dominates your thinking. Your initial concern, the employees' own
accounts and the guidance of a respected former mentor have become
quieter. What should you do?

**options:**

| key | text | score |
|---|---|---|
| A | Use the plan because AI offers the clearest and most complete advice. | 1 |
| B | Remove AI from the process and rely entirely on your first impression. | 3 |
| C | Pause for interior dialogue: identify the inner voices shaping you, consider how they were conditioned and what each is serving, compare their messages with evidence and the team's perspective, and then decide. | 4 |
| D | Ask AI to evaluate the other voices and choose which one should guide you. | 2 |

**correct_key:** C

**explanation — ⚠ see Flag 4 below, this discipline was authored with four
distinct per-option paragraphs, not one shared explanation. Shared
`explanation` fallback (the C paragraph, matching the current one-explanation
schema) is given here; the full four-paragraph version is below it in case
we decide to support it:**

> This restores the quieter inner voices and relevant evidence to the
> conversation while preserving your responsibility to choose. Neither
> your first interpretation nor the generated framing is automatically
> authoritative.

Full per-option feedback (for reference / if per-option feedback is built):

- **A — 1 point (least effective).** This accepts fluency and
  completeness as authority. It leaves the AI-generated framing untested
  and excludes the team's perspective, the facilitator's other inner
  voices and accountable human judgment.
- **B — 3 points.** This reclaims responsibility from AI and returns
  attention to your original concern. However, relying entirely on a
  first impression replaces one dominant voice with another and does not
  test your interpretation against evidence or the team's experience.
- **C — 4 points (most effective).** This restores the quieter inner
  voices and relevant evidence to the conversation while preserving your
  responsibility to choose. Neither your first interpretation nor the
  generated framing is automatically authoritative.
- **D — 2 points.** This acknowledges that other inner voices exist, but
  it gives AI the authority to judge them and make the choice. AI
  remains the dominant voice rather than a contribution to human
  reflection.

---

# CONTENT_MD — concept steps

## Why Interior Council Matters

AI can enter our Interior Council quickly. Its voice is always
available, responds directly to us and can sound informed, calm and
complete. Once it supplies an interpretation, we may begin editing its
language without noticing that it has defined the situation itself.

Our inner voices may carry influences such as:

- A remembered mentor or colleague.
- An organisational value or professional commitment.
- A fear of conflict, failure or loss of status.
- A desire to protect, please, control or avoid.
- An inherited story about competent leadership.
- An AI-generated interpretation that appears knowledgeable and complete.

These voices are not automatically right or wrong. Each may contain a
warning, value or insight worth hearing. The discipline is to understand
how a voice developed, what it is asking of us and whether following it
would make us more effective, responsive, courageous and humane.

### Inner Dialogue and Mental Wellbeing

The inner voice can function as a compass: it can help us organise
experience, rehearse action, regulate emotion and return to what
matters. Yet a compass must be read with care. Repetitive negative
thinking—such as persistent worry or rumination—is associated with
anxiety, depression and emotional distress. The goal is therefore not to
obey every thought or eliminate every difficult one, but to notice our
patterns, relate to them with perspective and seek support when
reflection becomes distressing or unmanageable.

Anxiety, relief, irritation, urgency or confidence can carry useful
information, but none of them verifies an interpretation on its own.

### Self-Deception

We are capable of constructing convincing explanations for what protects
our comfort, status or self-image. AI can strengthen that self-deception
by supplying a polished rationale for the story we have already told.
Interior Council asks not only, "Does this make sense?" but also, "What
does believing this allow me to avoid, justify or ignore?"

### Conditioning, Inner Voices and Interior Dialogue

Inner voices are formed and reinforced over a lifetime. They may echo a
mentor, family or cultural message, professional expectation, past
success, painful experience, fear, value or aspiration. A familiar voice
can feel like truth simply because we have heard it often. Interior
dialogue creates enough space to recognise the conditioning without
being governed by it.

1. Notice: What thoughts, emotions, bodily signals and memories are present?
2. Locate: Where do I feel urgency, ease, tension, relief or resistance
   in my response?
3. Separate: What is directly observed, and what is inferred?
4. Name influences: Which values, relationships, experiences, cultural
   messages or habits may be shaping the response?
5. De-centre: What alternative explanations and perspectives are
   available?
6. Test outwardly: What evidence, records and affected-person accounts
   could confirm or challenge the interpretation?
7. Use AI deliberately: Can AI expose assumptions or missing questions
   without deciding the issue?
8. Choose accountably: What will I do, who is responsible, and what
   value or reason guides the decision?
9. Review: What happened, what did I learn, and what would change my
   judgment next time?

## Working Definitions

**Inner voice** — A recurring thought pattern, self-talk style, memory,
emotion, value or internalised social message—not necessarily a literal
voice.

**Conditioning** — Learning through repeated experience, reinforcement,
observation, language, relationships and social context.

**Schema** — A mental framework that guides attention, interpretation
and expectation.

**Intuition** — A rapid judgment that may reflect expertise, pattern
recognition, emotion or bias; consequential decisions require testing.

**Metacognition** — Thinking about your own thinking, including your
assumptions, confidence and reasoning.

**Repetitive negative thinking** — Persistent worry or rumination that
circles without producing useful resolution.

**AI dominance** — AI's framing or recommendation disproportionately
determines attention, interpretation or choice.

## What It Is and What It Is Not

| What Interior Council Is | What Interior Council Is Not |
|---|---|
| Recognising the conditioned inner voices shaping thought | Treating every thought as equally wise |
| Choosing which influences to cultivate or challenge | Silencing anything uncomfortable |
| Taking intuition seriously enough to test it | Treating intuition as proof |
| Using interior dialogue to examine judgment | Living only within your own reflection |
| Keeping AI from becoming the dominant voice | Rejecting AI or outside expertise |
| Remaining responsible for the choice | Seeking a voice that will decide for you |

## Central Tension

Interior Council must be balanced with outward attention and timely
action. Too little allows whichever voice is loudest, most reassuring or
most authoritative to direct the response. Too much can turn inward
reflection into a private chamber that excludes evidence, participation
and decision.

### Underused

It becomes reactive, dominated by habitual or authoritative voices,
unaware of self-deception and dependent on reassurance.

### Balanced

It is reflective, discerning, evidence-aware, open to correction and
able to choose.

### Overused

It becomes self-absorbed, closed to participation, excessively doubtful
and reluctant to act.

### Balanced Expression

I can listen to the inner voices within me without allowing any one
voice—including AI—to determine my response.

## How Interior Council Shows Up

| Underused | Balanced | Overused |
|---|---|---|
| Lets the loudest voice decide | Recognises several relevant inner voices | Sustains endless internal debate |
| Treats discomfort as a verdict | Examines what discomfort may signal | Analyses every feeling repeatedly |
| Allows AI to frame the whole situation | Keeps AI from becoming dominant | Rejects useful outside input |
| Seeks reassurance | Invites challenge and evaluates it | Keeps seeking another opinion |
| Cannot explain why a view changed | Names which influence mattered and why | Reopens decisions without new information |

## AI-Era Failure Modes

**AI as the Dominant Voice** — Allowing the model to frame the issue,
quiet other inner voices and determine what should guide the decision.

**Adopted Framing** — Treating the model's description of a situation as
your own conclusion without checking its assumptions.

**Reassurance Seeking** — Repeatedly asking AI for approval when the
decision requires evidence, a conversation or a choice.

**Confirmation Seeking** — Describing a situation in ways that invite
support for what you already want to believe.

**Self-Deception Reinforcement** — Using AI to elaborate a justification
that protects your self-image or avoids responsibility.

**Borrowed Reasoning** — Repeating a generated rationale that you cannot
explain or defend in your own words.

**Reflection Without Resolution** — Using more prompts to prolong
deliberation after the next responsible step is clear.

## Applying Interior Council

A useful starting question is: "Which inner voices are influencing me at
this moment?" These voices are patterns of thought, memory, feeling and
meaning shaped through experience. They are not a diagnosis or a fixed
description of personality.

**The Protector** — "We should avoid harm." Ask: What specific risk do I
see, and what supports that concern?

**The Critic** — "This may not be good enough." Ask: Which standard is
not being met?

**The Pleaser** — "I want everyone to approve." Ask: Am I avoiding a
disagreement the work requires?

**The Expert** — "I should already know." Ask: What might I learn if I
admitted uncertainty?

**The Avoider** — "Let the system handle this." Ask: Which conversation
or responsibility am I reluctant to face?

### Understanding and Reshaping Learned Patterns

Your inner voices are not fixed, but deeply learned responses seldom
change through insight alone. Change is often gradual, uneven and
dependent on context. Repeated practice, new experiences, supportive
relationships and feedback can help us respond differently, examine
inherited assumptions and strengthen values-aligned habits. The test is
not whether a voice is pleasant or agrees with you. Ask whether
following it helps you grow, serve, preserve integrity and recognise the
humanity of others.

### When AI Enters the Interior Dialogue

After recording your own view and identifying the inner voices already
present, you might ask AI: "Identify assumptions in this interpretation,
offer two plausible alternatives, and suggest evidence that would
distinguish them. Do not infer people's motives as facts."

Treat its response as material to examine. Check important claims and
speak with affected people. An imagined stakeholder perspective is not a
substitute for that person's contribution. Use anonymised or authorised
information when discussing a real situation.

### Why AI Can Become Dominant

AI dominance is not only a matter of personal psychology. System design
can amplify it through fluent language, default recommendations, ranked
options, confidence cues, limited alternatives and interfaces that make
acceptance easier than investigation. Recording your thinking before
consulting AI helps reduce premature anchoring.

---

# CONTENT_MD — ## Recognition Activity heading (leave body EMPTY; see SCENARIOS + Flag 5 below — shape does not fit a single A–D scenario)

## Recognition Activity: Which Voice Is Dominating?

(No body — interactive step injected from `scenarios`, kind = 'recognition'.
⚠ See Flag 5: this activity classifies FOUR independent statements, two of
which are both "Balanced," not a single best-of-four MCQ. Does not fit the
existing recognition shape as-is.)

## Apply the Recognition

Return to the opening dilemma. Complete this sentence in your own words:

"The inner voices shaping me are ______. The voice I am most drawn to says
______ because ______. Before deciding, I need to hear or test ______."

---

# SCENARIOS — kind = 'recognition' — ⚠ NOT a standard A–D MCQ, see Flag 5

Classify each statement as Balanced, Underused or Overused Interior
Council. Identify which inner voice is exerting the greatest influence
before reading the feedback.

| key | statement | classification | feedback |
|---|---|---|---|
| A | "AI calls the team defensive, so I will use its plan." | Underused | AI's account is accepted without checking observations or hearing the team. |
| B | "My wish for reassurance is one voice. Fairness asks me to hear the team and check the evidence before deciding." | Balanced | The learner tests the different voices and retains responsibility for the choice. |
| C | "We have enough for a small trial, but I want more prompts until I feel completely certain." | Overused | Interior dialogue is postponing proportionate action. |
| D | "AI challenged my view. I checked the records, recalled a mentor's question and now agree with its suggestion." | Balanced | Agreement follows interior dialogue, evidence and accountable choice. |

Note: two statements (B and D) are independently "Balanced" — there is no
single `correct_key`. This is a classify-all-four exercise, not a
choose-the-best-one exercise like the other three disciplines' recognition
scenarios.

---

# CONTENT_MD — ## Self-Assessment (4 items, item 4 reverse-scored)

## Self-Assessment

Consider your AI-supported work over the past month. Rate each statement
from 1 to 5: 1 = almost never; 2 = rarely; 3 = sometimes; 4 = often; 5 =
almost always. If you have no relevant experience, leave the item
unrated.

1. I can identify the inner voices, memories or values influencing a
   meaningful decision.
2. I notice when relief, anxiety, status or a wish for approval makes
   one voice especially persuasive.
3. I distinguish what I have observed from the story an inner voice or
   AI has constructed.
4. I allow an inner voice or AI-generated interpretation to guide me
   without testing it against relevant evidence or affected people's
   perspectives. **Reverse-scored**

## Personal Focus

- Which response can you support with a recent example?
- Which inner voice or learned pattern would you like to strengthen,
  question or reshape?
- What would observable improvement look like?

---

# CONTENT_MD — ## Knowledge Check heading (leave body EMPTY; see SCENARIOS below)

## Knowledge Check

(No body — five interactive `knowledge_check` scenario rows are injected here.)

---

# SCENARIOS — 5× kind = 'knowledge_check'

**KC1 — prompt_md:** AI repeats your label "the team is defensive" and
recommends a campaign. What best reduces framing and anchoring?

| key | text | score |
|---|---|---|
| A | Make the campaign more persuasive. | 0 |
| B | Ask another model whether the label is right. | 0 |
| C | Restate neutral observations, develop alternatives and speak with the team. | 1 |
| D | Wait until the pilot begins. | 0 |

correct_key: C
explanation: Neutral observations, alternative explanations and the team's
own accounts loosen the original label and provide evidence for a better
judgment.

**KC2 — prompt_md:** Which statement about inner voices is most accurate here?

| key | text | score |
|---|---|---|
| A | Everyone experiences distinct internal characters. | 0 |
| B | A strong inner voice is reliable evidence. | 0 |
| C | They are a metaphor for varied thoughts, emotions, memories, values, bodily signals and internalised influences. | 1 |
| D | Every recurring thought has one stable cause. | 0 |

correct_key: C
explanation: The term is a reflective metaphor broad enough to include
non-verbal experience. It is not a claim that everyone hears literal voices
or has separate inner characters.

**KC3 — prompt_md:** An AI recommendation makes you feel relieved. What is
the most useful next step?

| key | text | score |
|---|---|---|
| A | Notice the relief, investigate what it may signal and test the recommendation. | 1 |
| B | Accept it because relief indicates a good fit. | 0 |
| C | Reject it because emotions are unreliable. | 0 |
| D | Ask AI to confirm the feeling. | 0 |

correct_key: A
explanation: Relief may reflect insight, cognitive ease, reassurance or
avoidance. It is information to examine, not verification.

**KC4 — prompt_md:** When should direct human engagement come before AI analysis?

| key | text | score |
|---|---|---|
| A | When confidentiality, relational harm or affected people's own accounts are central. | 1 |
| B | Whenever the facilitator feels uncertain. | 0 |
| C | Only when AI refuses to answer. | 0 |
| D | Never; anonymisation removes every concern. | 0 |

correct_key: A
explanation: AI cannot replace consent, relationship repair or the
testimony of affected people. Confidential and high-stakes contexts may
also limit whether AI should be used at all.

**KC5 — prompt_md:** You accept an AI recommendation. What best shows AI
did not dominate?

| key | text | score |
|---|---|---|
| A | Several models agreed. | 0 |
| B | You examined its reasoning, heard the existing inner voices, checked evidence and can explain the choice. | 1 |
| C | You kept part of your original idea. | 0 |
| D | You rewrote the output in your own tone. | 0 |

correct_key: B
explanation: Human responsibility does not require disagreeing with AI. It
requires examination, reasons and retained accountability.

---

# CONTENT_MD — closing steps

## Practice Exercise — Conduct the Interior Dialogue

### Psychological Safety

This educational exercise is not therapy and is not intended to
investigate trauma or diagnose mental-health conditions. You may skip
personal examples, use a fictional or work-based case, and stop if the
exercise becomes distressing. No participant should be pressured to
disclose personal conditioning, family experiences or trauma. If you
experience voices as external, commanding or distressing, seek
appropriate professional support rather than relying on this module.

Choose an upcoming decision or facilitation challenge where AI could
contribute. Use a manageable situation and protect confidential
information. Keep your initial notes unchanged so that you can compare
them with your later judgment.

### Part 1 — Before AI Enters the Room

Record:

- What decision or question am I considering?
- What is happening? Separate observations from interpretations.
- What emotions, bodily signals or urgency do I notice?
- What are at least two plausible explanations?
- Who is affected, and whose account or consent is needed?
- What evidence is relevant?
- What action do I currently favour, and why?
- How confident am I, from 1 to 5? What explains that rating?

### Part 2 — Identify My Existing Inner Voices

- Which people, memories, values, images, stories or habitual voices are
  influencing me?
- What is each inner voice saying or protecting?
- Which voice is loudest? Which important voice is quiet or absent?
- How might experience, a mentor, culture or past conditioning have
  shaped each voice?
- Which voice might be helping me justify what is easiest or most
  flattering?
- Which voice makes me more courageous, responsive and humane?

### Part 3 — Introduce AI as Another Voice

Ask AI to identify assumptions, offer competing interpretations, separate
facts from inferences, name missing evidence, suggest questions for
affected people and state uncertainty or possible failure modes. Avoid
beginning with prompts such as "What should I do?", "How do I overcome
their resistance?", "Confirm that I am right" or "Decide which option is
best."

Then identify:

- What useful consideration did AI add?
- What did it assume or claim without adequate support?
- Where did its response reflect the framing I supplied?
- Did AI amplify an existing inner voice, introduce a new influence or
  crowd out other voices?
- Which suggestion feels attractive, and for what reason?
- Did the interface, ranking or confidence of the response make
  acceptance feel easier than investigation?

### Part 4 — Choose Deliberately

- Check one important claim against a relevant record, source or
  observation.
- Seek an affected person's perspective where appropriate; do not
  replace it with a generated account.
- State which inner voices you will heed, question or decline, with
  reasons.
- Choose the next action, who remains responsible and when it will
  happen.
- Record your final confidence and uncertainty. Identify what would
  prompt a review.

Practice evidence: retain your initial view, your inner-voice map, the AI
contribution, the check you completed and your final decision.

## Evidence Reflection

- Which inner voices were present before consulting AI?
- Which voice was loudest, and which important voice was quiet or absent?
- What experiences, mentors or conditioning may have shaped those voices?
- How did your prompt influence the voice AI introduced?
- Did AI take, or did you give it, more authority than the inner voices
  already present?
- What changed in your judgment, and what specifically justified the
  change?
- Which claim or assumption did you test? What did you find?
- What did another person contribute that AI could not establish on
  their behalf?
- Which inner voice or value did you ultimately choose to follow, and
  what did that choice ask you to become?
- What happened after you acted, or when will you review the result?

### Return to the Dilemma

The facilitator can recognise that AI has become dominant, restore the
quieter inner voices shaped by values, experience and remembered
guidance, attend to the team and evidence, and then choose the
intervention. Neither the AI's account nor the facilitator's first
impression is automatically authoritative.

### My Practice Commitment

"Before my next AI-assisted decision about ______, I will listen for
______, use AI to ______ and retain responsibility for ______."

## Selected Evidence

The psychological framing in this module draws on the following research
and evidence reviews:

- Alderson-Day, B., & Fernyhough, C. (2015). Inner speech: Development,
  cognitive functions, phenomenology, and neurobiology. Psychological
  Bulletin, 141(5), 931–965. https://doi.org/10.1037/bul0000021
- Moser, J. S., et al. (2017). Third-person self-talk facilitates emotion
  regulation without engaging cognitive control. Scientific Reports, 7,
  4519. https://doi.org/10.1038/s41598-017-04047-3
- Watkins, E. R., & Roberts, H. (2020). Reflecting on rumination:
  Consequences, causes, mechanisms and treatment of rumination.
  Behaviour Research and Therapy, 127, 103573.
  https://doi.org/10.1016/j.brat.2020.103573
- National Academies of Sciences, Engineering, and Medicine. (2022).
  Human-AI Teaming: State-of-the-Art and Research Needs. Chapter 8:
  Identification and Mitigation of Bias in Human-AI Teams.
  https://doi.org/10.17226/26355
- Schertz, K. E., et al. (2025). The frequency, form, and function of
  self-talk in everyday life. Scientific Reports.
  https://doi.org/10.1038/s41598-025-22647-2

## Closing Statement

AI may enter the interior dialogue, but it must not become the dominant
voice. The responsibility to choose which voices shape our actions
remains human.

**Mark Completed:** Complete the recognition activity, self-assessment,
five knowledge-check questions, practice exercise and evidence
reflection. Completion records participation in the module; it does not
certify mastery. If the outcome of your action is not yet available,
record when you will review it.

---

# Open flags carried over from Cursor's Phase 1 report (unchanged, still need answers)

1. **Per-option dilemma feedback** (Flag 4) — this discipline is authored
   with four distinct feedback paragraphs, one per option. Current schema/UI
   shows one shared `explanation` regardless of which key was picked. Decide:
   ship with the shared C-paragraph now (no schema change), or extend
   `scenarios`/`FeedbackBlock` to support per-option feedback.
2. **Recognition Activity shape** (Flag 5) — this is a classify-all-four
   exercise with two independently "Balanced" statements, not a
   choose-the-best-of-four MCQ like the other three disciplines. Decide:
   simplify to fit the existing MCQ shape (picking one "best" statement,
   losing the classification exercise), or scope a small UI change to
   support classification-style recognition scenarios.
3. Slug/row update vs. new insert, and the 4-item self-assessment with item
   4 reverse-scored, are both confirmed — no further decision needed there.
