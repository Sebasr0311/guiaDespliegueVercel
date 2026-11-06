-- Solo para contenido público y ficticio. Ejecutar en Supabase SQL Editor.
create table if not exists public.recursos_demo (
  id bigint generated always as identity primary key,
  titulo text not null,
  descripcion text not null
);
insert into public.recursos_demo (titulo, descripcion)
select 'Mi primer deploy', 'Frontend conectado a Supabase'
where not exists (select 1 from public.recursos_demo where titulo='Mi primer deploy');
insert into public.recursos_demo (titulo, descripcion)
select 'Aprendiendo RLS', 'Lectura pública de datos de prueba'
where not exists (select 1 from public.recursos_demo where titulo='Aprendiendo RLS');
alter table public.recursos_demo enable row level security;
revoke all on table public.recursos_demo from anon, authenticated;
grant select on table public.recursos_demo to anon;
drop policy if exists "Leer recursos demo publicos" on public.recursos_demo;
create policy "Leer recursos demo publicos" on public.recursos_demo
  for select to anon using (true);
