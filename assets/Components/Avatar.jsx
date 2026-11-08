import { Text, View } from "react-native";
import { avatar } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Círculo con las iniciales de una persona
// Props: iniciales, tamano (40 o 64), color (nombre de un color de Tema.jsx, por ejemplo "verdeSuave")
function Avatar({ iniciales, tamano, color }) {
  const esGrande = tamano >= 64;

  return (
    <View style={[avatar.circulo, { width: tamano, height: tamano, backgroundColor: colores[color] }]}>
      <Text style={esGrande ? avatar.textoGrande : avatar.texto}>{iniciales}</Text>
    </View>
  );
}

export default Avatar;
