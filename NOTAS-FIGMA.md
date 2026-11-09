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

## Fotos de muebles del Figma (21) y cómo quedaron en la app

Las fotos se descargaron del Figma en su tamaño original y se guardaron en `assets/images/muebles/` (21 archivos JPG, 1,1 MB en total). Los datos de cada mueble están en `assets/Datos/muebles.jsx`.

| Id | Mueble en la app | Precio en la app | Archivo | Nodo del Figma | En el Figma |
|---|---|---|---|---|---|
| `m1` | Sofá 3 puestos | 890.000 | `sofa-3-puestos.jpg` | `3:115` (detalle) | Igual |
| `m2` | Sofá esquinero | 1.450.000 | `sofa-esquinero.jpg` | `53:223` | Igual |
| `m3` | Sillón individual | 520.000 | `sillon-individual.jpg` | `53:235` | Igual |
| `m4` | Sofá cama | 960.000 | `sofa-cama.jpg` | `53:247` | Igual |
| `m5` | Love seat azul | 780.000 | `love-seat-azul.jpg` | `56:353` | Igual |
| `m6` | Mesa auxiliar | 150.000 | `mesa-auxiliar.jpg` | `53:303` | Igual |
| `m7` | Mesa de centro | 280.000 | `mesa-de-centro.jpg` | `53:312` | Igual |
| `m8` | Mesa redonda | 480.000 | `mesa-redonda.jpg` | `53:321` | Igual |
| `m9` | Mesa flor | 320.000 | `mesa-flor.jpg` | `53:330` | Igual |
| `m10` | **Mesa de comedor** | **690.000** | `mesa-de-comedor.jpg` | `3:76` | En el feed se llama "Mesa auxiliar" y cuesta 150.000, igual que `m6` |
| `m11` | Lámpara de pie | 180.000 | `lampara-de-pie.jpg` | `53:383` | Igual |
| `m12` | **Lámpara de arco** | 180.000 | `lampara-de-arco.jpg` | `3:54` | Se llama "Lámpara de pie", igual que `m11` |
| `m13` | Lámpara de mesa | 95.000 | `lampara-de-mesa.jpg` | `53:392` | Igual |
| `m14` | Lámpara colgante | 130.000 | `lampara-colgante.jpg` | `53:401` | Igual |
| `m15` | Lámpara de noche | 75.000 | `lampara-de-noche.jpg` | `53:410` | Igual |
| `m16` | Lámpara espiral | 110.000 | `lampara-espiral.jpg` | `56:365` | Igual |
| `m17` | Silla de comedor | 240.000 | `silla-de-comedor.jpg` | `3:44` | Igual |
| `m18` | **Estante blanco** | 410.000 | `estante-blanco.jpg` | `3:63` | En el feed se llama "Estante de madera", igual que `m19` |
| `m19` | Estante de madera | **520.000** | `estante-de-madera.jpg` | `53:496` (sugerencia) | Sin precio |
| `m20` | Planta decorativa | 120.000 | `planta-decorativa.jpg` | `3:35` | Igual |
| `m21` | Planta monstera | **160.000** | `planta-monstera.jpg` | `53:485` (sugerencia) | Sin precio |

En negrilla está lo que se cambió o se inventó porque el Figma repetía un nombre o no tenía precio.

El orden de `muebles.jsx` es el orden en que salen en Explorar. Primero van los 6 del feed del Figma (pantalla 4), en el mismo orden: Sofá 3 puestos, Planta decorativa, Silla de comedor, Lámpara de arco, Estante blanco y Mesa de comedor. En el Figma esos 6 se repiten cuatro veces. Después siguen los de las pantallas de categorías y de sugerencias, intercalados para que no salgan todos los sofás juntos.

Las medidas, el color, los materiales, el estilo y la descripción de cada mueble no están en el Figma: se escribieron para los datos de prueba. Los 5 colores de cada mueble (`colores`) se sacaron de su foto.

El Figma no tiene fotos de camas, clósets ni tocadores. Para llegar a los ~30 muebles de la propuesta hacen falta esas fotos.

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

Las 12 variables de color del Figma (revisadas el 5 nov 2026 en las pantallas 4, 22 y 26) son las que están en `assets/Styles/Tema.jsx`. La tabla con el uso de cada una está en `GUIA.md`, sección 4. La página "logo" del Figma está vacía y no hay otra paleta.

## Revisión final contra el Figma (9 nov 2026, Fase 5)

Se compararon lado a lado con la app 23 pantallas: las 10 de la Fase 3 (inicio de sesión, Explorar, detalle del mueble, Mood boards, un mood board, Encuestas, nueva encuesta, resultado, no ganó y perfil) y 13 más en la Fase 5 (2, 3, 10b, 11b, 12, 13, 14, 17, 18, 19, 20, 21 y 25b). No se compararon por separado las pantallas 6, 7 y 8, que son Explorar con un filtro.

**Lo que se corrigió en la Fase 5 para que quede como en el Figma:**

| Pantalla | Antes en la app | Ahora (como en el Figma) |
|---|---|---|
| 2 · Registro | El botón "Crear cuenta" iba pegado abajo de la pantalla | Va debajo de los campos |
| 14 y 17 · Avisos "Mood board guardado" e "Idea agregada" | Check dentro de un círculo y texto oscuro | Check simple y texto verde (`color/like`) |
| 19 · Empate y 21 · Decisión final | La barra del "no" era roja | Las dos barras son verdes |
| 20 · Desempate | La opción elegida quedaba rosada | Queda blanca con borde naranja y un check |
| 25 y 25b · Sugerencias | La sugerencia elegida tenía un check | Tiene un punto naranja lleno |

**Las diferencias que quedan a propósito:**

| Pantalla | En el Figma | En la app | Por qué |
|---|---|---|---|
| Todas | Arriba hay espacio para la hora y la batería | En el navegador todo queda un poco más arriba | En el teléfono, `SafeAreaView` deja ese espacio. En el navegador no hay barra de estado |
| 3 · Completar perfil | 4 vibras | 5 vibras (también "Industrial") | Es la misma lista de la pantalla 13, donde el Figma sí tiene "Industrial" |
| 9 · Detalle | "Guardar en Encuestas" | "Guardar en moodboard", con medidas y materiales | Decisión 1 de la propuesta y sección 8 de la propuesta |
| 11b · Agregar idea | Título de 28 y "+" en todos los muebles | Título de 22, y un check en los muebles que ya están en el mood board | Igual que las demás pantallas con flecha; el check evita agregar dos veces lo mismo |
| 13 · Nuevo mood board | Círculo "+" en la paleta | Sin ese círculo; casilla "+ Fotos" para subir fotos del carrete | La paleta se calcula sola con las fotos |
| 14, 15 y 17 · Mood board | Solo la paleta | Además "¿Qué combina?" y "Vibra" | Lo pide el requerimiento (paredes, pisos, muebles y luz) |
| 18 · Elegir objeto | Todos se pueden elegir | "Ya está en votación" o "Ya se aprobó" en los que no se pueden elegir | Regla de la Fase 4 |
| 19 · Empate | "Si vuelve a empatar, se vota de nuevo hasta decidir" | "Si después de 2 rondas sigue el empate, el mueble no se pone", y cuántos votaron en el desempate | Decisión 3 de la propuesta (aprobada): la votación siempre termina |
| 20 · Desempate | — | "Votaron 2 de 3 inquilinos · cierra en 20 h" | Para saber cuánto falta |
| 21, 25 y 25b | Comillas rectas ("No") | Comillas latinas («No») | Son las comillas del español; la app las usa en todos los textos |
| 22 · Encuestas | Solo encuestas activas | También "Por desempatar" y "Terminadas" | Para ver los empates pendientes y los resultados |
| 23 · Nueva encuesta | "+ Agregar opción" | Dos opciones con chips de textos rápidos | Decisión 2 de la propuesta |
| 25 y 25b · Sugerencias | "Coincide con Inquilino 1 y 4" | "Coincide con Ana y Mateo", calculadas con los mood boards | Las sugerencias son reales (sección 9 de `GUIA.md`) |

## Estado del entorno (8 nov 2026, Fase 3)

- GitHub está conectado. El trabajo está en las ramas `main` y `claude/relaxed-dirac-prmpeb` de https://github.com/quijanooluc1a-spec/ColivingApp.
- El MCP de Figma funciona (estructura y capturas al tamaño original del frame).
- Se creó el entorno de Claude **ColivingApp**, que permite `www.figma.com`. Con él se descargaron las 21 fotos del Figma en la Fase 3. Las sesiones nuevas de este proyecto deben usar ese entorno, no el Default.
- Expo Go en el teléfono todavía no abre el proyecto: pide iniciar sesión en Expo CLI con `npx expo login` (ver la tabla "Si algo no funciona" en `GUIA.md`). Mientras tanto se usa la versión web.
