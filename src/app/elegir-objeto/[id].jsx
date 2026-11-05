import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantalla 18 del Figma: Poner a votación (elegir UN objeto del mood board)
function ElegirObjeto() {
  const { id } = useLocalSearchParams();

  function ponerAVotacion() {
    router.push("/encuesta/nueva");
  }

  function cancelar() {
    router.back();
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Poner a votación" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 18 · Elegir un objeto"
          mensaje={"Mood board " + id + ". Aquí se elige UN objeto para la votación (Fase 3)."}
        />
        <Boton texto="Poner a votación" alPresionar={ponerAVotacion} />
        <Boton texto="Cancelar" tipo="secundario" alPresionar={cancelar} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ElegirObjeto;
