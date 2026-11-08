import { Text, TextInput, View } from "react-native";
import { campo } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";

// Etiqueta + caja para escribir
// Props: etiqueta, valor, alCambiar (función), placeholder,
//        esContrasena (true oculta lo que se escribe), esCorreo (teclado de correo y sin mayúsculas)
function CampoTexto({ etiqueta, valor, alCambiar, placeholder, esContrasena, esCorreo }) {
  return (
    <View style={campo.contenedor}>
      <Text style={campo.etiqueta}>{etiqueta}</Text>
      <TextInput
        style={campo.caja}
        value={valor}
        onChangeText={alCambiar}
        placeholder={placeholder}
        placeholderTextColor={colores.textoSuave}
        secureTextEntry={esContrasena}
        keyboardType={esCorreo ? "email-address" : "default"}
        autoCapitalize={esCorreo || esContrasena ? "none" : "sentences"}
      />
    </View>
  );
}

export default CampoTexto;
