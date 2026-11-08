import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Buscador from "../../../assets/Components/Buscador";
import Catalogo from "../../../assets/Components/Catalogo";
import Encabezado from "../../../assets/Components/Encabezado";
import { catalogo, general } from "../../../assets/Styles/Stylesheet";

// Pantallas 4, 6, 7 y 8 del Figma: Explorar (sin filtro, Sofás, Mesas y Lámparas)
function Explorar() {
  const [busqueda, setBusqueda] = useState("");

  function verMueble(mueble) {
    router.push("/mueble/" + mueble.id);
  }

  return (
    // edges={["top"]}: solo deja espacio arriba, porque abajo ya está la barra de pestañas
    <SafeAreaView style={general.pantalla} edges={["top"]}>
      <Encabezado titulo="Explorar" />
      <View style={catalogo.buscador}>
        <Buscador valor={busqueda} alCambiar={setBusqueda} />
      </View>
      <Catalogo busqueda={busqueda} alPresionarMueble={verMueble} />
    </SafeAreaView>
  );
}

export default Explorar;
