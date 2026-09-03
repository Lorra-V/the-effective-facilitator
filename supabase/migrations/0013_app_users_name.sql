-- Optional display name collected on /get-started.
-- Run manually in the Supabase SQL Editor after review. Do not auto-apply.

alter table app_users
  add column if not exists name text;
