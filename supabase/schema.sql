create table if not exists public.site_content (
	id smallint primary key check (id = 1),
	content jsonb not null,
	updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

revoke all on public.site_content from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
	'site-assets',
	'site-assets',
	true,
	3145728,
	array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
	file_size_limit = excluded.file_size_limit,
	allowed_mime_types = excluded.allowed_mime_types;