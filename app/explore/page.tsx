import Image from "next/image";
import Link from "next/link";
import { EXPLORE_PATHS } from "@/lib/explore-content";

export default function ExplorePage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--tef-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-merriweather), Georgia, serif",
            fontWeight: 700,
            textDecoration: "none",
            color: "var(--tef-ink)",
          }}
        >
          The Effective Facilitator
        </Link>
        <a href="#get-started" className="tef-btn" style={{ textDecoration: "none" }}>
          Get Started
        </a>
      </header>

      <main style={{ maxWidth: "42rem", margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>
        <p
          style={{
            color: "var(--tef-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "0.8rem",
            marginBottom: "1rem",
            fontWeight: 600,
          }}
        >
          Explore the Programme
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.35rem)", margin: "0 0 1rem" }}>
          Three Developmental Paths
        </h1>
        <p style={{ color: "var(--tef-muted)", marginBottom: "2.5rem" }}>
          Browse the paths and discipline names below. Full lessons, scenarios,
          and progress tracking open after you launch through Ludwitt/Hult.
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {EXPLORE_PATHS.map((path) => (
            <li
              key={path.slug}
              style={{
                marginBottom: "2.5rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid var(--tef-border)",
              }}
            >
              <h2 style={{ fontSize: "1.35rem", margin: "0 0 0.35rem" }}>
                <Link
                  href={`/explore/${path.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  {path.title}
                </Link>
              </h2>
              <p
                style={{
                  color: "var(--tef-action)",
                  margin: "0 0 1rem",
                  fontSize: "0.95rem",
                }}
                className="tef-subtitle"
              >
                {path.theme}
              </p>
              <Image
                src={path.imageSrc}
                alt={`${path.title}: ${path.disciplines.join(", ")}`}
                width={1200}
                height={280}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  margin: "0 0 1.25rem",
                }}
                sizes="(max-width: 42rem) 100vw, 42rem"
              />
              {path.description.map((para) => (
                <p
                  key={para.slice(0, 48)}
                  style={{ color: "var(--tef-muted)", margin: "0 0 0.85rem" }}
                >
                  {para}
                </p>
              ))}
              <p
                style={{
                  fontStyle: "italic",
                  margin: "0 0 1.25rem",
                  fontWeight: 600,
                }}
              >
                {path.question}
              </p>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                <span style={{ color: "var(--tef-muted)" }}>Disciplines: </span>
                {path.disciplines.join(" · ")}
              </p>
              <p style={{ margin: "1rem 0 0" }}>
                <Link href={`/explore/${path.slug}`}>View path →</Link>
              </p>
            </li>
          ))}
        </ul>

        <section
          id="get-started"
          style={{
            marginTop: "1rem",
            padding: "1.5rem 1.25rem",
            background: "var(--tef-surface)",
            borderLeft: "3px solid var(--tef-button)",
          }}
        >
          <h2 style={{ fontSize: "1.2rem", margin: "0 0 0.75rem" }}>Get Started</h2>
          <p style={{ margin: "0 0 0.85rem", color: "var(--tef-muted)" }}>
            There is no public sign-up on this site. Access is granted when you
            arrive through the Ludwitt/Hult launcher with a one-time launch link
            (<code style={{ fontSize: "0.9em" }}>/launch?token=…</code>). That
            link creates your session and opens the gated learning paths.
          </p>
          <p style={{ margin: "0 0 1.25rem", color: "var(--tef-muted)" }}>
            If you open the launch page without a Ludwitt token, you will see a
            short message asking you to launch from Ludwitt/Hult — that is
            expected.
          </p>
          <Link href="/launch" className="tef-btn" style={{ textDecoration: "none" }}>
            Go to Launch
          </Link>
        </section>

        <p style={{ marginTop: "2.5rem" }}>
          <Link href="/">← Home</Link>
        </p>
      </main>
    </div>
  );
}
