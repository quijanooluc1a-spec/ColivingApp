import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { encabezado } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Título de la pantalla, con o sin flecha para volver
// Props: titulo, subtitulo (opcional), conVolver (true o false),
//        botonDerecha (opcional: un botón que se muestra a la derecha, por ejemplo "+ Nuevo")
function Encabezado({ titulo, subtitulo, conVolver, botonDerecha }) {
  // Vuelve a la pantalla anterior. Si no hay ninguna, va a Explorar.
  function volver() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/explorar");
    }
  }

  return (
    <View style={conVolver ? encabezado.contenedorConVolver : encabezado.contenedor}>
      {conVolver ? (
        <TouchableOpacity
          style={encabezado.botonVolver}
          onPress={volver}
          activeOpacity={0.7}
          accessibilityLabel="Volver"
        >
          <ArrowLeft color={colores.texto} size={24} />
        </TouchableOpacity>
      ) : null}

      <View style={encabezado.textos}>
        <Text style={conVolver ? encabezado.tituloConVolver : encabezado.titulo}>{titulo}</Text>
        {subtitulo ? <Text style={encabezado.subtitulo}>{subtitulo}</Text> : null}
      </View>

      {botonDerecha}
    </View>
  );
}

export default Encabezado;
