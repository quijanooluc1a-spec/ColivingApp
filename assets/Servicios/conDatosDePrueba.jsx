import casaDePrueba from "../Datos/casa";
import encuestasDePrueba from "../Datos/encuestas";
import moodboardsDePrueba from "../Datos/moodboards";
import mueblesDePrueba from "../Datos/muebles";
import { categorias } from "../Datos/opciones";
import usuariosDePrueba from "../Datos/usuarios";
import votosDePrueba from "../Datos/votos";
import { sinTildes } from "../Logica/textos";

// La base de datos de la app usando los DATOS DE PRUEBA (assets/Datos).
// Todo se guarda en memoria: al recargar la app vuelven los datos de prueba.
// Tiene las mismas funciones que conSupabase.jsx, para que la app funcione igual con las dos.

const TAMANO_PAGINA = 10; // cuántos muebles llegan en cada página de Explorar
const MINIMO_CONTRASENA = 4;

// La "base de datos" en memoria (empieza con los datos de prueba)
const casa = casaDePrueba;
const muebles = mueblesDePrueba;
let usuarios = usuariosDePrueba;
let moodboards = moodboardsDePrueba;
let encuestas = encuestasDePrueba;
let votos = votosDePrueba;

// Espera un momento, como si los datos llegaran de internet
function esperar(milisegundos) {
  return new Promise(function (resolver) {
    setTimeout(resolver, milisegundos);
  });
}

// Crea un id nuevo, por ejemplo "mb1730000000000"
function crearId(prefijo) {
  return prefijo + Date.now();
}

// ---------- Sesión ----------

// Con los datos de prueba no se guarda la sesión: al abrir la app hay que iniciar sesión
async function sesionGuardada() {
  return null;
}

// Devuelve { idUsuario } o { error: "mensaje" }
async function iniciarSesion(correo, contrasena) {
  const encontrado = usuarios.find(function (u) {
    return u.correo === correo.trim().toLowerCase() && u.contrasena === contrasena;
  });
  if (!encontrado) {
    return { error: "El correo o la contraseña no coinciden." };
  }
  return { idUsuario: encontrado.id };
}

// Crea la cuenta en la casa y devuelve { idUsuario } o { error: "mensaje" }
async function registrarse(nombre, correo, contrasena) {
  const correoLimpio = correo.trim().toLowerCase();
  const existe = usuarios.some(function (u) {
    return u.correo === correoLimpio;
  });
  if (existe) {
    return { error: "Ya hay una cuenta con ese correo." };
  }
  const palabras = nombre.trim().split(" ");
  const coloresDeAvatar = ["principalSuave", "verdeSuave", "amarilloSuave"]; // se van turnando
  const nuevo = {
    id: crearId("u"),
    nombre: nombre.trim(),
    correo: correoLimpio,
    contrasena: contrasena,
    iniciales: (palabras[0][0] + (palabras[1] ? palabras[1][0] : "")).toUpperCase(),
    colorAvatar: coloresDeAvatar[usuarios.length % 3],
    convive: "Roomies",
    vibras: [],
    id_casa: casa.id,
    guardados: [],
    notificaciones: { activas: true, nuevas: true, resultados: true },
  };
  usuarios = usuarios.concat(nuevo);
  return { idUsuario: nuevo.id };
}

async function cerrarSesion() {}

// ---------- Cargar los datos ----------

// Todo lo que la app necesita de la casa de esta persona
async function cargarTodo(idUsuario) {
  const usuario = usuarios.find(function (u) {
    return u.id === idUsuario;
  });
  const roommates = usuarios.filter(function (u) {
    return u.id_casa === casa.id;
  });
  // Los mood boards que puede ver: los suyos (también los borradores) y los compartidos de la casa
  const visibles = moodboards.filter(function (m) {
    const esDeLaCasa = roommates.some(function (r) {
      return r.id === m.id_dueno;
    });
    return m.id_dueno === idUsuario || (m.compartido && esDeLaCasa);
  });
  return {
    casa: casa,
    usuario: usuario,
    usuarios: roommates,
    moodboards: visibles,
    encuestas: encuestas,
    votos: votos,
  };
}

// ---------- Catálogo de muebles ----------

// Pide una página del catálogo (de 10 en 10), filtrada por categoría y por texto
async function obtenerMuebles(pagina, categoria, busqueda) {
  await esperar(400);

  let lista = muebles;
  if (categoria !== "Todo") {
    lista = lista.filter(function (mueble) {
      return mueble.categoria === categoria;
    });
  }
  if (busqueda.trim() !== "") {
    const texto = sinTildes(busqueda.trim());
    lista = lista.filter(function (mueble) {
      const donde = sinTildes(mueble.nombre + " " + mueble.categoria + " " + mueble.estilo + " " + mueble.color);
      return donde.includes(texto);
    });
  }

  const desde = pagina * TAMANO_PAGINA;
  return lista.slice(desde, desde + TAMANO_PAGINA);
}

// Busca un mueble por su id ("m1" -> el Sofá 3 puestos)
function buscarMueble(id) {
  return muebles.find(function (mueble) {
    return mueble.id === id;
  });
}

// Las categorías que tienen al menos un mueble (para los chips de Explorar)
function obtenerCategorias() {
  return categorias.filter(function (categoria) {
    return muebles.some(function (mueble) {
      return mueble.categoria === categoria;
    });
  });
}

// ---------- Cambios ----------

// cambios: { nombre, convive, vibras } o { notificaciones }
async function actualizarPerfil(idUsuario, cambios) {
  usuarios = usuarios.map(function (u) {
    return u.id === idUsuario ? { ...u, ...cambios } : u;
  });
}

async function guardarMueble(idUsuario, idMueble) {
  usuarios = usuarios.map(function (u) {
    if (u.id !== idUsuario || u.guardados.includes(idMueble)) {
      return u;
    }
    return { ...u, guardados: u.guardados.concat(idMueble) };
  });
}

// datos: { nombre, ideas, vibras, compartido }. Devuelve el id del mood board nuevo
async function crearMoodboard(idUsuario, datos) {
  const nuevo = {
    id: crearId("mb"),
    nombre: datos.nombre,
    id_dueno: idUsuario,
    ideas: datos.ideas.map(function (idea, posicion) {
      return { ...idea, id: crearId("i") + "-" + posicion };
    }),
    vibras: datos.vibras,
    descripcion: "",
    compartido: datos.compartido,
  };
  moodboards = moodboards.concat(nuevo);
  return nuevo.id;
}

// idea: { id_mueble } o { foto, colores }. Devuelve el id de la idea nueva
async function agregarIdea(idUsuario, idMoodboard, idea) {
  const idIdea = crearId("i");
  moodboards = moodboards.map(function (moodboard) {
    if (moodboard.id !== idMoodboard) {
      return moodboard;
    }
    return { ...moodboard, ideas: moodboard.ideas.concat({ ...idea, id: idIdea }) };
  });
  return idIdea;
}

// datos: { id_casa, id_mueble, id_moodboard, pregunta, texto_si, texto_no, cierra }. Devuelve el id
async function crearEncuesta(idUsuario, datos) {
  const nueva = {
    id: crearId("e"),
    id_mueble: datos.id_mueble,
    id_moodboard: datos.id_moodboard,
    id_creador: idUsuario,
    pregunta: datos.pregunta,
    texto_si: datos.texto_si,
    texto_no: datos.texto_no,
    creada: Date.now(),
    cierra: datos.cierra,
    estado: "activa",
    ronda: 1,
  };
  encuestas = [nueva].concat(encuestas);
  return nueva.id;
}

// Guarda el voto de la persona en esa ronda; si ya había votado, lo cambia
async function guardarVoto(idUsuario, idEncuesta, ronda, valor) {
  const sinMiVoto = votos.filter(function (v) {
    return !(v.id_encuesta === idEncuesta && v.id_usuario === idUsuario && v.ronda === ronda);
  });
  votos = sinMiVoto.concat({ id: crearId("v"), id_encuesta: idEncuesta, id_usuario: idUsuario, ronda: ronda, valor: valor });
}

// Guarda el resultado de cerrar una ronda, solo si nadie la cerró antes.
// Devuelve true si se guardó, false si la encuesta ya había cambiado.
async function guardarCierre(encuestaNueva, encuestaAnterior) {
  const actual = encuestas.find(function (e) {
    return e.id === encuestaNueva.id;
  });
  if (actual.estado !== encuestaAnterior.estado || actual.ronda !== encuestaAnterior.ronda) {
    return false;
  }
  encuestas = encuestas.map(function (e) {
    return e.id === encuestaNueva.id ? encuestaNueva : e;
  });
  return true;
}

export {
  actualizarPerfil,
  agregarIdea,
  buscarMueble,
  cargarTodo,
  cerrarSesion,
  crearEncuesta,
  crearMoodboard,
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
};
