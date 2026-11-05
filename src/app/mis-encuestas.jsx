import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../assets/Components/Boton";
import Encabezado from "../../assets/Components/Encabezado";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla nueva (no está en el Figma): encuestas que creé. Se abre desde el Perfil.
function MisEncuestas() {
  function verEncuestaDeEjemplo() {
    router.push("/encuesta/e1");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Mis encuestas" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Mis encuestas (pantalla nueva)"
          mensaje="Aquí van las encuestas que creaste (Fase 3)."
        />
        <Boton texto="Ver una encuesta de ejemplo" alPresionar={verEncuestaDeEjemplo} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MisEncuestas;
