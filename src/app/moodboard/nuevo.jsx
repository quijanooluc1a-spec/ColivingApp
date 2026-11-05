import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantalla 13 del Figma: Nuevo mood board
function NuevoMoodboard() {
  // replace: al volver desde el mood board nuevo se llega a la lista, no a este formulario
  function guardarMoodboard() {
    router.replace("/moodboard/mb1");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Nuevo moodboard" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 13 · Nuevo mood board"
          mensaje="Aquí van el nombre, las fotos del carrete, las ideas guardadas y la vibra (Fase 3)."
        />
        <Boton texto="Guardar moodboard" alPresionar={guardarMoodboard} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default NuevoMoodboard;
