import { createContext, useEffect, useState } from "react";
import { cerrarRonda, debeCerrarse, estaAbierta } from "../Logica/votacion";
import * as baseDeDatos from "../Servicios/baseDeDatos";

// Una "caja" con los datos que comparten todas las pantallas.
// Cualquier pantalla la usa así:
//   const { usuario, moodboards, votar } = useContext(AppContexto);
// Los datos salen de assets/Servicios/baseDeDatos.jsx: de los datos de prueba o de Supabase.
// Las funciones que cambian algo son "async": las pantallas esperan su respuesta con "await".
const AppContexto = createContext(null);

// Cada cuánto se vuelven a pedir los datos (para ver los votos de los demás)
// y se cierran las encuestas a las que se les acabó el tiempo
const REVISAR_CADA = 30 * 1000; // 30 segundos
const HORA = 60 * 60 * 1000;

// Los datos antes de iniciar sesión
const SIN_DATOS = { casa: null, usuario: null, usuarios: [], moodboards: [], encuestas: [], votos: [] };

function buscarEncuesta(encuestas, id) {
  return encuestas.find(function (e) {
    return e.id === id;
  });
}

// Pide todos los datos de la casa y cierra las encuestas a las que les toca
// (votaron todos o se acabó el tiempo; las reglas están en Logica/votacion.jsx).
// Devuelve los datos al día.
async function cargarYCerrar(idUsuario) {
  let datos = await baseDeDatos.cargarTodo(idUsuario);
  const ahora = Date.now();
  const porCerrar = datos.encuestas.filter(function (encuesta) {
    return debeCerrarse(encuesta, datos.votos, datos.usuarios.length, ahora);
  });
  for (const encuesta of porCerrar) {
    await baseDeDatos.guardarCierre(cerrarRonda(encuesta, datos.votos, ahora), encuesta);
  }
  if (porCerrar.length > 0) {
    datos = await baseDeDatos.cargarTodo(idUsuario);
  }
  return datos;
}

function ProveedorApp({ children }) {
  const [listo, setListo] = useState(false); // ya se revisó si había una sesión guardada
  const [datos, setDatos] = useState(SIN_DATOS);
  const [error, setError] = useState(""); // el último problema al hablar con la base de datos

  const usuario = datos.usuario; // la persona que inició sesión (o null)
  const idUsuario = usuario ? usuario.id : null;

  // Al abrir la app: si quedó una sesión guardada (con Supabase), entra con ella
  useEffect(function () {
    async function revisarSesion() {
      try {
        const id = await baseDeDatos.sesionGuardada();
        if (id) {
          setDatos(await cargarYCerrar(id));
        }
      } catch (e) {
        setError(e.message);
      }
      setListo(true);
    }
    revisarSesion();
  }, []);

  // Cada 30 segundos, mientras haya alguien con sesión: datos al día y encuestas cerradas a tiempo
  useEffect(
    function () {
      if (idUsuario === null) {
        return undefined;
      }
      const reloj = setInterval(async function () {
        try {
          setDatos(await cargarYCerrar(idUsuario));
        } catch {
          // sin conexión: se vuelve a intentar en 30 segundos
        }
      }, REVISAR_CADA);
      return function () {
        clearInterval(reloj);
      };
    },
    [idUsuario]
  );

  // Corre algo que habla con la base de datos.
  // Si falla, guarda el mensaje (la app lo muestra arriba de la pantalla) y devuelve null.
  async function intentar(accion) {
    setError("");
    try {
      return await accion();
    } catch (e) {
      setError(e.message || "Algo salió mal. Revisa tu conexión e inténtalo otra vez.");
      return null;
    }
  }

  // Vuelve a pedir los datos (después de cada cambio) y los deja en la caja
  async function recargar(id) {
    const nuevos = await cargarYCerrar(id);
    setDatos(nuevos);
    return nuevos;
  }

  // ---------- Sesión ----------

  // Devuelve "" si entró, o un mensaje si el correo o la contraseña no coinciden
  function iniciarSesion(correo, contrasena) {
    return intentar(async function () {
      const respuesta = await baseDeDatos.iniciarSesion(correo, contrasena);
      if (respuesta.error) {
        return respuesta.error;
      }
      await recargar(respuesta.idUsuario);
      return "";
    });
  }

  // Crea la cuenta y entra. Devuelve "" si salió bien, o un mensaje de error
  function registrarse(nombre, correo, contrasena) {
    return intentar(async function () {
      const respuesta = await baseDeDatos.registrarse(nombre, correo, contrasena);
      if (respuesta.error) {
        return respuesta.error;
      }
      await recargar(respuesta.idUsuario);
      return "";
    });
  }

  function completarPerfil(nombre, convive, vibras) {
    return intentar(async function () {
      await baseDeDatos.actualizarPerfil(idUsuario, { nombre: nombre.trim(), convive: convive, vibras: vibras });
      await recargar(idUsuario);
      return true;
    });
  }

  function cerrarSesion() {
    return intentar(async function () {
      await baseDeDatos.cerrarSesion();
      setDatos(SIN_DATOS);
      return true;
    });
  }

  function cambiarNotificacion(clave, valor) {
    return intentar(async function () {
      await baseDeDatos.actualizarPerfil(idUsuario, { notificaciones: { ...usuario.notificaciones, [clave]: valor } });
      await recargar(idUsuario);
      return true;
    });
  }

  // ---------- Muebles guardados ----------

  // Guarda el mueble en "Guardados" (si ya estaba, no hace nada)
  function guardarMueble(idMueble) {
    return intentar(async function () {
      if (!usuario.guardados.includes(idMueble)) {
        await baseDeDatos.guardarMueble(idUsuario, idMueble);
        await recargar(idUsuario);
      }
      return true;
    });
  }

  // ---------- Mood boards ----------

  // Los mood boards que ve la persona: los compartidos de la casa y todos los suyos
  const moodboardsDeLaCasa = datos.moodboards.filter(function (moodboard) {
    const esDeLaCasa = datos.usuarios.some(function (r) {
      return r.id === moodboard.id_dueno;
    });
    return moodboard.id_dueno === idUsuario || (esDeLaCasa && moodboard.compartido);
  });

  // Crea un mood board. ideas: lista de { id_mueble } o { foto, colores }. Devuelve su id
  function crearMoodboard(nombre, ideas, vibras, compartido) {
    return intentar(async function () {
      const id = await baseDeDatos.crearMoodboard(idUsuario, {
        nombre: nombre.trim(),
        ideas: ideas,
        vibras: vibras,
        compartido: compartido,
      });
      await recargar(idUsuario);
      return id;
    });
  }

  // Agrega una idea ({ id_mueble } o { foto, colores }) a un mood board. Devuelve el id de la idea
  function agregarIdea(idMoodboard, idea) {
    return intentar(async function () {
      const idIdea = await baseDeDatos.agregarIdea(idUsuario, idMoodboard, idea);
      if (idea.id_mueble && !usuario.guardados.includes(idea.id_mueble)) {
        await baseDeDatos.guardarMueble(idUsuario, idea.id_mueble); // también queda en "Guardados"
      }
      await recargar(idUsuario);
      return idIdea;
    });
  }

  // ---------- Encuestas y votos ----------
  // Las reglas (cuándo se cierra una ronda y quién gana) están en Logica/votacion.jsx

  // Crea una encuesta activa que cierra en "horas" horas. Devuelve su id
  function crearEncuesta(idMueble, idMoodboard, pregunta, textoSi, textoNo, horas) {
    return intentar(async function () {
      const id = await baseDeDatos.crearEncuesta(idUsuario, {
        id_casa: datos.casa.id,
        id_mueble: idMueble,
        id_moodboard: idMoodboard,
        pregunta: pregunta.trim(),
        texto_si: textoSi.trim(),
        texto_no: textoNo.trim(),
        cierra: Date.now() + horas * HORA,
      });
      await recargar(idUsuario);
      return id;
    });
  }

  // Guarda el voto de la persona ("si" o "no") en la ronda abierta (1, o 2 si es el desempate).
  // Si ya había votado en esa ronda, cambia su voto. Si con este voto ya votaron todos, la ronda se cierra.
  // Devuelve el estado de la encuesta después de votar ("activa", "empate", "aprobada" o "rechazada").
  function votar(idEncuesta, valor) {
    return intentar(async function () {
      // Primero se revisa la encuesta al día: puede que otra persona la haya cerrado
      const actuales = await recargar(idUsuario);
      const encuesta = buscarEncuesta(actuales.encuestas, idEncuesta);
      if (!estaAbierta(encuesta)) {
        return encuesta.estado; // ya se cerró: no se puede votar
      }
      await baseDeDatos.guardarVoto(idUsuario, idEncuesta, encuesta.ronda, valor);
      const nuevos = await recargar(idUsuario); // aquí se cierra si ya votaron todos
      return buscarEncuesta(nuevos.encuestas, idEncuesta).estado;
    });
  }

  // Quien creó la encuesta la puede cerrar antes de tiempo: se cuentan los votos que hay.
  // Devuelve el estado nuevo (si queda empate en la ronda 1, empieza el desempate).
  function cerrarEncuesta(idEncuesta) {
    return intentar(async function () {
      const actuales = await recargar(idUsuario);
      const encuesta = buscarEncuesta(actuales.encuestas, idEncuesta);
      if (!estaAbierta(encuesta) || encuesta.id_creador !== idUsuario) {
        return encuesta.estado;
      }
      await baseDeDatos.guardarCierre(cerrarRonda(encuesta, actuales.votos, Date.now()), encuesta);
      const nuevos = await recargar(idUsuario);
      return buscarEncuesta(nuevos.encuestas, idEncuesta).estado;
    });
  }

  const valor = {
    listo: listo,
    error: error,
    borrarError: function () {
      setError("");
    },
    casa: datos.casa,
    usuario: usuario,
    usuarios: datos.usuarios,
    roommates: datos.usuarios,
    moodboards: datos.moodboards,
    moodboardsDeLaCasa: moodboardsDeLaCasa,
    encuestas: datos.encuestas,
    votos: datos.votos,
    iniciarSesion: iniciarSesion,
    registrarse: registrarse,
    completarPerfil: completarPerfil,
    cerrarSesion: cerrarSesion,
    cambiarNotificacion: cambiarNotificacion,
    guardarMueble: guardarMueble,
    crearMoodboard: crearMoodboard,
    agregarIdea: agregarIdea,
    crearEncuesta: crearEncuesta,
    votar: votar,
    cerrarEncuesta: cerrarEncuesta,
  };

  return <AppContexto.Provider value={valor}>{children}</AppContexto.Provider>;
}

export { AppContexto, ProveedorApp };
