import { CalloutBox } from "@/components/CalloutBox";
import { FullAttribution } from "@/components/Attribution";

export default function WelcomePage() {
  return (
    <div className="tef-main-inner">
      <h1 style={{ margin: "0 0 0.5rem" }}>Welcome and Introduction</h1>
      <p className="tef-subtitle" style={{ margin: "0 0 1.5rem", color: "var(--tef-muted)" }}>
        Course-Level Orientation
      </p>

      <CalloutBox label="Authority, Ambiguity and Control" sticky>
        <p style={{ margin: 0 }}>
          Through nine personal disciplines, examine how you respond to
          authority, ambiguity and control when working with AI.
        </p>
      </CalloutBox>

      <section className="tef-prose">
        <h2>Introduction</h2>
        <p>
          Artificial intelligence can help us work faster, explore ideas, solve
          problems and make decisions. But the more capable and persuasive these
          systems become, the more important it is to remain conscious of what we
          are allowing them to influence.
        </p>
        <p>
          This course is not designed to make you suspicious of AI or reluctant
          to use it. It is designed to help you use AI deliberately—without
          surrendering the distinctly human capacities required for sound
          judgement, meaningful participation and responsible action.
        </p>
        <p>
          Through nine personal disciplines, you will examine how you respond to
          three fundamental questions:
        </p>
        <ul className="tef-sentence-list">
          <li>
            <strong>Authority:</strong> Who or what am I allowing to shape this
            decision?
          </li>
          <li>
            <strong>Ambiguity:</strong> How do I respond when the answer remains
            incomplete?
          </li>
          <li>
            <strong>Control:</strong> When should I direct, intervene, release or
            allow emergence?
          </li>
        </ul>
        <p>
          The course will help you recognise important distinctions that can
          easily become blurred when working with AI: assistance is not
          authority; fluency is not truth; efficiency is not effectiveness;
          prediction is not destiny; generation is not imagination; and
          automation does not remove responsibility.
        </p>
        <p>
          Each discipline offers a practical framework for examining your
          habits, testing your assumptions and making more intentional choices.
          The aim is not to prescribe a single &quot;correct&quot; way to use AI,
          but to strengthen your ability to determine what each situation
          requires—and to remain accountable for the choices you make.
        </p>

        <h2>Course Objectives</h2>
        <p>Through this course, you will:</p>
        <ul className="tef-sentence-list">
          <li>
            Understand the nine personal disciplines and their relevance to
            AI-supported work.
          </li>
          <li>
            Examine your own tendencies in relation to authority, ambiguity and
            control.
          </li>
          <li>Preserve independent thought and judgement when consulting AI.</li>
          <li>
            Evaluate AI-generated outputs beyond their polish, confidence or
            apparent completeness.
          </li>
          <li>
            Recognise when AI is expanding your thinking and when it may be
            narrowing your imagination.
          </li>
          <li>
            Identify assumptions, biases, omissions and stakeholders that may be
            missing from an AI-supported process.
          </li>
          <li>
            Determine when automation is appropriate, when a process should first
            be redesigned, and when human participation should be retained.
          </li>
          <li>
            Distinguish between delegating a task and surrendering responsibility
            for its consequences.
          </li>
          <li>
            Act responsibly when certainty is unavailable and no option is
            entirely risk-free.
          </li>
          <li>
            Develop practical habits for thoughtful, accountable and distinctly
            human engagement with AI.
          </li>
        </ul>

        <h2>Intended Outcome</h2>
        <p>
          By the end of the course, you will have developed a personal framework
          for working with AI that is deliberate, discerning and accountable. You
          will be better equipped to decide when to use AI, how much influence to
          give it, what requires human participation and what remains your
          responsibility—even after a task has been delegated or automated.
        </p>
        <p>
          The intended outcome is not simply greater competence with AI. It is
          the ability to use AI without diminishing your capacity to think
          independently, question carefully, imagine freely, engage meaningfully
          and take responsibility for the decisions that follow.
        </p>
      </section>

      <FullAttribution />
    </div>
  );
}
