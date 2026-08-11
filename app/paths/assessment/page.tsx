import Link from "next/link";

export default function AssessmentPlaceholderPage() {
  return (
    <div className="tef-main-inner">
      <h1 style={{ margin: "0 0 0.5rem" }}>TEF Developmental Assessment</h1>
      <p
        className="tef-subtitle"
        style={{ margin: "0 0 1.5rem", color: "var(--tef-muted)" }}
      >
        Baseline Assessment
      </p>

      <p className="tef-coming-soon">Coming Soon</p>

      <p style={{ color: "var(--tef-muted)", marginBottom: "1.75rem" }}>
        The TEF Developmental Assessment (baseline) is intentionally deferred.
        When available, it will help you locate your starting point across the
        nine disciplines before you begin the full modules.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem" }}>
        <Link href="/paths/welcome" className="tef-btn tef-btn-secondary" style={{ textDecoration: "none" }}>
          Back
        </Link>
        <Link href="/paths/regarding-others" className="tef-btn" style={{ textDecoration: "none" }}>
          Continue
        </Link>
      </div>
    </div>
  );
}
