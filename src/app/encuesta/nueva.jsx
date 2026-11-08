import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Aviso from "../../../assets/Components/Aviso";
import Boton from "../../../assets/Components/Boton";
import CampoTexto from "../../../assets/Components/CampoTexto";
import Chip from "../../../assets/Components/Chip";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import TarjetaOpcion from "../../../assets/Components/TarjetaOpcion";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { duraciones, textosDeVoto } from "../../../assets/Datos/opciones";
import { buscarMueble } from "../../../assets/Servicios/muebles";
import { general, nuevaEncuesta } from "../../../assets/Styles/Stylesheet";
import { colores } from "../../../assets/Styles/Tema";

// Pantalla 23 del Figma: Nueva encuesta
// Recibe el mueble elegido y su mood board: /encuesta/nueva?mueble=m1&moodboard=mb1
function NuevaEncuesta() {
  const { mueble: idMueble, moodboard: idMoodboard } = useLocalSearchParams();
  const { usuario, crearEncuesta } = useContext(AppContexto);
  const [pregunta, setPregunta] = useState("¿Lo ponemos en la sala?");
  const [textoSi, setTextoSi] = useState(textosDeVoto[0].si);
  const [textoNo, setTextoNo] = useState(textosDeVoto[0].no);
  const [horas, setHoras] = useState(24);
  const [error, setError] = useState("");

  if (!usuario) {
    return null;
  }

  const mueble = buscarMueble(idMueble);

  if (!mueble) {
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Nueva encuesta" conVolver={true} />
        <View style={general.contenido}>
          <EstadoVacio
            titulo="Primero elige un objeto"
            mensaje="Abre un mood board y toca «Poner a votación» para elegir qué votar."
          />
        </View>
      </SafeAreaView>
    );
  }

  function publicar() {
    if (pregunta.trim() === "" || textoSi.trim() === "" || textoNo.trim() === "") {
      setError("Escribe la pregunta y los textos de los dos botones.");
      return;
    }
    crearEncuesta(mueble.id, idMoodboard, pregunta, textoSi, textoNo, horas);
    // dismissTo: cierra las pantallas de encima hasta llegar a la pestaña Encuestas
    router.dismissTo("/encuestas");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Nueva encuesta" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido} keyboardShouldPersistTaps="handled">
        <TarjetaOpcion foto={mueble.imagen} titulo={mueble.nombre} tamanoFoto={64} />

        <CampoTexto etiqueta="Pregunta" valor={pregunta} alCambiar={setPregunta} placeholder="¿Lo ponemos en la sala?" />

        <View style={general.grupo}>
          <Text style={general.etiqueta}>Opciones (puedes cambiar los textos)</Text>
          <View style={nuevaEncuesta.opcion}>
            <View style={[nuevaEncuesta.circulo, { borderColor: colores.meGusta }]} />
            <TextInput style={nuevaEncuesta.texto} value={textoSi} onChangeText={setTextoSi} placeholder="Me gusta"
              placeholderTextColor={colores.textoSuave}
            />
          </View>
          <View style={nuevaEncuesta.opcion}>
            <View style={[nuevaEncuesta.circulo, { borderColor: colores.noMeGusta }]} />
            <TextInput style={nuevaEncuesta.texto} value={textoNo} onChangeText={setTextoNo} placeholder="No me gusta"
              placeholderTextColor={colores.textoSuave}
            />
          </View>
          <View style={general.filaChips}>
            {textosDeVoto.map(function (par) {
              return (
                <Chip
                  key={par.si}
                  texto={par.si + " / " + par.no}
                  seleccionado={textoSi === par.si && textoNo === par.no}
                  alPresionar={function () {
                    setTextoSi(par.si);
                    setTextoNo(par.no);
                  }}
                />
              );
            })}
          </View>
        </View>

        <View style={general.grupo}>
          <Text style={general.etiqueta}>La encuesta cierra en</Text>
          <View style={general.filaChips}>
            {duraciones.map(function (duracion) {
              return (
                <Chip
                  key={duracion.texto}
                  texto={duracion.texto}
                  seleccionado={horas === duracion.horas}
                  alPresionar={function () {
                    setHoras(duracion.horas);
                  }}
                />
              );
            })}
          </View>
        </View>

        {error !== "" ? <Aviso texto={error} tipo="alerta" /> : null}
      </ScrollView>

      <View style={general.acciones}>
        <Boton texto="Publicar encuesta" alPresionar={publicar} />
      </View>
    </SafeAreaView>
  );
}

export default NuevaEncuesta;
