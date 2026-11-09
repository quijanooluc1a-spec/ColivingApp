-- =====================================================================
-- Roomies Deco · Archivo 3 de 5: las carpetas de fotos (Storage)
--
-- Qué hace: crea dos carpetas ("buckets") para guardar fotos:
--   muebles → las 21 fotos del catálogo (se suben a mano, paso 5 de la guía)
--   fotos   → las fotos que la gente sube desde el carrete al crear un mood board
-- Las dos son públicas: cualquiera con el enlace puede VER una foto,
-- pero solo una persona que inició sesión puede SUBIR, y solo a su propia carpeta.
--
-- Dónde se corre: SQL Editor → New query → pega TODO este archivo → Run.
-- Cuándo: una sola vez, después del archivo 2.
-- =====================================================================

insert into storage.buckets (id, name, public)
values
  ('muebles', 'muebles', true),
  ('fotos', 'fotos', true)
on conflict (id) do nothing;

-- Subir fotos: solo a "fotos/<mi id>/...", por ejemplo "fotos/8f1c.../1731000000000.jpg"
create policy "Subir mis fotos"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'fotos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);
