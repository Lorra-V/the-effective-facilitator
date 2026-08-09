import type { ReactNode } from "react";

/**
 * Title Case Each Word (C2 step 7) — for section headings / titles only.
 * List items use sentence case via lib/sentence-case.ts instead.
 */
export function toTitleCase(input: string): string {
  return input.replace(/\S+/g, (word) => {
    if (/^[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(word) && word.length <= 4) {
      return word;
    }
    return word
      .split("-")
      .map((part) => {
        if (!part) return part;
        if (/^AI$/i.test(part)) return "AI";
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      .join("-");
  });
}

export function titleCaseFromNodes(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return toTitleCase(String(children));
  }
  if (Array.isArray(children)) {
    return toTitleCase(
      children
        .map((c) =>
          typeof c === "string" || typeof c === "number" ? String(c) : "",
        )
        .join(""),
    );
  }
  return "";
}
