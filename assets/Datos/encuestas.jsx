// Las encuestas de prueba: hay una de cada estado que muestra el Figma.
// En una base de datos sería la tabla "encuestas".
// - estado: "activa" (ronda 1 abierta), "empate" (desempate abierto), "aprobada" o "rechazada".
// - ronda: la ronda que se está votando, o en la que se decidió. 1 es la votación normal; 2 es el desempate.
// - creada y cierra: fecha y hora en milisegundos (como lo da Date.now()).
//   "cierra" es cuándo se cierra la ronda abierta, o cuándo se cerró la encuesta si ya terminó.
// Las reglas para cerrar y contar están en Logica/votacion.jsx.

const AHORA = Date.now();
const HORA = 60 * 60 * 1000;
const DIA = 24 * HORA;

const encuestas = [
  {
    id: "e1",
    id_mueble: "m1",
    id_moodboard: "mb1",
    id_creador: "u1",
    pregunta: "¿Lo ponemos en la sala?",
    texto_si: "Me gusta",
    texto_no: "No me gusta",
    creada: AHORA - 6 * HORA,
    cierra: AHORA + 42 * HORA,
    estado: "activa",
    ronda: 1,
  },
  {
    id: "e2",
    id_mueble: "m12",
    id_moodboard: "mb5",
    id_creador: "u2",
    pregunta: "¿La ponemos junto al sofá?",
    texto_si: "Me gusta",
    texto_no: "No me gusta",
    creada: AHORA - 20 * HORA,
    cierra: AHORA + 4 * HORA,
    estado: "activa",
    ronda: 1,
  },
  {
    id: "e3",
    id_mueble: "m17",
    id_moodboard: "mb4",
    id_creador: "u3",
    pregunta: "¿La ponemos en el comedor?",
    texto_si: "Me gusta",
    texto_no: "No me gusta",
    creada: AHORA - 2 * HORA,
    cierra: AHORA + 70 * HORA,
    estado: "activa",
    ronda: 1,
  },
  {
    id: "e4",
    id_mueble: "m10",
    id_moodboard: "mb3",
    id_creador: "u2",
    pregunta: "¿La ponemos en el comedor?",
    texto_si: "Sí, la ponemos",
    texto_no: "No, buscamos otra",
    creada: AHORA - 5 * DIA,
    cierra: AHORA - 4 * DIA,
    estado: "aprobada",
    ronda: 1,
  },
  {
    id: "e5",
    id_mueble: "m11",
    id_moodboard: "mb4",
    id_creador: "u3",
    pregunta: "¿La ponemos en la sala?",
    texto_si: "Sí, la ponemos",
    texto_no: "No, buscamos otra",
    creada: AHORA - 4 * DIA,
    cierra: AHORA - 3 * DIA,
    estado: "rechazada",
    ronda: 1,
  },
  {
    id: "e6",
    id_mueble: "m5",
    id_moodboard: "mb4",
    id_creador: "u3",
    pregunta: "¿Lo ponemos en la sala?",
    texto_si: "Sí, ponerlo",
    texto_no: "No ponerlo",
    // La ronda 1 duró 48 h y terminó 1 – 1 hace 4 horas; el desempate (24 h) cierra en 20 horas
    creada: AHORA - 52 * HORA,
    cierra: AHORA + 20 * HORA,
    estado: "empate",
    ronda: 2,
  },
  {
    id: "e7",
    id_mueble: "m21",
    id_moodboard: "mb4",
    id_creador: "u3",
    pregunta: "¿La ponemos en la sala?",
    texto_si: "Sí, ponerla",
    texto_no: "No ponerla",
    creada: AHORA - 6 * DIA,
    cierra: AHORA - 5 * DIA,
    estado: "aprobada",
    ronda: 2,
  },
];

export default encuestas;
