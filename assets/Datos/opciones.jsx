// Listas fijas que usan varias pantallas.

// Categorías de muebles, en el orden de los chips de Explorar (como en el Figma)
const categorias = ["Sofás", "Mesas", "Lámparas", "Sillas", "Estantes", "Plantas"];

// "Tu vibra" en Completar perfil y "Vibra" en Nuevo mood board
const vibras = ["Cálido", "Natural", "Minimalista", "Colorido", "Industrial"];

// "¿Con quién vives?" en Completar perfil
const convivencias = ["Roomies", "Familia", "Pareja"];

// Cuánto dura abierta una encuesta: texto del chip y horas
const duraciones = [
  { texto: "24 h", horas: 24 },
  { texto: "48 h", horas: 48 },
  { texto: "3 días", horas: 72 },
];

// Textos de los botones de una encuesta: el primero es el que viene por defecto
const textosDeVoto = [
  { si: "Me gusta", no: "No me gusta" },
  { si: "Sí, pongámoslo", no: "No, busquemos otro" },
];

export { categorias, convivencias, duraciones, textosDeVoto, vibras };
