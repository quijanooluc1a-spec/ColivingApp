import { router } from "expo-router";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../../assets/Components/Encabezado";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import TarjetaOpcion from "../../assets/Components/TarjetaOpcion";
import { AppContexto } from "../../assets/Contexto/AppContexto";
import { buscarMueble } from "../../assets/Servicios/muebles";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla nueva (no está en el Figma): los votos que di en cada encuesta
function MisVotos() {
  const { usuario, encuestas, votos } = useContext(AppContexto);

  if (!usuario) {
    return null;
  }

  const misVotos = votos.filter(function (voto) {
    return voto.id_usuario === usuario.id;
  });

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Votos que di" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        {misVotos.length === 0 ? (
          <EstadoVacio titulo="Todavía no votas" mensaje="Las encuestas activas están en la pestaña Encuestas." />
        ) : null}
        {misVotos.map(function (voto) {
          const encuesta = encuestas.find(function (e) {
            return e.id === voto.id_encuesta;
          });
          const mueble = buscarMueble(encuesta.id_mueble);
          const texto = voto.valor === "si" ? encuesta.texto_si : encuesta.texto_no;
          const enDesempate = voto.ronda === 2 ? " en el desempate" : "";
          return (
            <TarjetaOpcion
              key={voto.id}
              foto={mueble.imagen}
              titulo={mueble.nombre}
              subtitulo={"Votaste «" + texto + "»" + enDesempate}
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

export default MisVotos;
