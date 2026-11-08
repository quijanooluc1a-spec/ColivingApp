import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import TarjetaOpcion from "../../../assets/Components/TarjetaOpcion";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { votoDe } from "../../../assets/Logica/votacion";
import { buscarMueble } from "../../../assets/Servicios/muebles";
import { general } from "../../../assets/Styles/Stylesheet";

// Ronda de desempate (ronda 2 de la encuesta)
const RONDA_DESEMPATE = 2;

// Pantalla 20 del Figma: Votación de desempate
function Desempate() {
  const { id } = useLocalSearchParams();
  const { usuario, encuestas, votos, votar } = useContext(AppContexto);
  const [opcion, setOpcion] = useState(null); // "si", "no" o null

  if (!usuario) {
    return null;
  }

  const encuesta = encuestas.find(function (e) {
    return e.id === id;
  });
  if (!encuesta) {
    return null;
  }

  const mueble = buscarMueble(encuesta.id_mueble);
  // Si ya votó en el desempate, se marca su voto; si no, lo que haya tocado ahora
  const elegida = opcion || votoDe(votos, encuesta.id, usuario.id, RONDA_DESEMPATE);

  function enviarVoto() {
    votar(encuesta.id, elegida, RONDA_DESEMPATE);
    router.back();
  }

  function cancelar() {
    router.back();
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Desempate" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <Text style={general.titulo}>Desempate: {encuesta.pregunta}</Text>
        <Text style={general.textoSuave}>Vota otra vez. Sigue siendo anónimo y cada voto cuenta igual.</Text>
        <TarjetaOpcion
          foto={mueble.imagen}
          titulo={encuesta.texto_si}
          subtitulo={mueble.nombre}
          tamanoFoto={72}
          seleccionado={elegida === "si"}
          alPresionar={function () {
            setOpcion("si");
          }}
        />
        <TarjetaOpcion
          foto={mueble.imagen}
          titulo={encuesta.texto_no}
          subtitulo={mueble.nombre}
          tamanoFoto={72}
          seleccionado={elegida === "no"}
          alPresionar={function () {
            setOpcion("no");
          }}
        />
      </ScrollView>
      <View style={general.acciones}>
        <Boton texto="Enviar voto de desempate" alPresionar={enviarVoto} deshabilitado={!elegida} />
        <Boton texto="Cancelar" tipo="secundario" alPresionar={cancelar} />
      </View>
    </SafeAreaView>
  );
}

export default Desempate;
