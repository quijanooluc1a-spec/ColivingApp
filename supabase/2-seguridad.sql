-- =====================================================================
-- Roomies Deco · Archivo 2 de 5: la seguridad (Row Level Security)
--
-- Qué hace: decide quién puede ver y cambiar cada fila de cada tabla.
-- Dónde se corre: SQL Editor → New query → pega TODO este archivo → Run.
-- Cuándo: una sola vez, después del archivo 1 (paso 3 de GUIA-SUPABASE.md).
--
-- Por qué hace falta: la clave que va dentro de la app es pública (cualquiera
-- que tenga la app la puede ver). Sin estas reglas, con esa clave se podría
-- leer o borrar todo. Con ellas, cada persona solo ve lo de su casa y solo
-- cambia lo suyo.
--
-- Cómo leer una regla ("policy"):
--   for select  → para leer          using (...)      → qué filas puede tocar
--   for insert  → para crear         with check (...) → cómo deben quedar las filas
--   for update  → para cambiar
--   for delete  → para borrar
--   auth.uid()  → el id de la persona que inició sesión en la app
-- =====================================================================


-- 1. Encender la seguridad en todas las tablas.
--    Desde aquí, si no hay una regla que lo permita, no se puede hacer nada.
alter table public.casas      enable row level security;
alter table public.usuarios   enable row level security;
alter table public.muebles    enable row level security;
alter table public.guardados  enable row level security;
alter table public.moodboards enable row level security;
alter table public.ideas      enable row level security;
alter table public.encuestas  enable row level security;
alter table public.votos      enable row level security;


-- 2. Una ayuda: la casa de la persona que inició sesión.
create function public.mi_casa()
returns uuid
language sql
stable
security definer set search_path = ''
as $$
  select id_casa from public.usuarios where id = (select auth.uid())
$$;


-- 3. Casas: cada persona ve su casa.
create policy "Ver mi casa"
on public.casas for select to authenticated
using (id = (select public.mi_casa()));


-- 4. Usuarios: ver a los roommates de mi casa; cambiar solo mi perfil.
create policy "Ver a mis roommates"
on public.usuarios for select to authenticated
using (id = (select auth.uid()) or id_casa = (select public.mi_casa()));

create policy "Cambiar mi perfil"
on public.usuarios for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

-- De mi perfil solo se pueden cambiar estas columnas (no el correo ni la casa)
revoke update on public.usuarios from anon, authenticated;
grant update (nombre, convive, vibras, notificaciones) on public.usuarios to authenticated;


-- 5. Muebles: el catálogo lo ve cualquier persona que inició sesión. Nadie lo cambia desde la app.
create policy "Ver el catálogo"
on public.muebles for select to authenticated
using (true);


-- 6. Guardados: cada persona ve, agrega y quita los suyos.
create policy "Ver mis guardados"
on public.guardados for select to authenticated
using (id_usuario = (select auth.uid()));

create policy "Guardar un mueble"
on public.guardados for insert to authenticated
with check (id_usuario = (select auth.uid()));

create policy "Quitar un guardado"
on public.guardados for delete to authenticated
using (id_usuario = (select auth.uid()));


-- 7. Mood boards: veo los míos (también los borradores) y los compartidos de mi casa.
--    Solo el dueño los crea, los cambia o los borra.
create policy "Ver mood boards"
on public.moodboards for select to authenticated
using (
  id_dueno = (select auth.uid())
  or (
    compartido
    and id_dueno in (select id from public.usuarios where id_casa = (select public.mi_casa()))
  )
);

create policy "Crear mis mood boards"
on public.moodboards for insert to authenticated
with check (id_dueno = (select auth.uid()));

create policy "Cambiar mis mood boards"
on public.moodboards for update to authenticated
using (id_dueno = (select auth.uid()))
with check (id_dueno = (select auth.uid()));

create policy "Borrar mis mood boards"
on public.moodboards for delete to authenticated
using (id_dueno = (select auth.uid()));


-- 8. Ideas: se ven y se agregan en los mood boards que puedo ver
--    (en la app, cualquier roommate puede agregar ideas a un mood board compartido).
create policy "Ver ideas"
on public.ideas for select to authenticated
using (exists (select 1 from public.moodboards m where m.id = ideas.id_moodboard));

create policy "Agregar ideas"
on public.ideas for insert to authenticated
with check (exists (select 1 from public.moodboards m where m.id = ideas.id_moodboard));


-- 9. Encuestas: las de mi casa. Las crea cualquiera de la casa a su nombre.
--    Cualquiera de la casa puede cerrarlas (la app las cierra cuando votan todos o se acaba el tiempo),
--    pero solo puede cambiar el estado, la ronda y la hora de cierre.
create policy "Ver encuestas de mi casa"
on public.encuestas for select to authenticated
using (id_casa = (select public.mi_casa()));

create policy "Crear encuestas"
on public.encuestas for insert to authenticated
with check (id_creador = (select auth.uid()) and id_casa = (select public.mi_casa()));

create policy "Cerrar encuestas de mi casa"
on public.encuestas for update to authenticated
using (id_casa = (select public.mi_casa()))
with check (id_casa = (select public.mi_casa()));

revoke update on public.encuestas from anon, authenticated;
grant update (estado, ronda, cierra) on public.encuestas to authenticated;


-- 10. Votos: se ven los de las encuestas de mi casa (la app nunca muestra quién votó qué).
--     Cada persona crea y cambia solo su voto, y solo en la ronda que está abierta.
create policy "Ver votos de mi casa"
on public.votos for select to authenticated
using (exists (select 1 from public.encuestas e where e.id = votos.id_encuesta));

create policy "Votar"
on public.votos for insert to authenticated
with check (
  id_usuario = (select auth.uid())
  and exists (
    select 1 from public.encuestas e
    where e.id = votos.id_encuesta
      and e.ronda = votos.ronda
      and e.estado in ('activa', 'empate')
  )
);

create policy "Cambiar mi voto"
on public.votos for update to authenticated
using (id_usuario = (select auth.uid()))
with check (
  id_usuario = (select auth.uid())
  and exists (
    select 1 from public.encuestas e
    where e.id = votos.id_encuesta
      and e.ronda = votos.ronda
      and e.estado in ('activa', 'empate')
  )
);
