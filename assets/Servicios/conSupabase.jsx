import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { categorias } from "../Datos/opciones";
import { sinTildes } from "../Logica/textos";
import obtenerCliente from "./clienteSupabase";

// La base de datos de la app usando SUPABASE.
// Tiene las mismas funciones que conDatosDePrueba.jsx y devuelve los datos con la misma forma,
// así las pantallas no notan la diferencia. Las tablas están en la carpeta supabase/ del proyecto.

const TAMANO_PAGINA = 10; // cuántos muebles llegan en cada página de Explorar
const MINIMO_CONTRASENA = 6; // Supabase pide contraseñas de al menos 6 caracteres

// Todos los muebles del catálogo. Se cargan al entrar (cargarTodo) para que buscarMueble responda al instante.
let catalogo = [];

// true si el error es porque no hay internet (o el servidor no responde)
function esSinConexion(error) {
  return error.status === 0 || /fetch|network/i.test(error.message || "");
}
const SIN_CONEXION = "No hay conexión con el servidor. Revisa tu internet e inténtalo otra vez.";

// Supabase responde { data, error }. Si hay error, lo convierte en un mensaje en español
// (el contexto lo muestra arriba de la pantalla). Si no, devuelve los datos.
function revisar(respuesta, queHacia) {
  if (respuesta.error) {
    const detalle = esSinConexion(respuesta.error) ? SIN_CONEXION : respuesta.error.message;
    throw new Error("No se pudo " + queHacia + ". " + detalle);
  }
  return respuesta.data;
}

// Los errores de inicio de sesión y registro, en español
function mensajeDeCuenta(error) {
  if (esSinConexion(error)) {
    return SIN_CONEXION;
  }
  const mensajes = {
    invalid_credentials: "El correo o la contraseña no coinciden.",
    email_not_confirmed: "Primero confirma tu correo: revisa tu bandeja de entrada.",
    user_already_exists: "Ya hay una cuenta con ese correo.",
    email_exists: "Ya hay una cuenta con ese correo.",
    weak_password: "La contraseña es muy débil: usa al menos " + MINIMO_CONTRASENA + " caracteres.",
    email_address_invalid: "Ese correo no es válido.",
    over_email_send_rate_limit: "Se enviaron demasiados correos. Espera un momento e inténtalo otra vez.",
    signup_disabled: "En este momento no se pueden crear cuentas.",
  };
  return mensajes[error.code] || "No se pudo completar. " + error.message;
}

// ---------- De filas de Supabase a los objetos que usa la app ----------

// La dirección pública de una foto guardada en Storage
function direccionDeFoto(carpeta, archivo) {
  return obtenerCliente().storage.from(carpeta).getPublicUrl(archivo).data.publicUrl;
}

function aMueble(fila) {
  return {
    id: fila.id,
    nombre: fila.nombre,
    categoria: fila.categoria,
    precio: fila.precio,
    imagen: { uri: direccionDeFoto("muebles", fila.imagen) }, // <Image source={...}> acepta { uri }
    proporcion: Number(fila.proporcion),
    tienda: fila.tienda,
    largo: fila.largo,
    ancho: fila.ancho,
    alto: fila.alto,
    color: fila.color,
    materiales: fila.materiales,
    estilo: fila.estilo,
    descripcion: fila.descripcion,
    colores: fila.colores,
  };
}

function aUsuario(fila, guardados) {
  return {
    id: fila.id,
    nombre: fila.nombre,
    correo: fila.correo,
    iniciales: fila.iniciales,
    colorAvatar: fila.color_avatar,
    convive: fila.convive,
    vibras: fila.vibras,
    id_casa: fila.id_casa,
    guardados: guardados,
    notificaciones: fila.notificaciones,
  };
}

function aMoodboard(fila) {
  // Las ideas, en el orden en que se agregaron
  const ideas = fila.ideas
    .slice()
    .sort(function (a, b) {
      return new Date(a.creada).getTime() - new Date(b.creada).getTime();
    })
    .map(function (idea) {
      if (idea.id_mueble) {
        return { id: idea.id, id_mueble: idea.id_mueble };
      }
      return { id: idea.id, foto: idea.foto, colores: idea.colores };
    });
  return {
    id: fila.id,
    nombre: fila.nombre,
    id_dueno: fila.id_dueno,
    ideas: ideas,
    vibras: fila.vibras,
    descripcion: fila.descripcion,
    compartido: fila.compartido,
  };
}

function aEncuesta(fila) {
  return {
    id: fila.id,
    id_mueble: fila.id_mueble,
    id_moodboard: fila.id_moodboard,
    id_creador: fila.id_creador,
    pregunta: fila.pregunta,
    texto_si: fila.texto_si,
    texto_no: fila.texto_no,
    creada: new Date(fila.creada).getTime(), // la app usa milisegundos, como Date.now()
    cierra: new Date(fila.cierra).getTime(),
    estado: fila.estado,
    ronda: fila.ronda,
  };
}

// ---------- Sesión ----------

// Si quedó una sesión guardada en el teléfono, devuelve el id de esa persona; si no, null
async function sesionGuardada() {
  const respuesta = await obtenerCliente().auth.getSession();
  return respuesta.data.session ? respuesta.data.session.user.id : null;
}

// Devuelve { idUsuario } o { error: "mensaje" }
async function iniciarSesion(correo, contrasena) {
  const respuesta = await obtenerCliente().auth.signInWithPassword({
    email: correo.trim().toLowerCase(),
    password: contrasena,
  });
  if (respuesta.error) {
    return { error: mensajeDeCuenta(respuesta.error) };
  }
  return { idUsuario: respuesta.data.user.id };
}

// Crea la cuenta. La base de datos crea el perfil sola (disparador "al_crear_cuenta" de supabase/1-tablas.sql)
// con el nombre que va en "data". Devuelve { idUsuario } o { error: "mensaje" }
async function registrarse(nombre, correo, contrasena) {
  const respuesta = await obtenerCliente().auth.signUp({
    email: correo.trim().toLowerCase(),
    password: contrasena,
    options: { data: { nombre: nombre.trim() } },
  });
  if (respuesta.error) {
    return { error: mensajeDeCuenta(respuesta.error) };
  }
  if (!respuesta.data.session) {
    // Supabase tiene encendido "Confirm email": la cuenta existe, pero falta confirmar el correo
    return { error: "Te enviamos un correo para confirmar la cuenta. Confírmala y después inicia sesión." };
  }
  return { idUsuario: respuesta.data.user.id };
}

async function cerrarSesion() {
  await obtenerCliente().auth.signOut();
}

// ---------- Cargar los datos ----------

// Todo lo que la app necesita de la casa de esta persona.
// Las reglas de seguridad (supabase/2-seguridad.sql) hacen que solo lleguen las filas de su casa.
async function cargarTodo(idUsuario) {
  const supabase = obtenerCliente();

  // 1. Mi perfil (de ahí sale mi casa)
  const yo = revisar(await supabase.from("usuarios").select("*").eq("id", idUsuario).single(), "cargar tu perfil");

  // 2. Lo demás, todo al mismo tiempo
  const respuestas = await Promise.all([
    supabase.from("casas").select("*").eq("id", yo.id_casa).single(),
    supabase.from("usuarios").select("*").eq("id_casa", yo.id_casa).order("nombre"),
    supabase.from("guardados").select("id_mueble").eq("id_usuario", idUsuario).order("guardado"),
    supabase.from("moodboards").select("*, ideas(*)").order("creado").order("id"),
    supabase.from("encuestas").select("*").eq("id_casa", yo.id_casa).order("creada", { ascending: false }),
    supabase.from("votos").select("*"),
    supabase.from("muebles").select("*").order("orden"),
  ]);
  const casa = revisar(respuestas[0], "cargar tu casa");
  const roommates = revisar(respuestas[1], "cargar a tus roommates");
  const guardados = revisar(respuestas[2], "cargar tus guardados");
  const moodboards = revisar(respuestas[3], "cargar los mood boards");
  const encuestas = revisar(respuestas[4], "cargar las encuestas");
  const votos = revisar(respuestas[5], "cargar los votos");
  catalogo = revisar(respuestas[6], "cargar el catálogo").map(aMueble);

  const usuario = aUsuario(
    yo,
    guardados.map(function (g) {
      return g.id_mueble;
    })
  );
  return {
    casa: { id: casa.id, nombre: casa.nombre },
    usuario: usuario,
    usuarios: roommates.map(function (fila) {
      return fila.id === idUsuario ? usuario : aUsuario(fila, []);
    }),
    moodboards: moodboards.map(aMoodboard),
    encuestas: encuestas.map(aEncuesta),
    votos: votos, // las filas ya tienen la forma de la app: id, id_encuesta, id_usuario, ronda, valor
  };
}

// ---------- Catálogo de muebles ----------

// Pide una página del catálogo (de 10 en 10), filtrada por categoría y por texto
async function obtenerMuebles(pagina, categoria, busqueda) {
  let consulta = obtenerCliente().from("muebles").select("*").order("orden");
  if (categoria !== "Todo") {
    consulta = consulta.eq("categoria", categoria);
  }
  if (busqueda.trim() !== "") {
    // La columna "busqueda" tiene nombre, categoría, estilo y color sin tildes ni mayúsculas
    consulta = consulta.ilike("busqueda", "%" + sinTildes(busqueda.trim()) + "%");
  }
  const desde = pagina * TAMANO_PAGINA;
  const filas = revisar(await consulta.range(desde, desde + TAMANO_PAGINA - 1), "cargar los muebles");
  return filas.map(aMueble);
}

// Busca un mueble por su id ("m1" -> el Sofá 3 puestos)
function buscarMueble(id) {
  return catalogo.find(function (mueble) {
    return mueble.id === id;
  });
}

// Las categorías que tienen al menos un mueble (para los chips de Explorar)
function obtenerCategorias() {
  return categorias.filter(function (categoria) {
    return catalogo.some(function (mueble) {
      return mueble.categoria === categoria;
    });
  });
}

// ---------- Fotos ----------

// "base64" (texto) → bytes, para poder subir la foto
function bytesDeBase64(base64) {
  const texto = atob(base64);
  const bytes = new Uint8Array(texto.length);
  for (let i = 0; i < texto.length; i++) {
    bytes[i] = texto.charCodeAt(i);
  }
  return bytes;
}

// Sube una foto del carrete a Storage (carpeta "fotos/<id de la persona>/") y devuelve su dirección pública.
// Antes la achica a 1200 px de ancho para que suba rápido.
async function subirFoto(idUsuario, uri) {
  const contexto = ImageManipulator.manipulate(uri);
  contexto.resize({ width: 1200 });
  const imagen = await contexto.renderAsync();
  const resultado = await imagen.saveAsync({ base64: true, format: SaveFormat.JPEG, compress: 0.8 });

  const ruta = idUsuario + "/" + Date.now() + ".jpg";
  revisar(
    await obtenerCliente()
      .storage.from("fotos")
      .upload(ruta, bytesDeBase64(resultado.base64).buffer, { contentType: "image/jpeg" }),
    "subir la foto"
  );
  return direccionDeFoto("fotos", ruta);
}

// ---------- Cambios ----------

// cambios: { nombre, convive, vibras } o { notificaciones } (los nombres de las columnas)
async function actualizarPerfil(idUsuario, cambios) {
  revisar(await obtenerCliente().from("usuarios").update(cambios).eq("id", idUsuario), "guardar tu perfil");
}

async function guardarMueble(idUsuario, idMueble) {
  revisar(
    await obtenerCliente()
      .from("guardados")
      .upsert({ id_usuario: idUsuario, id_mueble: idMueble }, { onConflict: "id_usuario,id_mueble", ignoreDuplicates: true }),
    "guardar el mueble"
  );
}

// idea: { id_mueble } o { foto, colores } (foto es la dirección de la foto en el teléfono).
// Devuelve el id de la idea nueva
async function agregarIdea(idUsuario, idMoodboard, idea) {
  const fila = { id_moodboard: idMoodboard };
  if (idea.id_mueble) {
    fila.id_mueble = idea.id_mueble;
  } else {
    fila.foto = await subirFoto(idUsuario, idea.foto);
    fila.colores = idea.colores || [];
  }
  const nueva = revisar(await obtenerCliente().from("ideas").insert(fila).select().single(), "agregar la idea");
  return nueva.id;
}

// datos: { nombre, ideas, vibras, compartido }. Devuelve el id del mood board nuevo
async function crearMoodboard(idUsuario, datos) {
  const nuevo = revisar(
    await obtenerCliente()
      .from("moodboards")
      .insert({ nombre: datos.nombre, id_dueno: idUsuario, vibras: datos.vibras, compartido: datos.compartido })
      .select()
      .single(),
    "crear el mood board"
  );
  // Las ideas se agregan una por una, en orden (las fotos se suben primero)
  for (const idea of datos.ideas) {
    await agregarIdea(idUsuario, nuevo.id, idea);
  }
  return nuevo.id;
}

// datos: { id_casa, id_mueble, id_moodboard, pregunta, texto_si, texto_no, cierra }. Devuelve el id
async function crearEncuesta(idUsuario, datos) {
  const nueva = revisar(
    await obtenerCliente()
      .from("encuestas")
      .insert({
        id_casa: datos.id_casa,
        id_mueble: datos.id_mueble,
        id_moodboard: datos.id_moodboard,
        id_creador: idUsuario,
        pregunta: datos.pregunta,
        texto_si: datos.texto_si,
        texto_no: datos.texto_no,
        cierra: new Date(datos.cierra).toISOString(),
      })
      .select()
      .single(),
    "crear la encuesta"
  );
  return nueva.id;
}

// Guarda el voto de la persona en esa ronda; si ya había votado, lo cambia ("upsert")
async function guardarVoto(idUsuario, idEncuesta, ronda, valor) {
  revisar(
    await obtenerCliente()
      .from("votos")
      .upsert(
        { id_encuesta: idEncuesta, id_usuario: idUsuario, ronda: ronda, valor: valor },
        { onConflict: "id_encuesta,id_usuario,ronda" }
      ),
    "guardar tu voto"
  );
}

// Guarda el resultado de cerrar una ronda, solo si nadie la cerró antes
// (por eso filtra también por el estado y la ronda que tenía).
// Devuelve true si se guardó, false si otra persona ya la había cerrado.
async function guardarCierre(encuestaNueva, encuestaAnterior) {
  const filas = revisar(
    await obtenerCliente()
      .from("encuestas")
      .update({
        estado: encuestaNueva.estado,
        ronda: encuestaNueva.ronda,
        cierra: new Date(encuestaNueva.cierra).toISOString(),
      })
      .eq("id", encuestaNueva.id)
      .eq("estado", encuestaAnterior.estado)
      .eq("ronda", encuestaAnterior.ronda)
      .select("id"),
    "cerrar la encuesta"
  );
  return filas.length > 0;
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
