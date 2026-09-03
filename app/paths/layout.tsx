import { CourseSidebar, type SidebarPath } from "@/components/CourseSidebar";
import { requireSession } from "@/lib/auth/session";
import { parseProgressAnswers } from "@/lib/progress";
import { createAdminClient } from "@/lib/supabase/admin";

type DisciplineRow = {
  id: string;
  slug: string;
  title: string;
  sort_order: number;
  is_full_module: boolean;
};

type PathRow = {
  id: string;
  slug: string;
  title: string;
  sort_order: number;
  disciplines: DisciplineRow[] | null;
};

type ScenarioRow = {
  id: string;
  discipline_id: string;
  kind: string;
};

type ProgressRow = {
  discipline_id: string;
  completed_at: string | null;
  knowledge_score: number | null;
  scenario_response: string | null;
};

export default async function PathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();
  let paths: SidebarPath[] = [];

  if (session) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("paths")
      .select(
        "id, slug, title, sort_order, disciplines(id, slug, title, sort_order, is_full_module)",
      )
      .order("sort_order", { ascending: true });

    const pathRows = (data ?? []) as PathRow[];
    const disciplineIds = pathRows.flatMap((p) =>
      (p.disciplines ?? []).map((d) => d.id),
    );

    const [{ data: progressRows }, { data: scenarioRows }] = await Promise.all([
      supabase
        .from("progress")
        .select("discipline_id, completed_at, knowledge_score, scenario_response")
        .eq("user_id", session.userId),
      disciplineIds.length
        ? supabase
            .from("scenarios")
            .select("id, discipline_id, kind")
            .in("discipline_id", disciplineIds)
        : Promise.resolve({ data: [] as ScenarioRow[] }),
    ]);

    const progressByDiscipline = new Map(
      ((progressRows ?? []) as ProgressRow[]).map((p) => [p.discipline_id, p]),
    );
    const scenariosByDiscipline = new Map<string, ScenarioRow[]>();
    for (const s of (scenarioRows ?? []) as ScenarioRow[]) {
      const list = scenariosByDiscipline.get(s.discipline_id) ?? [];
      list.push(s);
      scenariosByDiscipline.set(s.discipline_id, list);
    }

    paths = pathRows.map((path) => {
      const disciplines = [...(path.disciplines ?? [])]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((d) => {
          const progress = progressByDiscipline.get(d.id);
          const parsed = parseProgressAnswers(progress?.scenario_response);
          const answers = parsed.answers ?? {};
          const classifiedBy = parsed.classifications ?? {};
          const scenarios = scenariosByDiscipline.get(d.id) ?? [];
          const dilemmas = scenarios.filter((s) => s.kind === "dilemma");
          const recognitions = scenarios.filter((s) => s.kind === "recognition");
          const classifications = scenarios.filter(
            (s) => s.kind === "classification",
          );
          const knowledgeChecks = scenarios.filter(
            (s) => s.kind === "knowledge_check",
          );

          return {
            ...d,
            completed: Boolean(progress?.completed_at),
            dilemmaDone:
              dilemmas.length > 0 &&
              dilemmas.every((s) => Boolean(answers[s.id])),
            // Counts either recognition shape: choose-one or classification.
            recognitionDone:
              recognitions.length + classifications.length > 0 &&
              recognitions.every((s) => Boolean(answers[s.id])) &&
              classifications.every(
                (s) => Object.keys(classifiedBy[s.id] ?? {}).length > 0,
              ),
            knowledgeDone:
              knowledgeChecks.length > 0 &&
              (progress?.knowledge_score != null ||
                knowledgeChecks.every((s) => Boolean(answers[s.id]))),
          };
        });
      return {
        id: path.id,
        slug: path.slug,
        title: path.title,
        sort_order: path.sort_order,
        disciplines,
      };
    });
  }

  return (
    <div className="tef-course">
      <CourseSidebar paths={paths} />
      <div className="tef-main">{children}</div>
    </div>
  );
}
