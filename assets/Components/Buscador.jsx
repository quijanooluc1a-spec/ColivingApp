import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";
import { buscador } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Barra de búsqueda redondeada con lupa
// Props: valor, alCambiar (función)
function Buscador({ valor, alCambiar }) {
  return (
    <View style={buscador.contenedor}>
      <Search color={colores.textoSuave} size={20} />
      <TextInput
        style={buscador.texto}
        value={valor}
        onChangeText={alCambiar}
        placeholder="Buscar muebles, estilos…"
        placeholderTextColor={colores.textoSuave}
        autoCapitalize="none"
        returnKeyType="search"
      />
    </View>
  );
}

export default Buscador;
