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

const NEXT_BY_SLUG: Record<
  string,
  { href: string; label: string }
> = {
  "regarding-others": {
    href: "/paths/regarding-myself",
    label: "Continue",
  },
  "regarding-myself": {
    href: "/paths/regarding-life",
    label: "Continue",
  },
  "regarding-life": {
    href: "/paths/regarding-others/detachment",
    label: "Next Item",
  },
};

export default async function DevelopmentalPathPage({ params }: Props) {
  const { pathSlug } = await params;
  const path = getExplorePath(pathSlug);
  if (!path) notFound();

  const next = NEXT_BY_SLUG[path.slug] ?? {
    href: "/paths",
    label: "Continue",
  };

  return (
    <div className="tef-main-inner">
      <h1 style={{ margin: "0 0 0.35rem" }}>{path.title}</h1>
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
          borderRadius: "var(--tef-card-radius)",
        }}
        sizes="(max-width: 44rem) 100vw, 44rem"
        priority
      />

      <div
        style={{
          background: "var(--tef-surface)",
          border: "1px solid var(--tef-border)",
          borderRadius: "var(--tef-card-radius)",
          padding: "1.5rem 1.35rem",
        }}
      >
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
            margin: "0 0 1.5rem",
            fontWeight: 600,
          }}
        >
          {path.question}
        </p>

        <h2 style={{ fontSize: "1.2rem", margin: "0 0 0.75rem" }}>Disciplines</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {path.disciplines.map((name) => (
            <li
              key={name}
              style={{
                padding: "0.75rem 1rem",
                marginBottom: "0.45rem",
                background: "rgba(116, 82, 150, 0.06)",
                borderLeft: "3px solid var(--tef-action)",
                fontWeight: 600,
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1.25rem",
        }}
      >
        <Link href={next.href} className="tef-btn" style={{ textDecoration: "none" }}>
          {next.label}
        </Link>
      </div>
    </div>
  );
}
