import { router } from "expo-router";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../../assets/Components/Encabezado";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import TarjetaOpcion from "../../assets/Components/TarjetaOpcion";
import { AppContexto } from "../../assets/Contexto/AppContexto";
import { resumenEncuesta } from "../../assets/Logica/votacion";
import { buscarMueble } from "../../assets/Servicios/muebles";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla nueva (no está en el Figma): las encuestas que creé, con su estado
function MisEncuestas() {
  const { usuario, encuestas, votos } = useContext(AppContexto);

  if (!usuario) {
    return null;
  }

  const mias = encuestas.filter(function (encuesta) {
    return encuesta.id_creador === usuario.id;
  });

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Encuestas que creé" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        {mias.length === 0 ? (
          <EstadoVacio
            titulo="Todavía no creas encuestas"
            mensaje="Abre un mood board y toca «Poner a votación»."
          />
        ) : null}
        {mias.map(function (encuesta) {
          const mueble = buscarMueble(encuesta.id_mueble);
          return (
            <TarjetaOpcion
              key={encuesta.id}
              foto={mueble.imagen}
              titulo={mueble.nombre}
              subtitulo={resumenEncuesta(encuesta, votos)}
              tamanoFoto={56}
              alPresionar={function () {
                router.push("/encuesta/" + encuesta.id);
              }}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MisEncuestas;
