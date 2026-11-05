import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../assets/Components/Boton";
import Chip from "../../assets/Components/Chip";
import Encabezado from "../../assets/Components/Encabezado";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla 12 del Figma: Mis mood boards (se abre desde el Perfil)
function MisMoodboards() {
  function irANuevoMoodboard() {
    router.push("/moodboard/nuevo");
  }

  function verMoodboardDeEjemplo() {
    router.push("/moodboard/mb1");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado
        titulo="Mis mood boards"
        conVolver={true}
        botonDerecha={<Chip texto="+ Nuevo" seleccionado={true} alPresionar={irANuevoMoodboard} />}
      />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 12 · Mis mood boards"
          mensaje="Aquí van solo los mood boards que creaste (Fase 3)."
        />
        <Boton texto="Ver un mood board de ejemplo" alPresionar={verMoodboardDeEjemplo} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MisMoodboards;
