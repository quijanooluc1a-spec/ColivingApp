import { router } from "expo-router";
import { Bell, Folder, ThumbsUp, Trophy, Vote } from "lucide-react-native";
import { useContext } from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../../assets/Components/Avatar";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import FilaAjuste from "../../../assets/Components/FilaAjuste";
import TarjetaEstadistica from "../../../assets/Components/TarjetaEstadistica";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { describirVibra } from "../../../assets/Logica/textos";
import { filaAjuste, general, perfil } from "../../../assets/Styles/Stylesheet";
import { colores } from "../../../assets/Styles/Tema";

// Pantalla 26 del Figma: Perfil
function Perfil() {
  const { usuario, roommates, casa, moodboards, votos, cerrarSesion, cambiarNotificacion } = useContext(AppContexto);

  // Al cerrar sesión, usuario pasa a null: no se muestra nada mientras se vuelve al inicio
  if (!usuario) {
    return null;
  }

  const misMoodboards = moodboards.filter(function (m) {
    return m.id_dueno === usuario.id;
  });

  // Encuestas en las que votó (cada encuesta cuenta una vez, aunque haya votado también en el desempate)
  const encuestasVotadas = [];
  votos.forEach(function (voto) {
    if (voto.id_usuario === usuario.id && !encuestasVotadas.includes(voto.id_encuesta)) {
      encuestasVotadas.push(voto.id_encuesta);
    }
  });

  // Interruptor verde como el del Figma
  function interruptor(clave) {
    return (
      <Switch
        value={usuario.notificaciones[clave]}
        onValueChange={function (valor) {
          cambiarNotificacion(clave, valor);
        }}
        trackColor={{ true: colores.meGusta, false: colores.borde }}
        thumbColor={colores.superficie}
      />
    );
  }

  function salir() {
    cerrarSesion();
    router.replace("/");
  }

  return (
    <SafeAreaView style={general.pantalla} edges={["top"]}>
      <Encabezado titulo="Perfil" subtitulo={casa.nombre + " · " + roommates.length + " inquilinos"} />
      <ScrollView contentContainerStyle={general.contenido}>
        <View style={perfil.tarjeta}>
          <Avatar iniciales={usuario.iniciales} tamano={64} color={usuario.colorAvatar} />
          <View style={perfil.info}>
            <Text style={general.titulo}>{usuario.nombre}</Text>
            <View style={perfil.chipVibra}>
              <Text style={perfil.textoVibra}>Vibra: {describirVibra(usuario.vibras)}</Text>
            </View>
          </View>
        </View>

        <View style={perfil.estadisticas}>
          <TarjetaEstadistica
            numero={usuario.guardados.length}
            etiqueta="Guardados"
            alPresionar={function () {
              router.push("/guardados");
            }}
          />
          <TarjetaEstadistica
            numero={encuestasVotadas.length}
            etiqueta="Votos"
            alPresionar={function () {
              router.push("/mis-votos");
            }}
          />
          <TarjetaEstadistica
            numero={misMoodboards.length}
            etiqueta={misMoodboards.length === 1 ? "Moodboard" : "Moodboards"}
            alPresionar={function () {
              router.push("/mis-moodboards");
            }}
          />
        </View>

        <Text style={general.subtitulo}>Mi casa</Text>
        <View style={filaAjuste.lista}>
          <FilaAjuste
            Icono={Folder}
            texto="Encuestas que creé"
            alPresionar={function () {
              router.push("/mis-encuestas");
            }}
          />
          <View style={filaAjuste.divisor} />
          <FilaAjuste
            Icono={ThumbsUp}
            texto="Votos que di"
            alPresionar={function () {
              router.push("/mis-votos");
            }}
          />
          <View style={filaAjuste.divisor} />
          <FilaAjuste Icono={Bell} texto="Notificaciones" derecha={interruptor("activas")} />
          {usuario.notificaciones.activas ? (
            <>
              <View style={filaAjuste.divisor} />
              <FilaAjuste Icono={Vote} texto="Nuevas encuestas" derecha={interruptor("nuevas")} />
              <View style={filaAjuste.divisor} />
              <FilaAjuste Icono={Trophy} texto="Resultados" derecha={interruptor("resultados")} />
            </>
          ) : null}
        </View>

        <Boton texto="Cerrar sesión" tipo="secundario" alPresionar={salir} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Perfil;
