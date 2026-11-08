import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { Check, Plus } from "lucide-react-native";
import { useContext, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Aviso from "../../../assets/Components/Aviso";
import Boton from "../../../assets/Components/Boton";
import CampoTexto from "../../../assets/Components/CampoTexto";
import Chip from "../../../assets/Components/Chip";
import Encabezado from "../../../assets/Components/Encabezado";
import Paleta from "../../../assets/Components/Paleta";
import { AppContexto } from "../../../assets/Contexto/AppContexto";
import { vibras } from "../../../assets/Datos/opciones";
import { coloresDeFoto, paletaDeIdeas } from "../../../assets/Logica/paleta";
import { buscarMueble } from "../../../assets/Servicios/muebles";
import { general, nuevoMoodboard } from "../../../assets/Styles/Stylesheet";
import { colores } from "../../../assets/Styles/Tema";

// Mínimo de ideas para compartir el mood board con la casa (si son menos, queda como borrador)
const MINIMO_IDEAS = 4;

// Pantalla 13 del Figma: Nuevo mood board
function NuevoMoodboard() {
  const { mueble } = useLocalSearchParams(); // si se abrió desde el detalle de un mueble, ya viene elegido
  const { usuario, crearMoodboard } = useContext(AppContexto);
  const [nombre, setNombre] = useState("");
  const [elegidos, setElegidos] = useState(mueble ? [mueble] : []); // claves de las ideas elegidas
  const [fotos, setFotos] = useState([]); // fotos del carrete: { clave, foto, colores }
  const [misVibras, setMisVibras] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");

  if (!usuario) {
    return null;
  }

  // Todas las ideas que se pueden elegir: los muebles guardados y las fotos subidas.
  // La "clave" de un mueble es su id ("m1"); la de una foto empieza por "foto-".
  const opciones = usuario.guardados
    .map(function (idMueble) {
      const m = buscarMueble(idMueble);
      return { clave: m.id, fuente: m.imagen, idea: { id_mueble: m.id } };
    })
    .concat(
      fotos.map(function (f) {
        return { clave: f.clave, fuente: { uri: f.foto }, idea: { foto: f.foto, colores: f.colores } };
      })
    );

  const ideasElegidas = opciones
    .filter(function (opcion) {
      return elegidos.includes(opcion.clave);
    })
    .map(function (opcion) {
      return opcion.idea;
    });

  const paletaElegida = paletaDeIdeas(ideasElegidas);

  function alternarIdea(clave) {
    if (elegidos.includes(clave)) {
      setElegidos(
        elegidos.filter(function (c) {
          return c !== clave;
        })
      );
    } else {
      setElegidos(elegidos.concat(clave));
    }
  }

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

  // Abre el carrete para elegir fotos y les saca los colores principales
  async function subirFotos() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: 6,
      quality: 0.8,
    });
    if (resultado.canceled) {
      return;
    }
    setSubiendo(true);
    const nuevas = [];
    for (let i = 0; i < resultado.assets.length; i++) {
      const archivo = resultado.assets[i];
      let coloresFoto = [];
      try {
        coloresFoto = await coloresDeFoto(archivo.uri);
      } catch {
        coloresFoto = []; // si no se pudieron leer los colores, la foto igual se agrega
      }
      nuevas.push({ clave: "foto-" + Date.now() + "-" + i, foto: archivo.uri, colores: coloresFoto });
    }
    setFotos(function (antes) {
      return antes.concat(nuevas);
    });
    setElegidos(function (antes) {
      return antes.concat(
        nuevas.map(function (f) {
          return f.clave;
        })
      );
    });
    setSubiendo(false);
  }

  function guardar() {
    if (nombre.trim() === "") {
      setError("Ponle un nombre al mood board.");
      return;
    }
    if (ideasElegidas.length === 0) {
      setError("Elige al menos una idea o sube una foto.");
      return;
    }
    const compartido = ideasElegidas.length >= MINIMO_IDEAS;
    const id = crearMoodboard(nombre, ideasElegidas, misVibras, compartido);
    // replace: al volver desde el mood board nuevo se llega a la lista, no a este formulario
    router.replace("/moodboard/" + id + "?aviso=guardado");
  }

  const listo = ideasElegidas.length >= MINIMO_IDEAS;

  return (
    <SafeAreaView style={general.pantalla}>
      <Encabezado titulo="Nuevo moodboard" conVolver={true} />
      <ScrollView contentContainerStyle={general.contenido} keyboardShouldPersistTaps="handled">
        <CampoTexto etiqueta="Nombre" valor={nombre} alCambiar={setNombre} placeholder="Sala acogedora" />

        <View style={general.grupo}>
          <Text style={general.etiqueta}>Tus ideas guardadas (elige {MINIMO_IDEAS} o más)</Text>
          <View style={nuevoMoodboard.ideas}>
            {opciones.map(function (opcion) {
              const elegida = elegidos.includes(opcion.clave);
              return (
                <TouchableOpacity
                  key={opcion.clave}
                  onPress={function () {
                    alternarIdea(opcion.clave);
                  }}
                  activeOpacity={0.8}
                  accessibilityState={{ selected: elegida }}
                >
                  <Image
                    source={opcion.fuente}
                    style={elegida ? nuevoMoodboard.ideaElegida : nuevoMoodboard.idea}
                    resizeMode="cover"
                  />
                  {elegida ? (
                    <View style={nuevoMoodboard.marca}>
                      <Check color={colores.sobrePrincipal} size={14} strokeWidth={3} />
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}

            {/* Casilla punteada para subir fotos del carrete */}
            <TouchableOpacity style={nuevoMoodboard.subirFotos} onPress={subirFotos} disabled={subiendo}>
              {subiendo ? (
                <ActivityIndicator color={colores.principal} />
              ) : (
                <>
                  <Plus color={colores.principal} size={20} />
                  <Text style={nuevoMoodboard.textoSubir}>Fotos</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <Text style={listo ? nuevoMoodboard.contadorListo : general.textoPequeno}>
            {ideasElegidas.length} {ideasElegidas.length === 1 ? "idea seleccionada" : "ideas seleccionadas"} · mínimo{" "}
            {MINIMO_IDEAS}
            {listo ? "" : " (con menos se guarda como borrador)"}
          </Text>
        </View>

        <View style={general.grupo}>
          <Text style={general.etiqueta}>Paleta</Text>
          {paletaElegida.length > 0 ? (
            <Paleta colores={paletaElegida} />
          ) : (
            <Text style={general.textoPequeno}>La paleta aparece cuando eliges ideas.</Text>
          )}
        </View>

        <View style={general.grupo}>
          <Text style={general.etiqueta}>Vibra</Text>
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
        <Boton texto="Guardar moodboard" alPresionar={guardar} deshabilitado={subiendo} />
      </View>
    </SafeAreaView>
  );
}

export default NuevoMoodboard;
