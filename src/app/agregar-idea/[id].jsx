import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantalla 11b del Figma: Agregar idea a un mood board
function AgregarIdea() {
  const { id } = useLocalSearchParams();

  // Después de agregar la idea se vuelve al mood board
  function agregarIdeaDeEjemplo() {
    router.back();
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Agregar idea" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 11b · Agregar idea"
          mensaje={"Mood board " + id + ". Aquí van el buscador y la grilla de muebles con el botón + (Fase 3)."}
        />
        <Boton texto="Agregar una idea de ejemplo" alPresionar={agregarIdeaDeEjemplo} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AgregarIdea;
