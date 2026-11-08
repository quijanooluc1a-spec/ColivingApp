import { router } from "expo-router";
import { House } from "lucide-react-native";
import { useContext, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Aviso from "../../assets/Components/Aviso";
import Boton from "../../assets/Components/Boton";
import CampoTexto from "../../assets/Components/CampoTexto";
import { AppContexto } from "../../assets/Contexto/AppContexto";
import { general, inicio } from "../../assets/Styles/Stylesheet";
import { colores } from "../../assets/Styles/Tema";

// Pantalla 1 del Figma: Inicio de sesión. Es la primera pantalla de la app.
function Index() {
  const { iniciarSesion } = useContext(AppContexto);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState(null); // { texto, tipo } o null

  function entrar() {
    if (correo.trim() === "" || contrasena === "") {
      setMensaje({ texto: "Escribe tu correo y tu contraseña.", tipo: "alerta" });
      return;
    }
    if (iniciarSesion(correo, contrasena)) {
      setMensaje(null);
      // replace: cambia esta pantalla por las pestañas, así no se puede volver al inicio de sesión
      router.replace("/explorar");
    } else {
      setMensaje({ texto: "El correo o la contraseña no coinciden.", tipo: "alerta" });
    }
  }

  function olvideMiContrasena() {
    setMensaje({
      texto: "Todavía no hay un servidor para recuperar contraseñas. Las cuentas de prueba usan la contraseña 1234.",
      tipo: "info",
    });
  }

  function irARegistro() {
    setMensaje(null);
    router.push("/registro");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <ScrollView contentContainerStyle={inicio.contenido} keyboardShouldPersistTaps="handled">
        <View style={inicio.logo}>
          <House color={colores.sobrePrincipal} size={36} />
        </View>
        <Text style={inicio.titulo}>Bienvenido</Text>

        <CampoTexto etiqueta="Correo" valor={correo} alCambiar={setCorreo} placeholder="ana@email.com" esCorreo={true} />
        <CampoTexto
          etiqueta="Contraseña"
          valor={contrasena}
          alCambiar={setContrasena}
          placeholder="••••••••"
          esContrasena={true}
        />
        <TouchableOpacity style={inicio.olvido} onPress={olvideMiContrasena}>
          <Text style={inicio.textoEnlace}>Olvidé mi contraseña</Text>
        </TouchableOpacity>

        {mensaje ? <Aviso texto={mensaje.texto} tipo={mensaje.tipo} /> : null}

        <Boton texto="Iniciar sesión" alPresionar={entrar} />

        <View style={inicio.separador}>
          <View style={inicio.linea} />
          <Text style={general.textoPequeno}>o</Text>
          <View style={inicio.linea} />
        </View>

        <Boton texto="Crear cuenta" tipo="secundario" alPresionar={irARegistro} />

        <Text style={inicio.ayuda}>
          Cuentas de prueba: ana@email.com, mateo@email.com y valentina@email.com, con la contraseña 1234.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;
