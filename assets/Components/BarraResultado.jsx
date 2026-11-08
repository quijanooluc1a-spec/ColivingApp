import { Text, View } from "react-native";
import { textoVotos } from "../Logica/textos";
import { barraResultado } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Una opción de la encuesta con sus votos y una barra que se llena según el resultado
// Props: texto, votos, total, tipo ("si" pinta la barra verde, "no" la pinta roja)
function BarraResultado({ texto, votos, total, tipo }) {
  const porcentaje = total === 0 ? 0 : (votos / total) * 100;

  return (
    <View style={barraResultado.contenedor}>
      <View style={barraResultado.fila}>
        <Text style={barraResultado.texto}>{texto}</Text>
        <Text style={barraResultado.votos}>{textoVotos(votos)}</Text>
      </View>
      <View style={barraResultado.barra}>
        <View
          style={[
            barraResultado.relleno,
            { width: porcentaje + "%", backgroundColor: tipo === "si" ? colores.meGusta : colores.noMeGusta },
          ]}
        />
      </View>
    </View>
  );
}

export default BarraResultado;
