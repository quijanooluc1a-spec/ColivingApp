import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantalla 26 del Figma: Perfil
function Perfil() {
  function irAMisMoodboards() {
    router.push("/mis-moodboards");
  }

  function irAGuardados() {
    router.push("/guardados");
  }

  function irAMisEncuestas() {
    router.push("/mis-encuestas");
  }

  function irAMisVotos() {
    router.push("/mis-votos");
  }

  // replace: vuelve al inicio de sesión sin dejar las pestañas detrás
  function cerrarSesion() {
    router.replace("/");
  }

  return (
    <SafeAreaView style={general.pantalla} edges={["top"]}>
      <Encabezado titulo="Perfil" subtitulo="Apartamento · 3 inquilinos" />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 26 · Perfil"
          mensaje="Aquí van tus datos, tus números (guardados, mood boards y votos) y los ajustes (Fase 3)."
        />
        <Boton texto="Mis mood boards" tipo="secundario" alPresionar={irAMisMoodboards} />
        <Boton texto="Guardados" tipo="secundario" alPresionar={irAGuardados} />
        <Boton texto="Mis encuestas" tipo="secundario" alPresionar={irAMisEncuestas} />
        <Boton texto="Mis votos" tipo="secundario" alPresionar={irAMisVotos} />
        <Boton texto="Cerrar sesión" alPresionar={cerrarSesion} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Perfil;
