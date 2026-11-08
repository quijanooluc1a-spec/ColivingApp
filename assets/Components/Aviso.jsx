import { CircleCheck } from "lucide-react-native";
import { Text, View } from "react-native";
import { aviso } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Fondo de cada tipo de aviso
const fondos = {
  exito: colores.verdeSuave,
  alerta: colores.amarilloSuave,
  info: colores.principalSuave,
};

// Recuadro con un mensaje: verde (exito), amarillo (alerta) o rosado (info)
// Props: texto, tipo ("exito", "alerta" o "info"), conIcono (true muestra un check, como "Mood board guardado")
function Aviso({ texto, tipo, conIcono }) {
  return (
    <View style={[conIcono ? aviso.contenedorConIcono : aviso.contenedor, { backgroundColor: fondos[tipo] }]}>
      {conIcono ? <CircleCheck color={colores.meGusta} size={20} /> : null}
      <Text style={aviso.texto}>{texto}</Text>
    </View>
  );
}

export default Aviso;
