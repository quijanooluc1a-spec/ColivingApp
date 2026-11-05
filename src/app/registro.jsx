import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../assets/Components/Boton";
import Encabezado from "../../assets/Components/Encabezado";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla 2 del Figma: Registro
function Registro() {
  function irACompletarPerfil() {
    router.push("/completar-perfil");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Crear cuenta" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <EstadoVacio
          titulo="Pantalla 2 · Registro"
          mensaje="Aquí van el nombre, el correo y la contraseña (Fase 3)."
        />
        <Boton texto="Crear cuenta" alPresionar={irACompletarPerfil} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Registro;
