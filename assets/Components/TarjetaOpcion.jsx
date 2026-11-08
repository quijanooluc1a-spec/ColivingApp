import { Check } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { tarjetaOpcion } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Fila con foto, dos textos y un círculo para elegir (sugerencias, desempate, mueble elegido).
// Si no se pasa "seleccionado", la fila no muestra el círculo.
// Props: foto (fuente de imagen), titulo, subtitulo, seleccionado (true o false),
//        alPresionar (función), tamanoFoto (48, 56, 64 o 72)
function TarjetaOpcion({ foto, titulo, subtitulo, seleccionado, alPresionar, tamanoFoto }) {
  const tamano = tamanoFoto || 48;
  const conCirculo = seleccionado !== undefined;

  return (
    <TouchableOpacity
      style={seleccionado ? tarjetaOpcion.contenedorActivo : tarjetaOpcion.contenedor}
      onPress={alPresionar}
      disabled={!alPresionar}
      activeOpacity={0.7}
      accessibilityState={{ selected: seleccionado }}
    >
      <Image source={foto} style={[tarjetaOpcion.foto, { width: tamano, height: tamano }]} resizeMode="cover" />
      <View style={tarjetaOpcion.textos}>
        <Text style={tarjetaOpcion.titulo}>{titulo}</Text>
        {subtitulo ? <Text style={tarjetaOpcion.subtitulo}>{subtitulo}</Text> : null}
      </View>
      {conCirculo ? (
        <View style={seleccionado ? tarjetaOpcion.circuloActivo : tarjetaOpcion.circulo}>
          {seleccionado ? <Check color={colores.sobrePrincipal} size={14} strokeWidth={3} /> : null}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default TarjetaOpcion;
