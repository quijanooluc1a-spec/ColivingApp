import { Text, TouchableOpacity } from "react-native";
import { boton } from "../Styles/Stylesheet";

// Botón grande: naranja ("principal") o blanco con borde naranja ("secundario")
// Props: texto, alPresionar (función), tipo ("principal" o "secundario"), deshabilitado (true o false)
function Boton({ texto, alPresionar, tipo, deshabilitado }) {
  // Si no se dice el tipo, el botón es "principal"
  let estiloBoton = boton.principal;
  let estiloTexto = boton.textoPrincipal;
  if (tipo === "secundario") {
    estiloBoton = boton.secundario;
    estiloTexto = boton.textoSecundario;
  }

  return (
    <TouchableOpacity
      // Una lista [estilo1, estilo2] aplica los dos estilos
      style={[estiloBoton, deshabilitado ? boton.deshabilitado : null]}
      onPress={alPresionar}
      disabled={deshabilitado}
      activeOpacity={0.7}
    >
      <Text style={estiloTexto}>{texto}</Text>
    </TouchableOpacity>
  );
}

export default Boton;
