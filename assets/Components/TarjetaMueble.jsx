import { Check, Plus } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatearPrecio } from "../Logica/textos";
import { tarjetaMueble } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Foto + nombre + precio de un mueble (feed tipo Pinterest)
// Props: mueble, ancho (de la tarjeta), alPresionar (función),
//        mostrarMas (true muestra el botón "+"), alAgregar (función del "+"), agregado (true = ya se agregó)
function TarjetaMueble({ mueble, ancho, alPresionar, mostrarMas, alAgregar, agregado }) {
  // La foto mantiene la forma del original (más alta o más ancha), como en Pinterest
  const altoFoto = Math.round(ancho * mueble.proporcion);

  return (
    <TouchableOpacity style={[tarjetaMueble.contenedor, { width: ancho }]} onPress={alPresionar} activeOpacity={0.8}>
      <View>
        <Image source={mueble.imagen} style={[tarjetaMueble.foto, { width: ancho, height: altoFoto }]} resizeMode="cover" />
        {mostrarMas ? (
          <TouchableOpacity
            style={agregado ? tarjetaMueble.botonMasActivo : tarjetaMueble.botonMas}
            onPress={alAgregar}
            disabled={agregado}
            accessibilityLabel={"Agregar " + mueble.nombre}
          >
            {agregado ? (
              <Check color={colores.sobrePrincipal} size={18} />
            ) : (
              <Plus color={colores.principal} size={18} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={tarjetaMueble.nombre} numberOfLines={1}>
        {mueble.nombre}
      </Text>
      <Text style={tarjetaMueble.precio}>{formatearPrecio(mueble.precio)}</Text>
    </TouchableOpacity>
  );
}

export default TarjetaMueble;
