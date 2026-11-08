import { useWindowDimensions, View } from "react-native";
import { grilla } from "../Styles/Stylesheet";
import { espacios, medidas } from "../Styles/Tema";
import TarjetaMueble from "./TarjetaMueble";

// Las dos columnas tipo Pinterest (en el Figma se llaman col-1 y col-2)
// Props: muebles, alPresionarMueble (función que recibe el mueble),
//        mostrarMas (true muestra el "+"), alAgregar (función que recibe el mueble), agregados (lista de ids ya agregados)
function GrillaMuebles({ muebles, alPresionarMueble, mostrarMas, alAgregar, agregados }) {
  // Ancho de cada tarjeta: el ancho de la pantalla menos los márgenes y el espacio del medio, dividido en 2
  const anchoPantalla = Math.min(useWindowDimensions().width, medidas.anchoMaximo);
  const anchoTarjeta = (anchoPantalla - espacios.normal * 2 - espacios.medio) / 2;

  // Los muebles 1, 3, 5... van a la izquierda y los 2, 4, 6... a la derecha
  const izquierda = muebles.filter(function (mueble, posicion) {
    return posicion % 2 === 0;
  });
  const derecha = muebles.filter(function (mueble, posicion) {
    return posicion % 2 === 1;
  });

  function columna(lista) {
    return (
      <View style={grilla.columna}>
        {lista.map(function (mueble) {
          return (
            <TarjetaMueble
              key={mueble.id}
              mueble={mueble}
              ancho={anchoTarjeta}
              alPresionar={function () {
                alPresionarMueble(mueble);
              }}
              mostrarMas={mostrarMas}
              alAgregar={function () {
                alAgregar(mueble);
              }}
              agregado={agregados ? agregados.includes(mueble.id) : false}
            />
          );
        })}
      </View>
    );
  }

  return (
    <View style={grilla.fila}>
      {columna(izquierda)}
      {columna(derecha)}
    </View>
  );
}

export default GrillaMuebles;
