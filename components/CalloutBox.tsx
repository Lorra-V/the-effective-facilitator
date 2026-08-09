import type { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  sticky?: boolean;
  /** accent = Core AI Question; closing = dark Closing Statement box */
  variant?: "accent" | "closing";
};

export function CalloutBox({
  label,
  children,
  sticky = false,
  variant = "accent",
}: Props) {
  return (
    <section
      className={`tef-callout tef-callout-${variant}${sticky ? " tef-callout-sticky" : ""}`}
    >
      <p className="tef-callout-label">{label}</p>
      <div className="tef-callout-body">{children}</div>
    </section>
  );
}
