import { Image, Text, View } from "react-native";
import { collage } from "../Styles/Stylesheet";
import { espacios } from "../Styles/Tema";

// Las fotos grandes de un mood board, como en el Figma:
// arriba una foto grande y dos pequeñas; abajo el resto, de a tres por fila.
// Props: fotos (lista de { id, fuente }), ancho (del collage), idNueva (la idea que lleva la etiqueta "Nueva")
function Collage({ fotos, ancho, idNueva }) {
  const separacion = espacios.pequeno;
  const anchoGrande = Math.round((ancho - separacion) * 0.66);
  const anchoPequena = ancho - separacion - anchoGrande;

  // Las filas de abajo: grupos de hasta 3 fotos
  const resto = fotos.slice(3);
  const filas = [];
  for (let i = 0; i < resto.length; i += 3) {
    filas.push(resto.slice(i, i + 3));
  }

  function foto(item, ancho, alto) {
    return (
      <View key={item.id}>
        <Image source={item.fuente} style={[collage.foto, { width: ancho, height: alto }]} resizeMode="cover" />
        {item.id === idNueva ? (
          <View style={collage.etiquetaNueva}>
            <Text style={collage.textoNueva}>Nueva</Text>
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={collage.contenedor}>
      <View style={collage.fila}>
        {fotos[0] ? foto(fotos[0], fotos.length > 1 ? anchoGrande : ancho, 200) : null}
        {fotos.length > 1 ? (
          <View style={collage.columna}>
            {foto(fotos[1], anchoPequena, fotos.length > 2 ? 96 : 200)}
            {fotos[2] ? foto(fotos[2], anchoPequena, 96) : null}
          </View>
        ) : null}
      </View>
      {filas.map(function (fila, numero) {
        const anchoFoto = (ancho - separacion * (fila.length - 1)) / fila.length;
        return (
          <View key={"fila-" + numero} style={collage.fila}>
            {fila.map(function (item) {
              return foto(item, anchoFoto, 100);
            })}
          </View>
        );
      })}
    </View>
  );
}

export default Collage;
