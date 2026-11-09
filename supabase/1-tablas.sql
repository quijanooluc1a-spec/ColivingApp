-- =====================================================================
-- Roomies Deco · Archivo 1 de 5: las tablas
--
-- Qué hace: crea las tablas donde la app guarda sus datos.
-- Dónde se corre: en Supabase, menú "SQL Editor" → "New query" →
--                 pega TODO este archivo → botón "Run".
-- Cuándo: una sola vez, al empezar (paso 3 de GUIA-SUPABASE.md).
--
-- Cada tabla corresponde a un archivo de assets/Datos de la app:
--   casas       ← casa.jsx
--   usuarios    ← usuarios.jsx (el correo y la contraseña los guarda Supabase Auth)
--   muebles     ← muebles.jsx
--   guardados   ← la lista "guardados" de cada usuario
--   moodboards  ← moodboards.jsx
--   ideas       ← la lista "ideas" de cada mood board
--   encuestas   ← encuestas.jsx
--   votos       ← votos.jsx
-- =====================================================================


-- La casa que comparten los roommates
create table public.casas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  creada timestamptz not null default now()
);


-- El perfil de cada persona.
-- El id es el mismo que Supabase le da a la cuenta (tabla auth.users).
create table public.usuarios (
  id uuid primary key references auth.users (id) on delete cascade,
  nombre text not null,
  correo text not null,
  iniciales text not null,
  color_avatar text not null default 'principalSuave',  -- un color de Tema.jsx
  convive text not null default 'Roomies',
  vibras text[] not null default '{}',
  id_casa uuid references public.casas (id),
  notificaciones jsonb not null default '{"activas": true, "nuevas": true, "resultados": true}'
);


-- El catálogo de muebles.
-- "imagen" es el nombre del archivo de la foto en Storage (carpeta "muebles"), por ejemplo "sofa-3-puestos.jpg".
create table public.muebles (
  id text primary key,                      -- "m1", "m2"... igual que en los datos de prueba
  orden integer not null,                   -- el orden en que salen en Explorar
  nombre text not null,
  categoria text not null,
  precio integer not null,                  -- en pesos colombianos
  imagen text not null,
  proporcion numeric not null default 1,    -- alto de la foto dividido por su ancho
  tienda text not null default 'Homecenter',
  largo integer,                            -- en centímetros
  ancho integer,
  alto integer,
  color text,
  materiales text[] not null default '{}',
  estilo text,
  descripcion text,
  colores text[] not null default '{}',     -- los 5 colores principales de la foto
  -- Para buscar sin importar tildes ni mayúsculas ("lampara" encuentra "Lámpara").
  -- Se calcula sola con el nombre, la categoría, el estilo y el color: no hay que llenarla.
  busqueda text generated always as (
    translate(
      lower(nombre || ' ' || categoria || ' ' || coalesce(estilo, '') || ' ' || coalesce(color, '')),
      'áäéëíïóöúü',
      'aaeeiioouu'
    )
  ) stored
);


-- Los muebles que cada persona guardó
create table public.guardados (
  id_usuario uuid not null references public.usuarios (id) on delete cascade,
  id_mueble text not null references public.muebles (id) on delete cascade,
  guardado timestamptz not null default now(),
  primary key (id_usuario, id_mueble)       -- cada mueble se guarda una sola vez por persona
);


-- Los mood boards. "compartido = false" es un borrador que solo ve su dueño.
create table public.moodboards (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  id_dueno uuid not null references public.usuarios (id) on delete cascade,
  vibras text[] not null default '{}',
  descripcion text not null default '',
  compartido boolean not null default false,
  creado timestamptz not null default now()
);


-- Las ideas de cada mood board: un mueble del catálogo (id_mueble) o una foto subida (foto).
create table public.ideas (
  id uuid primary key default gen_random_uuid(),
  id_moodboard uuid not null references public.moodboards (id) on delete cascade,
  id_mueble text references public.muebles (id),
  foto text,                                -- dirección de la foto en Storage (carpeta "fotos")
  colores text[] not null default '{}',     -- los colores de la foto (para la paleta)
  creada timestamptz not null default now(),
  constraint mueble_o_foto check ((id_mueble is null) <> (foto is null))  -- una cosa o la otra
);


-- Las encuestas.
--   estado: "activa" (ronda 1 abierta), "empate" (desempate abierto), "aprobada" o "rechazada".
--   ronda:  la que se está votando, o en la que se decidió (1 normal, 2 desempate).
--   cierra: cuándo se cierra la ronda abierta, o cuándo se cerró la encuesta.
-- Las reglas para cerrar y contar están en la app: assets/Logica/votacion.jsx
create table public.encuestas (
  id uuid primary key default gen_random_uuid(),
  id_casa uuid not null references public.casas (id),
  id_mueble text not null references public.muebles (id),
  id_moodboard uuid references public.moodboards (id) on delete set null,
  id_creador uuid not null references public.usuarios (id) on delete cascade,
  pregunta text not null,
  texto_si text not null,
  texto_no text not null,
  creada timestamptz not null default now(),
  cierra timestamptz not null,
  estado text not null default 'activa' check (estado in ('activa', 'empate', 'aprobada', 'rechazada')),
  ronda integer not null default 1 check (ronda in (1, 2))
);


-- Los votos. Cada persona tiene como máximo un voto por encuesta y por ronda.
create table public.votos (
  id uuid primary key default gen_random_uuid(),
  id_encuesta uuid not null references public.encuestas (id) on delete cascade,
  id_usuario uuid not null references public.usuarios (id) on delete cascade,
  ronda integer not null check (ronda in (1, 2)),
  valor text not null check (valor in ('si', 'no')),
  unique (id_encuesta, id_usuario, ronda)
);


-- Índices: hacen más rápidas las búsquedas que la app hace todo el tiempo
create index on public.usuarios (id_casa);
create index on public.moodboards (id_dueno);
create index on public.ideas (id_moodboard);
create index on public.encuestas (id_casa);
create index on public.votos (id_encuesta);


-- Cuando alguien crea su cuenta, se crea su perfil en "usuarios" automáticamente.
-- El nombre llega desde la app (registro). La persona queda en la casa (esta versión tiene una sola casa).
create function public.crear_perfil()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  nombre_nuevo text;
  primera_casa uuid;
  cuantos integer;
begin
  nombre_nuevo := coalesce(nullif(trim(new.raw_user_meta_data ->> 'nombre'), ''), split_part(new.email, '@', 1));
  primera_casa := (select id from public.casas order by creada limit 1);
  cuantos := (select count(*) from public.usuarios);

  insert into public.usuarios (id, nombre, correo, iniciales, color_avatar, id_casa)
  values (
    new.id,
    nombre_nuevo,
    new.email,
    upper(left(nombre_nuevo, 1) || left(split_part(nombre_nuevo, ' ', 2), 1)),  -- "Ana Gómez" → "AG"
    (array['principalSuave', 'verdeSuave', 'amarilloSuave'])[cuantos % 3 + 1],   -- los colores se turnan
    primera_casa
  );
  return new;
end;
$$;

create trigger al_crear_cuenta
after insert on auth.users
for each row execute function public.crear_perfil();
