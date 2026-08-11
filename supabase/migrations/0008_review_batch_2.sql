-- 0008_review_batch_2.sql
-- REVIEW ONLY — do not auto-execute. Wait for explicit confirmation after manual run.
--
-- Changes:
-- 1) Sense of Wonder recognition: correct_key B→D, prompt wording, options aligned to
--    TEF_updated_sense_of_wonder.md (option B text + scores), explanation rewritten for D.
-- 2) Sense of Wonder content_md from _derived_sense_of_wonder_content.md:
--    - Balanced Expression under Central Tension
--    - AI-Era Failure Modes intro sentence
--    - Wonder and Creativity section NOT changed (source docx not available in repo)
-- 3) Knowledge Check Q4 option C text.

update disciplines
set content_md = $sow$
## Introduction

**Seeing what is not there**

## Foundation

Sense of Wonder begins with the willingness to notice before categorising, explaining or deciding. It allows familiar assumptions about a person, group, problem or situation to be interrupted by curiosity. Instead of asking only, "What is this?", it creates space to ask, "What else might be possible here?" This openness supports creativity, learning and the ability to perceive possibilities that existing experience may not reveal.

## AI-Era Definition

Sense of Wonder is the capacity to remain curious, receptive and imaginatively alive in the presence of uncertainty, so that possibilities can be perceived before they are reduced to familiar categories, inherited assumptions or machine-generated patterns.

## Dilemma

## Why It Matters

AI can provide an answer before the question is fully experienced. A polished output may create premature completion.

Once the complete proposal is seen, you may begin:

- Editing the AI's idea
- Improving its framing
- Selecting among its options
- Defending its assumptions

The imaginative field has already narrowed.

The risk is not simply that AI will produce creative work. The deeper risk is that people may stop practising the conditions from which creativity grows:

- Attention
- Curiosity
- Ambiguity
- Incubation
- Independent perception
- Play
- Surprise
- Courage to explore what is not yet validated

## Wonder and Creativity

Creativity does not begin with production.

It begins with:

1. Openness
2. Attention
3. Curiosity
4. Imagination
5. Courage
6. Expression

AI is highly capable at expression and variation.

Human creativity, however, also requires:

- Sensing what is missing
- Asking a question no one has framed
- Recognising meaning
- Connecting lived experience
- Imagining a future not contained in past data
- Deciding what deserves to be created

## What It Is and What It Is Not

### What Sense of Wonder Is

- Remaining open before concluding
- Seeing possibility beyond precedent
- Allowing surprise
- Protecting incubation
- Questioning inherited categories
- Imagining what does not yet exist
- Recognising human potential beyond prediction
- Exploring before optimising

### What Sense of Wonder Is Not

- Accepting every new idea
- Rejecting evidence
- Romanticising novelty
- Avoiding practical constraints
- Remaining permanently undecided
- Treating surprise as proof
- Generating endlessly without choosing
- Assuming imagination removes responsibility

## Central Tension

Wonder must be balanced with discernment and action.

### Underused

It becomes:

- Closed
- Overly certain
- Dependent on precedent
- Anchored by first answers
- Dismissive of incomplete ideas

### Balanced

It is:

- Open
- Curious
- Discerning
- Willing to incubate
- Capable of choosing and developing

### Overused

It becomes:

- Endlessly exploratory
- Novelty-seeking
- Unwilling to commit
- Detached from feasibility
- Inspired but inactive

### Balanced Expression

I can remain open to what is possible without needing to pursue every possibility.

## How Sense of Wonder Shows Up

| Underused | Balanced | Overused |
| --- | --- | --- |
| Accepts first plausible answer | Explores several frames | Generates endlessly |
| Automates existing assumptions | Reimagines the underlying purpose | Rejects useful structure |
| Treats prediction as destiny | Sees patterns and possibilities | Ignores evidence |
| Demands immediate usefulness | Protects incubation | Avoids decisions |
| Uses AI before forming ideas | Uses AI to expand thought | Chases novelty |

## AI-Era Failure Modes

AI-era failure modes are recurring patterns of behaviour that can weaken judgment, participation or decision-making when people work with AI. They are not fixed personal traits, but tendencies to recognise and manage through deliberate practice.

**Premature Completion**

Receiving a polished answer before the question has matured.

**Anchoring**

Allowing the first generated framing to determine all later thought.

**Historical Capture**

Assuming the future must resemble available data.

**Template Dependency**

Beginning with examples rather than observation.

**Creative Displacement**

Allowing AI to produce the initial idea, direction and meaning.

**Prediction as Identity**

Treating a person or group as equivalent to a model's category or forecast.

**Productivity Confusion**

Assuming more outputs mean more creativity.

## Applying Sense of Wonder

AI systems generate possibilities from patterns learnt from existing data and the context they are given. They can combine, vary and extend those patterns in remarkable ways.

Human imagination has another responsibility: to question the frame itself, recognise what is absent, assign meaning and commit to possibilities that existing patterns may not make obvious.

Human imagination can commit to what is not yet likely.

This matters when organisations transform services.

Without Sense of Wonder, an organisation may:

- Digitise the form
- Automate the rejection
- Accelerate the transaction
- Reproduce historical categories
- Measure success through speed and cost

With Sense of Wonder, it may ask:

- Why does this form exist?
- What need is the person actually trying to meet?
- What categories exclude people?
- What would access look like if the current process did not exist?
- Where does human judgment create value?
- What possibility is absent from the historical records?
- What should be created rather than automated?

Wonder does not reject current reality.

It holds two truths:

We must see reality accurately. Reality is not finished.

## Recognition Activity: Automation or Imagination?

## Self-Assessment

Rate from 1 to 5.

1. I form my own ideas before asking AI for examples.
2. I can remain with a question without demanding immediate completion.
3. I notice when an answer has narrowed my imagination.
4. I consider possibilities not represented in historical data.
5. I draw on lived experience when creating.
6. I allow incomplete ideas time to develop.
7. I assume the most polished idea is probably the strongest. **Reverse-scored**
8. I sometimes remain in possibility so long that I avoid choosing. **Overuse indicator**

## Knowledge Check

## Practice Exercise

Choose a corporate or government process being considered for AI.

Complete:

**Existing model**

- What does the process currently do?
- What assumptions does it preserve?
- What does it measure?
- Who benefits?
- Who struggles?

**AI proposal**

- What does AI improve?
- What does it reproduce?
- What does it ignore?
- What appears complete but remains unexamined?

**Imaginative redesign**

- What is the real human need?
- What would the service look like if designed today?
- What role should participation play?
- What possibilities are absent from the data?
- What should remain human?
- What should be created rather than automated?

## Evidence Reflection

- What was your first idea?
- How did AI affect it?
- What assumption became visible?
- What possibility emerged that was not in the original process?
- Did you protect enough time for independent thought?
- What did you eventually choose?
- How will you preserve imagination in future AI-assisted work?

## Closing Statement

AI may expand what can be generated. Sense of Wonder preserves our capacity to imagine.

$sow$
where id = 'b2000000-0000-4000-8000-000000000005';

update scenarios
set
  prompt_md = $p$
**Recognition activity — Automation or imagination?**

Classify each project question, then select which question best expresses imagination-focused Sense of Wonder?
$p$,
  options = $j$[{"key":"A","text":"How can we move the existing approval process online?","score":0},{"key":"B","text":"How can we automate the routing and status updates for each application??","score":0},{"key":"C","text":"How can AI reject incomplete applications faster?","score":0},{"key":"D","text":"How might the service help applicants provide what is needed before rejection occurs?","score":1}]$j$::jsonb,
  correct_key = 'D',
  explanation = $e$D reframes the problem around helping applicants succeed before rejection — imagination-focused Sense of Wonder — rather than automating or accelerating the existing process.$e$
where id = 'c3000000-0000-4000-8000-000000000015';

-- Knowledge Check Q4: "Wonder becomes distorted when" — option C wording
update scenarios
set options = (
  select jsonb_agg(
    case
      when elem->>'key' = 'C' then jsonb_set(
        elem,
        '{text}',
        to_jsonb('You generate endlessly but refuse to choose.'::text)
      )
      else elem
    end
    order by ord
  )
  from jsonb_array_elements(options) with ordinality as t(elem, ord)
)
where id = 'c3000000-0000-4000-8000-000000000019';
