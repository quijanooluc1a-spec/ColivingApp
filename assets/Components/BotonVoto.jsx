import { ThumbsDown, ThumbsUp } from "lucide-react-native";
import { Text, TouchableOpacity } from "react-native";
import { botonVoto } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Botón para votar: verde con pulgar arriba ("si") o rojo con pulgar abajo ("no").
// El voto elegido se ve relleno; el otro, solo con borde.
// Props: texto, tipo ("si" o "no"), seleccionado (true o false), alPresionar (función)
function BotonVoto({ texto, tipo, seleccionado, alPresionar }) {
  const colorDelTipo = tipo === "si" ? colores.meGusta : colores.noMeGusta;
  const colorTexto = seleccionado ? colores.sobrePrincipal : colorDelTipo;
  const Icono = tipo === "si" ? ThumbsUp : ThumbsDown;

  return (
    <TouchableOpacity
      style={[
        botonVoto.contenedor,
        { borderColor: colorDelTipo, backgroundColor: seleccionado ? colorDelTipo : colores.superficie },
      ]}
      onPress={alPresionar}
      activeOpacity={0.7}
      accessibilityState={{ selected: seleccionado }}
    >
      <Icono color={colorTexto} size={16} />
      <Text style={[botonVoto.texto, { color: colorTexto }]} numberOfLines={2}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

export default BotonVoto;
