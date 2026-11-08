import { Text, TouchableOpacity } from "react-native";
import { chip } from "../Styles/Stylesheet";

// Botón pequeño redondeado: filtros, opciones y "+ Nuevo".
// Sin alPresionar es solo una etiqueta (por ejemplo los materiales de un mueble).
// Props: texto, seleccionado (true o false), alPresionar (función)
function Chip({ texto, seleccionado, alPresionar }) {
  return (
    <TouchableOpacity
      style={seleccionado ? chip.contenedorActivo : chip.contenedor}
      onPress={alPresionar}
      disabled={!alPresionar}
      activeOpacity={0.7}
      accessibilityState={{ selected: seleccionado }}
    >
      <Text style={seleccionado ? chip.textoActivo : chip.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

export default Chip;
