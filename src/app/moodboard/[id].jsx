import { router, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Aviso from "../../../assets/Components/Aviso";
import Boton from "../../../assets/Components/Boton";
import Chip from "../../../assets/Components/Chip";
import Collage from "../../../assets/Components/Collage";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import Paleta from "../../../assets/Components/Paleta";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { paletaDeIdeas, queCombina } from "../../../assets/Logica/paleta";
import { primerNombre, textoIdeas } from "../../../assets/Logica/textos";
import { fuenteDeIdea } from "../../../assets/Servicios/muebles";
import { general, moodboard as estilos } from "../../../assets/Styles/Stylesheet";
import { colores, espacios, medidas } from "../../../assets/Styles/Tema";

// Mensajes que se muestran al llegar a esta pantalla (pantallas 14 y 17 del Figma)
const avisos = {
  guardado: "Mood board guardado",
  idea: "Idea agregada",
};

// Pantallas 11, 14, 15 y 17 del Figma: Ver un mood board
function VerMoodboard() {
  const { id, aviso, nueva } = useLocalSearchParams();
  const { usuario, usuarios, moodboards } = useContext(AppContexto);
  const anchoPantalla = Math.min(useWindowDimensions().width, medidas.anchoMaximo);

  if (!usuario) {
    return null;
  }

  const moodboard = moodboards.find(function (m) {
    return m.id === id;
  });

  if (!moodboard) {
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Moodboard" conVolver={true} />
        <View style={general.contenido}>
          <EstadoVacio titulo="No encontramos este mood board" />
        </View>
      </SafeAreaView>
    );
  }

  const dueno = usuarios.find(function (u) {
    return u.id === moodboard.id_dueno;
  });
  const esMio = dueno.id === usuario.id;
  const fotos = moodboard.ideas.map(function (idea) {
    return { id: idea.id, fuente: fuenteDeIdea(idea) };
  });
  const paleta = paletaDeIdeas(moodboard.ideas);
  const combina = queCombina(paleta);

  function agregarIdea() {
    router.push("/agregar-idea/" + moodboard.id);
  }

  function ponerAVotacion() {
    router.push("/elegir-objeto/" + moodboard.id);
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo={moodboard.nombre} conVolver={true} />
      {/* key: si llega un aviso nuevo, la lista se vuelve a armar desde arriba y el aviso se ve */}
      <ScrollView key={(aviso || "") + (nueva || "")} contentContainerStyle={general.contenido}>
        {avisos[aviso] ? <Aviso texto={avisos[aviso]} tipo="exito" conIcono={true} /> : null}

        {esMio ? (
          <Text style={general.textoSuave}>
            {primerNombre(dueno.nombre)} · {textoIdeas(moodboard.ideas.length)}
            {moodboard.compartido ? "" : " · Borrador"}
          </Text>
        ) : (
          <Text style={estilos.dueno}>
            {primerNombre(dueno.nombre)} · {textoIdeas(moodboard.ideas.length)}
          </Text>
        )}

        <Collage fotos={fotos} ancho={anchoPantalla - espacios.normal * 2} idNueva={nueva} />

        <View style={general.grupo}>
          <Text style={general.etiqueta}>Paleta</Text>
          <Paleta colores={paleta} />
        </View>

        {combina ? (
          <View style={general.grupo}>
            <Text style={general.etiqueta}>¿Qué combina?</Text>
            <View style={estilos.combina}>
              <View style={estilos.combinaItem}>
                <View style={[estilos.punto, { backgroundColor: combina.paredes }]} />
                <Text style={general.texto}>Paredes</Text>
              </View>
              <View style={estilos.combinaItem}>
                <View style={[estilos.punto, { backgroundColor: combina.pisos }]} />
                <Text style={general.texto}>Pisos</Text>
              </View>
              <View style={estilos.combinaItem}>
                <View style={[estilos.punto, { backgroundColor: combina.muebles }]} />
                <Text style={general.texto}>Muebles</Text>
              </View>
              <View style={estilos.combinaItem}>
                {/* Luz cálida: amarillo suave del Figma; luz fría: blanco */}
                <View
                  style={[
                    estilos.punto,
                    { backgroundColor: combina.luzCalida ? colores.amarilloSuave : colores.superficie },
                  ]}
                />
                <Text style={general.texto}>{combina.luzCalida ? "Luz cálida" : "Luz fría"}</Text>
              </View>
            </View>
          </View>
        ) : null}

        {moodboard.vibras.length > 0 ? (
          <View style={general.grupo}>
            <Text style={general.etiqueta}>Vibra</Text>
            {moodboard.descripcion !== "" ? <Text style={general.texto}>{moodboard.descripcion}</Text> : null}
            <View style={general.filaChips}>
              {moodboard.vibras.map(function (vibra) {
                return <Chip key={vibra} texto={vibra} />;
              })}
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View style={general.acciones}>
        <Boton texto="Agregar idea" tipo="secundario" alPresionar={agregarIdea} />
        <Boton texto="Poner a votación" alPresionar={ponerAVotacion} />
      </View>
    </SafeAreaView>
  );
}

export default VerMoodboard;
