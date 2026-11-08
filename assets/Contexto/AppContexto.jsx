import { createContext, useState } from "react";
import casa from "../Datos/casa";
import encuestasDePrueba from "../Datos/encuestas";
import moodboardsDePrueba from "../Datos/moodboards";
import usuariosDePrueba from "../Datos/usuarios";
import votosDePrueba from "../Datos/votos";

// Una "caja" con los datos que comparten todas las pantallas.
// Cualquier pantalla la usa así:
//   const { usuario, moodboards, votar } = useContext(AppContexto);
// Los datos viven mientras la app está abierta: al recargarla vuelven los datos de prueba.
const AppContexto = createContext(null);

// Crea un id nuevo, por ejemplo "mb1730000000000"
function crearId(prefijo) {
  return prefijo + Date.now();
}

// Colores de avatar para las personas que se registran (se van turnando)
const coloresDeAvatar = ["principalSuave", "verdeSuave", "amarilloSuave"];

function ProveedorApp({ children }) {
  const [usuarios, setUsuarios] = useState(usuariosDePrueba);
  const [idUsuario, setIdUsuario] = useState(null); // quién inició sesión (null = nadie)
  const [moodboards, setMoodboards] = useState(moodboardsDePrueba);
  const [encuestas, setEncuestas] = useState(encuestasDePrueba);
  const [votos, setVotos] = useState(votosDePrueba);

  // La persona que inició sesión (o null)
  const usuario =
    usuarios.find(function (u) {
      return u.id === idUsuario;
    }) || null;

  // Las personas que viven en la casa
  const roommates = usuarios.filter(function (u) {
    return u.id_casa === casa.id;
  });

  // Cambia algunos datos de la persona que inició sesión
  function actualizarUsuario(cambios) {
    setUsuarios(function (lista) {
      return lista.map(function (u) {
        return u.id === idUsuario ? { ...u, ...cambios } : u;
      });
    });
  }

  // ---------- Sesión ----------

  // Devuelve true si el correo y la contraseña son de alguien
  function iniciarSesion(correo, contrasena) {
    const encontrado = usuarios.find(function (u) {
      return u.correo === correo.trim().toLowerCase() && u.contrasena === contrasena;
    });
    if (encontrado) {
      setIdUsuario(encontrado.id);
      return true;
    }
    return false;
  }

  // Crea la cuenta y entra. Devuelve un mensaje de error o "" si salió bien
  function registrarse(nombre, correo, contrasena) {
    const correoLimpio = correo.trim().toLowerCase();
    const existe = usuarios.some(function (u) {
      return u.correo === correoLimpio;
    });
    if (existe) {
      return "Ya hay una cuenta con ese correo.";
    }
    const palabras = nombre.trim().split(" ");
    const iniciales = (palabras[0][0] + (palabras[1] ? palabras[1][0] : "")).toUpperCase();
    const nuevo = {
      id: crearId("u"),
      nombre: nombre.trim(),
      correo: correoLimpio,
      contrasena: contrasena,
      iniciales: iniciales,
      colorAvatar: coloresDeAvatar[usuarios.length % 3],
      convive: "Roomies",
      vibras: [],
      id_casa: casa.id,
      guardados: [],
      notificaciones: { activas: true, nuevas: true, resultados: true },
    };
    setUsuarios(usuarios.concat(nuevo));
    setIdUsuario(nuevo.id);
    return "";
  }

  function completarPerfil(nombre, convive, vibras) {
    actualizarUsuario({ nombre: nombre.trim(), convive: convive, vibras: vibras });
  }

  function cerrarSesion() {
    setIdUsuario(null);
  }

  function cambiarNotificacion(clave, valor) {
    actualizarUsuario({ notificaciones: { ...usuario.notificaciones, [clave]: valor } });
  }

  // ---------- Muebles guardados ----------

  // Guarda el mueble en "Guardados" (si ya estaba, no hace nada)
  function guardarMueble(idMueble) {
    if (!usuario.guardados.includes(idMueble)) {
      actualizarUsuario({ guardados: usuario.guardados.concat(idMueble) });
    }
  }

  // ---------- Mood boards ----------

  // Los mood boards que ve la persona: los compartidos de la casa y todos los suyos
  const moodboardsDeLaCasa = moodboards.filter(function (moodboard) {
    const esDeLaCasa = roommates.some(function (r) {
      return r.id === moodboard.id_dueno;
    });
    const esMio = usuario !== null && moodboard.id_dueno === usuario.id;
    return esMio || (esDeLaCasa && moodboard.compartido);
  });

  // Crea un mood board. ideas: lista de { id_mueble } o { foto, colores }. Devuelve su id
  function crearMoodboard(nombre, ideas, vibras, compartido) {
    const nuevo = {
      id: crearId("mb"),
      nombre: nombre.trim(),
      id_dueno: usuario.id,
      ideas: ideas.map(function (idea, posicion) {
        return { ...idea, id: crearId("i") + "-" + posicion };
      }),
      vibras: vibras,
      descripcion: "",
      compartido: compartido,
    };
    setMoodboards(moodboards.concat(nuevo));
    return nuevo.id;
  }

  // Agrega una idea ({ id_mueble } o { foto, colores }) a un mood board. Devuelve el id de la idea
  function agregarIdea(idMoodboard, idea) {
    const idIdea = crearId("i");
    setMoodboards(
      moodboards.map(function (moodboard) {
        if (moodboard.id !== idMoodboard) {
          return moodboard;
        }
        return { ...moodboard, ideas: moodboard.ideas.concat({ ...idea, id: idIdea }) };
      })
    );
    if (idea.id_mueble) {
      guardarMueble(idea.id_mueble);
    }
    return idIdea;
  }

  // ---------- Encuestas y votos ----------

  // Crea una encuesta activa que cierra en "horas" horas. Devuelve su id
  function crearEncuesta(idMueble, idMoodboard, pregunta, textoSi, textoNo, horas) {
    const nueva = {
      id: crearId("e"),
      id_mueble: idMueble,
      id_moodboard: idMoodboard,
      id_creador: usuario.id,
      pregunta: pregunta.trim(),
      texto_si: textoSi.trim(),
      texto_no: textoNo.trim(),
      creada: Date.now(),
      cierra: Date.now() + horas * 60 * 60 * 1000,
      estado: "activa",
      ronda: 1,
    };
    setEncuestas([nueva].concat(encuestas));
    return nueva.id;
  }

  // Guarda el voto de la persona ("si" o "no"). Si ya había votado en esa ronda, cambia su voto.
  // ronda: 1 es la votación normal y 2 el desempate (si no se dice, es la ronda actual de la encuesta).
  function votar(idEncuesta, valor, ronda) {
    const encuesta = encuestas.find(function (e) {
      return e.id === idEncuesta;
    });
    const rondaDelVoto = ronda || encuesta.ronda;
    const sinMiVoto = votos.filter(function (v) {
      return !(v.id_encuesta === idEncuesta && v.id_usuario === usuario.id && v.ronda === rondaDelVoto);
    });
    const nuevo = {
      id: crearId("v"),
      id_encuesta: idEncuesta,
      id_usuario: usuario.id,
      ronda: rondaDelVoto,
      valor: valor,
    };
    setVotos(sinMiVoto.concat(nuevo));
  }

  const valor = {
    casa: casa,
    usuario: usuario,
    usuarios: usuarios,
    roommates: roommates,
    moodboards: moodboards,
    moodboardsDeLaCasa: moodboardsDeLaCasa,
    encuestas: encuestas,
    votos: votos,
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
  };

  return <AppContexto.Provider value={valor}>{children}</AppContexto.Provider>;
}

export { AppContexto, ProveedorApp };
