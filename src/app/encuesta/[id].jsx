import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantallas 24, 25, 25b, 19 y 21 del Figma: Resultado de una encuesta
// (aprobada, no ganó, empate y decisión final)
function ResultadoEncuesta() {
  const { id } = useLocalSearchParams();

  function desempatar() {
    router.push("/desempate/" + id);
  }

  function hacerNuevaPropuesta() {
    router.push("/encuesta/nueva");
  }

  function volverAEncuestas() {
    router.dismissTo("/encuestas");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Resultado" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantallas 24, 25, 25b, 19 y 21 · Resultado"
          mensaje={"Encuesta " + id + ". En la Fase 4 solo se muestra el botón que corresponde al resultado."}
        />
        <Boton texto="Desempatar de forma anónima" alPresionar={desempatar} />
        <Boton texto="Hacer nueva propuesta" tipo="secundario" alPresionar={hacerNuevaPropuesta} />
        <Boton texto="Volver a Encuestas" tipo="secundario" alPresionar={volverAEncuestas} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ResultadoEncuesta;
