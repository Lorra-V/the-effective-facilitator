-- TEF Developmental Profile results.
-- Independent of `progress` / `scenarios` — do not write profile answers there.
-- Run manually in the Supabase SQL Editor after review. Do not auto-apply.

create table profile_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id) not null,
  answers jsonb not null,       -- { "detachment": { likert: [1-5 x4], dilemma_choice: "C" }, ... }
  scores jsonb not null,        -- { "detachment": { score: number, band: "Emerging"|"Developing"|"Established" }, ... }
  completed_at timestamptz not null default now()
);

alter table profile_results enable row level security;
grant select, insert, update, delete on public.profile_results to service_role;
