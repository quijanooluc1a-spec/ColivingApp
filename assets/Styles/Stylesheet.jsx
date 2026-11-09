import { StyleSheet } from "react-native";
import { bordes, colores, espacios, fuentes, letras, medidas } from "./Tema";

// Nota: "...letras.titulo" copia aquí la letra, el tamaño y el alto de línea
// que están en Tema.jsx. Así no hay que repetir esos números en cada estilo.
// Las medidas salen del Figma (por ejemplo: tarjetas con borde redondeado de 16 y relleno de 12).

// =====================================================================
// GENERAL: estilos que usan casi todas las pantallas
// =====================================================================

const general = StyleSheet.create({
  // En el computador la app se ve con el ancho de un teléfono, centrada
  marco: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colores.borde,
  },
  app: {
    flex: 1,
    width: "100%",
    maxWidth: medidas.anchoMaximo,
    backgroundColor: colores.fondo,
  },
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    paddingHorizontal: espacios.normal,
    paddingBottom: espacios.normal,
    gap: espacios.normal,
  },
  // Botones fijos abajo de la pantalla (como "acciones" en el Figma)
  acciones: {
    paddingHorizontal: espacios.normal,
    paddingTop: espacios.medio,
    paddingBottom: espacios.normal,
    gap: 10,
  },
  // Chips uno al lado del otro; si no caben, bajan a la siguiente línea
  filaChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: espacios.pequeno,
  },
  // Grupo de etiqueta + contenido (por ejemplo "Paleta" y sus colores)
  grupo: {
    gap: espacios.pequeno,
  },
  cargando: {
    paddingVertical: espacios.grande,
  },
  tituloGrande: {
    ...letras.tituloGrande,
    color: colores.texto,
  },
  titulo: {
    ...letras.titulo,
    color: colores.texto,
  },
  subtitulo: {
    ...letras.subtitulo,
    color: colores.texto,
  },
  texto: {
    ...letras.texto,
    color: colores.texto,
  },
  textoSuave: {
    ...letras.texto,
    color: colores.textoSuave,
  },
  textoFuerte: {
    ...letras.textoFuerte,
    color: colores.texto,
  },
  etiqueta: {
    ...letras.etiqueta,
    color: colores.textoSuave,
  },
  textoPequeno: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
  },
});

// =====================================================================
// COMPONENTES (assets/Components)
// =====================================================================

// Botón grande (Boton.jsx)
const boton = StyleSheet.create({
  principal: {
    backgroundColor: colores.principal,
    borderRadius: bordes.normal,
    paddingVertical: 14,
    paddingHorizontal: espacios.normal,
    alignItems: "center",
  },
  secundario: {
    backgroundColor: colores.superficie,
    borderWidth: 1.5,
    borderColor: colores.principal,
    borderRadius: bordes.normal,
    paddingVertical: 14,
    paddingHorizontal: espacios.normal,
    alignItems: "center",
  },
  deshabilitado: {
    opacity: 0.5,
  },
  textoPrincipal: {
    ...letras.etiqueta,
    color: colores.sobrePrincipal,
  },
  textoSecundario: {
    ...letras.etiqueta,
    color: colores.principal,
  },
});

// Botón pequeño redondeado: filtros y "+ Nuevo" (Chip.jsx)
const chip = StyleSheet.create({
  contenedor: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.redondo,
    paddingVertical: espacios.pequeno,
    paddingHorizontal: espacios.normal,
  },
  contenedorActivo: {
    backgroundColor: colores.principal,
    borderWidth: 1,
    borderColor: colores.principal,
    borderRadius: bordes.redondo,
    paddingVertical: espacios.pequeno,
    paddingHorizontal: espacios.normal,
  },
  texto: {
    ...letras.etiqueta,
    color: colores.texto,
  },
  textoActivo: {
    ...letras.etiqueta,
    color: colores.sobrePrincipal,
  },
});

// Título de cada pantalla (Encabezado.jsx)
const encabezado = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.medio,
    paddingTop: espacios.pequeno,
    paddingBottom: espacios.pequeno,
    paddingHorizontal: espacios.normal,
  },
  contenedorConVolver: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.medio,
    paddingTop: espacios.pequeno,
    paddingBottom: espacios.medio,
    paddingHorizontal: espacios.normal,
  },
  botonVolver: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.redondo,
    padding: espacios.pequeno,
  },
  textos: {
    flex: 1,
    gap: espacios.minimo,
  },
  titulo: {
    ...letras.tituloGrande,
    color: colores.texto,
  },
  tituloConVolver: {
    ...letras.titulo,
    color: colores.texto,
  },
  subtitulo: {
    ...letras.texto,
    color: colores.textoSuave,
  },
});

// Barra inferior con las 4 pestañas (src/app/(tabs)/_layout.jsx)
const barraInferior = StyleSheet.create({
  contenedor: {
    backgroundColor: colores.superficie,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    paddingTop: 5,
    elevation: 0, // sin sombra en Android: el Figma es plano
  },
  // La librería deja 5 de relleno a cada lado de cada pestaña y el Figma no tiene.
  // Sin ese relleno, "Mood boards" cabe en una sola línea.
  boton: {
    paddingHorizontal: 0,
  },
  texto: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
  },
  textoActivo: {
    ...letras.etiqueta,
    color: colores.principal,
  },
});

// Mensaje cuando no hay nada que mostrar (EstadoVacio.jsx)
const estadoVacio = StyleSheet.create({
  contenedor: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
    padding: espacios.grande,
    gap: espacios.pequeno,
    alignItems: "center",
  },
  titulo: {
    ...letras.subtitulo,
    color: colores.texto,
    textAlign: "center",
  },
  mensaje: {
    ...letras.texto,
    color: colores.textoSuave,
    textAlign: "center",
  },
});

// Etiqueta + caja para escribir (CampoTexto.jsx)
const campo = StyleSheet.create({
  contenedor: {
    gap: espacios.pequeno,
  },
  etiqueta: {
    ...letras.etiqueta,
    color: colores.textoSuave,
  },
  caja: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
    padding: 14,
    fontFamily: fuentes.interRegular,
    fontSize: 16,
    color: colores.texto,
    outlineStyle: "solid", // en la web quita el recuadro que aparece al escribir
    outlineWidth: 0,
  },
});

// Barra de búsqueda (Buscador.jsx)
const buscador = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.pequeno,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.redondo,
    paddingHorizontal: espacios.normal,
    paddingVertical: espacios.medio,
  },
  texto: {
    flex: 1,
    padding: 0,
    fontFamily: fuentes.interRegular,
    fontSize: 16,
    color: colores.texto,
    outlineStyle: "solid", // en la web quita el recuadro que aparece al escribir
    outlineWidth: 0,
  },
});

// Tarjeta de un mueble en la grilla (TarjetaMueble.jsx)
const tarjetaMueble = StyleSheet.create({
  contenedor: {
    gap: espacios.pequeno,
  },
  foto: {
    borderRadius: bordes.normal,
    backgroundColor: colores.borde,
  },
  nombre: {
    ...letras.etiqueta,
    color: colores.texto,
  },
  precio: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
  },
  // Botón "+" de Agregar idea: círculo blanco arriba a la derecha de la foto
  botonMas: {
    position: "absolute",
    top: espacios.pequeno,
    right: espacios.pequeno,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    alignItems: "center",
    justifyContent: "center",
  },
  botonMasActivo: {
    position: "absolute",
    top: espacios.pequeno,
    right: espacios.pequeno,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colores.principal,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Las dos columnas de muebles (GrillaMuebles.jsx)
const grilla = StyleSheet.create({
  fila: {
    flexDirection: "row",
    gap: espacios.medio,
    alignItems: "flex-start",
  },
  columna: {
    gap: espacios.normal,
  },
});

// Catálogo con chips y grilla (Catalogo.jsx)
const catalogo = StyleSheet.create({
  // El buscador va fijo arriba, debajo del título
  buscador: {
    paddingHorizontal: espacios.normal,
    paddingBottom: espacios.medio,
  },
  contenido: {
    paddingBottom: espacios.normal,
    gap: espacios.normal,
  },
  chips: {
    gap: espacios.pequeno,
    paddingHorizontal: espacios.normal,
  },
  grilla: {
    paddingHorizontal: espacios.normal,
    gap: espacios.normal,
  },
  error: {
    gap: espacios.medio,
  },
});

// "Disponible en Homecenter" (TarjetaTienda.jsx)
const tienda = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: espacios.medio,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
  },
  textos: {
    flex: 1,
  },
  etiqueta: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
  },
  nombre: {
    ...letras.textoFuerte,
    color: colores.texto,
  },
});

// Tarjeta de mood board con mini collage (TarjetaMoodboard.jsx)
const tarjetaMoodboard = StyleSheet.create({
  contenedor: {
    gap: espacios.pequeno,
  },
  collage: {
    flexDirection: "row",
    gap: 2,
    borderRadius: bordes.normal,
    backgroundColor: colores.borde,
    overflow: "hidden",
  },
  columna: {
    gap: 2,
  },
  titulo: {
    ...letras.textoFuerte,
    color: colores.texto,
  },
  subtitulo: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
  },
  nuevo: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colores.principalSuave,
    borderWidth: 1.5,
    borderColor: colores.principal,
    borderStyle: "dashed",
    borderRadius: bordes.normal,
  },
  textoNuevo: {
    ...letras.etiqueta,
    color: colores.principal,
  },
});

// Fotos grandes de un mood board (Collage.jsx)
const collage = StyleSheet.create({
  contenedor: {
    gap: espacios.pequeno,
  },
  fila: {
    flexDirection: "row",
    gap: espacios.pequeno,
  },
  columna: {
    gap: espacios.pequeno,
  },
  foto: {
    borderRadius: bordes.pequeno,
    backgroundColor: colores.borde,
  },
  etiquetaNueva: {
    position: "absolute",
    top: espacios.pequeno,
    left: espacios.pequeno,
    backgroundColor: colores.principal,
    borderRadius: bordes.redondo,
    paddingHorizontal: espacios.pequeno,
    paddingVertical: 3,
  },
  textoNueva: {
    fontFamily: fuentes.interSemiBold,
    fontSize: 12,
    lineHeight: 16,
    color: colores.sobrePrincipal,
  },
});

// Círculos de colores (Paleta.jsx)
const paleta = StyleSheet.create({
  fila: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(43, 36, 32, 0.08)",
  },
});

// Tarjeta de la lista de encuestas (TarjetaEncuesta.jsx)
const tarjetaEncuesta = StyleSheet.create({
  contenedor: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
    padding: espacios.medio,
    gap: espacios.medio,
  },
  // Arriba: foto y textos (se tocan para abrir la encuesta) y el botón "Encuesta"
  info: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: espacios.medio,
  },
  datos: {
    flex: 1,
    flexDirection: "row",
    gap: espacios.medio,
  },
  foto: {
    width: 72,
    height: 72,
    borderRadius: bordes.pequeno,
    backgroundColor: colores.borde,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  nombre: {
    ...letras.textoFuerte,
    color: colores.texto,
  },
  detalle: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
  },
  conteos: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: espacios.medio,
  },
  conteo: {
    ...letras.textoPequeno,
    color: colores.meGusta,
  },
  // Abajo: los dos botones de voto, del mismo ancho, para que quepan textos largos
  botones: {
    flexDirection: "row",
    gap: espacios.pequeno,
  },
  voto: {
    flex: 1,
  },
  botonAbrir: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.redondo,
    paddingHorizontal: espacios.medio,
    paddingVertical: espacios.pequeno,
  },
  textoAbrir: {
    ...letras.etiqueta,
    color: colores.texto,
  },
});

// Botón "Me gusta" / "No me gusta" (BotonVoto.jsx)
const botonVoto = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: espacios.pequeno,
    borderRadius: bordes.minimo,
    borderWidth: 1.5,
    flexShrink: 1,
  },
  texto: {
    ...letras.etiqueta,
    flexShrink: 1,
    textAlign: "center",
  },
});

// Opción + votos + barra (BarraResultado.jsx)
const barraResultado = StyleSheet.create({
  contenedor: {
    gap: 6,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  texto: {
    ...letras.textoFuerte,
    color: colores.texto,
  },
  votos: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
  },
  barra: {
    height: 12,
    borderRadius: 6,
    backgroundColor: colores.borde,
    overflow: "hidden",
  },
  relleno: {
    height: 12,
  },
});

// Recuadro de mensaje (Aviso.jsx)
// Mensaje arriba de la pantalla cuando falla algo al hablar con la base de datos
const mensajeDeError = StyleSheet.create({
  contenedor: {
    position: "absolute",
    left: espacios.normal,
    right: espacios.normal,
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.medio,
    padding: espacios.medio,
    borderRadius: bordes.normal,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.amarilloSuave,
  },
  texto: {
    flex: 1,
    ...letras.etiqueta,
    color: colores.texto,
  },
  cerrar: {
    ...letras.etiqueta,
    color: colores.principal,
  },
});

const aviso = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.pequeno,
    padding: espacios.medio,
    borderRadius: bordes.normal,
  },
  contenedorConIcono: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.pequeno,
    paddingHorizontal: 14,
    paddingVertical: espacios.medio,
    borderRadius: bordes.pequeno,
  },
  texto: {
    flex: 1,
    ...letras.etiqueta,
    color: colores.texto,
  },
});

// Círculo con iniciales (Avatar.jsx)
const avatar = StyleSheet.create({
  circulo: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: bordes.redondo,
  },
  texto: {
    ...letras.etiqueta,
    color: colores.texto,
  },
  textoGrande: {
    ...letras.titulo,
    color: colores.principal,
  },
});

// Fila con foto, textos y círculo para elegir (TarjetaOpcion.jsx)
const tarjetaOpcion = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.medio,
    padding: espacios.medio,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
  },
  contenedorActivo: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.medio,
    padding: 11, // 1 menos porque el borde es 1 más grueso
    backgroundColor: colores.principalSuave,
    borderWidth: 2,
    borderColor: colores.principal,
    borderRadius: bordes.normal,
  },
  foto: {
    borderRadius: bordes.pequeno,
    backgroundColor: colores.borde,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  titulo: {
    ...letras.textoFuerte,
    color: colores.texto,
  },
  subtitulo: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
  },
  circulo: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  circuloActivo: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colores.principal,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Número grande + etiqueta (TarjetaEstadistica.jsx)
const estadistica = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingHorizontal: espacios.pequeno,
    paddingVertical: espacios.medio,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
  },
  numero: {
    ...letras.titulo,
    color: colores.principal,
  },
  etiqueta: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
  },
});

// Fila del perfil (FilaAjuste.jsx) y la caja que agrupa las filas
const filaAjuste = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.medio,
    paddingHorizontal: 14,
    paddingVertical: espacios.medio,
  },
  icono: {
    width: 36,
    height: 36,
    borderRadius: bordes.minimo,
    backgroundColor: colores.principalSuave,
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    flex: 1,
    ...letras.textoFuerte,
    color: colores.texto,
  },
  lista: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
    overflow: "hidden",
  },
  divisor: {
    height: 1,
    backgroundColor: colores.borde,
  },
});

// =====================================================================
// PANTALLAS (src/app)
// =====================================================================

// 1 · Inicio de sesión y 2 · Registro
const inicio = StyleSheet.create({
  contenido: {
    paddingTop: 48,
    paddingHorizontal: espacios.grande,
    paddingBottom: espacios.grande,
    gap: espacios.normal,
  },
  logo: {
    alignSelf: "center",
    backgroundColor: colores.principal,
    borderRadius: bordes.grande,
    padding: 18,
  },
  titulo: {
    ...letras.tituloGrande,
    color: colores.texto,
    textAlign: "center",
  },
  olvido: {
    alignSelf: "flex-end",
  },
  textoEnlace: {
    ...letras.etiqueta,
    color: colores.principal,
  },
  separador: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.medio,
  },
  linea: {
    flex: 1,
    height: 1,
    backgroundColor: colores.borde,
  },
  ayuda: {
    ...letras.textoPequeno,
    color: colores.textoSuave,
    textAlign: "center",
  },
  // "¿Ya tienes cuenta? Inicia sesión"
  enlace: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
});

// 9 · Detalle del mueble
const detalle = StyleSheet.create({
  foto: {
    width: "100%",
    height: 300,
    borderRadius: bordes.grande,
    backgroundColor: colores.borde,
  },
  textos: {
    gap: espacios.minimo,
  },
  precio: {
    ...letras.subtitulo,
    color: colores.principal,
  },
  medidas: {
    flexDirection: "row",
    gap: espacios.pequeno,
  },
});

// Hoja que sube desde abajo: "Guardar en un mood board"
const hoja = StyleSheet.create({
  fondo: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(43, 36, 32, 0.4)",
  },
  panel: {
    width: "100%",
    maxWidth: medidas.anchoMaximo,
    maxHeight: "85%",
    backgroundColor: colores.fondo,
    borderTopLeftRadius: bordes.grande,
    borderTopRightRadius: bordes.grande,
    padding: espacios.normal,
    paddingBottom: espacios.grande,
    gap: espacios.medio,
  },
  lista: {
    gap: espacios.pequeno,
  },
  cancelar: {
    alignSelf: "center",
    padding: espacios.pequeno,
  },
});

// 10 · Mood boards, 12 · Mis mood boards y las listas de tarjetas de mood board
const moodboards = StyleSheet.create({
  grilla: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: espacios.medio,
    rowGap: espacios.normal,
  },
});

// 11, 14, 15 y 17 · Ver un mood board
const moodboard = StyleSheet.create({
  dueno: {
    ...letras.subtitulo,
    color: colores.principal,
  },
  combina: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: espacios.medio,
  },
  combinaItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.pequeno,
  },
  punto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(43, 36, 32, 0.08)",
  },
});

// 13 · Nuevo mood board
const nuevoMoodboard = StyleSheet.create({
  ideas: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: espacios.medio,
  },
  idea: {
    width: 80,
    height: 80,
    borderRadius: bordes.pequeno,
    backgroundColor: colores.borde,
  },
  ideaElegida: {
    width: 80,
    height: 80,
    borderRadius: bordes.pequeno,
    borderWidth: 3,
    borderColor: colores.principal,
  },
  marca: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colores.principal,
    alignItems: "center",
    justifyContent: "center",
  },
  // Casilla punteada para subir fotos del carrete
  subirFotos: {
    width: 80,
    height: 80,
    borderRadius: bordes.pequeno,
    borderWidth: 1.5,
    borderColor: colores.principal,
    borderStyle: "dashed",
    backgroundColor: colores.principalSuave,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  textoSubir: {
    ...letras.textoPequeno,
    fontFamily: fuentes.interSemiBold,
    color: colores.principal,
  },
  contadorListo: {
    ...letras.textoPequeno,
    color: colores.meGusta,
  },
});

// 18 · Poner a votación (elegir un objeto)
const elegir = StyleSheet.create({
  grilla: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  objeto: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
    overflow: "hidden",
  },
  objetoElegido: {
    backgroundColor: colores.superficie,
    borderWidth: 3,
    borderColor: colores.principal,
    borderRadius: bordes.normal,
    overflow: "hidden",
  },
  foto: {
    width: "100%",
    height: 132,
    backgroundColor: colores.borde,
  },
  info: {
    padding: espacios.medio,
    gap: 2,
  },
  nombre: {
    ...letras.etiqueta,
    color: colores.texto,
  },
  circulo: {
    position: "absolute",
    top: 7,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  marca: {
    position: "absolute",
    top: 5,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colores.principal,
    alignItems: "center",
    justifyContent: "center",
  },
});

// 23 · Nueva encuesta: las dos opciones que se pueden editar
const nuevaEncuesta = StyleSheet.create({
  opcion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
    paddingHorizontal: 14,
  },
  circulo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  texto: {
    flex: 1,
    paddingVertical: 14,
    fontFamily: fuentes.interRegular,
    fontSize: 16,
    color: colores.texto,
    outlineStyle: "solid", // en la web quita el recuadro que aparece al escribir
    outlineWidth: 0,
  },
});

// 22 · Encuestas
const encuestas = StyleSheet.create({
  filaInquilinos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inquilinos: {
    flexDirection: "row",
    gap: espacios.pequeno,
  },
  lista: {
    gap: espacios.medio,
  },
});

// 24, 25, 19 y 21 · Resultado de una encuesta
const resultado = StyleSheet.create({
  foto: {
    width: "100%",
    height: 170,
    borderRadius: bordes.grande,
    backgroundColor: colores.borde,
  },
  fotoDecision: {
    width: "100%",
    height: 130,
    borderRadius: bordes.normal,
    backgroundColor: colores.borde,
  },
  botonesVoto: {
    flexDirection: "row",
    gap: espacios.pequeno,
  },
  voto: {
    flex: 1,
  },
});

// 26 · Perfil
const perfil = StyleSheet.create({
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacios.normal,
    padding: espacios.normal,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: bordes.normal,
  },
  info: {
    flex: 1,
    gap: 2,
    alignItems: "flex-start",
  },
  chipVibra: {
    backgroundColor: colores.verdeSuave,
    borderRadius: bordes.redondo,
    paddingHorizontal: 10,
    paddingVertical: espacios.minimo,
  },
  textoVibra: {
    ...letras.textoPequeno,
    color: colores.texto,
  },
  estadisticas: {
    flexDirection: "row",
    gap: espacios.pequeno,
  },
});

export {
  avatar,
  aviso,
  barraInferior,
  barraResultado,
  boton,
  botonVoto,
  buscador,
  campo,
  catalogo,
  chip,
  collage,
  detalle,
  elegir,
  encabezado,
  encuestas,
  estadistica,
  estadoVacio,
  filaAjuste,
  general,
  grilla,
  hoja,
  inicio,
  mensajeDeError,
  moodboard,
  moodboards,
  nuevaEncuesta,
  nuevoMoodboard,
  paleta,
  perfil,
  resultado,
  tarjetaEncuesta,
  tarjetaMoodboard,
  tarjetaMueble,
  tarjetaOpcion,
  tienda,
};
