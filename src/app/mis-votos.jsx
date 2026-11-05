import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../assets/Components/Boton";
import Encabezado from "../../assets/Components/Encabezado";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla nueva (no está en el Figma): votos que di. Se abre desde el Perfil.
function MisVotos() {
  function verEncuestaDeEjemplo() {
    router.push("/encuesta/e1");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Mis votos" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Mis votos (pantalla nueva)"
          mensaje="Aquí van los votos que diste en cada encuesta (Fase 3)."
        />
        <Boton texto="Ver una encuesta de ejemplo" alPresionar={verEncuestaDeEjemplo} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MisVotos;
