-- 0014_interior_council.sql
-- REVIEW ONLY — do not auto-execute. Run manually in the Supabase SQL Editor.
--
-- Promotes discipline b2000000-0000-4000-8000-000000000004 from the
-- "Interior Dialogue" PREVIEW row to the full module "Interior Council".
--
-- Source of all copy: docs/curriculum/_derived_interior_council_content.md
-- (verbatim seed-ready version; prose paragraphs unwrapped to single lines to
-- match how content_md is stored for the other three full modules).
--
-- Naming: the DISCIPLINE is "Interior Council". "Interior dialogue" appears
-- only as the in-copy process/practice term. No nav/section/label uses it.
--
-- NEW SHAPES INTRODUCED HERE (app support lands in Phase 3):
--   1) options[].feedback — optional per-option feedback string on the dilemma.
--      The other three dilemmas are NOT backfilled and keep using the single
--      shared `explanation`. Phase 3 FeedbackBlock reads
--      options[key].feedback ?? explanation.
--   2) kind = 'classification' — classify N independent statements, more than
--      one may share a classification, so there is NO single correct_key.
--      options[] carry { key, text, classification, feedback };
--      rubric_md carries the allowed label list as JSON.
--
-- PRE-FLIGHT CHECKS ALREADY PERFORMED AGAINST THE LIVE DB (read-only):
--   * c3000000-...-000022 is NOT the old Interior Dialogue preview row anymore.
--     It is now Intentionality's 5th knowledge_check, and 4 progress rows
--     reference it (3 of them completed modules by real learners).
--     => IT IS NOT DELETED HERE. Deleting it would drop Intentionality from
--        5 to 4 knowledge checks and invalidate answered/completed progress.
--   * Discipline b2000000-...-000004 currently has ZERO scenario rows, so
--     there is no stray preview_scenario to remove.
--   * Scenario ids 000026..000034 are unused. This migration uses 000026-000032.
--   * No progress row currently carries a "classifications" key.
--
-- Not touched by this migration: profile_results, paths, the other eight
-- discipline rows, and every existing scenario row.

begin;

-- ---------------------------------------------------------------------------
-- 1. Discipline row: Interior Dialogue (preview) -> Interior Council (full)
--    sort_order stays 1 (first on the Regarding Myself path).
--    subtitle stays "Preserving independent judgment".
-- ---------------------------------------------------------------------------
update disciplines
set
  slug = $s$interior-council$s$,
  title = $s$Interior Council$s$,
  is_full_module = true,
  central_question = $s$Which inner voices are shaping this judgment—and has AI become the dominant one?$s$,
  content_md = $ic$## Introduction

**Listening to the inner voices that shape judgment**

## Foundation

Jenkins and Jenkins describe an Interior Council: the advisers, ideas, memories, images and people—living or dead, real or imagined—whose influence we carry within us. Their central insight is that having such a council is not itself the discipline. The discipline lies in choosing carefully which influences we listen to and allow to shape our actions.

In this module, these influences are described as inner voices. They develop over time through our mentors, relationships, culture, beliefs, responsibilities and lived experiences. Some call us toward courage, care and integrity. Others offer reassurance, self-protection or justification. Interior dialogue is the process of noticing these voices, understanding their conditioning and choosing deliberately how we will respond.

## AI-Era Definition

Interior Council is the discipline of recognising and engaging the inner voices that shape our thinking, then choosing consciously which influences will guide an AI-assisted decision so that judgment remains humane, accountable and genuinely our own.

Interior dialogue is the practice within the discipline: listening to the voices, asking how they were formed, noticing what each is protecting or promoting, testing their claims and choosing what should guide action. AI may contribute information, challenge assumptions or offer alternatives, but it must not become the dominant voice—or take the chair of the Council.

## Learning Objectives

By the end of this module, you will be able to:

- Explain "inner voices" as a reflective metaphor for self-talk, memories, emotions, values, bodily signals and internalised social influences.
- Distinguish observations from interpretations, emotions, assumptions, values and possible justifications.
- Identify how learning, experience and schemas may influence judgment without treating them as fixed causes.
- Detect anchoring, adopted framing, confirmation seeking, reassurance seeking and borrowed reasoning in AI-assisted work.
- Use a human-first process to test an AI-generated framing, consult affected people and document an accountable action.

## Evidence and Language

Research on inner speech, self-talk, schemas, metacognition, emotion regulation and judgment bias helps explain why recurring thoughts and internalised social messages can influence action. Inner speech can support planning, self-regulation and reflection, but it varies greatly between people and is not a single, infallible source of truth.

In this module, "inner voices" is a practical metaphor for recurring thoughts, emotions, memories, values, bodily signals and socialised expectations. It does not assume that everyone experiences literal voices, distinct inner characters or separate personalities. A voice's possible purpose—such as protection or reassurance—is a question to explore, not a fact to presume.

## Dilemma

## Before Continuing

- What changed when the concerns were labelled "resistance"?
- What other explanations could fit the same observations?
- Which inner voices or perspectives became quieter after the AI response?
- What evidence would distinguish concern, confusion, distrust, workload pressure and resistance?
- What action becomes more likely under each interpretation?

## Why Interior Council Matters

AI can enter our Interior Council quickly. Its voice is always available, responds directly to us and can sound informed, calm and complete. Once it supplies an interpretation, we may begin editing its language without noticing that it has defined the situation itself.

Our inner voices may carry influences such as:

- A remembered mentor or colleague.
- An organisational value or professional commitment.
- A fear of conflict, failure or loss of status.
- A desire to protect, please, control or avoid.
- An inherited story about competent leadership.
- An AI-generated interpretation that appears knowledgeable and complete.

These voices are not automatically right or wrong. Each may contain a warning, value or insight worth hearing. The discipline is to understand how a voice developed, what it is asking of us and whether following it would make us more effective, responsive, courageous and humane.

### Inner Dialogue and Mental Wellbeing

The inner voice can function as a compass: it can help us organise experience, rehearse action, regulate emotion and return to what matters. Yet a compass must be read with care. Repetitive negative thinking—such as persistent worry or rumination—is associated with anxiety, depression and emotional distress. The goal is therefore not to obey every thought or eliminate every difficult one, but to notice our patterns, relate to them with perspective and seek support when reflection becomes distressing or unmanageable.

Anxiety, relief, irritation, urgency or confidence can carry useful information, but none of them verifies an interpretation on its own.

### Self-Deception

We are capable of constructing convincing explanations for what protects our comfort, status or self-image. AI can strengthen that self-deception by supplying a polished rationale for the story we have already told. Interior Council asks not only, "Does this make sense?" but also, "What does believing this allow me to avoid, justify or ignore?"

### Conditioning, Inner Voices and Interior Dialogue

Inner voices are formed and reinforced over a lifetime. They may echo a mentor, family or cultural message, professional expectation, past success, painful experience, fear, value or aspiration. A familiar voice can feel like truth simply because we have heard it often. Interior dialogue creates enough space to recognise the conditioning without being governed by it.

1. Notice: What thoughts, emotions, bodily signals and memories are present?
2. Locate: Where do I feel urgency, ease, tension, relief or resistance in my response?
3. Separate: What is directly observed, and what is inferred?
4. Name influences: Which values, relationships, experiences, cultural messages or habits may be shaping the response?
5. De-centre: What alternative explanations and perspectives are available?
6. Test outwardly: What evidence, records and affected-person accounts could confirm or challenge the interpretation?
7. Use AI deliberately: Can AI expose assumptions or missing questions without deciding the issue?
8. Choose accountably: What will I do, who is responsible, and what value or reason guides the decision?
9. Review: What happened, what did I learn, and what would change my judgment next time?

## Working Definitions

**Inner voice** — A recurring thought pattern, self-talk style, memory, emotion, value or internalised social message—not necessarily a literal voice.

**Conditioning** — Learning through repeated experience, reinforcement, observation, language, relationships and social context.

**Schema** — A mental framework that guides attention, interpretation and expectation.

**Intuition** — A rapid judgment that may reflect expertise, pattern recognition, emotion or bias; consequential decisions require testing.

**Metacognition** — Thinking about your own thinking, including your assumptions, confidence and reasoning.

**Repetitive negative thinking** — Persistent worry or rumination that circles without producing useful resolution.

**AI dominance** — AI's framing or recommendation disproportionately determines attention, interpretation or choice.

## What It Is and What It Is Not

| What Interior Council Is | What Interior Council Is Not |
| --- | --- |
| Recognising the conditioned inner voices shaping thought | Treating every thought as equally wise |
| Choosing which influences to cultivate or challenge | Silencing anything uncomfortable |
| Taking intuition seriously enough to test it | Treating intuition as proof |
| Using interior dialogue to examine judgment | Living only within your own reflection |
| Keeping AI from becoming the dominant voice | Rejecting AI or outside expertise |
| Remaining responsible for the choice | Seeking a voice that will decide for you |

## Central Tension

Interior Council must be balanced with outward attention and timely action. Too little allows whichever voice is loudest, most reassuring or most authoritative to direct the response. Too much can turn inward reflection into a private chamber that excludes evidence, participation and decision.

### Underused

It becomes reactive, dominated by habitual or authoritative voices, unaware of self-deception and dependent on reassurance.

### Balanced

It is reflective, discerning, evidence-aware, open to correction and able to choose.

### Overused

It becomes self-absorbed, closed to participation, excessively doubtful and reluctant to act.

### Balanced Expression

I can listen to the inner voices within me without allowing any one voice—including AI—to determine my response.

## How Interior Council Shows Up

| Underused | Balanced | Overused |
| --- | --- | --- |
| Lets the loudest voice decide | Recognises several relevant inner voices | Sustains endless internal debate |
| Treats discomfort as a verdict | Examines what discomfort may signal | Analyses every feeling repeatedly |
| Allows AI to frame the whole situation | Keeps AI from becoming dominant | Rejects useful outside input |
| Seeks reassurance | Invites challenge and evaluates it | Keeps seeking another opinion |
| Cannot explain why a view changed | Names which influence mattered and why | Reopens decisions without new information |

## AI-Era Failure Modes

**AI as the Dominant Voice** — Allowing the model to frame the issue, quiet other inner voices and determine what should guide the decision.

**Adopted Framing** — Treating the model's description of a situation as your own conclusion without checking its assumptions.

**Reassurance Seeking** — Repeatedly asking AI for approval when the decision requires evidence, a conversation or a choice.

**Confirmation Seeking** — Describing a situation in ways that invite support for what you already want to believe.

**Self-Deception Reinforcement** — Using AI to elaborate a justification that protects your self-image or avoids responsibility.

**Borrowed Reasoning** — Repeating a generated rationale that you cannot explain or defend in your own words.

**Reflection Without Resolution** — Using more prompts to prolong deliberation after the next responsible step is clear.

## Applying Interior Council

A useful starting question is: "Which inner voices are influencing me at this moment?" These voices are patterns of thought, memory, feeling and meaning shaped through experience. They are not a diagnosis or a fixed description of personality.

**The Protector** — "We should avoid harm." Ask: What specific risk do I see, and what supports that concern?

**The Critic** — "This may not be good enough." Ask: Which standard is not being met?

**The Pleaser** — "I want everyone to approve." Ask: Am I avoiding a disagreement the work requires?

**The Expert** — "I should already know." Ask: What might I learn if I admitted uncertainty?

**The Avoider** — "Let the system handle this." Ask: Which conversation or responsibility am I reluctant to face?

### Understanding and Reshaping Learned Patterns

Your inner voices are not fixed, but deeply learned responses seldom change through insight alone. Change is often gradual, uneven and dependent on context. Repeated practice, new experiences, supportive relationships and feedback can help us respond differently, examine inherited assumptions and strengthen values-aligned habits. The test is not whether a voice is pleasant or agrees with you. Ask whether following it helps you grow, serve, preserve integrity and recognise the humanity of others.

### When AI Enters the Interior Dialogue

After recording your own view and identifying the inner voices already present, you might ask AI: "Identify assumptions in this interpretation, offer two plausible alternatives, and suggest evidence that would distinguish them. Do not infer people's motives as facts."

Treat its response as material to examine. Check important claims and speak with affected people. An imagined stakeholder perspective is not a substitute for that person's contribution. Use anonymised or authorised information when discussing a real situation.

### Why AI Can Become Dominant

AI dominance is not only a matter of personal psychology. System design can amplify it through fluent language, default recommendations, ranked options, confidence cues, limited alternatives and interfaces that make acceptance easier than investigation. Recording your thinking before consulting AI helps reduce premature anchoring.

## Recognition Activity: Which Voice Is Dominating?

## Apply the Recognition

Return to the opening dilemma. Complete this sentence in your own words:

"The inner voices shaping me are ______. The voice I am most drawn to says ______ because ______. Before deciding, I need to hear or test ______."

## Self-Assessment

Consider your AI-supported work over the past month. Rate each statement from 1 to 5: 1 = almost never; 2 = rarely; 3 = sometimes; 4 = often; 5 = almost always. If you have no relevant experience, leave the item unrated.

1. I can identify the inner voices, memories or values influencing a meaningful decision.
2. I notice when relief, anxiety, status or a wish for approval makes one voice especially persuasive.
3. I distinguish what I have observed from the story an inner voice or AI has constructed.
4. I allow an inner voice or AI-generated interpretation to guide me without testing it against relevant evidence or affected people's perspectives. **Reverse-scored**

## Personal Focus

- Which response can you support with a recent example?
- Which inner voice or learned pattern would you like to strengthen, question or reshape?
- What would observable improvement look like?

## Knowledge Check

## Practice Exercise — Conduct the Interior Dialogue

### Psychological Safety

This educational exercise is not therapy and is not intended to investigate trauma or diagnose mental-health conditions. You may skip personal examples, use a fictional or work-based case, and stop if the exercise becomes distressing. No participant should be pressured to disclose personal conditioning, family experiences or trauma. If you experience voices as external, commanding or distressing, seek appropriate professional support rather than relying on this module.

Choose an upcoming decision or facilitation challenge where AI could contribute. Use a manageable situation and protect confidential information. Keep your initial notes unchanged so that you can compare them with your later judgment.

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

- Which people, memories, values, images, stories or habitual voices are influencing me?
- What is each inner voice saying or protecting?
- Which voice is loudest? Which important voice is quiet or absent?
- How might experience, a mentor, culture or past conditioning have shaped each voice?
- Which voice might be helping me justify what is easiest or most flattering?
- Which voice makes me more courageous, responsive and humane?

### Part 3 — Introduce AI as Another Voice

Ask AI to identify assumptions, offer competing interpretations, separate facts from inferences, name missing evidence, suggest questions for affected people and state uncertainty or possible failure modes. Avoid beginning with prompts such as "What should I do?", "How do I overcome their resistance?", "Confirm that I am right" or "Decide which option is best."

Then identify:

- What useful consideration did AI add?
- What did it assume or claim without adequate support?
- Where did its response reflect the framing I supplied?
- Did AI amplify an existing inner voice, introduce a new influence or crowd out other voices?
- Which suggestion feels attractive, and for what reason?
- Did the interface, ranking or confidence of the response make acceptance feel easier than investigation?

### Part 4 — Choose Deliberately

- Check one important claim against a relevant record, source or observation.
- Seek an affected person's perspective where appropriate; do not replace it with a generated account.
- State which inner voices you will heed, question or decline, with reasons.
- Choose the next action, who remains responsible and when it will happen.
- Record your final confidence and uncertainty. Identify what would prompt a review.

Practice evidence: retain your initial view, your inner-voice map, the AI contribution, the check you completed and your final decision.

## Evidence Reflection

- Which inner voices were present before consulting AI?
- Which voice was loudest, and which important voice was quiet or absent?
- What experiences, mentors or conditioning may have shaped those voices?
- How did your prompt influence the voice AI introduced?
- Did AI take, or did you give it, more authority than the inner voices already present?
- What changed in your judgment, and what specifically justified the change?
- Which claim or assumption did you test? What did you find?
- What did another person contribute that AI could not establish on their behalf?
- Which inner voice or value did you ultimately choose to follow, and what did that choice ask you to become?
- What happened after you acted, or when will you review the result?

### Return to the Dilemma

The facilitator can recognise that AI has become dominant, restore the quieter inner voices shaped by values, experience and remembered guidance, attend to the team and evidence, and then choose the intervention. Neither the AI's account nor the facilitator's first impression is automatically authoritative.

### My Practice Commitment

"Before my next AI-assisted decision about ______, I will listen for ______, use AI to ______ and retain responsibility for ______."

## Selected Evidence

The psychological framing in this module draws on the following research and evidence reviews:

- Alderson-Day, B., & Fernyhough, C. (2015). Inner speech: Development, cognitive functions, phenomenology, and neurobiology. Psychological Bulletin, 141(5), 931–965. https://doi.org/10.1037/bul0000021
- Moser, J. S., et al. (2017). Third-person self-talk facilitates emotion regulation without engaging cognitive control. Scientific Reports, 7, 4519. https://doi.org/10.1038/s41598-017-04047-3
- Watkins, E. R., & Roberts, H. (2020). Reflecting on rumination: Consequences, causes, mechanisms and treatment of rumination. Behaviour Research and Therapy, 127, 103573. https://doi.org/10.1016/j.brat.2020.103573
- National Academies of Sciences, Engineering, and Medicine. (2022). Human-AI Teaming: State-of-the-Art and Research Needs. Chapter 8: Identification and Mitigation of Bias in Human-AI Teams. https://doi.org/10.17226/26355
- Schertz, K. E., et al. (2025). The frequency, form, and function of self-talk in everyday life. Scientific Reports. https://doi.org/10.1038/s41598-025-22647-2

## Closing Statement

AI may enter the interior dialogue, but it must not become the dominant voice. The responsibility to choose which voices shape our actions remains human.

**Mark Completed:** Complete the recognition activity, self-assessment, five knowledge-check questions, practice exercise and evidence reflection. Completion records participation in the module; it does not certify mastery. If the outcome of your action is not yet available, record when you will review it.
$ic$
where id = $id$b2000000-0000-4000-8000-000000000004$id$;

-- ---------------------------------------------------------------------------
-- 2. Dilemma — NEW SHAPE: options[].feedback (per-option paragraph).
--    scores C=4 (most effective), B=3, D=2, A=1 (least effective).
--    `explanation` keeps the C paragraph as the shared fallback so the row
--    still renders correctly on the pre-Phase-3 FeedbackBlock.
-- ---------------------------------------------------------------------------
insert into scenarios (id, discipline_id, prompt_md, rubric_md, kind, options, correct_key, explanation) values
  (
    $id$c3000000-0000-4000-8000-000000000026$id$,
    $id$b2000000-0000-4000-8000-000000000004$id$,
    $md$You are facilitating a team whose members have raised concerns about a proposed AI-supported work allocation process. Before asking for advice, you suspect that responsibilities are unclear and that some concerns have not been heard.

You ask AI how to respond to the concerns raised by team members. AI describes the team as "resistant" and produces a confident plan for overcoming reluctance and securing commitment. The plan sounds professional, and you feel relieved: you now have a clear way forward.

As you prepare the next meeting, you notice that the AI's voice now dominates your thinking. Your initial concern, the employees' own accounts and the guidance of a respected former mentor have become quieter. What should you do?$md$,
    '',
    $s$dilemma$s$,
    $json$[
      {
        "key": "A",
        "text": "Use the plan because AI offers the clearest and most complete advice.",
        "score": 1,
        "feedback": "This accepts fluency and completeness as authority. It leaves the AI-generated framing untested and excludes the team's perspective, the facilitator's other inner voices and accountable human judgment."
      },
      {
        "key": "B",
        "text": "Remove AI from the process and rely entirely on your first impression.",
        "score": 3,
        "feedback": "This reclaims responsibility from AI and returns attention to your original concern. However, relying entirely on a first impression replaces one dominant voice with another and does not test your interpretation against evidence or the team's experience."
      },
      {
        "key": "C",
        "text": "Pause for interior dialogue: identify the inner voices shaping you, consider how they were conditioned and what each is serving, compare their messages with evidence and the team's perspective, and then decide.",
        "score": 4,
        "feedback": "This restores the quieter inner voices and relevant evidence to the conversation while preserving your responsibility to choose. Neither your first interpretation nor the generated framing is automatically authoritative."
      },
      {
        "key": "D",
        "text": "Ask AI to evaluate the other voices and choose which one should guide you.",
        "score": 2,
        "feedback": "This acknowledges that other inner voices exist, but it gives AI the authority to judge them and make the choice. AI remains the dominant voice rather than a contribution to human reflection."
      }
    ]$json$::jsonb,
    $s$C$s$,
    $s$This restores the quieter inner voices and relevant evidence to the conversation while preserving your responsibility to choose. Neither your first interpretation nor the generated framing is automatically authoritative.$s$
  );

-- ---------------------------------------------------------------------------
-- 3. Recognition — NEW KIND: 'classification'.
--    Four independent statements; B and D are BOTH "Balanced", so there is no
--    single correct_key (left null). Per-statement correct label + feedback
--    live on options[]. rubric_md carries the allowed labels as JSON.
--    No `score` on these options — this is not the 4/3/2/1 dilemma formula.
--    Gating unchanged: sidebar "Today's Goal" only, NOT a completion gate.
-- ---------------------------------------------------------------------------
insert into scenarios (id, discipline_id, prompt_md, rubric_md, kind, options, correct_key, explanation) values
  (
    $id$c3000000-0000-4000-8000-000000000027$id$,
    $id$b2000000-0000-4000-8000-000000000004$id$,
    $md$**Recognition activity — Which voice is dominating?**

Classify each statement as Balanced, Underused or Overused Interior Council. Identify which inner voice is exerting the greatest influence before reading the feedback.$md$,
    $json$["Underused", "Balanced", "Overused"]$json$,
    $s$classification$s$,
    $json$[
      {
        "key": "A",
        "text": "\"AI calls the team defensive, so I will use its plan.\"",
        "classification": "Underused",
        "feedback": "AI's account is accepted without checking observations or hearing the team."
      },
      {
        "key": "B",
        "text": "\"My wish for reassurance is one voice. Fairness asks me to hear the team and check the evidence before deciding.\"",
        "classification": "Balanced",
        "feedback": "The learner tests the different voices and retains responsibility for the choice."
      },
      {
        "key": "C",
        "text": "\"We have enough for a small trial, but I want more prompts until I feel completely certain.\"",
        "classification": "Overused",
        "feedback": "Interior dialogue is postponing proportionate action."
      },
      {
        "key": "D",
        "text": "\"AI challenged my view. I checked the records, recalled a mentor's question and now agree with its suggestion.\"",
        "classification": "Balanced",
        "feedback": "Agreement follows interior dialogue, evidence and accountable choice."
      }
    ]$json$::jsonb,
    null,
    $s$$s$
  );

-- ---------------------------------------------------------------------------
-- 4. Knowledge Check — 5 questions, standard existing shape.
--    score 1 = correct, 0 = incorrect. computeKnowledgeScore uses
--    checks.length, so this module scores out of 5 automatically.
-- ---------------------------------------------------------------------------
insert into scenarios (id, discipline_id, prompt_md, rubric_md, kind, options, correct_key, explanation) values
  (
    $id$c3000000-0000-4000-8000-000000000028$id$,
    $id$b2000000-0000-4000-8000-000000000004$id$,
    $md$AI repeats your label "the team is defensive" and recommends a campaign. What best reduces framing and anchoring?$md$,
    '',
    $s$knowledge_check$s$,
    $json$[{"key":"A","text":"Make the campaign more persuasive.","score":0},{"key":"B","text":"Ask another model whether the label is right.","score":0},{"key":"C","text":"Restate neutral observations, develop alternatives and speak with the team.","score":1},{"key":"D","text":"Wait until the pilot begins.","score":0}]$json$::jsonb,
    $s$C$s$,
    $s$Neutral observations, alternative explanations and the team's own accounts loosen the original label and provide evidence for a better judgment.$s$
  ),
  (
    $id$c3000000-0000-4000-8000-000000000029$id$,
    $id$b2000000-0000-4000-8000-000000000004$id$,
    $md$Which statement about inner voices is most accurate here?$md$,
    '',
    $s$knowledge_check$s$,
    $json$[{"key":"A","text":"Everyone experiences distinct internal characters.","score":0},{"key":"B","text":"A strong inner voice is reliable evidence.","score":0},{"key":"C","text":"They are a metaphor for varied thoughts, emotions, memories, values, bodily signals and internalised influences.","score":1},{"key":"D","text":"Every recurring thought has one stable cause.","score":0}]$json$::jsonb,
    $s$C$s$,
    $s$The term is a reflective metaphor broad enough to include non-verbal experience. It is not a claim that everyone hears literal voices or has separate inner characters.$s$
  ),
  (
    $id$c3000000-0000-4000-8000-000000000030$id$,
    $id$b2000000-0000-4000-8000-000000000004$id$,
    $md$An AI recommendation makes you feel relieved. What is the most useful next step?$md$,
    '',
    $s$knowledge_check$s$,
    $json$[{"key":"A","text":"Notice the relief, investigate what it may signal and test the recommendation.","score":1},{"key":"B","text":"Accept it because relief indicates a good fit.","score":0},{"key":"C","text":"Reject it because emotions are unreliable.","score":0},{"key":"D","text":"Ask AI to confirm the feeling.","score":0}]$json$::jsonb,
    $s$A$s$,
    $s$Relief may reflect insight, cognitive ease, reassurance or avoidance. It is information to examine, not verification.$s$
  ),
  (
    $id$c3000000-0000-4000-8000-000000000031$id$,
    $id$b2000000-0000-4000-8000-000000000004$id$,
    $md$When should direct human engagement come before AI analysis?$md$,
    '',
    $s$knowledge_check$s$,
    $json$[{"key":"A","text":"When confidentiality, relational harm or affected people's own accounts are central.","score":1},{"key":"B","text":"Whenever the facilitator feels uncertain.","score":0},{"key":"C","text":"Only when AI refuses to answer.","score":0},{"key":"D","text":"Never; anonymisation removes every concern.","score":0}]$json$::jsonb,
    $s$A$s$,
    $s$AI cannot replace consent, relationship repair or the testimony of affected people. Confidential and high-stakes contexts may also limit whether AI should be used at all.$s$
  ),
  (
    $id$c3000000-0000-4000-8000-000000000032$id$,
    $id$b2000000-0000-4000-8000-000000000004$id$,
    $md$You accept an AI recommendation. What best shows AI did not dominate?$md$,
    '',
    $s$knowledge_check$s$,
    $json$[{"key":"A","text":"Several models agreed.","score":0},{"key":"B","text":"You examined its reasoning, heard the existing inner voices, checked evidence and can explain the choice.","score":1},{"key":"C","text":"You kept part of your original idea.","score":0},{"key":"D","text":"You rewrote the output in your own tone.","score":0}]$json$::jsonb,
    $s$B$s$,
    $s$Human responsibility does not require disagreeing with AI. It requires examination, reasons and retained accountability.$s$
  );

-- ---------------------------------------------------------------------------
-- 5. NOT DELETING c3000000-0000-4000-8000-000000000022.
--    Pre-flight check found it is Intentionality's 5th knowledge_check with 4
--    referencing progress rows (3 completed). The old Interior Dialogue
--    preview_scenario no longer exists as a separate row, so there is nothing
--    to clean up on b2000000-...-000004.
-- ---------------------------------------------------------------------------

commit;

-- ---------------------------------------------------------------------------
-- Post-run verification (read-only; run after commit)
-- ---------------------------------------------------------------------------
-- select slug, title, is_full_module, sort_order, central_question
-- from disciplines where id = 'b2000000-0000-4000-8000-000000000004';
--
-- select right(id::text, 6) as id_tail, kind, correct_key
-- from scenarios where discipline_id = 'b2000000-0000-4000-8000-000000000004'
-- order by id;
-- -- expect: 000026 dilemma C, 000027 classification (null), 000028-000032 knowledge_check
--
-- select d.slug, count(*) as kc_count
-- from scenarios s join disciplines d on d.id = s.discipline_id
-- where s.kind = 'knowledge_check' group by d.slug order by d.slug;
-- -- expect: detachment 5, intentionality 5, interior-council 5, sense-of-wonder 5
--
-- select jsonb_array_length(options) as opts,
--        (select count(*) from jsonb_array_elements(options) o
--          where o ? 'feedback') as with_feedback
-- from scenarios where id = 'c3000000-0000-4000-8000-000000000026';
-- -- expect: opts 4, with_feedback 4
