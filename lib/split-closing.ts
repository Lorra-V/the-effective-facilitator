/**
 * Split lesson markdown so Closing Question / Closing Statement
 * can render in a callout box (C2 step 4).
 */
export function splitClosingMarkdown(markdown: string): {
  body: string;
  closing: string | null;
} {
  const match = markdown.match(
    /^#{1,3}\s*Closing\s+(Question|Statement)\s*$/im,
  );
  if (!match || match.index == null) {
    return { body: markdown, closing: null };
  }
  const body = markdown.slice(0, match.index).trimEnd();
  const closing = markdown.slice(match.index).trim();
  return { body, closing };
}
