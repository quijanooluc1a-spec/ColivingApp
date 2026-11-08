import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useContext, useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Aviso from "../../../assets/Components/Aviso";
import Boton from "../../../assets/Components/Boton";
import Chip from "../../../assets/Components/Chip";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import TarjetaEstadistica from "../../../assets/Components/TarjetaEstadistica";
import TarjetaOpcion from "../../../assets/Components/TarjetaOpcion";
import TarjetaTienda from "../../../assets/Components/TarjetaTienda";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { formatearPrecio, textoIdeas } from "../../../assets/Logica/textos";
import { buscarMueble, enlaceTienda, fuenteDeIdea } from "../../../assets/Servicios/muebles";
import { detalle, general, hoja } from "../../../assets/Styles/Stylesheet";

// Pantalla 9 del Figma: Detalle del mueble
// [id] en el nombre del archivo: la ruta /mueble/m1 abre esta pantalla con id = "m1"
function DetalleMueble() {
  const { id } = useLocalSearchParams();
  const { usuario, moodboards, guardarMueble, agregarIdea } = useContext(AppContexto);
  const [hojaAbierta, setHojaAbierta] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const mueble = buscarMueble(id);

  if (!usuario) {
    return null;
  }

  if (!mueble) {
    return (
      <SafeAreaView style={general.pantalla}>
        <Encabezado titulo="Detalle" conVolver={true} />
        <View style={general.contenido}>
          <EstadoVacio titulo="No encontramos este mueble" mensaje="Puede que ya no esté en el catálogo." />
        </View>
      </SafeAreaView>
    );
  }

  // Mis mood boards, para elegir dónde guardar el mueble
  const misMoodboards = moodboards.filter(function (moodboard) {
    return moodboard.id_dueno === usuario.id;
  });

  // Abre la tienda en el navegador del teléfono
  function comprar() {
    WebBrowser.openBrowserAsync(enlaceTienda(mueble));
  }

  function guardarEn(moodboard) {
    agregarIdea(moodboard.id, { id_mueble: mueble.id });
    setHojaAbierta(false);
    setMensaje("Guardado en «" + moodboard.nombre + "»");
  }

  function soloGuardar() {
    guardarMueble(mueble.id);
    setHojaAbierta(false);
    setMensaje("Guardado en tus guardados");
  }

  function crearMoodboardConEste() {
    guardarMueble(mueble.id);
    setHojaAbierta(false);
    router.push("/moodboard/nuevo?mueble=" + mueble.id);
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Detalle" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <Image source={mueble.imagen} style={detalle.foto} resizeMode="cover" />

        <View style={detalle.textos}>
          <Text style={general.titulo}>{mueble.nombre}</Text>
          <Text style={detalle.precio}>{formatearPrecio(mueble.precio)}</Text>
        </View>

        {mensaje !== "" ? <Aviso texto={mensaje} tipo="exito" conIcono={true} /> : null}

        <TarjetaTienda tienda={mueble.tienda} alPresionar={comprar} />

        <Text style={general.textoSuave}>{mueble.descripcion}</Text>

        <View style={general.grupo}>
          <Text style={general.etiqueta}>Medidas (cm)</Text>
          <View style={detalle.medidas}>
            <TarjetaEstadistica numero={mueble.largo} etiqueta="Largo" />
            <TarjetaEstadistica numero={mueble.ancho} etiqueta="Ancho" />
            <TarjetaEstadistica numero={mueble.alto} etiqueta="Alto" />
          </View>
        </View>

        <View style={general.grupo}>
          <Text style={general.etiqueta}>Color y materiales</Text>
          <View style={general.filaChips}>
            <Chip texto={mueble.estilo} />
            <Chip texto={mueble.color} />
            {mueble.materiales.map(function (material) {
              return <Chip key={material} texto={material} />;
            })}
          </View>
        </View>
      </ScrollView>

      <View style={general.acciones}>
        <Boton
          texto="Guardar en moodboard"
          alPresionar={function () {
            setHojaAbierta(true);
          }}
        />
        <Boton texto="Comprar" tipo="secundario" alPresionar={comprar} />
      </View>

      {/* Hoja que sube desde abajo para elegir el mood board */}
      <Modal
        visible={hojaAbierta}
        transparent={true}
        animationType="slide"
        onRequestClose={function () {
          setHojaAbierta(false);
        }}
      >
        <Pressable
          style={hoja.fondo}
          onPress={function () {
            setHojaAbierta(false);
          }}
        >
          {/* Este Pressable vacío evita que un toque en el panel cierre la hoja */}
          <Pressable style={hoja.panel} onPress={function () {}}>
            <Text style={general.subtitulo}>Guardar en un mood board</Text>
            <ScrollView contentContainerStyle={hoja.lista}>
              {misMoodboards.map(function (moodboard) {
                const yaEsta = moodboard.ideas.some(function (idea) {
                  return idea.id_mueble === mueble.id;
                });
                return (
                  <TarjetaOpcion
                    key={moodboard.id}
                    foto={moodboard.ideas.length > 0 ? fuenteDeIdea(moodboard.ideas[0]) : mueble.imagen}
                    titulo={moodboard.nombre}
                    subtitulo={yaEsta ? "Ya está en este mood board" : textoIdeas(moodboard.ideas.length)}
                    alPresionar={
                      yaEsta
                        ? undefined
                        : function () {
                            guardarEn(moodboard);
                          }
                    }
                  />
                );
              })}
            </ScrollView>
            <Boton texto="Nuevo mood board con este mueble" tipo="secundario" alPresionar={crearMoodboardConEste} />
            <Boton texto="Solo guardarlo en Guardados" tipo="secundario" alPresionar={soloGuardar} />
            <TouchableOpacity
              style={hoja.cancelar}
              onPress={function () {
                setHojaAbierta(false);
              }}
            >
              <Text style={general.etiqueta}>Cancelar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

export default DetalleMueble;
