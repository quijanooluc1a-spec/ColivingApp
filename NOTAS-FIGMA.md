# Notas para continuar (Figma → app)

Archivo Figma (copia con permiso de edición): `0HoPxZZnNi0tUtAwcYstVY`, página **Mockups** (`0:1`).
La propuesta aprobada está en `FASE-1-propuesta.md` (estilo de la plantilla cafe-app: JS, `assets/Components`, `assets/Styles/Stylesheet.jsx`, `src/app`).

## Frames (id de nodo)

| # | Pantalla | Nodo |
|---|---|---|
| 1 | Inicio de sesión | `52:158` |
| 2 | Registro | `52:185` |
| 3 | Completar perfil | `72:520` |
| 4 | Explorar | `3:2` |
| 6 | Explorar · Sofás | `53:189` |
| 7 | Explorar · Mesas | `53:281` |
| 8 | Explorar · Lámparas | `53:361` |
| 9 | Detalle del mueble | `3:107` |
| 10 | Mood boards | `4:179` |
| 10b | Mood boards · Mis moodboards | `143:823` |
| 11 | Detalle de mood board | `4:314` |
| 11b | Explorar · Agregar idea | `140:400` |
| 12 | Mis mood boards | `52:290` |
| 13 | Nuevo mood board | `52:360` |
| 14 | Mood board guardado | `73:791` |
| 15 | Mi mood board | `73:890` |
| 17 | Mood board con idea nueva | `73:985` |
| 18 | Votación de mood boards (elegir objeto) | `73:1171` |
| 19 | Empate | `73:1266` |
| 20 | Votación de desempate | `79:579` |
| 21 | Decisión final | `73:1361` |
| 22 | Encuestas | `3:139` |
| 23 | Nueva encuesta | `3:259` |
| 24 | Resultado de encuesta | `4:141` |
| 25 | Resultado (no ganó) | `53:441` |
| 25b | Resultado (silla, no ganó) | `133:404` |
| 26 | Perfil | `24:137` |

Componentes sueltos: barra inferior `3:85`, tarjeta de mueble `3:23`, botón "+" de agregar idea `140:428`.

## Fotos de muebles en el Figma (21) y dónde aparecen

| Mueble | Precio | Nodo donde aparece |
|---|---|---|
| Sofá 3 puestos | 890.000 | `3:115` (detalle) |
| Sofá esquinero | 1.450.000 | `53:223` |
| Sillón individual | 520.000 | `53:235` |
| Sofá cama | 960.000 | `53:247` |
| Love seat azul | 780.000 | `56:353` |
| Mesa auxiliar | 150.000 | `53:303` |
| Mesa de centro | 280.000 | `53:312` |
| Mesa redonda | 480.000 | `53:321` |
| Mesa flor | 320.000 | `53:330` |
| Mesa de comedor (en el feed se llama "Mesa auxiliar") | 150.000 | `3:76` |
| Lámpara de pie | 180.000 | `53:383` |
| Lámpara de pie (arco negro) | 180.000 | `3:54` |
| Lámpara de mesa | 95.000 | `53:392` |
| Lámpara colgante | 130.000 | `53:401` |
| Lámpara de noche | 75.000 | `53:410` |
| Lámpara espiral | 110.000 | `56:365` |
| Silla de comedor | 240.000 | `3:44` |
| Estante blanco (en el feed se llama "Estante de madera") | 410.000 | `3:63` |
| Estante de madera | — | `53:496` (sugerencia) |
| Planta decorativa | 120.000 | `3:35` |
| Planta monstera | — | `53:485` (sugerencia) |

## Títulos y botones de cada pantalla

Sacados del Figma en la Fase 2. Las pantallas con flecha usan el título de 22; las pestañas, el de 28.

| # | Título | Botones |
|---|---|---|
| 1 | "Bienvenido" (sin encabezado, con logo) | Iniciar sesión · Crear cuenta · "Olvidé mi contraseña" |
| 2 | Crear cuenta (con flecha) | Crear cuenta |
| 3 | Completa tu perfil (con flecha) | Empezar |
| 4, 6, 7, 8 | Explorar + buscador "Buscar muebles, estilos…" | Chips Todo / Sofás / Mesas / Lámparas · Cargar más ideas |
| 9 | Detalle (con flecha) | "Guardar en Encuestas" (la propuesta lo cambia a "Guardar en moodboard") · Comprar |
| 10 | Moodboards + chip "+ Nuevo" a la derecha | Chips Todos / Mis moodboards |
| 11 | Moodboard (con flecha); en 14 y 17 el título es el nombre, p. ej. "Sala acogedora" | Agregar idea · Poner a votación |
| 11b | Agregar idea (con flecha, título de 28) + buscador | Botón "+" en cada mueble |
| 12 | Mis mood boards (con flecha) + "+ Nuevo" | — |
| 13 | Nuevo moodboard (con flecha) | Guardar moodboard |
| 18 | Poner a votación (con flecha) | Poner a votación · Cancelar |
| 19 | Resultado (con flecha) | Desempatar de forma anónima · Volver a mood boards |
| 20 | Desempate (con flecha) | Opciones "Sí, ponerla" / "No ponerla" · Enviar voto de desempate · Cancelar |
| 21 | Decisión final (con flecha) | Ir a Encuestas · Volver a mood boards |
| 22 | Encuestas + "Apartamento · 3 inquilinos" | "+ Nuevo" junto a los avatares · Me gusta / No me gusta · Encuesta |
| 23 | Nueva encuesta (con flecha) | Opciones "Sí, lo ponemos" / "No, buscamos otro" · "Agregar opción" · Publicar encuesta |
| 24 | Resultado (con flecha) | Comprar mueble · Volver a Encuestas |
| 25 | Resultado (con flecha) | Hacer nueva propuesta · Volver a Encuestas |
| 26 | Perfil + "Apartamento · 3 inquilinos" | Cerrar sesión |

Íconos (Lucide, trazo de 24): barra inferior `Compass`, `Folder`, `LayoutGrid`, `User`; volver `ArrowLeft`; logo `House`.

## Colores

Las 12 variables de color del Figma (revisadas el 5 nov 2026 en las pantallas 4, 22 y 26) son las que están en `assets/Styles/Tema.jsx`. La tabla con el uso de cada una está en `GUIA.md`, sección 3. La página "logo" del Figma está vacía y no hay otra paleta.

## Estado del entorno (5 nov 2026, Fase 2)

- GitHub está conectado. El trabajo está en las ramas `main` y `claude/relaxed-dirac-prmpeb` de https://github.com/quijanooluc1a-spec/ColivingApp.
- El MCP de Figma funciona (estructura y capturas al tamaño original del frame).
- Se creó el entorno de Claude **ColivingApp**, que permite `www.figma.com`; con él ya se pueden descargar las fotos y los íconos del Figma (probado). Las sesiones nuevas de este proyecto deben usar ese entorno, no el Default.
