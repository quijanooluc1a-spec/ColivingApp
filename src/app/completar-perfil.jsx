import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../assets/Components/Boton";
import Encabezado from "../../assets/Components/Encabezado";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla 3 del Figma: Completar perfil
function CompletarPerfil() {
  function empezar() {
    // Quita el registro de la pila y entra a las pestañas,
    // así el botón "atrás" ya no vuelve al registro
    router.dismissAll();
    router.replace("/explorar");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Completa tu perfil" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 3 · Completar perfil"
          mensaje="Aquí van tu nombre, con quién vives y tu vibra (Fase 3)."
        />
        <Boton texto="Empezar" alPresionar={empezar} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CompletarPerfil;
