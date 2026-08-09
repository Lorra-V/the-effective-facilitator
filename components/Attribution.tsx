/** Short recommended attribution (homepage / about). */
export function ShortAttribution() {
  return (
    <p>
      The Effective Facilitator is inspired by and adapted from{" "}
      <em>
        The 9 Disciplines of a Facilitator: Leading Groups by Transforming
        Yourself
      </em>{" "}
      by Jon C. Jenkins and Maureen R. Jenkins. The original framework was
      developed for facilitators leading groups. This programme extends the
      disciplines into the context of self-facilitation, human judgment and
      responsible decision-making in the age of artificial intelligence.
    </p>
  );
}

/**
 * Full attribution for Welcome and Introduction closing section:
 * short paragraph + Intellectual distinction (two lists).
 * Source: docs/curriculum/TEF_curriculum_spec.md
 */
export function FullAttribution() {
  return (
    <section className="tef-attribution" aria-label="Attribution">
      <h2>Attribution</h2>
      <ShortAttribution />

      <h3>Intellectual Distinction</h3>
      <p>The following elements come directly from the source framework:</p>
      {/* List items: sentence case (not Title Case). */}
      <ul className="tef-sentence-list">
        <li>the nine disciplines;</li>
        <li>the three developmental paths;</li>
        <li>the idea of discipline as learned developmental practice;</li>
        <li>the central tensions between disciplines;</li>
        <li>the emphasis on transformation of the facilitator;</li>
        <li>and many of the foundational descriptions of each discipline.</li>
      </ul>
      <p>The following are programme adaptations:</p>
      <ul className="tef-sentence-list">
        <li>application to AI-supported work and decision-making;</li>
        <li>the authority, ambiguity and control lens;</li>
        <li>app-based assessments;</li>
        <li>scoring logic;</li>
        <li>situational judgment exercises;</li>
        <li>human-agency measures;</li>
        <li>organisational AI scenarios;</li>
        <li>progress tracking;</li>
        <li>and the personal operating practice.</li>
      </ul>
    </section>
  );
}
