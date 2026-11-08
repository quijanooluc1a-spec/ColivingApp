import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { obtenerCategorias, obtenerMuebles, TAMANO_PAGINA } from "../Servicios/muebles";
import { catalogo, general } from "../Styles/Stylesheet";
import { colores } from "../Styles/Tema";
import Aviso from "./Aviso";
import Boton from "./Boton";
import Chip from "./Chip";
import EstadoVacio from "./EstadoVacio";
import GrillaMuebles from "./GrillaMuebles";

// El catálogo de muebles de Explorar y de Agregar idea:
// chips de categorías + grilla de dos columnas que carga más muebles sola al bajar.
// Props: busqueda (texto del buscador), alPresionarMueble (función que recibe el mueble),
//        mostrarMas, alAgregar, agregados (igual que en GrillaMuebles)
function Catalogo({ busqueda, alPresionarMueble, mostrarMas, alAgregar, agregados }) {
  const [categoria, setCategoria] = useState("Todo");
  const [muebles, setMuebles] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [hayMas, setHayMas] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const chips = ["Todo"].concat(obtenerCategorias());

  // Cada vez que cambia la categoría o lo que se busca, se pide la primera página.
  // Se espera un momento para no buscar con cada letra que se escribe.
  useEffect(
    function () {
      let cancelado = false;

      async function cargarPrimeraPagina() {
        setCargando(true);
        setError(false);
        try {
          const lista = await obtenerMuebles(0, categoria, busqueda);
          if (!cancelado) {
            setMuebles(lista);
            setPagina(0);
            setHayMas(lista.length === TAMANO_PAGINA);
          }
        } catch {
          if (!cancelado) {
            setError(true);
          }
        }
        if (!cancelado) {
          setCargando(false);
        }
      }

      const espera = setTimeout(cargarPrimeraPagina, 300);
      return function () {
        cancelado = true;
        clearTimeout(espera);
      };
    },
    [categoria, busqueda]
  );

  // Pide la página siguiente y la pone al final de la lista
  async function cargarMas() {
    if (cargando || !hayMas) {
      return;
    }
    setCargando(true);
    setError(false);
    try {
      const lista = await obtenerMuebles(pagina + 1, categoria, busqueda);
      setMuebles(muebles.concat(lista));
      setPagina(pagina + 1);
      setHayMas(lista.length === TAMANO_PAGINA);
    } catch {
      setError(true);
    }
    setCargando(false);
  }

  // Cuando falta poco para llegar al final de la lista, se cargan más muebles
  function alDesplazar(evento) {
    const { layoutMeasurement, contentOffset, contentSize } = evento.nativeEvent;
    const faltaParaElFinal = contentSize.height - (layoutMeasurement.height + contentOffset.y);
    if (faltaParaElFinal < 300) {
      cargarMas();
    }
  }

  const sinResultados = !cargando && !error && muebles.length === 0;

  return (
    <ScrollView onScroll={alDesplazar} scrollEventThrottle={200} contentContainerStyle={catalogo.contenido}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={catalogo.chips}>
        {chips.map(function (texto) {
          return (
            <Chip
              key={texto}
              texto={texto}
              seleccionado={categoria === texto}
              alPresionar={function () {
                setCategoria(texto);
              }}
            />
          );
        })}
      </ScrollView>

      <View style={catalogo.grilla}>
        <GrillaMuebles
          muebles={muebles}
          alPresionarMueble={alPresionarMueble}
          mostrarMas={mostrarMas}
          alAgregar={alAgregar}
          agregados={agregados}
        />

        {sinResultados ? (
          <EstadoVacio titulo="No encontramos muebles" mensaje="Prueba con otra palabra o con otra categoría." />
        ) : null}

        {cargando ? <ActivityIndicator color={colores.principal} size="large" style={general.cargando} /> : null}

        {/* El botón solo aparece si falló la carga; normalmente los muebles llegan solos al bajar */}
        {error ? (
          <View style={catalogo.error}>
            <Aviso texto="No pudimos cargar más muebles. Revisa tu conexión." tipo="alerta" />
            <Boton texto="Cargar más ideas" tipo="secundario" alPresionar={cargarMas} />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

export default Catalogo;
