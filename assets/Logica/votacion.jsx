import { buscarMueble } from "../Servicios/baseDeDatos";
import { coloresParecidos, paletaDeIdeas } from "./paleta";
import { primerNombre, tiempoRestante } from "./textos";

// Reglas de la votación (sección 7 de la propuesta de la Fase 1).
//
// Una encuesta pasa por estos estados:
//   "activa"    → está abierta la ronda 1: cada roommate vota sí o no y puede cambiar su voto.
//   "empate"    → la ronda 1 terminó empatada y está abierta la ronda 2 (el desempate anónimo).
//   "aprobada"  → ganó el sí, en la ronda 1 o en el desempate. El mueble se pone.
//   "rechazada" → ganó el no, nadie votó o siguió el empate en el desempate. El mueble no se pone.
//
// Una ronda se cierra cuando votan todos los roommates, cuando se acaba el tiempo
// o cuando quien creó la encuesta la cierra antes.

const HORA = 60 * 60 * 1000;

// Cuánto tiempo queda abierto el desempate
const HORAS_DESEMPATE = 24;

// Cuenta los votos de una encuesta en una ronda: { si: 2, no: 1, total: 3 }
function contarVotos(votos, idEncuesta, ronda) {
  let si = 0;
  let no = 0;
  votos.forEach(function (voto) {
    if (voto.id_encuesta === idEncuesta && voto.ronda === ronda) {
      if (voto.valor === "si") {
        si = si + 1;
      } else {
        no = no + 1;
      }
    }
  });
  return { si: si, no: no, total: si + no };
}

// Lo que votó una persona en una encuesta y ronda: "si", "no" o null si no ha votado
function votoDe(votos, idEncuesta, idUsuario, ronda) {
  const voto = votos.find(function (v) {
    return v.id_encuesta === idEncuesta && v.id_usuario === idUsuario && v.ronda === ronda;
  });
  return voto ? voto.valor : null;
}

// true si todavía se puede votar (en la ronda 1 o en el desempate)
function estaAbierta(encuesta) {
  return encuesta.estado === "activa" || encuesta.estado === "empate";
}

// Cómo termina una ronda según sus votos: "aprobada", "rechazada" o "empate"
function resultadoDeRonda(conteo, ronda) {
  if (conteo.total === 0) {
    return "rechazada"; // nadie votó: el mueble no se pone
  }
  if (conteo.si > conteo.no) {
    return "aprobada";
  }
  if (conteo.no > conteo.si) {
    return "rechazada";
  }
  // Empate: en la ronda 1 empieza el desempate; en la ronda 2 el mueble ya no se pone
  return ronda === 1 ? "empate" : "rechazada";
}

// ¿Hay que cerrar ya la ronda abierta? Sí, si votaron todos los roommates o si se acabó el tiempo
function debeCerrarse(encuesta, votos, cantidadRoommates, ahora) {
  if (!estaAbierta(encuesta)) {
    return false;
  }
  const conteo = contarVotos(votos, encuesta.id, encuesta.ronda);
  return conteo.total >= cantidadRoommates || ahora >= encuesta.cierra;
}

// Cierra la ronda abierta y devuelve la encuesta con su nuevo estado
function cerrarRonda(encuesta, votos, ahora) {
  const conteo = contarVotos(votos, encuesta.id, encuesta.ronda);
  const estado = resultadoDeRonda(conteo, encuesta.ronda);
  if (estado === "empate") {
    // Empieza el desempate: ronda 2, abierta por 24 horas
    return { ...encuesta, estado: "empate", ronda: 2, cierra: ahora + HORAS_DESEMPATE * HORA };
  }
  // Terminó. "cierra" queda con la hora en que de verdad se cerró
  return { ...encuesta, estado: estado, cierra: Math.min(encuesta.cierra, ahora) };
}

// El marcador de una ronda, por ejemplo "2 – 1".
// Para que no quede partido en dos líneas usa espacios que no se cortan (\u00A0)
// y, después de la raya, un carácter invisible que no deja cortar ahí (\u2060).
function marcador(conteo) {
  return conteo.si + "\u00A0–\u2060\u00A0" + conteo.no;
}

// Una línea que resume cómo va o cómo terminó una encuesta, por ejemplo "Ganó «Me gusta» · 2 – 1"
function resumenEncuesta(encuesta, votos) {
  if (encuesta.estado === "activa") {
    return "En votación · " + tiempoRestante(encuesta.cierra);
  }
  if (encuesta.estado === "empate") {
    const ronda1 = contarVotos(votos, encuesta.id, 1);
    return "Empate " + marcador(ronda1) + " · el desempate " + tiempoRestante(encuesta.cierra);
  }
  const conteo = contarVotos(votos, encuesta.id, encuesta.ronda);
  const desempate = encuesta.ronda === 2 ? " en el desempate" : "";
  if (encuesta.estado === "aprobada") {
    return "Ganó «" + encuesta.texto_si + "» · " + marcador(conteo) + desempate;
  }
  if (conteo.total === 0) {
    return "Nadie votó" + desempate;
  }
  if (conteo.si === conteo.no) {
    return "Siguió el empate · " + marcador(conteo) + desempate;
  }
  return "Ganó el «No» · " + marcador(conteo) + desempate;
}

// Por qué no se pone el mueble (para el aviso amarillo del resultado)
function motivoRechazo(encuesta, votos) {
  const conteo = contarVotos(votos, encuesta.id, encuesta.ronda);
  if (encuesta.ronda === 1) {
    if (conteo.total === 0) {
      return "Nadie votó, así que el mueble no se pone. Haz una nueva propuesta.";
    }
    return "Ganó el «No». Haz una nueva propuesta.";
  }
  if (conteo.total === 0) {
    return "Nadie votó en el desempate, así que el mueble no se pone. Haz una nueva propuesta.";
  }
  if (conteo.si === conteo.no) {
    return "Siguió el empate después del desempate, así que el mueble no se pone. Haz una nueva propuesta.";
  }
  return "Ganó el «No» en el desempate. Haz una nueva propuesta.";
}

// Qué pasaría si se cierra la ronda ahora (para confirmar antes de cerrarla)
function textoAlCerrar(encuesta, votos) {
  const conteo = contarVotos(votos, encuesta.id, encuesta.ronda);
  const resultado = resultadoDeRonda(conteo, encuesta.ronda);
  let quePasa = "gana el «No» " + marcador(conteo) + " y el mueble no se pone.";
  if (resultado === "aprobada") {
    quePasa = "gana «" + encuesta.texto_si + "» " + marcador(conteo) + ".";
  } else if (resultado === "empate") {
    quePasa = "queda empate " + marcador(conteo) + " y empieza el desempate.";
  } else if (conteo.total === 0) {
    quePasa = "nadie votó y el mueble no se pone.";
  } else if (conteo.si === conteo.no) {
    quePasa = "sigue el empate " + marcador(conteo) + " y el mueble no se pone.";
  }
  return "Si cierras ahora, " + quePasa + " Ya nadie podrá votar en esta ronda.";
}

// Sugiere hasta 3 muebles para reemplazar uno que no ganó.
// Busca en los mood boards compartidos de los roommates y deja por fuera los muebles que ya tienen encuesta.
// Puntos de cada mueble:
//   +100 si es de la misma categoría que el que no ganó,
//   +10 por cada roommate que lo tiene en un mood board,
//   +1 por cada color suyo parecido a la paleta del mood board de la encuesta.
// Así cuenta primero la categoría, después cuántos lo quieren y al final los colores.
function sugerirMuebles(encuesta, moodboards, roommates, encuestas) {
  const rechazado = buscarMueble(encuesta.id_mueble);
  const moodboardDeLaEncuesta = moodboards.find(function (m) {
    return m.id === encuesta.id_moodboard;
  });
  const paleta = moodboardDeLaEncuesta ? paletaDeIdeas(moodboardDeLaEncuesta.ideas) : [];

  function yaTieneEncuesta(idMueble) {
    return encuestas.some(function (e) {
      return e.id_mueble === idMueble;
    });
  }

  const candidatos = {};
  moodboards.forEach(function (moodboard) {
    const dueno = roommates.find(function (r) {
      return r.id === moodboard.id_dueno;
    });
    if (!dueno || !moodboard.compartido) {
      return; // solo cuentan los mood boards que se comparten con la casa
    }
    moodboard.ideas.forEach(function (idea) {
      if (!idea.id_mueble || yaTieneEncuesta(idea.id_mueble)) {
        return;
      }
      if (!candidatos[idea.id_mueble]) {
        candidatos[idea.id_mueble] = { mueble: buscarMueble(idea.id_mueble), idMoodboard: moodboard.id, nombres: [] };
      }
      const nombre = primerNombre(dueno.nombre);
      if (!candidatos[idea.id_mueble].nombres.includes(nombre)) {
        candidatos[idea.id_mueble].nombres.push(nombre);
      }
    });
  });

  function puntos(candidato) {
    const porCategoria = rechazado && candidato.mueble.categoria === rechazado.categoria ? 100 : 0;
    const porRoommates = candidato.nombres.length * 10;
    const porColores = coloresParecidos(candidato.mueble.colores, paleta);
    return porCategoria + porRoommates + porColores;
  }

  return Object.values(candidatos)
    .sort(function (a, b) {
      return puntos(b) - puntos(a);
    })
    .slice(0, 3);
}

export {
  cerrarRonda,
  contarVotos,
  debeCerrarse,
  estaAbierta,
  marcador,
  motivoRechazo,
  resultadoDeRonda,
  resumenEncuesta,
  sugerirMuebles,
  textoAlCerrar,
  votoDe,
};
