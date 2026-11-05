import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../../../assets/Components/Encabezado";
import EstadoVacio from "../../../assets/Components/EstadoVacio";
import { general } from "../../../assets/Styles/Stylesheet";

// Pantalla 9 del Figma: Detalle del mueble
// [id] en el nombre del archivo: la ruta /mueble/m1 abre esta pantalla con id = "m1"
function DetalleMueble() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Detalle" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 9 · Detalle del mueble"
          mensaje={"Mueble " + id + ". Aquí van la foto, el precio, la tienda, las medidas, el color, los materiales y los botones Guardar y Comprar (Fase 3)."}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetalleMueble;
