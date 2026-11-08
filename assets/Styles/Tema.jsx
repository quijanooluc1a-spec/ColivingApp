// Valores sacados del Figma (página "Mockups").
// Si el diseño cambia, se cambia aquí y toda la app se actualiza.

// Colores: son las 12 variables de color del Figma (el nombre en el Figma va al lado)
const colores = {
  fondo: "#FAF5EE", // color/background: fondo crema de todas las pantallas
  superficie: "#FFFFFF", // color/surface: tarjetas, cajas de texto y barra inferior
  borde: "#E8DED2", // color/border: bordes, divisores y fondo de las barras de votos
  texto: "#2B2420", // color/text: texto principal (café oscuro)
  textoSuave: "#8A817A", // color/text-muted: etiquetas, subtítulos y precios
  principal: "#D9653B", // color/primary: terracota de botones, chips y pestaña activa
  sobrePrincipal: "#FFFFFF", // color/on-primary: texto encima del terracota
  principalSuave: "#F6DDD0", // color/primary-soft: rosado del avatar 1 y la sugerencia elegida
  verdeSuave: "#DDE7DD", // color/secondary-soft: verde del avatar 2, la vibra y el aviso de ganador
  amarilloSuave: "#FCEBC6", // color/accent-soft: amarillo del avatar 3 y el aviso "Ganó el No"
  meGusta: "#3E8E5A", // color/like: verde del botón "Me gusta", las barras positivas y el interruptor
  noMeGusta: "#C8453B", // color/dislike: rojo del botón "No me gusta" y las barras negativas
};

// Nombres de las letras. Se cargan en src/app/_layout.jsx
const fuentes = {
  poppinsBold: "Poppins_700Bold",
  poppinsSemiBold: "Poppins_600SemiBold",
  interRegular: "Inter_400Regular",
  interSemiBold: "Inter_600SemiBold",
};

// Estilos de texto del Figma: letra, tamaño y alto de cada línea
const letras = {
  tituloGrande: { fontFamily: fuentes.poppinsBold, fontSize: 28, lineHeight: 36 },
  titulo: { fontFamily: fuentes.poppinsBold, fontSize: 22, lineHeight: 28 },
  subtitulo: { fontFamily: fuentes.poppinsSemiBold, fontSize: 16, lineHeight: 24 },
  texto: { fontFamily: fuentes.interRegular, fontSize: 16, lineHeight: 24 },
  textoFuerte: { fontFamily: fuentes.interSemiBold, fontSize: 16, lineHeight: 24 },
  etiqueta: { fontFamily: fuentes.interSemiBold, fontSize: 14, lineHeight: 20 },
  textoPequeno: { fontFamily: fuentes.interRegular, fontSize: 12, lineHeight: 16 },
};

// Bordes redondeados
const bordes = {
  minimo: 8, // botones de voto e íconos del perfil
  pequeno: 12, // fotos pequeñas
  normal: 16, // tarjetas, cajas y botones
  grande: 24, // foto del detalle y logo
  redondo: 999, // chips y círculos
};

// Espacios: márgenes y separaciones
const espacios = {
  minimo: 4,
  pequeno: 8,
  medio: 12,
  normal: 16, // margen a los lados de cada pantalla
  grande: 24, // margen a los lados en el inicio de sesión
};

// Otras medidas
const medidas = {
  anchoMaximo: 480, // en el computador la app no se estira más que esto (ancho de un teléfono grande)
};

export { bordes, colores, espacios, fuentes, letras, medidas };
