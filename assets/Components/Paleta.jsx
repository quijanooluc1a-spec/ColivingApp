import { View } from "react-native";
import { paleta } from "../Styles/Stylesheet";

// Círculos de colores (la paleta de un mood board)
// Props: colores (lista de colores, por ejemplo ["#D9653B", "#DDE7DD"])
function Paleta({ colores }) {
  return (
    <View style={paleta.fila}>
      {colores.map(function (color) {
        return <View key={color} style={[paleta.color, { backgroundColor: color }]} accessibilityLabel={color} />;
      })}
    </View>
  );
}

export default Paleta;
