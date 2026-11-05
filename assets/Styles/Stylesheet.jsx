import { StyleSheet } from "react-native";
import { bordes, colores, espacios, letras } from "./Tema";

// Nota: "...letras.titulo" copia aquí la letra, el tamaño y el alto de línea
// que están en Tema.jsx. Así no hay que repetir esos números en cada estilo.

// Estilos que usan casi todas las pantallas
const general = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    paddingHorizontal: espacios.normal,
    paddingBottom: espacios.normal,
    gap: espacios.normal,
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

// Pantalla de inicio de sesión (src/app/index.jsx)
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
});

export { barraInferior, boton, chip, encabezado, estadoVacio, general, inicio };
