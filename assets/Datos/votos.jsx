// Los votos de prueba. En una base de datos sería la tabla "votos".
// Cada roommate tiene como máximo un voto por encuesta y por ronda.
// valor: "si" (primer botón) o "no" (segundo botón).
const votos = [
  // e1 · Sofá 3 puestos (activa): falta que vote Valentina
  { id: "v1", id_encuesta: "e1", id_usuario: "u1", ronda: 1, valor: "si" },
  { id: "v2", id_encuesta: "e1", id_usuario: "u2", ronda: 1, valor: "si" },
  // e2 · Lámpara de arco (activa): falta que vote Ana
  { id: "v3", id_encuesta: "e2", id_usuario: "u2", ronda: 1, valor: "si" },
  { id: "v4", id_encuesta: "e2", id_usuario: "u3", ronda: 1, valor: "no" },
  // e3 · Silla de comedor (activa): faltan Ana y Mateo
  { id: "v5", id_encuesta: "e3", id_usuario: "u3", ronda: 1, valor: "si" },
  // e4 · Mesa de comedor (aprobada 2 – 1)
  { id: "v6", id_encuesta: "e4", id_usuario: "u1", ronda: 1, valor: "si" },
  { id: "v7", id_encuesta: "e4", id_usuario: "u2", ronda: 1, valor: "si" },
  { id: "v8", id_encuesta: "e4", id_usuario: "u3", ronda: 1, valor: "no" },
  // e5 · Lámpara de pie (rechazada 1 – 2)
  { id: "v9", id_encuesta: "e5", id_usuario: "u1", ronda: 1, valor: "no" },
  { id: "v10", id_encuesta: "e5", id_usuario: "u2", ronda: 1, valor: "no" },
  { id: "v11", id_encuesta: "e5", id_usuario: "u3", ronda: 1, valor: "si" },
  // e6 · Love seat azul: la ronda 1 terminó 1 – 1 (Valentina no alcanzó a votar).
  // En el desempate van 1 – 1 y falta Ana: su voto decide.
  { id: "v12", id_encuesta: "e6", id_usuario: "u1", ronda: 1, valor: "si" },
  { id: "v13", id_encuesta: "e6", id_usuario: "u2", ronda: 1, valor: "no" },
  { id: "v19", id_encuesta: "e6", id_usuario: "u2", ronda: 2, valor: "no" },
  { id: "v20", id_encuesta: "e6", id_usuario: "u3", ronda: 2, valor: "si" },
  // e7 · Planta monstera: empate 1 – 1 en la ronda 1 y desempate 2 – 1 en la ronda 2
  { id: "v14", id_encuesta: "e7", id_usuario: "u1", ronda: 1, valor: "si" },
  { id: "v15", id_encuesta: "e7", id_usuario: "u3", ronda: 1, valor: "no" },
  { id: "v16", id_encuesta: "e7", id_usuario: "u1", ronda: 2, valor: "si" },
  { id: "v17", id_encuesta: "e7", id_usuario: "u2", ronda: 2, valor: "si" },
  { id: "v18", id_encuesta: "e7", id_usuario: "u3", ronda: 2, valor: "no" },
];

export default votos;
