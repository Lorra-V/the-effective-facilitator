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
  goals: { label: string; done: boolean }[];
};

function shortPathTitle(title: string): string {
  const dash = title.indexOf("—");
  if (dash === -1) return title;
  return title.slice(0, dash).trim();
}

export function CourseSidebar({ paths, goals }: Props) {
  const pathname = usePathname();

  return (
    <aside className="tef-sidebar">
      <div className="tef-sidebar-brand">
        <Link href="/paths">The Effective Facilitator</Link>
      </div>

      <section className="tef-sidebar-goals">
        <h2 className="tef-subtitle">Today&apos;s Goal</h2>
        <ul>
          {goals.map((g) => (
            <li key={g.label} className={g.done ? "done" : undefined}>
              <span className="tef-check" aria-hidden>
                {g.done ? "✓" : "○"}
              </span>
              {g.label}
            </li>
          ))}
        </ul>
      </section>

      <nav className="tef-sidebar-nav" aria-label="Course navigation">
        <Link
          href="/paths/welcome"
          className={`tef-nav-link${pathname === "/paths/welcome" ? " active" : ""}`}
        >
          Welcome and Introduction
        </Link>

        {paths.map((path) => (
          <div key={path.id} className="tef-nav-path">
            <p className="tef-nav-path-title">{shortPathTitle(path.title)}</p>
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
                        {d.is_full_module ? "Full Module" : "Preview"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <p className="tef-sidebar-foot">
        <Link href="/">Home</Link>
        {" · "}
        <Link href="/explore">Explore</Link>
      </p>
    </aside>
  );
}
