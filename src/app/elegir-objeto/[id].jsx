import { router, useLocalSearchParams } from "expo-router";
import { Check } from "lucide-react-native";
import { useContext, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../../assets/Components/Boton";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { estaAbierta } from "../../../assets/Logica/votacion";
import { buscarMueble } from "../../../assets/Servicios/baseDeDatos";
import { elegir, general } from "../../../assets/Styles/Stylesheet";
import { colores, espacios, medidas } from "../../../assets/Styles/Tema";

// Pantalla 18 del Figma: Poner a votación (se elige UN solo objeto del mood board)
function ElegirObjeto() {
  const { id } = useLocalSearchParams();
  const { usuario, moodboards, encuestas } = useContext(AppContexto);
  const [elegido, setElegido] = useState(null); // id del mueble elegido
  const anchoPantalla = Math.min(useWindowDimensions().width, medidas.anchoMaximo);

  if (!usuario) {
    return null;
  }

  const moodboard = moodboards.find(function (m) {
    return m.id === id;
  });
  if (!moodboard) {
    return null;
  }

  // Solo se pueden votar muebles del catálogo (no las fotos del carrete)
  const muebles = moodboard.ideas
    .filter(function (idea) {
      return idea.id_mueble;
    })
    .map(function (idea) {
      return buscarMueble(idea.id_mueble);
    });

  // Un mueble que ya está en votación (o en desempate) o que ya se aprobó no se puede volver a poner a votación.
  // Devuelve por qué no se puede, o null si sí se puede.
  function motivoBloqueo(idMueble) {
    const encuesta = encuestas.find(function (e) {
      return e.id_mueble === idMueble && (estaAbierta(e) || e.estado === "aprobada");
    });
    if (!encuesta) {
      return null;
    }
    return encuesta.estado === "aprobada" ? "Ya se aprobó" : "Ya está en votación";
  }

  const anchoTarjeta = (anchoPantalla - espacios.normal * 2 - 14) / 2;

  function continuar() {
    router.push("/encuesta/nueva?mueble=" + elegido + "&moodboard=" + moodboard.id);
  }

  function cancelar() {
    router.back();
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Poner a votación" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <Text style={general.titulo}>¿Qué objeto quieres poner a votación?</Text>
        <Text style={general.textoSuave}>
          Elige solo uno de los objetos de «{moodboard.nombre}». Tus roomies votarán sobre ese objeto.
        </Text>

        {muebles.length === 0 ? (
          <EstadoVacio titulo="Este mood board no tiene muebles" mensaje="Agrega una idea del catálogo para votarla." />
        ) : null}

        <View style={elegir.grilla}>
          {muebles.map(function (mueble) {
            const bloqueo = motivoBloqueo(mueble.id);
            const esElegido = elegido === mueble.id;
            return (
              <TouchableOpacity
                key={mueble.id}
                style={[esElegido ? elegir.objetoElegido : elegir.objeto, { width: anchoTarjeta }]}
                onPress={function () {
                  setElegido(mueble.id);
                }}
                disabled={bloqueo !== null}
                activeOpacity={0.8}
                accessibilityState={{ selected: esElegido, disabled: bloqueo !== null }}
              >
                <Image source={mueble.imagen} style={elegir.foto} resizeMode="cover" />
                <View style={elegir.info}>
                  <Text style={elegir.nombre}>{mueble.nombre}</Text>
                  {bloqueo ? <Text style={general.textoPequeno}>{bloqueo}</Text> : null}
                </View>
                {esElegido ? (
                  <View style={elegir.marca}>
                    <Check color={colores.sobrePrincipal} size={14} strokeWidth={3} />
                  </View>
                ) : (
                  <View style={elegir.circulo} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={general.acciones}>
        <Boton texto="Poner a votación" alPresionar={continuar} deshabilitado={elegido === null} />
        <Boton texto="Cancelar" tipo="secundario" alPresionar={cancelar} />
      </View>
    </SafeAreaView>
  );
}

export default ElegirObjeto;
