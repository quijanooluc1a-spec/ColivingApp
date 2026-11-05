import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantalla 20 del Figma: Votación de desempate
function Desempate() {
  const { id } = useLocalSearchParams();

  // Después de votar se vuelve al resultado
  function enviarVoto() {
    router.back();
  }

  function cancelar() {
    router.back();
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Desempate" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 20 · Votación de desempate"
          mensaje={"Encuesta " + id + ". Aquí va la ronda anónima de desempate (Fase 4)."}
        />
        <Boton texto="Enviar voto de desempate" alPresionar={enviarVoto} />
        <Boton texto="Cancelar" tipo="secundario" alPresionar={cancelar} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Desempate;
