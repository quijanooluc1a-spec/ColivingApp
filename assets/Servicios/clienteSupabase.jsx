import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";

// La conexión con Supabase. Se crea una sola vez, la primera vez que se necesita.
// La dirección y la clave salen del archivo .env.local (ver GUIA-SUPABASE.md, paso 7).
let cliente = null;

function obtenerCliente() {
  if (cliente === null) {
    cliente = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY, {
      auth: {
        storage: AsyncStorage, // guarda la sesión en el teléfono: al volver a abrir la app sigue la sesión
        autoRefreshToken: true, // renueva la sesión antes de que venza
        persistSession: true,
        detectSessionInUrl: false, // la app no inicia sesión con enlaces
      },
    });

    // En el teléfono, la sesión se renueva sola solo mientras la app está abierta
    if (Platform.OS !== "web") {
      AppState.addEventListener("change", function (estado) {
        if (estado === "active") {
          cliente.auth.startAutoRefresh();
        } else {
          cliente.auth.stopAutoRefresh();
        }
      });
    }
  }
  return cliente;
}

export default obtenerCliente;
