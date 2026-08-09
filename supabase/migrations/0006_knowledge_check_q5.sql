-- Phase C follow-up: add Knowledge Check Q5 for each full module.
-- Source: docs/curriculum/TEF_knowledge_check_q5.md
-- Scoring already uses checks.length (not a hardcoded 4) in computeKnowledgeScore.
-- Do not modify existing scenario options/correct_key.

begin;

insert into scenarios (id, discipline_id, prompt_md, rubric_md, kind, options, correct_key, explanation)
values
  (
    $id$c3000000-0000-4000-8000-000000000020$id$,
    $id$b2000000-0000-4000-8000-000000000001$id$,
    $md$A facilitator strongly prefers an AI-generated solution but recognises that the group needs more information before making a decision. Which response best demonstrates Detachment?$md$,
    '',
    $s$knowledge_check$s$,
    $json$[{"key":"A","text":"Persuade the group to accept the solution because it appears to be the strongest","score":0},{"key":"B","text":"Withdraw from the discussion to avoid influencing the group","score":0},{"key":"C","text":"Present the solution as one option, invite scrutiny and remain willing to revise or release it","score":1},{"key":"D","text":"Reject the solution to prove that the facilitator is not attached to it","score":0}]$json$::jsonb,
    $s$C$s$,
    $s$Detachment does not require withdrawing from responsibility or rejecting a preferred solution. It means remaining engaged while allowing evidence, participation and the needs of the situation to determine what happens next.$s$
  ),
  (
    $id$c3000000-0000-4000-8000-000000000021$id$,
    $id$b2000000-0000-4000-8000-000000000005$id$,
    $md$What is the best way to prevent "premature completion" when using AI?$md$,
    '',
    $s$knowledge_check$s$,
    $json$[{"key":"A","text":"Ask AI to produce a more detailed response","score":0},{"key":"B","text":"Compare the output with answers from other AI tools","score":0},{"key":"C","text":"Pause to examine the problem, question its assumptions and imagine alternatives before accepting an answer","score":1},{"key":"D","text":"Continue prompting until the output sounds convincing","score":0}]$json$::jsonb,
    $s$C$s$,
    $s$Premature completion occurs when a polished AI response creates the impression that the thinking is finished. Sense of Wonder keeps possibility open by encouraging us to examine the situation, question the existing frame and consider what may still be missing.$s$
  ),
  (
    $id$c3000000-0000-4000-8000-000000000022$id$,
    $id$b2000000-0000-4000-8000-000000000006$id$,
    $md$A team continues using an AI-generated plan even after new evidence shows that it may not achieve the intended outcome. Which response best demonstrates balanced Intentionality?$md$,
    '',
    $s$knowledge_check$s$,
    $json$[{"key":"A","text":"Continue with the plan because changing direction would suggest that the original decision was wrong.","score":0},{"key":"B","text":"Abandon the project and avoid using AI for similar work in the future.","score":0},{"key":"C","text":"Revisit the purpose, assess the new evidence and adjust the plan while remaining committed to the desired outcome.","score":1},{"key":"D","text":"Ask AI to decide whether the team should continue or change direction.","score":0}]$json$::jsonb,
    $s$C$s$,
    $s$Balanced Intentionality maintains a clear sense of purpose while remaining responsive to evidence, feedback and changing conditions.$s$
  )
on conflict (id) do update set
  prompt_md = excluded.prompt_md,
  options = excluded.options,
  correct_key = excluded.correct_key,
  explanation = excluded.explanation,
  kind = excluded.kind;

commit;
