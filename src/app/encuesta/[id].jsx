import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useContext, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Aviso from "../../../assets/Components/Aviso";
import BarraResultado from "../../../assets/Components/BarraResultado";
import Boton from "../../../assets/Components/Boton";
import BotonVoto from "../../../assets/Components/BotonVoto";
import CerrarEncuesta from "../../../assets/Components/CerrarEncuesta";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import TarjetaOpcion from "../../../assets/Components/TarjetaOpcion";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { tiempoRestante, unirNombres } from "../../../assets/Logica/textos";
import {
  contarVotos,
  marcador,
  motivoRechazo,
  sugerirMuebles,
  textoAlCerrar,
  votoDe,
} from "../../../assets/Logica/votacion";
import { buscarMueble, enlaceTienda } from "../../../assets/Servicios/muebles";
import { general, resultado } from "../../../assets/Styles/Stylesheet";

// Pantallas 24, 25, 25b, 19 y 21 del Figma: una encuesta y su resultado.
// La pantalla cambia según el estado de la encuesta (las reglas están en Logica/votacion.jsx):
//   activa    → se puede votar o cambiar el voto
//   empate    → está abierto el desempate (19)
//   aprobada  → ganó el sí (24), o decisión final si fue en el desempate (21)
//   rechazada → no ganó y se muestran sugerencias (25 y 25b)
function ResultadoEncuesta() {
  const { id } = useLocalSearchParams();
  const { usuario, roommates, encuestas, votos, moodboards, votar, cerrarEncuesta } = useContext(AppContexto);
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
  const conteo = contarVotos(votos, encuesta.id, encuesta.ronda); // la ronda abierta, o la que decidió
  const ronda1 = contarVotos(votos, encuesta.id, 1);
  const deCuantos = " de " + roommates.length + " inquilinos"; // para "Votaron 2 de 3 inquilinos"
  const esCreador = encuesta.id_creador === usuario.id;

  function volverAEncuestas() {
    router.dismissTo("/encuestas");
  }

  function volverAMoodboards() {
    router.dismissTo("/moodboards");
  }

  function cerrarAhora() {
    cerrarEncuesta(encuesta.id);
  }

  // Las dos barras de resultado (Sí y No) de una ronda
  function barras(votosDeLaRonda) {
    return (
      <>
        <BarraResultado
          texto={encuesta.texto_si}
          votos={votosDeLaRonda.si}
          total={votosDeLaRonda.total}
          tipo="si"
        />
        <BarraResultado
          texto={encuesta.texto_no}
          votos={votosDeLaRonda.no}
          total={votosDeLaRonda.total}
          tipo="no"
        />
      </>
    );
  }

  // ----- 21 · Decisión final: el desempate dijo que sí -----
  if (encuesta.estado === "aprobada" && encuesta.ronda === 2) {
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Decisión final" conVolver={true} />
        <ScrollView contentContainerStyle={general.contenido}>
          <Aviso
            texto={"Decisión final: se pone «" + mueble.nombre + "» por " + marcador(conteo) + "."}
            tipo="exito"
          />
          <Image source={mueble.imagen} style={resultado.fotoDecision} resizeMode="cover" />
          {barras(conteo)}
          <Text style={general.textoSuave}>
            Así se llegó: empate {marcador(ronda1)}, desempate anónimo y resultado {marcador(conteo)}.
          </Text>
        </ScrollView>
        <View style={general.acciones}>
          <Boton texto="Ir a Encuestas" alPresionar={volverAEncuestas} />
          <Boton texto="Volver a mood boards" tipo="secundario" alPresionar={volverAMoodboards} />
        </View>
      </SafeAreaView>
    );
  }

  // ----- 19 · Empate: el desempate está abierto -----
  if (encuesta.estado === "empate") {
    const miVotoDesempate = votoDe(votos, encuesta.id, usuario.id, encuesta.ronda);
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Resultado" conVolver={true} />
        <ScrollView contentContainerStyle={general.contenido}>
          <Text style={general.tituloGrande}>
            ¡Empate {marcador(ronda1)}!
          </Text>
          <Text style={general.textoSuave}>
            {mueble.nombre} · votaron {ronda1.total}
            {deCuantos}
          </Text>
          {barras(ronda1)}
          <Aviso
            texto="Para desempatar, cada inquilino vota otra vez de forma anónima. Si después de 2 rondas sigue el empate, el mueble no se pone."
            tipo="exito"
          />
          <Text style={general.textoPequeno}>
            Desempate: votaron {conteo.total}
            {deCuantos} · {tiempoRestante(encuesta.cierra)}
            {miVotoDesempate ? " · ya enviaste tu voto" : ""}
          </Text>
          {esCreador ? (
            <CerrarEncuesta
              key="cerrar-desempate"
              texto="Cerrar el desempate ahora"
              explicacion={textoAlCerrar(encuesta, votos)}
              alConfirmar={cerrarAhora}
            />
          ) : null}
        </ScrollView>
        <View style={general.acciones}>
          <Boton
            texto={miVotoDesempate ? "Cambiar mi voto de desempate" : "Desempatar de forma anónima"}
            alPresionar={function () {
              router.push("/desempate/" + encuesta.id);
            }}
          />
          <Boton texto="Volver a mood boards" tipo="secundario" alPresionar={volverAMoodboards} />
        </View>
      </SafeAreaView>
    );
  }

  // ----- 25 y 25b · No ganó: se muestran sugerencias de los mood boards de la casa -----
  if (encuesta.estado === "rechazada") {
    const sugerencias = sugerirMuebles(encuesta, moodboards, roommates, encuestas);
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
          {barras(conteo)}
          <Aviso texto={motivoRechazo(encuesta, votos)} tipo="alerta" />
          {encuesta.ronda === 2 ? (
            <Text style={general.textoSuave}>
              Así se llegó: empate {marcador(ronda1)} y desempate {marcador(conteo)}.
            </Text>
          ) : null}
          {sugerencias.length > 0 ? (
            <Text style={general.subtitulo}>Sugerencias según los mood boards</Text>
          ) : (
            <EstadoVacio
              titulo="No hay sugerencias"
              mensaje="Los muebles de los mood boards de la casa ya tienen encuesta. Agrega ideas nuevas a un mood board."
            />
          )}
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
          {sugerencias.length > 0 ? (
            <Boton texto="Hacer nueva propuesta" alPresionar={hacerNuevaPropuesta} deshabilitado={!elegida} />
          ) : (
            <Boton texto="Ir a mood boards" alPresionar={volverAMoodboards} />
          )}
          <Boton texto="Volver a Encuestas" tipo="secundario" alPresionar={volverAEncuestas} />
        </View>
      </SafeAreaView>
    );
  }

  // ----- 24 · Ganó el sí en la primera ronda -----
  if (encuesta.estado === "aprobada") {
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Resultado" conVolver={true} />
        <ScrollView contentContainerStyle={general.contenido}>
          <Image source={mueble.imagen} style={resultado.foto} resizeMode="cover" />
          <Text style={general.titulo}>{encuesta.pregunta}</Text>
          {barras(conteo)}
          <Text style={general.textoPequeno}>
            Votaron {conteo.total}
            {deCuantos}
          </Text>
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
  // Si con un voto ya votaron todos, la encuesta se cierra y esta pantalla muestra el resultado.
  const miVoto = votoDe(votos, encuesta.id, usuario.id, encuesta.ronda);
  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Encuesta" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <Image source={mueble.imagen} style={resultado.foto} resizeMode="cover" />
        <Text style={general.titulo}>{encuesta.pregunta}</Text>
        <Text style={general.textoSuave}>{mueble.nombre}</Text>
        {barras(conteo)}
        <Text style={general.textoPequeno}>
          Votaron {conteo.total}
          {deCuantos} · {tiempoRestante(encuesta.cierra)}. Si votan todos, se cierra en ese momento.
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
        {esCreador ? (
          <CerrarEncuesta
            key="cerrar-ronda-1"
            texto="Cerrar la encuesta ahora"
            explicacion={textoAlCerrar(encuesta, votos)}
            alConfirmar={cerrarAhora}
          />
        ) : null}
      </ScrollView>
      <View style={general.acciones}>
        <Boton texto="Volver a Encuestas" tipo="secundario" alPresionar={volverAEncuestas} />
      </View>
    </SafeAreaView>
  );
}

export default ResultadoEncuesta;
