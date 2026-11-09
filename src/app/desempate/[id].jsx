import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import TarjetaOpcion from "../../../assets/Components/TarjetaOpcion";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { tiempoRestante } from "../../../assets/Logica/textos";
import { contarVotos, votoDe } from "../../../assets/Logica/votacion";
import { buscarMueble } from "../../../assets/Servicios/baseDeDatos";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantalla 20 del Figma: Votación de desempate.
// Mientras la encuesta está en "empate", su ronda abierta es la 2: el voto se guarda en esa ronda.
function Desempate() {
  const { id } = useLocalSearchParams();
  const { usuario, roommates, encuestas, votos, votar } = useContext(AppContexto);
  const [opcion, setOpcion] = useState(null); // "si", "no" o null
  const [enviando, setEnviando] = useState(false); // esperando la respuesta

  if (!usuario) {
    return null;
  }

  const encuesta = encuestas.find(function (e) {
    return e.id === id;
  });
  if (!encuesta) {
    return null;
  }

  function volver() {
    router.back();
  }

  // Si el desempate ya se cerró, aquí no se puede votar
  if (encuesta.estado !== "empate") {
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Desempate" conVolver={true} />
        <View style={general.contenido}>
          <EstadoVacio titulo="Este desempate ya terminó" mensaje="Vuelve para ver el resultado." />
        </View>
        <View style={general.acciones}>
          <Boton texto="Ver el resultado" alPresionar={volver} />
        </View>
      </SafeAreaView>
    );
  }

  const mueble = buscarMueble(encuesta.id_mueble);
  const conteo = contarVotos(votos, encuesta.id, encuesta.ronda);
  // Si ya votó en el desempate, se marca su voto; si no, lo que haya tocado ahora
  const elegida = opcion || votoDe(votos, encuesta.id, usuario.id, encuesta.ronda);

  // Guarda el voto y vuelve al resultado. Si con este voto ya votaron todos, el desempate se cierra
  // y la pantalla de resultado muestra la decisión.
  async function enviarVoto() {
    setEnviando(true);
    await votar(encuesta.id, elegida);
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
        <Text style={general.textoPequeno}>
          Votaron {conteo.total} de {roommates.length} inquilinos · {tiempoRestante(encuesta.cierra)}
        </Text>
      </ScrollView>
      <View style={general.acciones}>
        <Boton
          texto={enviando ? "Enviando…" : "Enviar voto de desempate"}
          alPresionar={enviarVoto}
          deshabilitado={!elegida || enviando}
        />
        <Boton texto="Cancelar" tipo="secundario" alPresionar={volver} />
      </View>
    </SafeAreaView>
  );
}

export default Desempate;
