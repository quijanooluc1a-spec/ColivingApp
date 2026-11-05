// Solo se importan las 4 letras que usa el Figma (no todas las del paquete)
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins/600SemiBold";
import { Poppins_700Bold } from "@expo-google-fonts/poppins/700Bold";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colores } from "../../assets/Styles/Tema";

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
    <>
      {/* Hora y batería en color oscuro, porque el fondo de la app es claro */}
      <StatusBar style="dark" />

      {/* Stack: cada pantalla nueva se pone encima de la anterior y se puede volver.
          Expo Router encuentra solo todas las pantallas de la carpeta src/app. */}
      <Stack
        screenOptions={{
          headerShown: false, // cada pantalla dibuja su propio título con <Encabezado />
          contentStyle: { backgroundColor: colores.fondo },
        }}
      />
    </>
  );
}

export default RootLayout;
