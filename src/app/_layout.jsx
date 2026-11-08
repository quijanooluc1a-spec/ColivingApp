// Solo se importan las 4 letras que usa el Figma (no todas las del paquete)
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins/600SemiBold";
import { Poppins_700Bold } from "@expo-google-fonts/poppins/700Bold";
import { useFonts } from "expo-font";
import { router, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { View } from "react-native";
import { AppContexto, ProveedorApp } from "../../assets/Contexto/AppContexto";
import { general } from "../../assets/Styles/Stylesheet";
import { colores } from "../../assets/Styles/Tema";

// Si nadie ha iniciado sesión y se abre una pantalla de adentro
// (por ejemplo al recargar la página web), vuelve al inicio de sesión
function Guardian() {
  const { usuario } = useContext(AppContexto);
  const segmentos = useSegments();

  useEffect(
    function () {
      const enInicio = segmentos.length === 0 || segmentos[0] === "index" || segmentos[0] === "registro";
      if (usuario === null && !enInicio) {
        router.replace("/");
      }
    },
    [usuario, segmentos]
  );

  return null;
}

function RootLayout() {
  // Carga las letras del Figma: Poppins para los títulos e Inter para los textos
  const [letrasListas, errorLetras] = useFonts({
    Poppins_600SemiBold,
    Poppins_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  // Mientras cargan las letras no se muestra nada
  if (!letrasListas && !errorLetras) {
    return null;
  }

  return (
    <ProveedorApp>
      {/* Hora y batería en color oscuro, porque el fondo de la app es claro */}
      <StatusBar style="dark" />

      {/* En el computador la app se ve con el ancho de un teléfono, centrada */}
      <View style={general.marco}>
        <View style={general.app}>
          {/* Stack: cada pantalla nueva se pone encima de la anterior y se puede volver.
              Expo Router encuentra solo todas las pantallas de la carpeta src/app. */}
          <Stack
            screenOptions={{
              headerShown: false, // cada pantalla dibuja su propio título con <Encabezado />
              contentStyle: { backgroundColor: colores.fondo },
            }}
          />
        </View>
      </View>

      {/* Va después del Stack para que la navegación ya exista cuando revise la sesión */}
      <Guardian />
    </ProveedorApp>
  );
}

export default RootLayout;
