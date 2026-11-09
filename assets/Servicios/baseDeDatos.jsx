import * as conDatosDePrueba from "./conDatosDePrueba";
import * as conSupabase from "./conSupabase";

// La puerta de entrada a los datos de la app: las pantallas y el contexto solo usan este archivo.
// Aquí se decide de dónde salen los datos:
//   - De Supabase, si el archivo .env.local tiene EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_KEY.
//   - De los datos de prueba (assets/Datos), si no los tiene.
// Las dos opciones tienen las mismas funciones y devuelven los datos con la misma forma.
// Ver GUIA-SUPABASE.md.

const usandoSupabase = Boolean(process.env.EXPO_PUBLIC_SUPABASE_URL && process.env.EXPO_PUBLIC_SUPABASE_KEY);
const fuente = usandoSupabase ? conSupabase : conDatosDePrueba;

const TAMANO_PAGINA = fuente.TAMANO_PAGINA;
const MINIMO_CONTRASENA = fuente.MINIMO_CONTRASENA;

// ---------- Sesión ----------

function sesionGuardada() {
  return fuente.sesionGuardada();
}

function iniciarSesion(correo, contrasena) {
  return fuente.iniciarSesion(correo, contrasena);
}

function registrarse(nombre, correo, contrasena) {
  return fuente.registrarse(nombre, correo, contrasena);
}

function cerrarSesion() {
  return fuente.cerrarSesion();
}

// ---------- Cargar los datos ----------

function cargarTodo(idUsuario) {
  return fuente.cargarTodo(idUsuario);
}

// ---------- Catálogo de muebles ----------

function obtenerMuebles(pagina, categoria, busqueda) {
  return fuente.obtenerMuebles(pagina, categoria, busqueda);
}

function buscarMueble(id) {
  return fuente.buscarMueble(id);
}

function obtenerCategorias() {
  return fuente.obtenerCategorias();
}

// La foto de una idea de mood board: la del mueble o la que se subió del carrete
function fuenteDeIdea(idea) {
  if (idea.id_mueble) {
    return buscarMueble(idea.id_mueble).imagen;
  }
  return { uri: idea.foto };
}

// Enlace para comprar el mueble: abre la búsqueda de la tienda en el navegador
function enlaceTienda(mueble) {
  return "https://www.homecenter.com.co/homecenter-co/search?Ntt=" + encodeURIComponent(mueble.nombre);
}

// ---------- Cambios ----------

function actualizarPerfil(idUsuario, cambios) {
  return fuente.actualizarPerfil(idUsuario, cambios);
}

function guardarMueble(idUsuario, idMueble) {
  return fuente.guardarMueble(idUsuario, idMueble);
}

function crearMoodboard(idUsuario, datos) {
  return fuente.crearMoodboard(idUsuario, datos);
}

function agregarIdea(idUsuario, idMoodboard, idea) {
  return fuente.agregarIdea(idUsuario, idMoodboard, idea);
}

function crearEncuesta(idUsuario, datos) {
  return fuente.crearEncuesta(idUsuario, datos);
}

function guardarVoto(idUsuario, idEncuesta, ronda, valor) {
  return fuente.guardarVoto(idUsuario, idEncuesta, ronda, valor);
}

function guardarCierre(encuestaNueva, encuestaAnterior) {
  return fuente.guardarCierre(encuestaNueva, encuestaAnterior);
}

export {
  actualizarPerfil,
  agregarIdea,
  buscarMueble,
  cargarTodo,
  cerrarSesion,
  crearEncuesta,
  crearMoodboard,
  enlaceTienda,
  fuenteDeIdea,
  guardarCierre,
  guardarMueble,
  guardarVoto,
  iniciarSesion,
  MINIMO_CONTRASENA,
  obtenerCategorias,
  obtenerMuebles,
  registrarse,
  sesionGuardada,
  TAMANO_PAGINA,
  usandoSupabase,
};
