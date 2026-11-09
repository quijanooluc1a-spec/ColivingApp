import { Check } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { tarjetaOpcion } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Fila con foto, dos textos y un círculo para elegir (sugerencias, desempate, mueble elegido).
// Si no se pasa "seleccionado", la fila no muestra el círculo.
// Al elegirla cambia como en el Figma:
//   - normal (sugerencias, pantallas 25 y 25b): fondo rosado y un punto naranja
//   - conCheck (desempate, pantalla 20): fondo blanco y un círculo naranja con un check
// Props: foto (fuente de imagen), titulo, subtitulo, seleccionado (true o false),
//        alPresionar (función), tamanoFoto (48, 56, 64 o 72), conCheck (true o false)
function TarjetaOpcion({ foto, titulo, subtitulo, seleccionado, alPresionar, tamanoFoto, conCheck }) {
  const tamano = tamanoFoto || 48;
  const conCirculo = seleccionado !== undefined;

  let estilo = tarjetaOpcion.contenedor;
  if (seleccionado) {
    estilo = conCheck ? tarjetaOpcion.contenedorMarcado : tarjetaOpcion.contenedorActivo;
  }

  return (
    <TouchableOpacity
      style={estilo}
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
          {seleccionado && conCheck ? <Check color={colores.sobrePrincipal} size={14} strokeWidth={3} /> : null}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default TarjetaOpcion;
