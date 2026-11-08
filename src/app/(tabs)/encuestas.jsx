import { router } from "expo-router";
import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../../assets/Components/Avatar";
import Chip from "../../../assets/Components/Chip";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import TarjetaEncuesta from "../../../assets/Components/TarjetaEncuesta";
import TarjetaOpcion from "../../../assets/Components/TarjetaOpcion";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { primerNombre } from "../../../assets/Logica/textos";
import { contarVotos, resumenEncuesta, votoDe } from "../../../assets/Logica/votacion";
import { buscarMueble } from "../../../assets/Servicios/muebles";
import { encuestas as estilos, general } from "../../../assets/Styles/Stylesheet";

// Pantalla 22 del Figma: todas las encuestas activas, para votar desde la lista
function Encuestas() {
  const { usuario, usuarios, roommates, casa, encuestas, votos, votar } = useContext(AppContexto);

  if (!usuario) {
    return null;
  }

  const activas = encuestas.filter(function (e) {
    return e.estado === "activa";
  });
  const terminadas = encuestas.filter(function (e) {
    return e.estado !== "activa";
  });

  function nombreDe(idUsuario) {
    const persona = usuarios.find(function (u) {
      return u.id === idUsuario;
    });
    return primerNombre(persona.nombre);
  }

  function abrir(encuesta) {
    router.push("/encuesta/" + encuesta.id);
  }

  // Para crear una encuesta hay que elegir un objeto de un mood board,
  // así que "+ Nuevo" lleva a la pestaña Mood boards
  function irAMoodboards() {
    router.navigate("/moodboards");
  }

  return (
    <SafeAreaView style={general.pantalla} edges={["top"]}>
      <Encabezado titulo="Encuestas" subtitulo={casa.nombre + " · " + roommates.length + " inquilinos"} />
      <ScrollView contentContainerStyle={general.contenido}>
        <View style={estilos.filaInquilinos}>
          <View style={estilos.inquilinos}>
            {roommates.map(function (persona) {
              return <Avatar key={persona.id} iniciales={persona.iniciales} tamano={40} color={persona.colorAvatar} />;
            })}
          </View>
          <Chip texto="+ Nuevo" seleccionado={true} alPresionar={irAMoodboards} />
        </View>

        {activas.length === 0 ? (
          <EstadoVacio
            titulo="No hay encuestas activas"
            mensaje="Abre un mood board y pon un objeto a votación."
          />
        ) : null}

        <View style={estilos.lista}>
          {activas.map(function (encuesta) {
            return (
              <TarjetaEncuesta
                key={encuesta.id}
                encuesta={encuesta}
                mueble={buscarMueble(encuesta.id_mueble)}
                creador={nombreDe(encuesta.id_creador)}
                conteo={contarVotos(votos, encuesta.id, encuesta.ronda)}
                miVoto={votoDe(votos, encuesta.id, usuario.id, encuesta.ronda)}
                alVotar={function (valor) {
                  votar(encuesta.id, valor);
                }}
                alAbrir={function () {
                  abrir(encuesta);
                }}
              />
            );
          })}
        </View>

        {/* No está en el Figma: las encuestas que ya cerraron, para ver su resultado */}
        {terminadas.length > 0 ? (
          <View style={estilos.lista}>
            <Text style={general.subtitulo}>Terminadas</Text>
            {terminadas.map(function (encuesta) {
              const mueble = buscarMueble(encuesta.id_mueble);
              return (
                <TarjetaOpcion
                  key={encuesta.id}
                  foto={mueble.imagen}
                  titulo={mueble.nombre}
                  subtitulo={resumenEncuesta(encuesta, votos)}
                  tamanoFoto={56}
                  alPresionar={function () {
                    abrir(encuesta);
                  }}
                />
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Encuestas;
