import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Proper nouns preserved mid-list-item. Prefer a small set so common words
 * like "authority", "focus", "wonder" stay sentence case.
 */
const PROPER = new Set([
  "AI",
  "Ludwitt",
  "Hult",
  "Jenkins",
  "Maureen",
  "Jon",
  "Detachment",
  "Intentionality",
]);

function normalizePart(part: string, isFirstPartOfFirstWord: boolean): string {
  if (!part) return part;
  if (/^AI$/i.test(part)) return "AI";
  // English pronoun
  if (/^I$/i.test(part)) return "I";

  const titled = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  if (PROPER.has(titled) || PROPER.has(part)) {
    return titled;
  }

  if (isFirstPartOfFirstWord) {
    // Preserve existing first-letter case ("the nine..." stays; "Understand" stays).
    return part.charAt(0) + part.slice(1).toLowerCase();
  }

  return part.toLowerCase();
}

/**
 * Sentence case for a list-item string: do not Title Case every word.
 * First word keeps its leading capitalisation; later words lowercased
 * except proper nouns / AI / pronoun I.
 */
export function toListSentenceCase(input: string): string {
  let isFirstWord = true;
  return input.replace(/\S+/g, (raw) => {
    const match = raw.match(/^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9]*)$/);
    if (!match) return raw;
    const [, pre, core, post] = match;
    if (!core) return raw;

    const parts = core.split("-");
    const next = parts
      .map((part, i) => normalizePart(part, isFirstWord && i === 0))
      .join("-");
    isFirstWord = false;
    return pre + next + post;
  });
}

/** Walk React children inside an <li>, transforming text nodes only. */
export function applyListSentenceCase(children: ReactNode): ReactNode {
  let started = false;

  const walk = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (child) => {
      if (typeof child === "string") {
        if (!/\S/.test(child)) return child;
        if (!started) {
          started = true;
          return toListSentenceCase(child);
        }
        // Continuation fragments: treat as non-first (lowercase mid words).
        return toListSentenceCase(` ${child}`).replace(/^ /, "");
      }
      if (typeof child === "number") {
        return child;
      }
      if (isValidElement(child)) {
        const el = child as ReactElement<{ children?: ReactNode }>;
        if (el.props.children == null) return child;
        return cloneElement(el, {
          ...el.props,
          children: walk(el.props.children),
        });
      }
      return child;
    });

  return walk(children);
}
