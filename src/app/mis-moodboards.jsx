import { router } from "expo-router";
import { useContext } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chip from "../../assets/Components/Chip";
import Encabezado from "../../assets/Components/Encabezado";
import TarjetaMoodboard from "../../assets/Components/TarjetaMoodboard";
import { AppContexto } from "../../assets/Contexto/AppContexto";
import { fuenteDeIdea } from "../../assets/Servicios/muebles";
import { general, moodboards as estilos } from "../../assets/Styles/Stylesheet";
import { espacios, medidas } from "../../assets/Styles/Tema";

// Pantalla 12 del Figma: Mis mood boards (se abre desde el Perfil)
function MisMoodboards() {
  const { usuario, moodboards } = useContext(AppContexto);
  const anchoPantalla = Math.min(useWindowDimensions().width, medidas.anchoMaximo);

  if (!usuario) {
    return null;
  }

  const anchoTarjeta = (anchoPantalla - espacios.normal * 2 - espacios.medio) / 2;
  const misMoodboards = moodboards.filter(function (moodboard) {
    return moodboard.id_dueno === usuario.id;
  });

  function irANuevoMoodboard() {
    router.push("/moodboard/nuevo");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado
        titulo="Mis mood boards"
        conVolver={true}
        botonDerecha={<Chip texto="+ Nuevo" seleccionado={true} alPresionar={irANuevoMoodboard} />}
      />
      <ScrollView contentContainerStyle={general.contenido}>
        <View style={estilos.grilla}>
          {misMoodboards.map(function (moodboard) {
            return (
              <TarjetaMoodboard
                key={moodboard.id}
                titulo={moodboard.nombre}
                subtitulo={moodboard.compartido ? "Compartido con la casa" : "Borrador"}
                fotos={moodboard.ideas.slice(0, 3).map(fuenteDeIdea)}
                ancho={anchoTarjeta}
                alPresionar={function () {
                  router.push("/moodboard/" + moodboard.id);
                }}
              />
            );
          })}
          <TarjetaMoodboard esNuevo={true} ancho={anchoTarjeta} alPresionar={irANuevoMoodboard} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MisMoodboards;
