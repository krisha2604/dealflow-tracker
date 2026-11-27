-- Dealflow Tracker
--
-- startups: one row per company in the pipeline.
-- notes: many meeting notes per startup (startup_id -> startups.id).
--        Deleting a startup removes its notes (on delete cascade).
-- stage is constrained to the six values the app knows about, so the
-- database and the stage badges cannot drift apart.
--
-- Auth trade-off
-- This demo has no login. The Next.js app talks to Postgres with the
-- Supabase anon key. RLS is enabled, with permissive policies for the
-- anon and authenticated roles on select, insert, and update. That makes
-- the schema work out of the box from the SQL editor. There is no delete
-- policy. Do not point this at real founder data — anyone with the anon
-- key can read and write these two tables.

create extension if not exists pgcrypto;

create table if not exists public.startups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sector text,
  stage text not null default 'Sourced'
    constraint startups_stage_check
    check (stage in ('Sourced', 'Screening', 'Diligence', 'Term Sheet', 'Passed', 'Invested')),
  one_liner text,
  website text,
  location text,
  created_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  startup_id uuid not null references public.startups (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

-- Dashboard filters and stage counts read startups by stage.
create index if not exists startups_stage_idx on public.startups (stage);

-- The company page loads every note for one startup.
create index if not exists notes_startup_id_idx on public.notes (startup_id);

comment on table public.startups is
  'One company in the fund pipeline. stage is limited to Sourced, Screening, Diligence, Term Sheet, Passed, Invested.';
comment on table public.notes is
  'Meeting notes for a startup. Many notes belong to one startup and are removed with it.';

alter table public.startups enable row level security;
alter table public.notes enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on table public.startups to anon, authenticated;
grant select, insert, update on table public.notes to anon, authenticated;

drop policy if exists startups_select on public.startups;
drop policy if exists startups_insert on public.startups;
drop policy if exists startups_update on public.startups;
drop policy if exists notes_select on public.notes;
drop policy if exists notes_insert on public.notes;
drop policy if exists notes_update on public.notes;

create policy startups_select on public.startups
  for select to anon, authenticated
  using (true);

create policy startups_insert on public.startups
  for insert to anon, authenticated
  with check (true);

create policy startups_update on public.startups
  for update to anon, authenticated
  using (true)
  with check (true);

create policy notes_select on public.notes
  for select to anon, authenticated
  using (true);

create policy notes_insert on public.notes
  for insert to anon, authenticated
  with check (true);

create policy notes_update on public.notes
  for update to anon, authenticated
  using (true)
  with check (true);
