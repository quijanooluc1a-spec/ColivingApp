import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mensajeDeError } from "../Styles/Stylesheet";
import { espacios } from "../Styles/Tema";

// Mensaje arriba de la pantalla cuando falla algo al hablar con la base de datos
// (por ejemplo, sin internet). Lo muestra src/app/_layout.jsx.
// Props: texto, alCerrar (función)
function MensajeDeError({ texto, alCerrar }) {
  const margenes = useSafeAreaInsets(); // para no quedar debajo de la hora y la batería

  return (
    <View style={[mensajeDeError.contenedor, { top: margenes.top + espacios.pequeno }]} accessibilityRole="alert">
      <Text style={mensajeDeError.texto}>{texto}</Text>
      <TouchableOpacity onPress={alCerrar} accessibilityRole="button">
        <Text style={mensajeDeError.cerrar}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MensajeDeError;
