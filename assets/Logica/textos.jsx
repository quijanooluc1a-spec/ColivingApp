// Funciones pequeñas para armar textos que se muestran en pantalla.

// 890000 -> "$ 890.000"
function formatearPrecio(precio) {
  const conPuntos = String(precio).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return "$ " + conPuntos;
}

// "Ana Gómez" -> "Ana"
function primerNombre(nombreCompleto) {
  return nombreCompleto.split(" ")[0];
}

// ["Ana", "Mateo", "Valentina"] -> "Ana, Mateo y Valentina"
function unirNombres(nombres) {
  if (nombres.length <= 1) {
    return nombres.join("");
  }
  return nombres.slice(0, -1).join(", ") + " y " + nombres[nombres.length - 1];
}

// ["Cálido", "Natural"] -> "Cálida y natural" (concuerda con "vibra")
function describirVibra(vibras) {
  if (vibras.length === 0) {
    return "Sin vibra";
  }
  const palabras = vibras.map(function (vibra) {
    return vibra.replace(/o$/, "a").toLowerCase();
  });
  const texto = unirNombres(palabras);
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// 1 -> "1 voto", 2 -> "2 votos"
function textoVotos(cantidad) {
  return cantidad === 1 ? "1 voto" : cantidad + " votos";
}

// 1 -> "1 idea", 4 -> "4 ideas"
function textoIdeas(cantidad) {
  return cantidad === 1 ? "1 idea" : cantidad + " ideas";
}

// Cuánto falta para que cierre una encuesta: "cierra en 4 h" o "cierra en 2 días"
function tiempoRestante(cierra) {
  const horas = Math.ceil((cierra - Date.now()) / (60 * 60 * 1000));
  if (horas <= 0) {
    return "cerrada";
  }
  if (horas < 48) {
    return "cierra en " + horas + " h";
  }
  return "cierra en " + Math.round(horas / 24) + " días";
}

// Quita tildes y mayúsculas para buscar: "Lámpara" -> "lampara"
function sinTildes(texto) {
  return texto
    .toLowerCase()
    .replace(/[áä]/g, "a")
    .replace(/[éë]/g, "e")
    .replace(/[íï]/g, "i")
    .replace(/[óö]/g, "o")
    .replace(/[úü]/g, "u");
}

export { describirVibra, formatearPrecio, primerNombre, sinTildes, textoIdeas, textoVotos, tiempoRestante, unirNombres };
