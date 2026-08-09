import Link from "next/link";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";

type DisciplineLink = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  sort_order: number;
  is_full_module: boolean;
};

type PathRow = {
  id: string;
  slug: string;
  title: string;
  sort_order: number;
  disciplines: DisciplineLink[] | null;
};

export default async function PathsPage() {
  const session = await requireSession();
  if (!session) redirect("/launch");

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("paths")
    .select(
      "id, slug, title, sort_order, disciplines(id, slug, title, subtitle, sort_order, is_full_module)",
    )
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <div className="tef-main-inner">
        <h1>Paths</h1>
        <p>Failed to load paths: {error.message}</p>
      </div>
    );
  }

  const paths = (data ?? []) as PathRow[];

  return (
    <div className="tef-main-inner">
      <h1 style={{ marginBottom: "0.5rem" }}>Learning Paths</h1>
      <p style={{ color: "var(--tef-muted)", marginBottom: "1.5rem" }}>
        Three full modules and six previews. Full modules include dilemma,
        recognition, and knowledge checks.
      </p>
      <p style={{ marginBottom: "2.5rem" }}>
        <Link href="/paths/welcome">Start with Welcome and Introduction →</Link>
      </p>

      {paths.map((path) => {
        const disciplines = [...(path.disciplines ?? [])].sort(
          (a, b) => a.sort_order - b.sort_order,
        );
        return (
          <section key={path.id} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.35rem", marginBottom: "0.35rem" }}>
              {path.title}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "1.25rem 0 0" }}>
              {disciplines.map((d) => (
                <li
                  key={d.id}
                  style={{
                    marginBottom: "0.85rem",
                    padding: "1rem 1.1rem",
                    background: "var(--tef-surface)",
                    borderLeft: d.is_full_module
                      ? "3px solid var(--tef-button)"
                      : "3px solid var(--tef-action)",
                  }}
                >
                  <Link
                    href={`/paths/${path.slug}/${d.slug}`}
                    style={{
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      textDecoration: "none",
                      color: "var(--tef-ink)",
                    }}
                  >
                    {d.title}
                  </Link>
                  {d.subtitle ? (
                    <p
                      className="tef-subtitle"
                      style={{
                        margin: "0.35rem 0 0",
                        color: "var(--tef-muted)",
                        fontSize: "0.95rem",
                        fontWeight: 400,
                      }}
                    >
                      {d.subtitle}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
