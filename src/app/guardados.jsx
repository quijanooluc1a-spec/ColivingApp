import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../assets/Components/Boton";
import Encabezado from "../../assets/Components/Encabezado";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla nueva (no está en el Figma): muebles guardados. Se abre desde el Perfil.
function Guardados() {
  function verMuebleDeEjemplo() {
    router.push("/mueble/m1");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Guardados" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Guardados (pantalla nueva)"
          mensaje="Aquí van los muebles que guardaste, en la misma grilla de Explorar (Fase 3)."
        />
        <Boton texto="Ver un mueble de ejemplo" alPresionar={verMuebleDeEjemplo} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Guardados;
