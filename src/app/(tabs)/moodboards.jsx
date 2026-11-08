import { router } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chip from "../../../assets/Components/Chip";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import TarjetaMoodboard from "../../../assets/Components/TarjetaMoodboard";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { describirVibra, primerNombre } from "../../../assets/Logica/textos";
import { fuenteDeIdea } from "../../../assets/Servicios/muebles";
import { general, moodboards as estilos } from "../../../assets/Styles/Stylesheet";
import { espacios, medidas } from "../../../assets/Styles/Tema";

// Pantallas 10 y 10b del Figma: Mood boards (Todos / Mis moodboards)
function Moodboards() {
  const { usuario, usuarios, moodboardsDeLaCasa } = useContext(AppContexto);
  const [filtro, setFiltro] = useState("Todos");
  const anchoPantalla = Math.min(useWindowDimensions().width, medidas.anchoMaximo);

  if (!usuario) {
    return null;
  }

  // Ancho de cada tarjeta: dos por fila
  const anchoTarjeta = (anchoPantalla - espacios.normal * 2 - espacios.medio) / 2;

  const lista = moodboardsDeLaCasa.filter(function (moodboard) {
    return filtro === "Todos" || moodboard.id_dueno === usuario.id;
  });

  // Debajo del nombre: de quién es y su vibra ("Mateo · Minimalista"); en los míos, la vibra o "Borrador"
  function subtitulo(moodboard) {
    if (filtro === "Mis moodboards") {
      return moodboard.compartido ? "Vibra: " + describirVibra(moodboard.vibras) : "Borrador";
    }
    const dueno = usuarios.find(function (u) {
      return u.id === moodboard.id_dueno;
    });
    const quien = dueno.id === usuario.id ? "Tú" : primerNombre(dueno.nombre);
    return quien + " · " + describirVibra(moodboard.vibras);
  }

  function irANuevoMoodboard() {
    router.push("/moodboard/nuevo");
  }

  return (
    <SafeAreaView style={general.pantalla} edges={["top"]}>
      <Encabezado
        titulo="Moodboards"
        botonDerecha={<Chip texto="+ Nuevo" seleccionado={true} alPresionar={irANuevoMoodboard} />}
      />
      <ScrollView contentContainerStyle={general.contenido}>
        <View style={general.filaChips}>
          {["Todos", "Mis moodboards"].map(function (opcion) {
            return (
              <Chip
                key={opcion}
                texto={opcion}
                seleccionado={filtro === opcion}
                alPresionar={function () {
                  setFiltro(opcion);
                }}
              />
            );
          })}
        </View>

        {lista.length === 0 && filtro === "Todos" ? (
          <EstadoVacio titulo="Todavía no hay mood boards" mensaje="Crea el primero con + Nuevo." />
        ) : null}

        <View style={estilos.grilla}>
          {lista.map(function (moodboard) {
            return (
              <TarjetaMoodboard
                key={moodboard.id}
                titulo={moodboard.nombre}
                subtitulo={subtitulo(moodboard)}
                fotos={moodboard.ideas.slice(0, 3).map(fuenteDeIdea)}
                ancho={anchoTarjeta}
                alPresionar={function () {
                  router.push("/moodboard/" + moodboard.id);
                }}
              />
            );
          })}
          {filtro === "Mis moodboards" ? (
            <TarjetaMoodboard esNuevo={true} ancho={anchoTarjeta} alPresionar={irANuevoMoodboard} />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Moodboards;
