import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantallas 11, 14, 15 y 17 del Figma: Ver un mood board
function VerMoodboard() {
  const { id } = useLocalSearchParams();

  function agregarIdea() {
    router.push("/agregar-idea/" + id);
  }

  function ponerAVotacion() {
    router.push("/elegir-objeto/" + id);
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Moodboard" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantallas 11, 14, 15 y 17 · Mood board"
          mensaje={"Mood board " + id + ". Aquí van el collage, la paleta de colores y las ideas (Fase 3)."}
        />
        <Boton texto="Agregar idea" alPresionar={agregarIdea} />
        <Boton texto="Poner a votación" tipo="secundario" alPresionar={ponerAVotacion} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default VerMoodboard;
