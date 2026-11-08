import { router } from "expo-router";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../../assets/Components/Encabezado";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import GrillaMuebles from "../../assets/Components/GrillaMuebles";
import { AppContexto } from "../../assets/Contexto/AppContexto";
import { buscarMueble } from "../../assets/Servicios/muebles";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla nueva (no está en el Figma): los muebles que guardé, en la misma grilla de Explorar
function Guardados() {
  const { usuario } = useContext(AppContexto);

  if (!usuario) {
    return null;
  }

  const muebles = usuario.guardados.map(buscarMueble);

  function verMueble(mueble) {
    router.push("/mueble/" + mueble.id);
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Guardados" subtitulo={muebles.length + " muebles"} conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        {muebles.length === 0 ? (
          <EstadoVacio
            titulo="Todavía no guardas muebles"
            mensaje="En Explorar, abre un mueble y toca «Guardar en moodboard»."
          />
        ) : (
          <GrillaMuebles muebles={muebles} alPresionarMueble={verMueble} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Guardados;
