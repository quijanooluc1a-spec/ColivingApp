import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Chip from "../../../assets/Components/Chip";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantallas 10 y 10b del Figma: Mood boards (Todos / Mis moodboards)
function Moodboards() {
  function irANuevoMoodboard() {
    router.push("/moodboard/nuevo");
  }

  function verMoodboardDeEjemplo() {
    router.push("/moodboard/mb1");
  }

  return (
    <SafeAreaView style={general.pantalla} edges={["top"]}>
      <Encabezado
        titulo="Moodboards"
        botonDerecha={<Chip texto="+ Nuevo" seleccionado={true} alPresionar={irANuevoMoodboard} />}
      />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantallas 10 y 10b · Mood boards"
          mensaje="Aquí van los mood boards de la casa, con los filtros Todos y Mis moodboards (Fase 3)."
        />
        <Boton texto="Ver un mood board de ejemplo" alPresionar={verMoodboardDeEjemplo} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Moodboards;
