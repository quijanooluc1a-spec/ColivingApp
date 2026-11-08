import muebles from "../Datos/muebles";
import { categorias } from "../Datos/opciones";
import { sinTildes } from "../Logica/textos";

// Cuántos muebles llegan en cada página de Explorar
const TAMANO_PAGINA = 10;

// Espera un momento, como si los datos llegaran de internet
function esperar(milisegundos) {
  return new Promise(function (resolver) {
    setTimeout(resolver, milisegundos);
  });
}

// Pide una página del catálogo (de 10 en 10), filtrada por categoría y por texto.
// HOY: lee los muebles de prueba de assets/Datos/muebles.jsx.
// MAÑANA (con Supabase), sería algo como lo de la plantilla cafe-app:
//   axios.get("https://TU-PROYECTO.supabase.co/rest/v1/muebles", {
//     headers: { apikey: "TU_CLAVE" },
//     params: { categoria: "eq." + categoria, offset: pagina * 10, limit: 10 },
//   });
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

// La foto de una idea de mood board: la del mueble o la que se subió del carrete
function fuenteDeIdea(idea) {
  if (idea.id_mueble) {
    return buscarMueble(idea.id_mueble).imagen;
  }
  return { uri: idea.foto };
}

// Enlace para comprar el mueble: abre la búsqueda de la tienda en el navegador
function enlaceTienda(mueble) {
  return "https://www.homecenter.com.co/homecenter-co/search?Ntt=" + encodeURIComponent(mueble.nombre);
}

export { buscarMueble, enlaceTienda, fuenteDeIdea, obtenerCategorias, obtenerMuebles, TAMANO_PAGINA };
