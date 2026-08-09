import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXPLORE_PATHS, getExplorePath } from "@/lib/explore-content";

type Props = {
  params: Promise<{ pathSlug: string }>;
};

export function generateStaticParams() {
  return EXPLORE_PATHS.map((p) => ({ pathSlug: p.slug }));
}

export default async function ExplorePathPage({ params }: Props) {
  const { pathSlug } = await params;
  const path = getExplorePath(pathSlug);
  if (!path) notFound();

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
          href="/explore"
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
        <p style={{ marginBottom: "1rem" }}>
          <Link href="/explore">← All paths</Link>
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.35rem)", margin: "0 0 0.35rem" }}>
          {path.title}
        </h1>
        <p
          className="tef-subtitle"
          style={{
            color: "var(--tef-action)",
            margin: "0 0 1.25rem",
            fontSize: "1.05rem",
            fontWeight: 400,
          }}
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
            margin: "0 0 1.5rem",
          }}
          sizes="(max-width: 42rem) 100vw, 42rem"
          priority
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
            margin: "0 0 2rem",
            fontWeight: 600,
          }}
        >
          {path.question}
        </p>

        <h2 style={{ fontSize: "1.2rem", margin: "0 0 1rem" }}>Disciplines</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem" }}>
          {path.disciplines.map((name) => (
            <li
              key={name}
              style={{
                padding: "0.85rem 1rem",
                marginBottom: "0.5rem",
                background: "var(--tef-surface)",
                borderLeft: "3px solid var(--tef-action)",
                fontWeight: 600,
              }}
            >
              {name}
            </li>
          ))}
        </ul>
        <p style={{ color: "var(--tef-muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
          Titles only on this public page. Lesson content and activities unlock
          after launch.
        </p>

        <section
          id="get-started"
          style={{
            padding: "1.5rem 1.25rem",
            background: "var(--tef-surface)",
            borderLeft: "3px solid var(--tef-button)",
          }}
        >
          <h2 style={{ fontSize: "1.2rem", margin: "0 0 0.75rem" }}>Get Started</h2>
          <p style={{ margin: "0 0 0.85rem", color: "var(--tef-muted)" }}>
            There is no public sign-up. Open the programme via the Ludwitt/Hult
            launcher (<code style={{ fontSize: "0.9em" }}>/launch?token=…</code>
            ). Without a token, launch asks you to arrive from Ludwitt/Hult.
          </p>
          <Link href="/launch" className="tef-btn" style={{ textDecoration: "none" }}>
            Go to Launch
          </Link>
        </section>
      </main>
    </div>
  );
}
