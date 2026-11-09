import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Buscador from "../../../assets/Components/Buscador";
import Catalogo from "../../../assets/Components/Catalogo";
import Encabezado from "../../../assets/Components/Encabezado";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { catalogo, general } from "../../../assets/Styles/Stylesheet";

// Pantalla 11b del Figma: Agregar idea a un mood board (el catálogo con un "+" en cada mueble)
function AgregarIdea() {
  const { id } = useLocalSearchParams();
  const { usuario, moodboards, agregarIdea } = useContext(AppContexto);
  const [busqueda, setBusqueda] = useState("");

  if (!usuario) {
    return null;
  }

  const moodboard = moodboards.find(function (m) {
    return m.id === id;
  });

  // Los muebles que ya están en el mood board se marcan con un check
  const yaAgregados = moodboard
    ? moodboard.ideas.map(function (idea) {
        return idea.id_mueble;
      })
    : [];

  // Agrega el mueble y vuelve al mood board, que muestra "Idea agregada" y la etiqueta "Nueva"
  async function agregar(mueble) {
    const idIdea = await agregarIdea(id, { id_mueble: mueble.id });
    if (!idIdea) {
      return; // no se pudo agregar: el mensaje sale arriba de la pantalla
    }
    router.dismissTo("/moodboard/" + id + "?aviso=idea&nueva=" + idIdea);
  }

  function verMueble(mueble) {
    router.push("/mueble/" + mueble.id);
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Agregar idea" conVolver={true} />
      <View style={catalogo.buscador}>
        <Buscador valor={busqueda} alCambiar={setBusqueda} />
      </View>
      <Catalogo
        busqueda={busqueda}
        alPresionarMueble={verMueble}
        mostrarMas={true}
        alAgregar={agregar}
        agregados={yaAgregados}
      />
    </SafeAreaView>
  );
}

export default AgregarIdea;
