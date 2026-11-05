// Valores sacados del Figma (página "Mockups").
// Si el diseño cambia, se cambia aquí y toda la app se actualiza.

// Colores
const colores = {
  fondo: "#FAF5EE", // fondo de todas las pantallas
  superficie: "#FFFFFF", // tarjetas, cajas de texto y barra inferior
  borde: "#E8DED2", // bordes y divisores
  texto: "#2B2420", // texto principal
  textoSuave: "#8A817A", // etiquetas, subtítulos y precios
  principal: "#D9653B", // botones, chip activo y pestaña activa
  sobrePrincipal: "#FFFFFF", // texto encima del color principal
  principalSuave: "#F6DDD0", // avatares y sugerencia elegida
  verdeSuave: "#DDE7DD", // aviso de ganador
  amarilloSuave: "#FCEBC6", // aviso "Ganó el No"
  meGusta: "#3E8E5A", // botón "Me gusta" y barras positivas
  noMeGusta: "#C8453B", // botón "No me gusta" y barras negativas
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

export { bordes, colores, espacios, fuentes, letras };
