import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { applyListSentenceCase } from "@/lib/sentence-case";
import { titleCaseFromNodes, toTitleCase } from "@/lib/title-case";

function Heading({
  Tag,
  children,
}: {
  Tag: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
}) {
  const text = titleCaseFromNodes(children);
  return <Tag>{text || children}</Tag>;
}

const components: Components = {
  // Section headings / titles — Title Case (C2); not affected by list sentence-case.
  h1: ({ children }) => <Heading Tag="h1">{children}</Heading>,
  h2: ({ children }) => <Heading Tag="h2">{children}</Heading>,
  h3: ({ children }) => <Heading Tag="h3">{children}</Heading>,
  h4: ({ children }) => <Heading Tag="h4">{children}</Heading>,
  th: ({ children }) => (
    <th>
      {toTitleCase(titleCaseFromNodes(children) || String(children ?? ""))}
    </th>
  ),
  // Bulleted / numbered list items — sentence case sitewide.
  li: ({ children }) => <li>{applyListSentenceCase(children)}</li>,
};

export function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className="tef-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
