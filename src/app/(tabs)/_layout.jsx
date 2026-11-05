import { Tabs } from "expo-router/js-tabs";
import { PlatformPressable } from "expo-router/react-navigation";
import { Compass, Folder, LayoutGrid, User } from "lucide-react-native";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { barraInferior } from "../../../assets/Styles/Stylesheet";
import { colores } from "../../../assets/Styles/Tema";

// Arma las opciones de una pestaña: su texto y su ícono.
// En el Figma la pestaña activa tiene el texto naranja y un poco más grande.
function opcionesPestana(texto, Icono) {
  return {
    title: texto,
    tabBarIcon: function ({ color }) {
      return <Icono color={color} size={24} />;
    },
    tabBarLabel: function ({ focused }) {
      return (
        <Text
          style={focused ? barraInferior.textoActivo : barraInferior.texto}
          numberOfLines={1} // siempre en una línea
          adjustsFontSizeToFit={true} // en teléfonos angostos achica un poco la letra para que quepa
        >
          {texto}
        </Text>
      );
    },
    // El mismo botón de la librería ({...props} le pasa todo lo que trae),
    // pero con el estilo barraInferior.boton, que le quita el relleno de los lados
    tabBarButton: function (props) {
      return <PlatformPressable {...props} style={[props.style, barraInferior.boton]} />;
    },
  };
}

// Barra inferior con 4 pestañas (nodo 3:85 del Figma)
function TabsLayout() {
  // Espacio que el teléfono reserva abajo (la rayita del iPhone o los botones de Android)
  const espacioSeguro = useSafeAreaInsets();
  const espacioAbajo = Math.max(espacioSeguro.bottom, 12);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colores.principal, // color del ícono activo
        tabBarInactiveTintColor: colores.textoSuave, // color de los demás íconos
        tabBarLabelPosition: "below-icon",
        // 63 es el alto de los íconos con sus textos; abajo se suma el espacio del teléfono
        tabBarStyle: [barraInferior.contenedor, { height: 63 + espacioAbajo, paddingBottom: espacioAbajo }],
        sceneStyle: { backgroundColor: colores.fondo },
      }}
    >
      <Tabs.Screen name="explorar" options={opcionesPestana("Explorar", Compass)} />
      <Tabs.Screen name="encuestas" options={opcionesPestana("Encuestas", Folder)} />
      <Tabs.Screen name="moodboards" options={opcionesPestana("Mood boards", LayoutGrid)} />
      <Tabs.Screen name="perfil" options={opcionesPestana("Perfil", User)} />
    </Tabs>
  );
}

export default TabsLayout;
