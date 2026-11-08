import { Store } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { tienda as estilos } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// "Disponible en Homecenter": al tocarla se abre la tienda en el navegador
// Props: tienda (nombre), alPresionar (función)
function TarjetaTienda({ tienda, alPresionar }) {
  return (
    <TouchableOpacity style={estilos.contenedor} onPress={alPresionar} activeOpacity={0.7}>
      <Store color={colores.texto} size={24} />
      <View style={estilos.textos}>
        <Text style={estilos.etiqueta}>Disponible en</Text>
        <Text style={estilos.nombre}>{tienda}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default TarjetaTienda;
