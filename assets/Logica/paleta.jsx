import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { decode } from "jpeg-js";
import { buscarMueble } from "../Servicios/muebles";

// "#D9653B" -> { r: 217, g: 101, b: 59 }
function aRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

// (217, 101, 59) -> "#D9653B"
function aHex(r, g, b) {
  const partes = [r, g, b].map(function (valor) {
    return Math.min(255, valor).toString(16).padStart(2, "0");
  });
  return ("#" + partes.join("")).toUpperCase();
}

// Dos colores son "parecidos" si su distancia es menor que esto
const PARECIDO = 60;

// Qué tan distintos son dos colores (0 = iguales)
function distancia(color1, color2) {
  const a = aRgb(color1);
  const b = aRgb(color2);
  return Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b);
}

// Qué tan claro es un color (0 = negro, 255 = blanco)
function claridad(color) {
  const c = aRgb(color);
  return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b;
}

// Qué tan fuerte es un color (0 = gris, 1 = muy vivo)
function fuerza(color) {
  const c = aRgb(color);
  const mayor = Math.max(c.r, c.g, c.b);
  const menor = Math.min(c.r, c.g, c.b);
  return mayor === 0 ? 0 : (mayor - menor) / mayor;
}

// Escoge hasta 5 colores de la lista, saltándose los muy parecidos a uno ya escogido
function escogerColores(lista) {
  const elegidos = [];
  lista.forEach(function (color) {
    const parecido = elegidos.some(function (otro) {
      return distancia(color, otro) < PARECIDO;
    });
    if (!parecido && elegidos.length < 5) {
      elegidos.push(color);
    }
  });
  return elegidos;
}

// Cuántos de estos colores se parecen a alguno de la paleta.
// Sirve para saber si un mueble combina con un mood board (se usa en las sugerencias).
function coloresParecidos(colores, paleta) {
  return colores.filter(function (color) {
    return paleta.some(function (otro) {
      return distancia(color, otro) < PARECIDO;
    });
  }).length;
}

// Los colores de una idea: los del mueble, o los que se sacaron de la foto del carrete
function coloresDeIdea(idea) {
  if (idea.id_mueble) {
    const mueble = buscarMueble(idea.id_mueble);
    return mueble ? mueble.colores : [];
  }
  return idea.colores || [];
}

// La paleta de un mood board: primero el color principal de cada idea, después el segundo
function paletaDeIdeas(ideas) {
  const primeros = ideas.map(function (idea) {
    return coloresDeIdea(idea)[0];
  });
  const segundos = ideas.map(function (idea) {
    return coloresDeIdea(idea)[1];
  });
  const todos = primeros.concat(segundos).filter(function (color) {
    return color !== undefined;
  });
  return escogerColores(todos);
}

// Saca los colores principales de una foto del carrete:
// 1. achica la foto a 16 x 16 píxeles,
// 2. lee el color de cada píxel,
// 3. redondea los colores para juntar los parecidos y cuenta cuántas veces sale cada uno,
// 4. se queda con los 5 que más se repiten.
async function coloresDeFoto(uri) {
  const contexto = ImageManipulator.manipulate(uri);
  contexto.resize({ width: 16, height: 16 });
  const imagen = await contexto.renderAsync();
  const resultado = await imagen.saveAsync({ base64: true, format: SaveFormat.JPEG });

  // La foto llega como texto (base64): se pasa a bytes y de bytes a píxeles
  const texto = atob(resultado.base64);
  const bytes = new Uint8Array(texto.length);
  for (let i = 0; i < texto.length; i++) {
    bytes[i] = texto.charCodeAt(i);
  }
  const pixeles = decode(bytes, { useTArray: true }).data; // r, g, b, a, r, g, b, a...

  const cuentas = {};
  for (let i = 0; i < pixeles.length; i += 4) {
    const color = aHex(
      Math.round(pixeles[i] / 32) * 32,
      Math.round(pixeles[i + 1] / 32) * 32,
      Math.round(pixeles[i + 2] / 32) * 32
    );
    cuentas[color] = (cuentas[color] || 0) + 1;
  }
  const ordenados = Object.keys(cuentas).sort(function (a, b) {
    return cuentas[b] - cuentas[a];
  });
  return escogerColores(ordenados);
}

// Qué combina con la paleta: el color más claro para paredes, el más oscuro para pisos,
// el más fuerte para muebles y luz cálida o fría según si la paleta tira a rojo o a azul
function queCombina(colores) {
  if (colores.length === 0) {
    return null;
  }
  const porClaridad = colores.slice().sort(function (a, b) {
    return claridad(b) - claridad(a);
  });
  const paredes = porClaridad[0];
  const pisos = porClaridad[porClaridad.length - 1];

  // Para muebles: el color más fuerte que no se usó en paredes ni en pisos
  const restantes = colores.filter(function (color) {
    return color !== paredes && color !== pisos;
  });
  const candidatos = restantes.length > 0 ? restantes : colores;
  const porFuerza = candidatos.slice().sort(function (a, b) {
    return fuerza(b) - fuerza(a);
  });

  let rojo = 0;
  let azul = 0;
  colores.forEach(function (color) {
    rojo = rojo + aRgb(color).r;
    azul = azul + aRgb(color).b;
  });
  return {
    paredes: paredes,
    pisos: pisos,
    muebles: porFuerza[0],
    luzCalida: rojo >= azul,
  };
}

export { coloresDeFoto, coloresParecidos, paletaDeIdeas, queCombina };
