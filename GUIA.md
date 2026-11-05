# Guía de Roomies Deco

App para que los roommates de una casa decidan juntos cómo decorar: descubren muebles, arman mood boards y votan qué entra al espacio común.

> **Estado: Fase 2 terminada** (proyecto, tema y navegación).
> Ya se puede recorrer toda la app. Cada pantalla muestra por ahora un recuadro con su número del Figma y lo que va a tener en la Fase 3.
> Esta guía se completa en cada fase.

---

## Documentos del proyecto

| Archivo | Qué tiene |
|---|---|
| `GUIA.md` | Esta guía: cómo ejecutar la app, carpetas, colores, navegación y componentes |
| `FASE-1-propuesta.md` | Propuesta aprobada en la Fase 1: pantallas, navegación, componentes y modelo de datos |
| `NOTAS-FIGMA.md` | Código de cada pantalla y foto del Figma, títulos y botones de cada pantalla |
| `HISTORIAL-CONVERSACIONES.md` | Los mensajes de las conversaciones con Claude, en orden y con fecha |
| `docs/imagenes/` | Imágenes para la documentación: colores del Figma y pantallas de la Fase 2 |

---

## 1. Cómo ejecutar la app desde VS Code

### Lo que necesitas instalar (una sola vez)

1. **Node.js 22** (22.13 o más reciente) o **Node.js 24**, desde [nodejs.org](https://nodejs.org). El SDK 58 de Expo no funciona con Node 20. Para revisar tu versión escribe `node --version` en una terminal.
2. **Git**, desde [git-scm.com](https://git-scm.com).
3. **Visual Studio Code**.
4. **Expo Go** en el teléfono, desde la App Store o Google Play, actualizada (abre proyectos del SDK 58).

### Descargar el proyecto (una sola vez)

1. Abre VS Code.
2. Presiona `Ctrl + Shift + P` (en Mac, `Cmd + Shift + P`), escribe **Git: Clone** y presiona Enter.
3. Pega la dirección del repositorio y presiona Enter:

   ```
   https://github.com/quijanooluc1a-spec/ColivingApp.git
   ```

4. Elige la carpeta donde quieres guardarlo y, cuando VS Code pregunte, toca **Open** (Abrir).
5. Si VS Code sugiere instalar la extensión **Expo Tools**, acéptala (ayuda con `app.json`).

### Ejecutar la app

1. Abre la terminal de VS Code: menú **Terminal → New Terminal** (o `` Ctrl + ` ``).
2. La primera vez instala las librerías:

   ```bash
   npm install
   ```

3. Arranca el proyecto:

   ```bash
   npx expo start
   ```

4. Para **ver la app**, elige una opción:
   - **En el teléfono (recomendado):** escanea el código QR que aparece en la terminal. En Android, con la app Expo Go; en iPhone, con la cámara. El teléfono y el computador deben estar en la misma red Wi‑Fi.
   - **En el navegador del computador:** con la terminal seleccionada, presiona la tecla `w`. Se abre la versión web, útil para revisar rápido. La app está pensada para el teléfono, así que algunos detalles se ven distintos.
   - **En un emulador de Android:** si tienes Android Studio instalado, presiona `a`.

Mientras `npx expo start` está corriendo, cada vez que guardas un archivo la app se actualiza sola. Para detenerlo, presiona `Ctrl + C` en la terminal.

### Traer los cambios nuevos

Cuando haya cambios nuevos en GitHub (por ejemplo, al terminar cada fase), tráelos con:

```bash
git pull
```

Si después de traer cambios aparece un error de librerías, vuelve a correr `npm install`.

### Si algo no funciona

| Problema | Solución |
|---|---|
| El teléfono no se conecta al escanear el QR (por ejemplo, en la red de la universidad) | Arranca con `npx expo start --tunnel` |
| Expo Go dice que el proyecto usa otra versión del SDK | Actualiza Expo Go desde la tienda |
| Error al arrancar que menciona la versión de Node | Instala Node.js 22 o 24 y vuelve a abrir VS Code |
| `npx` o `node` no se reconocen | Node.js no quedó instalado; reinstálalo y reinicia VS Code |

---

## 2. Carpetas

Es la misma organización de la plantilla de clase **cafe-app**:

```
ColivingApp/
├── src/app/                 ← pantallas: cada archivo es una pantalla
│   ├── _layout.jsx          ← carga las letras y define la navegación principal (Stack)
│   ├── (tabs)/              ← las 4 pestañas de la barra inferior
│   │   ├── _layout.jsx      ← la barra inferior
│   │   └── explorar.jsx, encuestas.jsx, moodboards.jsx, perfil.jsx
│   └── ...                  ← el resto de pantallas (ver la sección 4)
├── assets/
│   ├── Components/          ← componentes reutilizables, uno por archivo
│   ├── Styles/
│   │   ├── Tema.jsx         ← colores, letras, bordes y espacios del Figma
│   │   └── Stylesheet.jsx   ← todos los estilos (StyleSheet.create)
│   └── images/              ← ícono de la app y pantalla de carga
├── docs/imagenes/           ← imágenes para la documentación
├── app.json                 ← nombre, ícono y colores de la app
├── package.json             ← librerías que usa el proyecto
└── *.md                     ← documentos del proyecto (ver arriba)
```

En las próximas fases se agregan dentro de `assets/` las carpetas `Datos/`, `Servicios/`, `Logica/` y `Contexto/`, como dice la propuesta.

---

## 3. Tema: colores y letras del Figma

Todos los valores del diseño están en **un solo archivo**, `assets/Styles/Tema.jsx`. Si el Figma cambia, se cambia ahí y toda la app se actualiza.

### Colores

Los colores de la app son **las 12 variables de color del Figma**, con los mismos valores. De la plantilla cafe-app solo se tomó la forma de programar; sus colores (`#4B2A19` y `#F1E5D1`) no se usan en ningún archivo.

| En `Tema.jsx` | Variable del Figma | Color | Dónde se usa en el Figma |
|---|---|---|---|
| `fondo` | `color/background` | `#FAF5EE` crema | Fondo de todas las pantallas |
| `superficie` | `color/surface` | `#FFFFFF` blanco | Tarjetas, cajas de texto, barra inferior |
| `borde` | `color/border` | `#E8DED2` beige | Bordes, divisores, fondo de las barras de votos |
| `texto` | `color/text` | `#2B2420` café oscuro | Texto principal |
| `textoSuave` | `color/text-muted` | `#8A817A` gris cálido | Etiquetas, subtítulos, precios |
| `principal` | `color/primary` | `#D9653B` terracota | Botones, chips activos, pestaña activa |
| `sobrePrincipal` | `color/on-primary` | `#FFFFFF` blanco | Texto encima del terracota |
| `principalSuave` | `color/primary-soft` | `#F6DDD0` rosado | Avatar 1, sugerencia elegida, íconos del perfil |
| `verdeSuave` | `color/secondary-soft` | `#DDE7DD` verde claro | Avatar 2, chip de vibra, aviso de ganador |
| `amarilloSuave` | `color/accent-soft` | `#FCEBC6` amarillo | Avatar 3, aviso "Ganó el No" |
| `meGusta` | `color/like` | `#3E8E5A` verde | Botón "Me gusta", barra positiva, interruptor |
| `noMeGusta` | `color/dislike` | `#C8453B` rojo | Botón "No me gusta", barra negativa |

En la Fase 2 casi solo se ven el crema y el terracota, porque las pantallas todavía no tienen sus partes. El amarillo, los verdes y el rosado aparecen en la Fase 3 con los avatares, los avisos, los chips de vibra y los botones de voto. Los tonos tierra de las fotos (sofás verdes, madera, plantas) llegan con las fotos de los muebles.

![Colores de la app y dónde se usan en el Figma](docs/imagenes/colores-figma.png)

### Letras, bordes y espacios

| Grupo | Qué tiene | Ejemplo |
|---|---|---|
| `fuentes` | Los nombres de las 4 letras | `fuentes.poppinsBold` |
| `letras` | Los 7 estilos de texto del Figma: letra, tamaño y alto de línea | `letras.titulo` = Poppins Bold 22 |
| `bordes` | Bordes redondeados: 8, 12, 16, 24 y 999 | `bordes.normal` = 16 |
| `espacios` | Márgenes y separaciones | `espacios.normal` = 16 (margen a los lados) |

`assets/Styles/Stylesheet.jsx` arma los estilos con esos valores, agrupados como en la plantilla: `general`, `boton`, `chip`, `encabezado`, `barraInferior`, `estadoVacio` e `inicio`.

Se usan así:

```jsx
import { general } from "../../assets/Styles/Stylesheet";

<Text style={general.titulo}>Mood boards</Text>
```

En `Stylesheet.jsx` vas a ver `...letras.titulo`. Los tres puntos copian dentro del estilo la letra, el tamaño y el alto de línea que están en `Tema.jsx`.

**Letras:** Poppins (títulos) e Inter (textos), de `@expo-google-fonts`. Se cargan en `src/app/_layout.jsx` con `useFonts`, y mientras cargan no se muestra nada.

**Íconos:** [Lucide](https://lucide.dev) (`lucide-react-native`), los mismos del Figma:

| Dónde | Ícono |
|---|---|
| Pestaña Explorar | `Compass` |
| Pestaña Encuestas | `Folder` |
| Pestaña Mood boards | `LayoutGrid` |
| Pestaña Perfil | `User` |
| Botón volver | `ArrowLeft` |
| Logo | `House` |

---

## 4. Navegación

La app usa **Expo Router**: cada archivo dentro de `src/app` es una pantalla y su ruta es el nombre del archivo. Por ejemplo, `src/app/registro.jsx` es la pantalla `/registro`.

- **`_layout.jsx`** define cómo se pasa de una pantalla a otra. El de `src/app` es un **Stack**: cada pantalla nueva se pone encima de la anterior y se puede volver. El de `(tabs)` es la **barra inferior**.
- **Los paréntesis** en `(tabs)` agrupan pantallas sin cambiar la ruta: `(tabs)/explorar.jsx` es `/explorar`.
- **`[id]`** en el nombre significa que la pantalla recibe un dato. Por ejemplo, `/mueble/m1` abre `mueble/[id].jsx` con `id = "m1"`. La pantalla lo lee así:

  ```jsx
  const { id } = useLocalSearchParams();
  ```

### Pantallas

| Archivo (`src/app/…`) | Ruta | Pantalla del Figma |
|---|---|---|
| `index.jsx` | `/` | 1 · Inicio de sesión (la primera pantalla) |
| `registro.jsx` | `/registro` | 2 · Registro |
| `completar-perfil.jsx` | `/completar-perfil` | 3 · Completar perfil |
| `(tabs)/explorar.jsx` | `/explorar` | 4, 6, 7, 8 · Explorar |
| `(tabs)/encuestas.jsx` | `/encuestas` | 22 · Encuestas |
| `(tabs)/moodboards.jsx` | `/moodboards` | 10, 10b · Mood boards |
| `(tabs)/perfil.jsx` | `/perfil` | 26 · Perfil |
| `mueble/[id].jsx` | `/mueble/m1` | 9 · Detalle del mueble |
| `moodboard/nuevo.jsx` | `/moodboard/nuevo` | 13 · Nuevo mood board |
| `moodboard/[id].jsx` | `/moodboard/mb1` | 11, 14, 15, 17 · Ver un mood board |
| `agregar-idea/[id].jsx` | `/agregar-idea/mb1` | 11b · Agregar idea |
| `elegir-objeto/[id].jsx` | `/elegir-objeto/mb1` | 18 · Poner a votación |
| `encuesta/nueva.jsx` | `/encuesta/nueva` | 23 · Nueva encuesta |
| `encuesta/[id].jsx` | `/encuesta/e1` | 24, 25, 25b, 19, 21 · Resultado |
| `desempate/[id].jsx` | `/desempate/e1` | 20 · Votación de desempate |
| `mis-moodboards.jsx` | `/mis-moodboards` | 12 · Mis mood boards |
| `guardados.jsx` | `/guardados` | (nueva) Muebles guardados |
| `mis-encuestas.jsx` | `/mis-encuestas` | (nueva) Encuestas que creé |
| `mis-votos.jsx` | `/mis-votos` | (nueva) Votos que di |

### Flujo entre pantallas

```mermaid
flowchart TD
  Login["1 · Inicio de sesión"] -->|Crear cuenta| Registro["2 · Registro"]
  Registro -->|Crear cuenta| Completar["3 · Completar perfil"]
  Login -->|Iniciar sesión| Explorar
  Completar -->|Empezar| Explorar

  subgraph Barra["Barra inferior"]
    Explorar["Explorar"]
    Encuestas["Encuestas"]
    Moodboards["Mood boards"]
    Perfil["Perfil"]
  end

  Explorar --> Detalle["9 · Detalle del mueble"]
  Moodboards --> VerMB["Ver mood board"]
  Moodboards -->|+ Nuevo| NuevoMB["13 · Nuevo mood board"]
  NuevoMB -->|Guardar moodboard| VerMB
  VerMB -->|Agregar idea| AgregarIdea["11b · Agregar idea"]
  AgregarIdea --> VerMB
  VerMB -->|Poner a votación| Elegir["18 · Elegir objeto"]
  Elegir -->|Poner a votación| NuevaEnc["23 · Nueva encuesta"]
  NuevaEnc -->|Publicar encuesta| Encuestas
  Encuestas -->|+ Nuevo| Moodboards
  Encuestas --> Resultado["Resultado"]
  Resultado -->|Desempatar| Desempate["20 · Desempate"]
  Desempate -->|Enviar voto| Resultado
  Resultado -->|Hacer nueva propuesta| NuevaEnc
  Resultado -->|Volver a Encuestas| Encuestas
  Perfil --> MisMB["12 · Mis mood boards"]
  Perfil --> Guardados["Guardados"]
  Perfil --> MisEnc["Mis encuestas"]
  Perfil --> MisVotos["Mis votos"]
  Perfil -->|Cerrar sesión| Login
  MisMB --> VerMB
  Guardados --> Detalle
```

### Cómo se cambia de pantalla

Todas las funciones vienen de `router` (`import { router } from "expo-router"`):

| Función | Qué hace | Dónde se usa |
|---|---|---|
| `router.push("/registro")` | Abre una pantalla encima de la actual; se puede volver | Casi todos los botones |
| `router.back()` | Vuelve a la pantalla anterior | Botón volver del `Encabezado`, botones Cancelar, Desempate y Agregar idea |
| `router.replace("/explorar")` | Cambia la pantalla actual por otra; no se puede volver a la anterior | Iniciar sesión, Cerrar sesión, Guardar moodboard |
| `router.navigate("/moodboards")` | Va a una pantalla; si es una pestaña, cambia de pestaña | "+ Nuevo" de Encuestas |
| `router.dismissAll()` | Cierra todas las pantallas de encima hasta la primera | Completar perfil → Empezar |
| `router.dismissTo("/encuestas")` | Cierra pantallas hasta llegar a esa ruta | Publicar encuesta, Volver a Encuestas |

Ejemplo: al tocar **Empezar** en Completar perfil se usan `dismissAll()` y después `replace("/explorar")`. Así el botón "atrás" no vuelve al registro.

---

## 5. Componentes (hasta ahora)

Están en `assets/Components`. Cada uno es una función con sus props entre llaves y `export default` al final, como `ProductoItem` en la plantilla. En esta fase se hicieron los 4 que necesita la navegación; los otros 16 de la propuesta llegan en la Fase 3.

| Componente | Para qué sirve | Props |
|---|---|---|
| `Boton` | Botón grande naranja o blanco con borde naranja | `texto`, `alPresionar`, `tipo` (`"principal"` o `"secundario"`), `deshabilitado` |
| `Chip` | Botón pequeño redondeado (filtros y "+ Nuevo") | `texto`, `seleccionado`, `alPresionar` |
| `Encabezado` | Título de la pantalla, con o sin flecha para volver | `titulo`, `subtitulo`, `conVolver`, `botonDerecha` |
| `EstadoVacio` | Mensaje cuando una lista está vacía | `titulo`, `mensaje` |

Ejemplo de uso:

```jsx
<Encabezado
  titulo="Moodboards"
  botonDerecha={<Chip texto="+ Nuevo" seleccionado={true} alPresionar={irANuevoMoodboard} />}
/>
```

Los botones usan `TouchableOpacity`, que se aclara un poco al tocarlo.

![Pantallas de la Fase 2](docs/imagenes/pantallas-fase-2.png)

---

## 6. Decisiones tomadas donde el Figma no era explícito

| Tema | Decisión |
|---|---|
| Versión de Expo | **SDK 58**, la más reciente. La plantilla de clase usa el 57, pero la app Expo Go de la tienda abre el SDK más reciente, que es el 58. |
| Nombre de la app | **Roomies Deco**. Se cambia en `app.json` (`name`). |
| Ícono y pantalla de carga | Se hicieron con el logo del login del Figma: la casa blanca sobre el cuadrado terracota. |
| Modo oscuro | No hay: el Figma solo tiene modo claro (`"userInterfaceStyle": "light"` en `app.json`). |
| "+ Nuevo" en Encuestas | Lleva a la pestaña Mood boards, porque para crear una encuesta hay que elegir un objeto de un mood board (aprobado el 5 nov 2026). En la Fase 3 el botón pasa a la fila de los avatares, como en el Figma. |
| Barra inferior | Se usa `Tabs` de `expo-router/js-tabs` y no `NativeTabs`. La barra nativa no deja poner los íconos de Lucide ni el texto activo más grande, como en el Figma. |
| Relleno de las pestañas | Se quita el relleno lateral que pone la librería (`tabBarButton` en `(tabs)/_layout.jsx`). Sin ese cambio, "Mood boards" no cabía en una línea. |
| Título de "Agregar idea" | En el Figma esa pantalla tiene flecha y título de 28. Se usa 22, como en las demás pantallas con flecha. |
| Espacio de arriba | Cada pantalla usa `SafeAreaView` para no quedar debajo de la hora y la batería. Las pestañas usan `edges={["top"]}` porque abajo ya está la barra. |

---

## 7. Lo que sigue

- **Fase 3:** construir las pantallas en el orden de la lista, con las fotos del Figma, los datos de prueba (`assets/Datos`) y el contexto compartido (`assets/Contexto`).
- **Fase 4:** lógica de votación, desempate y sugerencias.
- **Fase 5:** revisión final y esta guía completa: modelo de datos, votación paso a paso y cómo conectar un backend real.
