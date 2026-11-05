import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantalla 22 del Figma: Encuestas activas
function Encuestas() {
  function verEncuestaDeEjemplo() {
    router.push("/encuesta/e1");
  }

  return (
    <SafeAreaView style={general.pantalla} edges={["top"]}>
      <Encabezado titulo="Encuestas" subtitulo="Apartamento · 3 inquilinos" />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 22 · Encuestas"
          mensaje="Aquí van todas las encuestas activas, con los botones para votar (Fase 3)."
        />
        <Boton texto="Ver una encuesta de ejemplo" alPresionar={verEncuestaDeEjemplo} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Encuestas;
