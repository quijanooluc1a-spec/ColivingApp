import { router } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Aviso from "../../assets/Components/Aviso";
import Boton from "../../assets/Components/Boton";
import CampoTexto from "../../assets/Components/CampoTexto";
import Encabezado from "../../assets/Components/Encabezado";
import { AppContexto } from "../../assets/Contexto/AppContexto";
import { MINIMO_CONTRASENA } from "../../assets/Servicios/baseDeDatos";
import { general, inicio } from "../../assets/Styles/Stylesheet";

// Pantalla 2 del Figma: Registro
function Registro() {
  const { registrarse } = useContext(AppContexto);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false); // esperando la respuesta

  // Revisa los campos; devuelve el problema o "" si todo está bien
  function revisarCampos() {
    if (nombre.trim() === "") {
      return "Escribe tu nombre.";
    }
    if (!correo.includes("@") || !correo.includes(".")) {
      return "Escribe un correo válido, por ejemplo ana@email.com.";
    }
    // 4 caracteres con los datos de prueba; 6 con Supabase (es lo que pide Supabase)
    if (contrasena.length < MINIMO_CONTRASENA) {
      return "La contraseña debe tener al menos " + MINIMO_CONTRASENA + " caracteres.";
    }
    return "";
  }

  async function crearCuenta() {
    let problema = revisarCampos();
    if (problema === "") {
      // Los campos están bien: se crea la cuenta (puede fallar si el correo ya existe)
      setEnviando(true);
      problema = await registrarse(nombre, correo, contrasena);
      setEnviando(false);
    }
    if (problema === null) {
      return; // no hubo conexión: el mensaje sale arriba de la pantalla
    }
    setError(problema);
    if (problema === "") {
      router.push("/completar-perfil");
    }
  }

  function volverAlInicio() {
    router.back();
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Crear cuenta" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido} keyboardShouldPersistTaps="handled">
        <CampoTexto etiqueta="Nombre" valor={nombre} alCambiar={setNombre} placeholder="Ana" />
        <CampoTexto etiqueta="Correo" valor={correo} alCambiar={setCorreo} placeholder="ana@email.com" esCorreo={true} />
        <CampoTexto
          etiqueta="Contraseña"
          valor={contrasena}
          alCambiar={setContrasena}
          placeholder="••••••••"
          esContrasena={true}
        />
        {error !== "" ? <Aviso texto={error} tipo="alerta" /> : null}
      </ScrollView>

      <View style={general.acciones}>
        <Boton texto={enviando ? "Creando cuenta…" : "Crear cuenta"} alPresionar={crearCuenta} deshabilitado={enviando} />
        <View style={inicio.enlace}>
          <Text style={general.textoSuave}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={volverAlInicio}>
            <Text style={inicio.textoEnlace}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Registro;
