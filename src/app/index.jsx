import { router } from "expo-router";
import { House } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../../assets/Components/Boton";
import EstadoVacio from "../../assets/Components/EstadoVacio";
import { general, inicio } from "../../assets/Styles/Stylesheet";
import { colores } from "../../assets/Styles/Tema";

// Pantalla 1 del Figma: Inicio de sesión. Es la primera pantalla de la app.
// Por ahora solo tiene la navegación; el formulario se arma en la Fase 3.
function Index() {
  // replace: cambia esta pantalla por las pestañas, así no se puede volver al inicio de sesión
  function iniciarSesion() {
    router.replace("/explorar");
  }

  function irARegistro() {
    router.push("/registro");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <ScrollView contentContainerStyle={inicio.contenido}>
        <View style={inicio.logo}>
          <House color={colores.sobrePrincipal} size={36} />
        </View>
        <Text style={inicio.titulo}>Bienvenido</Text>

        <EstadoVacio
          titulo="Pantalla 1 · Inicio de sesión"
          mensaje="Los campos de correo y contraseña llegan en la Fase 3."
        />

        <Boton texto="Iniciar sesión" alPresionar={iniciarSesion} />
        <Boton texto="Crear cuenta" tipo="secundario" alPresionar={irARegistro} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;
