/**
 * Split lesson markdown at ## Knowledge Check so interactive KC scenarios
 * can render in-place (content_md must not carry static A–D option lists).
 */
export function splitKnowledgeCheckMarkdown(markdown: string): {
  before: string;
  after: string;
  hadSection: boolean;
} {
  const match = markdown.match(/^#{1,3}\s*Knowledge Check\s*$/im);
  if (!match || match.index == null) {
    return { before: markdown, after: "", hadSection: false };
  }

  const headerEnd = match.index + match[0].length;
  const rest = markdown.slice(headerEnd);
  const next = rest.match(/^#{1,3}\s+\S+/m);
  const after = next ? rest.slice(next.index!).trimStart() : "";
  const before = markdown.slice(0, match.index).trimEnd();

  return { before, after, hadSection: true };
}
