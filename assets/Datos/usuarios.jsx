// Los 3 roommates de prueba. Todos usan la contraseña "1234".
// En una base de datos sería la tabla "usuarios".
// colorAvatar es el nombre de un color de Tema.jsx (el círculo con las iniciales).
const usuarios = [
  {
    id: "u1",
    nombre: "Ana Gómez",
    correo: "ana@email.com",
    contrasena: "1234",
    iniciales: "AG",
    colorAvatar: "principalSuave",
    convive: "Roomies",
    vibras: ["Cálido", "Natural"],
    id_casa: "c1",
    guardados: ["m1", "m20", "m12", "m17", "m7", "m19"],
    notificaciones: { activas: true, nuevas: true, resultados: true },
  },
  {
    id: "u2",
    nombre: "Mateo Ruiz",
    correo: "mateo@email.com",
    contrasena: "1234",
    iniciales: "MR",
    colorAvatar: "verdeSuave",
    convive: "Roomies",
    vibras: ["Minimalista"],
    id_casa: "c1",
    guardados: ["m18", "m10", "m6", "m16"],
    notificaciones: { activas: true, nuevas: true, resultados: false },
  },
  {
    id: "u3",
    nombre: "Valentina Díaz",
    correo: "valentina@email.com",
    contrasena: "1234",
    iniciales: "VD",
    colorAvatar: "amarilloSuave",
    convive: "Roomies",
    vibras: ["Natural", "Colorido"],
    id_casa: "c1",
    guardados: ["m21", "m9", "m15", "m5", "m11"],
    notificaciones: { activas: false, nuevas: false, resultados: false },
  },
];

export default usuarios;
