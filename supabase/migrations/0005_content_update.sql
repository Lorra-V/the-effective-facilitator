-- Phase C3 content reconciliation — DIFF-AND-REPLACE (not a fresh seed).
-- Source: docs/curriculum/TEF_developmental_paths.md,
--         TEF_updated_detachment.md, TEF_updated_intentionality.md,
--         TEF_updated_sense_of_wonder.md
-- Run manually in the Supabase SQL Editor AFTER 0004_seed_curriculum.sql.
-- Do NOT touch scenarios.options / correct_key / scores.
--
-- FLAGGED:
--   1) paths had no description column — this migration ADDS paths.description.
--   2) Closing Statement bodies were empty in TEF_updated_*.md (pandoc truncation).
--      Restored prior Phase A2 closing lines for the three full modules so the
--      Closing Question box is not blank. Confirm or replace if new closings arrive.
--   3) Sense of Wonder includes extra section "Wonder and Creativity" (in source
--      between Why It Matters and What It Is and What It Is Not) — kept.
--   4) Global rename "Behavioural Continuum" → "How [Discipline] Shows Up" is
--      covered by full content_md replacement for Detachment, Intentionality,
--      and Sense of Wonder (only disciplines that had that heading in 0004).
--   5) Welcome and Introduction is a static route (/paths/welcome), not a DB row.
--   6) Path title theme for Regarding Life: "intervention" → "Action" per TEF.

begin;

-- ---------------------------------------------------------------------------
-- Schema: path descriptions (verbatim TEF_developmental_paths.md bodies)
-- ---------------------------------------------------------------------------
alter table paths add column if not exists description text not null default '';

update paths
set
  title = $t$Regarding Others — Authority, Participation and Ownership$t$,
  description = $d1$The **Regarding Others** path explores how we influence people without taking away their agency. It holds the tension between **Detachment**—releasing the need to control the answer, receive recognition or prove ourselves right—and **Engagement**—caring enough to remain responsible and involved. **Focus** provides the balance: staying committed to the purpose while allowing others to contribute to, shape and own the outcome.

In AI-supported work, this path helps us decide when to offer direction, when to challenge an output, when to step back and when participation matters more than producing the fastest or most technically impressive answer. It asks:

**How do I use intelligence and influence without taking control away from others?**
$d1$
where slug = 'regarding-others';

update paths
set
  title = $t$Regarding Myself — Agency, Imagination and Intention$t$,
  description = $d2$The **Regarding Myself** path concerns our ability to remain the authors of our own thinking and choices. **Interior Dialogue** helps us recognise and examine the different voices, assumptions, emotions and motives influencing us. **Intentionality** enables us to clarify what we are trying to accomplish, why it matters and what responsibility must remain ours. **Sense of Wonder** preserves our openness to inspiration, possibility and ideas that have not yet been formed.

In an era when AI can generate answers before we have fully explored the question, this path protects independent judgment and creative agency. It helps us use AI to extend our thinking without allowing its fluency, speed or apparent certainty to replace the inner work of discernment and imagination. It asks:

**How do I remain the author of my choices when systems can think and generate for me?**
$d2$
where slug = 'regarding-myself';

update paths
set
  title = $t$Regarding Life — Perception, Uncertainty and Action$t$,
  description = $d3$The **Regarding Life** path explores how we respond to situations that are complex, changing and never fully known. **Awareness** helps us notice what is happening within ourselves, between people and across the wider context. **Action** develops our capacity to intervene with courage, judgment and appropriate force. **Presence** brings these together, allowing us to remain attentive to reality while responding deliberately rather than automatically.

In AI-mediated environments, information may be abundant while certainty remains limited. This path strengthens our ability to see beyond a complete-looking output, remain attentive to what data may miss and act responsibly without pretending that every uncertainty has been resolved. It asks:

**How do I respond wisely when information is abundant but certainty is not?**
$d3$
where slug = 'regarding-life';

-- ---------------------------------------------------------------------------
-- Full-module content_md re-derive (structure + wording only)
-- IDs from 0004_seed_curriculum.sql
-- ---------------------------------------------------------------------------
update disciplines
set content_md = $md_detach$## Introduction

**Releasing attachment without abandoning responsibility**

## Foundation

Detachment requires the facilitator to remain neutral and to separate responsibility for the process from responsibility for the group's decisions. It means being able to support an outcome even when it is not the one you would personally choose, while remaining fair and consistent with people regardless of personal preference. It also requires letting go of the need for status, recognition or credit, keeping the focus on the group and its work rather than on oneself.

## AI-Era Definition

Detachment is the ability to evaluate AI-generated outputs, proposed solutions and one's own interpretations objectively, without allowing ego, prior investment, status, personal preference or the need to be right to distort judgment.

Detachment does not mean indifference or lack of responsibility. It means being willing to question your own assumptions, change your position when the evidence warrants it, and let go of a preferred answer when a better one emerges.

## Dilemma

## Why It Matters

AI outputs can create attachment quickly.

You may become attached because:

- You've invested time in the prompt
- The output sounds impressive
- It supports an existing belief
- It strengthens your status
- You have already presented it publicly
- Abandoning it feels like admitting failure

In each case, attachment can shift our focus from evaluating the quality of an answer to defending our investment in it.

Detachment protects the ability to say:

- This is useful, but incomplete.
- This was my idea, but it is not the best option.
- The group may need to own this decision.
- The model's confidence is not evidence.
- I can change direction without losing credibility.

## What It Is and What It Is Not

### What Detachment Is

- Releasing the need to be right
- Separating evaluation from ego
- Recognising AI as an input rather than an authority
- Allowing people to influence decisions that affect them
- Letting go of sunk costs
- Remaining fair toward opposing perspectives
- Supporting learning rather than imposing correction

### What Detachment Is Not

- Lack of care
- Avoiding accountability
- Refusing to recommend a course of action
- Treating every option as equally valid
- Allowing harmful decisions to proceed unchallenged
- Disengaging when disagreement appears
- Pretending not to have values

## Central Tension

Detachment is balanced by Engagement.

### Without Detachment

I may:

- control
- defend
- impose
- personalise disagreement
- use AI to strengthen authority

### Without Engagement

I may:

- withdraw
- refuse responsibility
- avoid difficult intervention
- claim neutrality when action is required

## How Detachment Shows Up

| Underused | Balanced | Overused |
| --- | --- | --- |
| Defends preferred answers | Evaluates evidence and ownership | Withdraws from responsibility |
| Confuses disagreement with resistance | Supports constructive challenge | Treats all outcomes as equivalent |
| Uses AI to reinforce authority | Treats AI as one input | Avoids making recommendations |
| Needs credit for the solution | Allows shared ownership | Becomes indifferent to impact |
| Corrects people prematurely | Allows learning and participation | Fails to intervene when harm is likely |

## AI-Era Failure Modes

**Automation Bias**

Accepting AI output because it appears authoritative.

**Prompt Ownership**

Treating the generated answer as personal intellectual property because you created the prompt.

**Sunk-Cost Attachment**

Continuing with a weak solution because of time already invested.

**Fluency Capture**

Confusing polished expression with sound reasoning.

**Status Defence**

Resisting correction because the output has already been presented to leaders.

**Artificial Consensus**

Using numerous generated arguments to overwhelm dissent.

## Applying Detachment

AI can produce outputs that are polished, persuasive and apparently complete. That apparent completeness can encourage premature confidence and make it harder to notice what is missing, challenge our own assumptions or release a solution in which we have become invested.

The effective facilitator asks:

- What evidence supports this?
- What evidence challenges it?
- What is missing?
- Who is affected?
- Who should own the decision?
- Am I protecting the solution, or serving the purpose?
- Would I judge this differently if someone else had generated it?

Detachment becomes especially important when the technically best decision and the decision people can understand, influence and own are not the same.

A technically superior decision may fail if:

- Affected people do not understand it
- Employees cannot implement it
- The process damages trust
- Local knowledge was excluded
- People have no meaningful route to challenge it

Detachment creates enough distance to ask what the situation actually requires, rather than automatically defending, correcting or abandoning a preferred answer.

The facilitator may need to:

- Correct something that is demonstrably wrong
- Invite wider participation before proceeding
- Test an idea rather than accept or reject it prematurely
- Remain open to learning and revising their own view
- Release an approach that no longer serves the group or the evidence

The discipline lies not in choosing the "right" response from a list, but in being sufficiently unattached to recognise what the circumstances require.

## Recognition Activity 1: Output or Authority?

## Recognition Activity 2: The Ownership Question

## Self-Assessment

Rate from 1 to 5.

1. I can discard an AI-generated answer after investing time refining it.
2. I remain constructive when others reject my preferred solution.
3. I separate the quality of an idea from who created it.
4. I can recognise when my need to appear capable is influencing a decision.
5. I allow affected people to shape decisions that concern them.
6. I can challenge an AI output that supports my existing view.
7. I sometimes continue defending an answer because I have already presented it publicly. **Reverse-scored**
8. When I disagree with a group, I may withdraw rather than continue supporting the process. **Distortion indicator**

## Knowledge Check

## Practice Exercise — Release the Answer

Choose a real AI-assisted decision or proposal.

### Part 1 — My Preferred Answer

Record:

- What do I currently believe should happen?
- How much time have I invested?
- What have I already communicated to others?
- What personal need may be attached to this answer?

### Part 2 — Strongest Challenge

Identify:

- Three assumptions
- Two missing perspectives
- One reason the answer may fail
- One reason another person may reasonably disagree
- One condition under which you would abandon it

### Part 3 — Ownership

Ask:

- Who is affected?
- Who should contribute?
- Who should decide?
- Who remains accountable?
- When might ownership matter more than apparent optimisation?

## Evidence Reflection

- What did you initially want to happen?
- What attachment did you recognise?
- What changed after considering other perspectives?
- What decision was made?
- What evidence influenced you?
- Did you remain engaged after releasing your preferred outcome?
- What will you practise next?

## Closing Statement

Detachment allows us to use powerful outputs without becoming controlled by them.
$md_detach$
where slug = 'detachment';

update disciplines
set content_md = $md_intent$## Introduction

**Choosing what the technology is for**

## Foundation

Intentionality brings focused attention to purpose. It requires humility about our motives and limitations, empathy for those affected, deliberate preparation and continuing alignment between our actions and the outcome we are trying to achieve. Its foundational questions are: "What am I doing and why?" and "What is the group doing---and toward what end?"

## AI-Era Definition

Intentionality is the capacity to clarify the purpose, values and human responsibility governing AI use before selecting a tool, generating an output or automating a process.

Intentionality prevents the tool from defining the task.

## Dilemma

## Why It Matters

AI encourages action before purpose is clear.

You may begin with:

- Which tool should we use?
- What can we automate?
- What can the model produce?
- How quickly can we launch?

The discipline of Intentionality begins earlier:

- What are we trying to achieve?
- Why does it matter?
- Who should benefit?
- What values must be protected?
- What must remain human?
- What should not be done simply because it is possible?

Without Intentionality, convenience can silently become the objective.

## What It Is and What It Is Not

### What Intentionality Is

- Clarifying purpose
- Naming motives
- Aligning means and ends
- Identifying values and responsibilities
- Determining appropriate boundaries
- Preparing deliberately
- Recognising hidden agendas
- Choosing AI rather than defaulting to it

### What Intentionality Is Not

- Controlling every outcome
- Refusing flexibility
- Assuming good intentions guarantee good impact
- Using purpose statements as public relations
- Treating technology as neutral
- Demanding certainty before beginning
- Generating endlessly without choosing
- Believing intention excuses harmful consequences

## Central Tension

Intentionality provides direction, but it must remain responsive to evidence, feedback and changing conditions. Too little Intentionality allows the tool or circumstances to determine the direction; too much turns purpose into rigidity.

These three states become visible in the choices people make before and during AI-supported work.

### Underused

It becomes:

- Reactive
- Tool-led
- Unclear
- Convenience-driven
- Easily distracted

### Balanced

It is:

- Purposeful
- Ethically aware
- Adaptive
- Explicit about responsibility

### Overused

It becomes:

- Rigid
- Controlling
- Unable to revise
- Attached to an idealised outcome
- Dismissive of emergence

## How Intentionality Shows Up

| Underused | Balanced | Overused |
| --- | --- | --- |
| Selects tools before defining outcomes | Clarifies purpose first | Forces all activity into a fixed plan |
| Automates because it is possible | Determines what should be automated | Resists adaptation |
| Allows convenience to become the goal | Aligns means, values and outcomes | Treats intention as more important than impact |
| Avoids examining motives | Names competing motives | Assumes motives are pure |
| Leaves responsibility unclear | Assigns human accountability | Centralises excessive control |

## AI-Era Failure Modes

**Tool-First Thinking**

Beginning with the technology rather than the human problem.

**Purpose Drift**

A project begins with one goal and gradually serves another.

**Efficiency Substitution**

Speed or cost becomes the measure of success even when the original aim was access, fairness or quality.

**Responsibility Laundering**

AI is used to create distance from a difficult decision.

**Avoidance Automation**

A task is automated because a person does not want to perform the human responsibility involved.

**Capability Seduction**

The organisation does something because AI makes it possible, not because it should be done.

## Applying Intentionality

Clarifying purpose involves more than accepting the first objective stated. It requires examining what the project is actually being designed to accomplish.

For example:

**Stated Purpose**

Improve access to public services.

**Possible Operative Purpose**

Reduce cost by reducing staff interaction.

These purposes may coexist, but they are not identical.

The effective facilitator names competing motives rather than hiding them.

A responsible AI project should clarify:

- Intended outcome
- Affected people
- Public or organisational value
- Unacceptable consequences
- Human accountability
- Non-delegable decisions
- Indicators of success

The most important question is not simply, "What can AI do?" It is, "What are we responsible for doing well---and what role, if any, should AI play in helping us do it?"

## Recognition Activity: What Is the Real Purpose?

## Self-Assessment

Rate from 1 to 5.

1. I define the human outcome before selecting an AI tool.
2. I can clearly explain why AI is appropriate for a task.
3. I identify what should not be delegated.
4. I examine whether convenience is replacing responsibility.
5. I consider how the process reflects organisational or personal values.
6. I name competing motives honestly.
7. I usually start with what the tool can do rather than what the situation requires. **Reverse-scored**
8. Once I establish an intention, I find it difficult to revise it. **Overuse indicator**

## Knowledge Check

## Practice Exercise

Choose an upcoming AI-supported task.

Complete:

**Purpose**

- What am I trying to achieve?
- Why does this matter?
- Who should benefit?

**Motives**

- Why am I using AI?
- What am I hoping to avoid?
- What personal or organisational interest is present?

**Boundaries**

- What may AI assist with?
- What must remain human?
- What must be verified?
- What should not be automated?

**Accountability**

- Who decides?
- Who reviews?
- Who can challenge?
- Who is responsible for consequences?

**Success**

- How will we know the use was beneficial?
- What negative effect would indicate that the approach should change?

## Evidence Reflection

- What was your stated purpose?
- What other motives emerged?
- Did the selected use of AI remain aligned?
- What did you decide not to delegate?
- What boundary did you establish?
- What would cause you to change the approach?

## Closing Statement

Intentionality ensures that AI remains a means rather than becoming the author of the purpose.
$md_intent$
where slug = 'intentionality';

update disciplines
set content_md = $md_wonder$## Introduction

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

## How Sense of Wonder Shows Up

| Underused | Balanced | Overused |
| --- | --- | --- |
| Accepts first plausible answer | Explores several frames | Generates endlessly |
| Automates existing assumptions | Reimagines the underlying purpose | Rejects useful structure |
| Treats prediction as destiny | Sees patterns and possibilities | Ignores evidence |
| Demands immediate usefulness | Protects incubation | Avoids decisions |
| Uses AI before forming ideas | Uses AI to expand thought | Chases novelty |

## AI-Era Failure Modes

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
$md_wonder$
where slug = 'sense-of-wonder';

-- Explicit no-op guard comment: scenarios table intentionally untouched.
-- select id, kind, correct_key from scenarios where discipline_id in (...);

commit;
