/**
 * Public explore copy — titles + path descriptions only.
 * Source: docs/curriculum/TEF_developmental_paths.md (verbatim, except the
 * discipline rename Interior Dialogue → Interior Council; "interior dialogue"
 * remains the in-module process term).
 * No content_md, scenarios, or completion state.
 */

export type ExplorePath = {
  slug: string;
  title: string;
  theme: string;
  /** Strip diagram under theme / above description (`public/images/…`). */
  imageSrc: string;
  description: string[];
  question: string;
  disciplines: string[];
};

export const EXPLORE_PATHS: ExplorePath[] = [
  {
    slug: "regarding-others",
    title: "Regarding Others",
    theme: "Authority, Participation and Ownership",
    imageSrc: "/images/regarding_others_strip.png",
    description: [
      "The Regarding Others path explores how we influence people without taking away their agency. It holds the tension between Detachment—releasing the need to control the answer, receive recognition or prove ourselves right—and Engagement—caring enough to remain responsible and involved. Focus provides the balance: staying committed to the purpose while allowing others to contribute to, shape and own the outcome.",
      "In AI-supported work, this path helps us decide when to offer direction, when to challenge an output, when to step back and when participation matters more than producing the fastest or most technically impressive answer. It asks:",
    ],
    question:
      "How do I use intelligence and influence without taking control away from others?",
    disciplines: ["Detachment", "Focus", "Engagement"],
  },
  {
    slug: "regarding-myself",
    title: "Regarding Myself",
    theme: "Agency, Imagination and Intention",
    imageSrc: "/images/regarding_myself_strip.png",
    description: [
      "The Regarding Myself path concerns our ability to remain the authors of our own thinking and choices. Interior Council helps us recognise and examine the different voices, assumptions, emotions and motives influencing us. Intentionality enables us to clarify what we are trying to accomplish, why it matters and what responsibility must remain ours. Sense of Wonder preserves our openness to inspiration, possibility and ideas that have not yet been formed.",
      "In an era when AI can generate answers before we have fully explored the question, this path protects independent judgment and creative agency. It helps us use AI to extend our thinking without allowing its fluency, speed or apparent certainty to replace the inner work of discernment and imagination. It asks:",
    ],
    question:
      "How do I remain the author of my choices when systems can think and generate for me?",
    disciplines: ["Interior Council", "Sense of Wonder", "Intentionality"],
  },
  {
    slug: "regarding-life",
    title: "Regarding Life",
    theme: "Perception, Uncertainty and Action",
    imageSrc: "/images/regarding_life_strip.png",
    description: [
      "The Regarding Life path explores how we respond to situations that are complex, changing and never fully known. Awareness helps us notice what is happening within ourselves, between people and across the wider context. Action develops our capacity to intervene with courage, judgment and appropriate force. Presence brings these together, allowing us to remain attentive to reality while responding deliberately rather than automatically.",
      "In AI-mediated environments, information may be abundant while certainty remains limited. This path strengthens our ability to see beyond a complete-looking output, remain attentive to what data may miss and act responsibly without pretending that every uncertainty has been resolved. It asks:",
    ],
    question:
      "How do I respond wisely when information is abundant but certainty is not?",
    disciplines: ["Awareness", "Presence", "Action"],
  },
];

export function getExplorePath(slug: string): ExplorePath | undefined {
  return EXPLORE_PATHS.find((p) => p.slug === slug);
}
