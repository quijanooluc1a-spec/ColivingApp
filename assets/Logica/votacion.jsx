import { buscarMueble } from "../Servicios/muebles";
import { primerNombre, tiempoRestante } from "./textos";

// Reglas de la votación que necesitan las pantallas.
// En la Fase 4 se agregan aquí el cierre de las encuestas, el conteo final y el desempate.

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

// Una línea que resume cómo va o cómo terminó una encuesta, por ejemplo "Ganó «Me gusta» · 2 – 1"
function resumenEncuesta(encuesta, votos) {
  const conteo = contarVotos(votos, encuesta.id, encuesta.ronda);
  const marcador = conteo.si + " – " + conteo.no;
  if (encuesta.estado === "activa") {
    return "En votación · " + tiempoRestante(encuesta.cierra);
  }
  if (encuesta.estado === "empate") {
    return "Empate " + marcador;
  }
  const desempate = encuesta.ronda === 2 ? " en el desempate" : "";
  if (encuesta.estado === "aprobada") {
    return "Ganó «" + encuesta.texto_si + "» · " + marcador + desempate;
  }
  return "Ganó el «No» · " + marcador + desempate;
}

// Sugiere hasta 3 muebles de los mood boards de la casa cuando una encuesta no ganó.
// Por ahora prefiere los de la misma categoría y los que están en más mood boards.
// (En la Fase 4 también va a comparar los colores.)
function sugerirMuebles(idMueble, moodboardsDeLaCasa, usuarios) {
  const rechazado = buscarMueble(idMueble);
  const candidatos = {};

  moodboardsDeLaCasa.forEach(function (moodboard) {
    const dueno = usuarios.find(function (u) {
      return u.id === moodboard.id_dueno;
    });
    moodboard.ideas.forEach(function (idea) {
      if (!idea.id_mueble || idea.id_mueble === idMueble) {
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
    const mismaCategoria = rechazado && candidato.mueble.categoria === rechazado.categoria ? 10 : 0;
    return mismaCategoria + candidato.nombres.length;
  }

  return Object.values(candidatos)
    .sort(function (a, b) {
      return puntos(b) - puntos(a);
    })
    .slice(0, 3);
}

export { contarVotos, resumenEncuesta, sugerirMuebles, votoDe };
