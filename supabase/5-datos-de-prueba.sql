-- =====================================================================
-- Roomies Deco · Archivo 5 de 5: los datos de prueba de los 3 roommates
--
-- Qué hace: completa los perfiles de Ana, Mateo y Valentina y crea sus guardados,
--           mood boards, encuestas y votos (los mismos de assets/Datos).
-- ANTES de correrlo: crea las 3 cuentas en Authentication → Users → "Add user"
--   (paso 6 de la guía): ana@email.com, mateo@email.com, valentina@email.com
-- Dónde se corre: SQL Editor → New query → pega TODO este archivo → Run.
-- Cuándo: una sola vez. Las horas de las encuestas se calculan desde el momento en que lo corres.
-- Este archivo se generó desde los datos de prueba de la app.
-- =====================================================================

-- Revisa que existan las 3 cuentas; si falta alguna, se detiene con un mensaje claro
do $$
declare
  cuenta text;
begin
  foreach cuenta in array array['ana@email.com', 'mateo@email.com', 'valentina@email.com'] loop
    if not exists (select 1 from public.usuarios where usuarios.correo = cuenta) then
      raise exception 'Falta la cuenta %: créala en Authentication → Users → Add user (paso 6 de GUIA-SUPABASE.md)', cuenta;
    end if;
  end loop;
end;
$$;

-- Una ayuda para este archivo: el id de una cuenta a partir de su correo
create function pg_temp.id_de(correo_buscado text)
returns uuid
language sql
as $$ select id from public.usuarios where correo = correo_buscado $$;

-- Si alguna cuenta se creó antes que la casa, queda en la casa
update public.usuarios
set id_casa = (select id from public.casas order by creada limit 1)
where id_casa is null;


-- Perfiles
update public.usuarios set nombre = 'Ana Gómez', iniciales = 'AG', color_avatar = 'principalSuave', convive = 'Roomies', vibras = '{"Cálido","Natural"}', notificaciones = '{"activas":true,"nuevas":true,"resultados":true}' where correo = 'ana@email.com';
update public.usuarios set nombre = 'Mateo Ruiz', iniciales = 'MR', color_avatar = 'verdeSuave', convive = 'Roomies', vibras = '{"Minimalista"}', notificaciones = '{"activas":true,"nuevas":true,"resultados":false}' where correo = 'mateo@email.com';
update public.usuarios set nombre = 'Valentina Díaz', iniciales = 'VD', color_avatar = 'amarilloSuave', convive = 'Roomies', vibras = '{"Natural","Colorido"}', notificaciones = '{"activas":false,"nuevas":false,"resultados":false}' where correo = 'valentina@email.com';


-- Muebles guardados
insert into public.guardados (id_usuario, id_mueble)
values
  (pg_temp.id_de('ana@email.com'), 'm1'),
  (pg_temp.id_de('ana@email.com'), 'm20'),
  (pg_temp.id_de('ana@email.com'), 'm12'),
  (pg_temp.id_de('ana@email.com'), 'm17'),
  (pg_temp.id_de('ana@email.com'), 'm7'),
  (pg_temp.id_de('ana@email.com'), 'm19'),
  (pg_temp.id_de('mateo@email.com'), 'm18'),
  (pg_temp.id_de('mateo@email.com'), 'm10'),
  (pg_temp.id_de('mateo@email.com'), 'm6'),
  (pg_temp.id_de('mateo@email.com'), 'm16'),
  (pg_temp.id_de('valentina@email.com'), 'm21'),
  (pg_temp.id_de('valentina@email.com'), 'm9'),
  (pg_temp.id_de('valentina@email.com'), 'm15'),
  (pg_temp.id_de('valentina@email.com'), 'm5'),
  (pg_temp.id_de('valentina@email.com'), 'm11')
on conflict do nothing;


-- Mood boards
insert into public.moodboards (id, nombre, id_dueno, vibras, descripcion, compartido)
values
  ('b0000000-0000-4000-8000-000000000001', 'Sala acogedora', pg_temp.id_de('ana@email.com'), '{"Cálido","Natural"}', 'Tonos tierra, plantas y madera clara para una sala acogedora.', true),  -- mb1
  ('b0000000-0000-4000-8000-000000000002', 'Mi cuarto', pg_temp.id_de('ana@email.com'), '{"Natural"}', '', false),  -- mb2
  ('b0000000-0000-4000-8000-000000000003', 'Sala minimalista', pg_temp.id_de('mateo@email.com'), '{"Minimalista"}', 'Blanco, madera clara y pocas cosas a la vista.', true),  -- mb3
  ('b0000000-0000-4000-8000-000000000004', 'Rincón verde', pg_temp.id_de('valentina@email.com'), '{"Natural","Colorido"}', 'Plantas, colores alegres y luz cálida.', true),  -- mb4
  ('b0000000-0000-4000-8000-000000000005', 'Comedor industrial', pg_temp.id_de('mateo@email.com'), '{"Industrial"}', 'Metal negro, vidrio ámbar y madera oscura.', true)  -- mb5
on conflict (id) do nothing;


-- Ideas de cada mood board (en orden)
insert into public.ideas (id_moodboard, id_mueble, creada)
values
  ('b0000000-0000-4000-8000-000000000001', 'm1', now() - interval '30 days'),
  ('b0000000-0000-4000-8000-000000000001', 'm20', now() - interval '29 days'),
  ('b0000000-0000-4000-8000-000000000001', 'm12', now() - interval '28 days'),
  ('b0000000-0000-4000-8000-000000000001', 'm17', now() - interval '27 days'),
  ('b0000000-0000-4000-8000-000000000002', 'm19', now() - interval '30 days'),
  ('b0000000-0000-4000-8000-000000000002', 'm3', now() - interval '29 days'),
  ('b0000000-0000-4000-8000-000000000002', 'm7', now() - interval '28 days'),
  ('b0000000-0000-4000-8000-000000000003', 'm18', now() - interval '30 days'),
  ('b0000000-0000-4000-8000-000000000003', 'm17', now() - interval '29 days'),
  ('b0000000-0000-4000-8000-000000000003', 'm10', now() - interval '28 days'),
  ('b0000000-0000-4000-8000-000000000003', 'm6', now() - interval '27 days'),
  ('b0000000-0000-4000-8000-000000000004', 'm20', now() - interval '30 days'),
  ('b0000000-0000-4000-8000-000000000004', 'm21', now() - interval '29 days'),
  ('b0000000-0000-4000-8000-000000000004', 'm11', now() - interval '28 days'),
  ('b0000000-0000-4000-8000-000000000004', 'm5', now() - interval '27 days'),
  ('b0000000-0000-4000-8000-000000000004', 'm17', now() - interval '26 days'),
  ('b0000000-0000-4000-8000-000000000005', 'm10', now() - interval '30 days'),
  ('b0000000-0000-4000-8000-000000000005', 'm14', now() - interval '29 days'),
  ('b0000000-0000-4000-8000-000000000005', 'm12', now() - interval '28 days'),
  ('b0000000-0000-4000-8000-000000000005', 'm8', now() - interval '27 days');


-- Encuestas (una de cada estado que muestra el Figma)
insert into public.encuestas (id, id_casa, id_mueble, id_moodboard, id_creador, pregunta, texto_si, texto_no, creada, cierra, estado, ronda)
values
  ('e0000000-0000-4000-8000-000000000001', (select id from public.casas order by creada limit 1), 'm1', 'b0000000-0000-4000-8000-000000000001', pg_temp.id_de('ana@email.com'), '¿Lo ponemos en la sala?', 'Me gusta', 'No me gusta', now() - interval '6 hours', now() + interval '42 hours', 'activa', 1),  -- e1
  ('e0000000-0000-4000-8000-000000000002', (select id from public.casas order by creada limit 1), 'm12', 'b0000000-0000-4000-8000-000000000005', pg_temp.id_de('mateo@email.com'), '¿La ponemos junto al sofá?', 'Me gusta', 'No me gusta', now() - interval '20 hours', now() + interval '4 hours', 'activa', 1),  -- e2
  ('e0000000-0000-4000-8000-000000000003', (select id from public.casas order by creada limit 1), 'm17', 'b0000000-0000-4000-8000-000000000004', pg_temp.id_de('valentina@email.com'), '¿La ponemos en el comedor?', 'Me gusta', 'No me gusta', now() - interval '2 hours', now() + interval '70 hours', 'activa', 1),  -- e3
  ('e0000000-0000-4000-8000-000000000004', (select id from public.casas order by creada limit 1), 'm10', 'b0000000-0000-4000-8000-000000000003', pg_temp.id_de('mateo@email.com'), '¿La ponemos en el comedor?', 'Sí, la ponemos', 'No, buscamos otra', now() - interval '120 hours', now() - interval '96 hours', 'aprobada', 1),  -- e4
  ('e0000000-0000-4000-8000-000000000005', (select id from public.casas order by creada limit 1), 'm11', 'b0000000-0000-4000-8000-000000000004', pg_temp.id_de('valentina@email.com'), '¿La ponemos en la sala?', 'Sí, la ponemos', 'No, buscamos otra', now() - interval '96 hours', now() - interval '72 hours', 'rechazada', 1),  -- e5
  ('e0000000-0000-4000-8000-000000000006', (select id from public.casas order by creada limit 1), 'm5', 'b0000000-0000-4000-8000-000000000004', pg_temp.id_de('valentina@email.com'), '¿Lo ponemos en la sala?', 'Sí, ponerlo', 'No ponerlo', now() - interval '52 hours', now() + interval '20 hours', 'empate', 2),  -- e6
  ('e0000000-0000-4000-8000-000000000007', (select id from public.casas order by creada limit 1), 'm21', 'b0000000-0000-4000-8000-000000000004', pg_temp.id_de('valentina@email.com'), '¿La ponemos en la sala?', 'Sí, ponerla', 'No ponerla', now() - interval '144 hours', now() - interval '120 hours', 'aprobada', 2)  -- e7
on conflict (id) do nothing;


-- Votos
insert into public.votos (id_encuesta, id_usuario, ronda, valor)
values
  ('e0000000-0000-4000-8000-000000000001', pg_temp.id_de('ana@email.com'), 1, 'si'),
  ('e0000000-0000-4000-8000-000000000001', pg_temp.id_de('mateo@email.com'), 1, 'si'),
  ('e0000000-0000-4000-8000-000000000002', pg_temp.id_de('mateo@email.com'), 1, 'si'),
  ('e0000000-0000-4000-8000-000000000002', pg_temp.id_de('valentina@email.com'), 1, 'no'),
  ('e0000000-0000-4000-8000-000000000003', pg_temp.id_de('valentina@email.com'), 1, 'si'),
  ('e0000000-0000-4000-8000-000000000004', pg_temp.id_de('ana@email.com'), 1, 'si'),
  ('e0000000-0000-4000-8000-000000000004', pg_temp.id_de('mateo@email.com'), 1, 'si'),
  ('e0000000-0000-4000-8000-000000000004', pg_temp.id_de('valentina@email.com'), 1, 'no'),
  ('e0000000-0000-4000-8000-000000000005', pg_temp.id_de('ana@email.com'), 1, 'no'),
  ('e0000000-0000-4000-8000-000000000005', pg_temp.id_de('mateo@email.com'), 1, 'no'),
  ('e0000000-0000-4000-8000-000000000005', pg_temp.id_de('valentina@email.com'), 1, 'si'),
  ('e0000000-0000-4000-8000-000000000006', pg_temp.id_de('ana@email.com'), 1, 'si'),
  ('e0000000-0000-4000-8000-000000000006', pg_temp.id_de('mateo@email.com'), 1, 'no'),
  ('e0000000-0000-4000-8000-000000000006', pg_temp.id_de('mateo@email.com'), 2, 'no'),
  ('e0000000-0000-4000-8000-000000000006', pg_temp.id_de('valentina@email.com'), 2, 'si'),
  ('e0000000-0000-4000-8000-000000000007', pg_temp.id_de('ana@email.com'), 1, 'si'),
  ('e0000000-0000-4000-8000-000000000007', pg_temp.id_de('valentina@email.com'), 1, 'no'),
  ('e0000000-0000-4000-8000-000000000007', pg_temp.id_de('ana@email.com'), 2, 'si'),
  ('e0000000-0000-4000-8000-000000000007', pg_temp.id_de('mateo@email.com'), 2, 'si'),
  ('e0000000-0000-4000-8000-000000000007', pg_temp.id_de('valentina@email.com'), 2, 'no')
on conflict do nothing;
