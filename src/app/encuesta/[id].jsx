import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useContext, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Aviso from "../../../assets/Components/Aviso";
import BarraResultado from "../../../assets/Components/BarraResultado";
import Boton from "../../../assets/Components/Boton";
import BotonVoto from "../../../assets/Components/BotonVoto";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import TarjetaOpcion from "../../../assets/Components/TarjetaOpcion";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { tiempoRestante, unirNombres } from "../../../assets/Logica/textos";
import { contarVotos, sugerirMuebles, votoDe } from "../../../assets/Logica/votacion";
import { buscarMueble, enlaceTienda } from "../../../assets/Servicios/muebles";
import { general, resultado } from "../../../assets/Styles/Stylesheet";

// Pantallas 24, 25, 25b, 19 y 21 del Figma: una encuesta y su resultado.
// La pantalla cambia según el estado: activa, aprobada, rechazada (no ganó), empate o decisión final.
function ResultadoEncuesta() {
  const { id } = useLocalSearchParams();
  const { usuario, usuarios, roommates, encuestas, votos, moodboardsDeLaCasa, votar } = useContext(AppContexto);
  const [sugerenciaElegida, setSugerenciaElegida] = useState(0); // posición de la sugerencia marcada

  if (!usuario) {
    return null;
  }

  const encuesta = encuestas.find(function (e) {
    return e.id === id;
  });

  if (!encuesta) {
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Resultado" conVolver={true} />
        <View style={general.contenido}>
          <EstadoVacio titulo="No encontramos esta encuesta" />
        </View>
      </SafeAreaView>
    );
  }

  const mueble = buscarMueble(encuesta.id_mueble);
  const conteo = contarVotos(votos, encuesta.id, encuesta.ronda);
  const miVoto = votoDe(votos, encuesta.id, usuario.id, encuesta.ronda);
  const votaron = "votaron " + conteo.total + " de " + roommates.length + " inquilinos";
  const esDecisionFinal = encuesta.ronda === 2 && encuesta.estado !== "activa";

  function volverAEncuestas() {
    router.dismissTo("/encuestas");
  }

  function volverAMoodboards() {
    router.dismissTo("/moodboards");
  }

  // Las dos barras de resultado (Sí y No)
  const barras = (
    <>
      <BarraResultado texto={encuesta.texto_si} votos={conteo.si} total={conteo.total} tipo="si" />
      <BarraResultado texto={encuesta.texto_no} votos={conteo.no} total={conteo.total} tipo="no" />
    </>
  );

  // ----- 21 · Decisión final (después del desempate) -----
  if (esDecisionFinal) {
    const ronda1 = contarVotos(votos, encuesta.id, 1);
    const seQueda = encuesta.estado === "aprobada";
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Decisión final" conVolver={true} />
        <ScrollView contentContainerStyle={general.contenido}>
          <Aviso
            texto={
              "Decisión final: " +
              (seQueda ? "se pone" : "no se pone") +
              " «" +
              mueble.nombre +
              "» por " +
              conteo.si +
              " – " +
              conteo.no +
              "."
            }
            tipo={seQueda ? "exito" : "alerta"}
          />
          <Image source={mueble.imagen} style={resultado.fotoDecision} resizeMode="cover" />
          {barras}
          <Text style={general.textoSuave}>
            Así se llegó: empate {ronda1.si} – {ronda1.no}, desempate anónimo y resultado {conteo.si} – {conteo.no}.
          </Text>
        </ScrollView>
        <View style={general.acciones}>
          <Boton texto="Ir a Encuestas" alPresionar={volverAEncuestas} />
          <Boton texto="Volver a mood boards" tipo="secundario" alPresionar={volverAMoodboards} />
        </View>
      </SafeAreaView>
    );
  }

  // ----- 19 · Empate -----
  if (encuesta.estado === "empate") {
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Resultado" conVolver={true} />
        <ScrollView contentContainerStyle={general.contenido}>
          <Text style={general.tituloGrande}>
            ¡Empate {conteo.si} – {conteo.no}!
          </Text>
          <Text style={general.textoSuave}>
            {mueble.nombre} · {votaron}
          </Text>
          {barras}
          <Aviso
            texto="Para desempatar, cada inquilino vota otra vez de forma anónima. Si después de 2 rondas sigue el empate, el mueble no se pone."
            tipo="exito"
          />
        </ScrollView>
        <View style={general.acciones}>
          <Boton
            texto="Desempatar de forma anónima"
            alPresionar={function () {
              router.push("/desempate/" + encuesta.id);
            }}
          />
          <Boton texto="Volver a mood boards" tipo="secundario" alPresionar={volverAMoodboards} />
        </View>
      </SafeAreaView>
    );
  }

  // ----- 25 y 25b · No ganó: muestra sugerencias de los mood boards de la casa -----
  if (encuesta.estado === "rechazada") {
    const sugerencias = sugerirMuebles(encuesta.id_mueble, moodboardsDeLaCasa, usuarios);
    const elegida = sugerencias[sugerenciaElegida];

    function hacerNuevaPropuesta() {
      if (elegida) {
        router.push("/encuesta/nueva?mueble=" + elegida.mueble.id + "&moodboard=" + elegida.idMoodboard);
      }
    }

    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Resultado" conVolver={true} />
        <ScrollView contentContainerStyle={general.contenido}>
          <TarjetaOpcion foto={mueble.imagen} titulo={mueble.nombre} subtitulo={encuesta.pregunta} tamanoFoto={56} />
          {barras}
          <Aviso texto="Ganó el «No». Haz una nueva propuesta." tipo="alerta" />
          {sugerencias.length > 0 ? <Text style={general.subtitulo}>Sugerencias según los mood boards</Text> : null}
          {sugerencias.map(function (sugerencia, posicion) {
            return (
              <TarjetaOpcion
                key={sugerencia.mueble.id}
                foto={sugerencia.mueble.imagen}
                titulo={sugerencia.mueble.nombre}
                subtitulo={"Coincide con " + unirNombres(sugerencia.nombres)}
                seleccionado={posicion === sugerenciaElegida}
                alPresionar={function () {
                  setSugerenciaElegida(posicion);
                }}
              />
            );
          })}
        </ScrollView>
        <View style={general.acciones}>
          <Boton texto="Hacer nueva propuesta" alPresionar={hacerNuevaPropuesta} deshabilitado={!elegida} />
          <Boton texto="Volver a Encuestas" tipo="secundario" alPresionar={volverAEncuestas} />
        </View>
      </SafeAreaView>
    );
  }

  // ----- 24 · Aprobada -----
  if (encuesta.estado === "aprobada") {
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Resultado" conVolver={true} />
        <ScrollView contentContainerStyle={general.contenido}>
          <Image source={mueble.imagen} style={resultado.foto} resizeMode="cover" />
          <Text style={general.titulo}>{encuesta.pregunta}</Text>
          {barras}
          <Text style={general.textoPequeno}>{votaron.charAt(0).toUpperCase() + votaron.slice(1)}</Text>
          <Aviso texto={"Ganó «" + encuesta.texto_si + "». ¡Ya pueden comprarlo!"} tipo="exito" />
        </ScrollView>
        <View style={general.acciones}>
          <Boton
            texto="Comprar mueble"
            alPresionar={function () {
              WebBrowser.openBrowserAsync(enlaceTienda(mueble));
            }}
          />
          <Boton texto="Volver a Encuestas" tipo="secundario" alPresionar={volverAEncuestas} />
        </View>
      </SafeAreaView>
    );
  }

  // ----- Activa: se puede votar o cambiar el voto (no está en el Figma; usa sus mismas piezas) -----
  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Encuesta" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <Image source={mueble.imagen} style={resultado.foto} resizeMode="cover" />
        <Text style={general.titulo}>{encuesta.pregunta}</Text>
        <Text style={general.textoSuave}>{mueble.nombre}</Text>
        {barras}
        <Text style={general.textoPequeno}>
          {votaron.charAt(0).toUpperCase() + votaron.slice(1)} · {tiempoRestante(encuesta.cierra)}
        </Text>
        <View style={general.grupo}>
          <Text style={general.etiqueta}>{miVoto ? "Tu voto (lo puedes cambiar)" : "Tu voto"}</Text>
          <View style={resultado.botonesVoto}>
            <View style={resultado.voto}>
              <BotonVoto
                texto={encuesta.texto_si}
                tipo="si"
                seleccionado={miVoto === "si"}
                alPresionar={function () {
                  votar(encuesta.id, "si");
                }}
              />
            </View>
            <View style={resultado.voto}>
              <BotonVoto
                texto={encuesta.texto_no}
                tipo="no"
                seleccionado={miVoto === "no"}
                alPresionar={function () {
                  votar(encuesta.id, "no");
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={general.acciones}>
        <Boton texto="Volver a Encuestas" tipo="secundario" alPresionar={volverAEncuestas} />
      </View>
    </SafeAreaView>
  );
}

export default ResultadoEncuesta;
