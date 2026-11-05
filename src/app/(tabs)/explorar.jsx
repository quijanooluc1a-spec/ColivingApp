import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantallas 4, 6, 7 y 8 del Figma: Explorar (sin filtro, Sofás, Mesas y Lámparas)
function Explorar() {
  function verMuebleDeEjemplo() {
    router.push("/mueble/m1");
  }

  return (
    // edges={["top"]}: solo deja espacio arriba, porque abajo ya está la barra de pestañas
    <SafeAreaView style={general.pantalla} edges={["top"]}>
      <Encabezado titulo="Explorar" />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantallas 4, 6, 7 y 8 · Explorar"
          mensaje="Aquí van el buscador, los chips de categorías y la grilla de muebles (Fase 3)."
        />
        <Boton texto="Ver un mueble de ejemplo" alPresionar={verMuebleDeEjemplo} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Explorar;
