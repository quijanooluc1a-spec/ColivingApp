import { router } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Aviso from "../../assets/Components/Aviso";
import Boton from "../../assets/Components/Boton";
import CampoTexto from "../../assets/Components/CampoTexto";
import Chip from "../../assets/Components/Chip";
import Encabezado from "../../assets/Components/Encabezado";
import { AppContexto } from "../../assets/Contexto/AppContexto";
import { convivencias, vibras } from "../../assets/Datos/opciones";
import { general } from "../../assets/Styles/Stylesheet";

// Pantalla 3 del Figma: Completar perfil
function CompletarPerfil() {
  const { usuario, completarPerfil } = useContext(AppContexto);
  const [nombre, setNombre] = useState(usuario ? usuario.nombre : "");
  const [convive, setConvive] = useState("Roomies");
  const [misVibras, setMisVibras] = useState([]);
  const [error, setError] = useState("");

  // Si no hay sesión (por ejemplo al recargar la página), no se muestra nada
  if (!usuario) {
    return null;
  }

  // Marca o desmarca una vibra (se pueden elegir varias)
  function alternarVibra(vibra) {
    if (misVibras.includes(vibra)) {
      setMisVibras(
        misVibras.filter(function (v) {
          return v !== vibra;
        })
      );
    } else {
      setMisVibras(misVibras.concat(vibra));
    }
  }

  function empezar() {
    if (nombre.trim() === "") {
      setError("Escribe tu nombre.");
      return;
    }
    if (misVibras.length === 0) {
      setError("Elige al menos una vibra.");
      return;
    }
    completarPerfil(nombre, convive, misVibras);
    // Quita el registro de la pila y entra a las pestañas,
    // así el botón "atrás" ya no vuelve al registro
    router.dismissAll();
    router.replace("/explorar");
  }

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Completa tu perfil" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido}>
        <CampoTexto etiqueta="Nombre" valor={nombre} alCambiar={setNombre} placeholder="Ana" />

        <View style={general.grupo}>
          <Text style={general.etiqueta}>¿Con quién vives?</Text>
          <View style={general.filaChips}>
            {convivencias.map(function (opcion) {
              return (
                <Chip
                  key={opcion}
                  texto={opcion}
                  seleccionado={convive === opcion}
                  alPresionar={function () {
                    setConvive(opcion);
                  }}
                />
              );
            })}
          </View>
        </View>

        <View style={general.grupo}>
          <Text style={general.etiqueta}>Tu vibra</Text>
          <View style={general.filaChips}>
            {vibras.map(function (vibra) {
              return (
                <Chip
                  key={vibra}
                  texto={vibra}
                  seleccionado={misVibras.includes(vibra)}
                  alPresionar={function () {
                    alternarVibra(vibra);
                  }}
                />
              );
            })}
          </View>
        </View>

        {error !== "" ? <Aviso texto={error} tipo="alerta" /> : null}
      </ScrollView>

      <View style={general.acciones}>
        <Boton texto="Empezar" alPresionar={empezar} />
      </View>
    </SafeAreaView>
  );
}

export default CompletarPerfil;
