import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantalla 23 del Figma: Nueva encuesta
function NuevaEncuesta() {
  // dismissTo: cierra las pantallas de encima hasta llegar a la pestaña Encuestas
  function publicarEncuesta() {
    router.dismissTo("/encuestas");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Nueva encuesta" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 23 · Nueva encuesta"
          mensaje="Aquí van la pregunta, los textos de los dos botones y cuándo cierra (Fase 3)."
        />
        <Boton texto="Publicar encuesta" alPresionar={publicarEncuesta} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default NuevaEncuesta;
