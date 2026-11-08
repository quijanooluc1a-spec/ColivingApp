import { Text, TouchableOpacity } from "react-native";
import { estadistica } from "../Styles/Stylesheet";

// Número grande + etiqueta (en el perfil: Guardados, Votos, Moodboards; en el detalle: las medidas)
// Props: numero, etiqueta, alPresionar (función; sin ella la tarjeta no se puede tocar)
function TarjetaEstadistica({ numero, etiqueta, alPresionar }) {
  return (
    <TouchableOpacity
      style={estadistica.contenedor}
      onPress={alPresionar}
      disabled={!alPresionar}
      activeOpacity={0.7}
    >
      <Text style={estadistica.numero}>{numero}</Text>
      <Text style={estadistica.etiqueta}>{etiqueta}</Text>
    </TouchableOpacity>
  );
}

export default TarjetaEstadistica;
