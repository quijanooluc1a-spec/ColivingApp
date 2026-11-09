import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { filaAjuste } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Fila del perfil: ícono, texto y a la derecha una flecha o lo que se pase (por ejemplo un interruptor)
// Props: Icono (un ícono de Lucide, por ejemplo Folder), texto, alPresionar (función),
//        derecha (lo que va a la derecha; si no se pasa, se muestra una flecha)
function FilaAjuste({ Icono, texto, alPresionar, derecha }) {
  const contenido = (
    <>
      <View style={filaAjuste.icono}>
        <Icono color={colores.principal} size={20} />
      </View>
      <Text style={filaAjuste.texto}>{texto}</Text>
      {derecha ? derecha : <ChevronRight color={colores.textoSuave} size={20} />}
    </>
  );

  // Sin alPresionar (por ejemplo, una fila con interruptor) la fila no se toca: se toca lo de la derecha
  if (!alPresionar) {
    return <View style={filaAjuste.contenedor}>{contenido}</View>;
  }

  return (
    <TouchableOpacity style={filaAjuste.contenedor} onPress={alPresionar} activeOpacity={0.7}>
      {contenido}
    </TouchableOpacity>
  );
}

export default FilaAjuste;
