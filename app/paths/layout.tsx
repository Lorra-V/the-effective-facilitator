import { CourseSidebar, type SidebarPath } from "@/components/CourseSidebar";
import { requireSession } from "@/lib/auth/session";
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

export default async function PathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();
  let paths: SidebarPath[] = [];
  let completedCount = 0;
  let totalDisciplines = 0;

  if (session) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("paths")
      .select(
        "id, slug, title, sort_order, disciplines(id, slug, title, sort_order, is_full_module)",
      )
      .order("sort_order", { ascending: true });

    const pathRows = (data ?? []) as PathRow[];
    const { data: progressRows } = await supabase
      .from("progress")
      .select("discipline_id, completed_at")
      .eq("user_id", session.userId)
      .not("completed_at", "is", null);

    const completed = new Set(
      (progressRows ?? []).map((p) => p.discipline_id as string),
    );

    paths = pathRows.map((path) => {
      const disciplines = [...(path.disciplines ?? [])]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((d) => ({
          ...d,
          completed: completed.has(d.id),
        }));
      totalDisciplines += disciplines.length;
      completedCount += disciplines.filter((d) => d.completed).length;
      return {
        id: path.id,
        slug: path.slug,
        title: path.title,
        sort_order: path.sort_order,
        disciplines,
      };
    });
  }

  const goals = [
    {
      label: "Read Welcome and Introduction",
      done: false,
    },
    {
      label: "Complete One Discipline",
      done: completedCount >= 1,
    },
    {
      label: "Finish All Nine Disciplines",
      done: totalDisciplines > 0 && completedCount >= totalDisciplines,
    },
  ];

  return (
    <div className="tef-course">
      <CourseSidebar paths={paths} goals={goals} />
      <div className="tef-main">{children}</div>
    </div>
  );
}
