-- BLOG DATABASE SCHEMA (Open Demo)

-- Tables
create table if not exists public.categories (
  id bigint generated always as identity primary key,
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  category_id bigint references public.categories(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id bigint generated always as identity primary key,
  post_id bigint not null references public.posts(id) on delete cascade,
  author text not null default 'Anonymous',
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger to keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger trg_posts_updated
before update on public.posts
for each row execute function public.set_updated_at();

create or replace trigger trg_comments_updated
before update on public.comments
for each row execute function public.set_updated_at();

-- Indexes
create index if not exists idx_posts_created_at on public.posts(created_at desc);
create index if not exists idx_posts_category on public.posts(category_id);
create index if not exists idx_comments_post_id_created on public.comments(post_id, created_at desc);

-- RLS + permissive demo policies
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.categories enable row level security;

drop policy if exists "posts read" on public.posts;
drop policy if exists "posts insert" on public.posts;
drop policy if exists "posts update" on public.posts;
drop policy if exists "posts delete" on public.posts;

create policy "posts read" on public.posts for select using (true);
create policy "posts insert" on public.posts for insert with check (true);
create policy "posts update" on public.posts for update using (true);
create policy "posts delete" on public.posts for delete using (true);

drop policy if exists "comments read" on public.comments;
drop policy if exists "comments insert" on public.comments;
drop policy if exists "comments update" on public.comments;
drop policy if exists "comments delete" on public.comments;

create policy "comments read" on public.comments for select using (true);
create policy "comments insert" on public.comments for insert with check (true);
create policy "comments update" on public.comments for update using (true);
create policy "comments delete" on public.comments for delete using (true);

drop policy if exists "categories read" on public.categories;
drop policy if exists "categories insert" on public.categories;
drop policy if exists "categories update" on public.categories;
drop policy if exists "categories delete" on public.categories;

create policy "categories read" on public.categories for select using (true);
create policy "categories insert" on public.categories for insert with check (true);
create policy "categories update" on public.categories for update using (true);
create policy "categories delete" on public.categories for delete using (true);