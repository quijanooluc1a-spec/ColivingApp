import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatearPrecio } from "../Logica/textos";
import { tarjetaEncuesta } from "../Styles/Stylesheet";
import BotonVoto from "./BotonVoto";

// Tarjeta de la lista de encuestas, con los botones para votar
// Props: encuesta, mueble, creador (nombre), conteo ({ si, no }), miVoto ("si", "no" o null),
//        alVotar (función que recibe "si" o "no"), alAbrir (función)
function TarjetaEncuesta({ encuesta, mueble, creador, conteo, miVoto, alVotar, alAbrir }) {
  return (
    <View style={tarjetaEncuesta.contenedor}>
      <View style={tarjetaEncuesta.info}>
        <TouchableOpacity style={tarjetaEncuesta.datos} onPress={alAbrir} activeOpacity={0.7}>
          <Image source={mueble.imagen} style={tarjetaEncuesta.foto} resizeMode="cover" />
          <View style={tarjetaEncuesta.textos}>
            <Text style={tarjetaEncuesta.nombre}>{mueble.nombre}</Text>
            <Text style={tarjetaEncuesta.detalle}>{formatearPrecio(mueble.precio)}</Text>
            <Text style={tarjetaEncuesta.detalle}>Agregado por {creador}</Text>
            {/* Dos textos separados: si no caben en una línea, el segundo baja completo */}
            <View style={tarjetaEncuesta.conteos}>
              <Text style={tarjetaEncuesta.conteo}>{encuesta.texto_si + ": " + conteo.si}</Text>
              <Text style={tarjetaEncuesta.conteo}>{encuesta.texto_no + ": " + conteo.no}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tarjetaEncuesta.botonAbrir} onPress={alAbrir} activeOpacity={0.7}>
          <Text style={tarjetaEncuesta.textoAbrir}>Encuesta</Text>
        </TouchableOpacity>
      </View>

      <View style={tarjetaEncuesta.botones}>
        <View style={tarjetaEncuesta.voto}>
          <BotonVoto
            texto={encuesta.texto_si}
            tipo="si"
            seleccionado={miVoto === "si"}
            alPresionar={function () {
              alVotar("si");
            }}
          />
        </View>
        <View style={tarjetaEncuesta.voto}>
          <BotonVoto
            texto={encuesta.texto_no}
            tipo="no"
            seleccionado={miVoto === "no"}
            alPresionar={function () {
              alVotar("no");
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default TarjetaEncuesta;
