import { useState } from "react";
import { View } from "react-native";
import { general } from "../Styles/Stylesheet";
import Aviso from "./Aviso";
import Boton from "./Boton";

// Botón para que quien creó la encuesta la cierre antes de que se acabe el tiempo.
// Primero pide confirmar y explica qué va a pasar, porque después ya nadie puede votar en esa ronda.
// Props: texto (del botón), explicacion (lo que pasa si se cierra), alConfirmar (función)
function CerrarEncuesta({ texto, explicacion, alConfirmar }) {
  const [confirmando, setConfirmando] = useState(false);

  if (!confirmando) {
    return (
      <Boton
        texto={texto}
        tipo="secundario"
        alPresionar={function () {
          setConfirmando(true);
        }}
      />
    );
  }

  return (
    <View style={general.grupo}>
      <Aviso texto={explicacion} tipo="alerta" />
      <Boton texto="Sí, cerrar ahora" alPresionar={alConfirmar} />
      <Boton
        texto="No, seguir esperando"
        tipo="secundario"
        alPresionar={function () {
          setConfirmando(false);
        }}
      />
    </View>
  );
}

export default CerrarEncuesta;
