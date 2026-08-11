"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarDiscipline = {
  id: string;
  slug: string;
  title: string;
  sort_order: number;
  is_full_module: boolean;
  completed: boolean;
  dilemmaDone: boolean;
  recognitionDone: boolean;
  knowledgeDone: boolean;
};

export type SidebarPath = {
  id: string;
  slug: string;
  title: string;
  sort_order: number;
  disciplines: SidebarDiscipline[];
};

type Props = {
  paths: SidebarPath[];
};

function shortPathTitle(title: string): string {
  const dash = title.indexOf("—");
  if (dash === -1) return title;
  return title.slice(0, dash).trim();
}

export function CourseSidebar({ paths }: Props) {
  const pathname = usePathname();

  const activeDiscipline = paths
    .flatMap((p) =>
      p.disciplines.map((d) => ({
        ...d,
        pathSlug: p.slug,
        href: `/paths/${p.slug}/${d.slug}`,
      })),
    )
    .find((d) => d.href === pathname);

  const showGoals = Boolean(activeDiscipline?.is_full_module);
  const goals = activeDiscipline
    ? [
        {
          label: "Complete a Dilemma",
          done: activeDiscipline.dilemmaDone,
        },
        {
          label: "Complete Recognition Activity",
          done: activeDiscipline.recognitionDone,
        },
        {
          label: "Complete the Knowledge Check",
          done: activeDiscipline.knowledgeDone,
        },
      ]
    : [];

  return (
    <aside className="tef-sidebar">
      <div className="tef-sidebar-brand">
        <Link href="/paths">The Effective Facilitator</Link>
      </div>

      {showGoals ? (
        <section className="tef-sidebar-goals">
          <h2 className="tef-subtitle">Today&apos;s Goal</h2>
          <ul>
            {goals.map((g) => (
              <li key={g.label} className={g.done ? "done" : undefined}>
                <span className="tef-check" aria-hidden>
                  {g.done ? "●" : "○"}
                </span>
                {g.label}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav className="tef-sidebar-nav-card" aria-label="Course navigation">
        <Link
          href="/paths/welcome"
          className={`tef-nav-link${pathname === "/paths/welcome" ? " active" : ""}`}
        >
          Welcome and Introduction
        </Link>

        <Link
          href="/paths/assessment"
          className={`tef-nav-link${pathname === "/paths/assessment" ? " active" : ""}`}
        >
          TEF Developmental Profile
        </Link>

        <Link
          href="/paths/regarding-others"
          className={`tef-nav-link${
            pathname === "/paths/regarding-others" ||
            pathname === "/paths/regarding-myself" ||
            pathname === "/paths/regarding-life"
              ? " active"
              : ""
          }`}
        >
          The Developmental Paths
        </Link>

        {paths.map((path) => {
          const pathHref = `/paths/${path.slug}`;
          const pathActive =
            pathname === pathHref || pathname.startsWith(`${pathHref}/`);
          return (
            <div key={path.id} className="tef-nav-path">
              <p className="tef-nav-path-title">
                <Link
                  href={pathHref}
                  className={pathActive ? "active" : undefined}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {shortPathTitle(path.title)}
                </Link>
              </p>
              <ul>
                {path.disciplines.map((d) => {
                  const href = `/paths/${path.slug}/${d.slug}`;
                  const active = pathname === href;
                  return (
                    <li key={d.id}>
                      <Link
                        href={href}
                        className={`tef-nav-item${active ? " active" : ""}${d.completed ? " completed" : ""}`}
                      >
                        <span className="tef-nav-item-title">{d.title}</span>
                        <span
                          className={`tef-badge-hover ${
                            d.is_full_module
                              ? "tef-badge tef-badge-full"
                              : "tef-badge tef-badge-preview"
                          }`}
                        >
                          {d.is_full_module ? "FULL MODULE" : "PREVIEW"}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <p className="tef-sidebar-profile" aria-disabled="true">
          Profile
        </p>
      </nav>
    </aside>
  );
}
