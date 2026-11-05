import { Text, View } from "react-native";
import { estadoVacio } from "../Styles/Stylesheet";

// Mensaje para cuando una lista está vacía (o una pantalla todavía no tiene contenido)
// Props: titulo, mensaje (opcional)
function EstadoVacio({ titulo, mensaje }) {
  return (
    <View style={estadoVacio.contenedor}>
      <Text style={estadoVacio.titulo}>{titulo}</Text>
      {mensaje ? <Text style={estadoVacio.mensaje}>{mensaje}</Text> : null}
    </View>
  );
}

export default EstadoVacio;
