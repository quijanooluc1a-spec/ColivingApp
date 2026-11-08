import { Plus } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { tarjetaMoodboard } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Mini collage + título + subtítulo de un mood board.
// Con esNuevo={true} es la tarjeta punteada "Nuevo mood board".
// Props: titulo, subtitulo, fotos (lista de fuentes de imagen), ancho, alPresionar (función), esNuevo
function TarjetaMoodboard({ titulo, subtitulo, fotos, ancho, alPresionar, esNuevo }) {
  if (esNuevo) {
    return (
      <TouchableOpacity
        style={[tarjetaMoodboard.nuevo, { width: ancho, height: ancho }]}
        onPress={alPresionar}
        activeOpacity={0.7}
      >
        <Plus color={colores.principal} size={28} />
        <Text style={tarjetaMoodboard.textoNuevo}>Nuevo mood board</Text>
      </TouchableOpacity>
    );
  }

  // Collage como el del Figma: una foto grande a la izquierda y dos pequeñas a la derecha
  const anchoGrande = Math.round(ancho * 0.6);
  const anchoPequena = ancho - anchoGrande - 2;
  const altoPequena = (ancho - 2) / 2;

  return (
    <TouchableOpacity style={[tarjetaMoodboard.contenedor, { width: ancho }]} onPress={alPresionar} activeOpacity={0.8}>
      <View style={[tarjetaMoodboard.collage, { width: ancho, height: ancho }]}>
        {fotos[0] ? (
          <Image
            source={fotos[0]}
            style={{ width: fotos.length > 1 ? anchoGrande : ancho, height: ancho }}
            resizeMode="cover"
          />
        ) : null}
        {fotos.length > 1 ? (
          <View style={tarjetaMoodboard.columna}>
            <Image
              source={fotos[1]}
              style={{ width: anchoPequena, height: fotos.length > 2 ? altoPequena : ancho }}
              resizeMode="cover"
            />
            {fotos[2] ? (
              <Image source={fotos[2]} style={{ width: anchoPequena, height: altoPequena }} resizeMode="cover" />
            ) : null}
          </View>
        ) : null}
      </View>
      <Text style={tarjetaMoodboard.titulo} numberOfLines={1}>
        {titulo}
      </Text>
      <Text style={tarjetaMoodboard.subtitulo} numberOfLines={1}>
        {subtitulo}
      </Text>
    </TouchableOpacity>
  );
}

export default TarjetaMoodboard;
