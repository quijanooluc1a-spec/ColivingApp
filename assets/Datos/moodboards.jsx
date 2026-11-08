// Los mood boards de prueba. En una base de datos sería la tabla "moodboards".
// - ideas: cada idea es un mueble del catálogo ({ id_mueble }) o una foto del carrete ({ foto, colores }).
// - compartido: false es un borrador que solo ve su dueño.
const moodboards = [
  {
    id: "mb1",
    nombre: "Sala acogedora",
    id_dueno: "u1",
    ideas: [
      { id: "i1", id_mueble: "m1" },
      { id: "i2", id_mueble: "m20" },
      { id: "i3", id_mueble: "m12" },
      { id: "i4", id_mueble: "m17" },
    ],
    vibras: ["Cálido", "Natural"],
    descripcion: "Tonos tierra, plantas y madera clara para una sala acogedora.",
    compartido: true,
  },
  {
    id: "mb2",
    nombre: "Mi cuarto",
    id_dueno: "u1",
    ideas: [
      { id: "i5", id_mueble: "m19" },
      { id: "i6", id_mueble: "m3" },
      { id: "i7", id_mueble: "m7" },
    ],
    vibras: ["Natural"],
    descripcion: "",
    compartido: false,
  },
  {
    id: "mb3",
    nombre: "Sala minimalista",
    id_dueno: "u2",
    ideas: [
      { id: "i8", id_mueble: "m18" },
      { id: "i9", id_mueble: "m17" },
      { id: "i10", id_mueble: "m10" },
      { id: "i11", id_mueble: "m6" },
    ],
    vibras: ["Minimalista"],
    descripcion: "Blanco, madera clara y pocas cosas a la vista.",
    compartido: true,
  },
  {
    id: "mb4",
    nombre: "Rincón verde",
    id_dueno: "u3",
    ideas: [
      { id: "i12", id_mueble: "m20" },
      { id: "i13", id_mueble: "m21" },
      { id: "i14", id_mueble: "m11" },
      { id: "i15", id_mueble: "m5" },
      { id: "i16", id_mueble: "m17" },
    ],
    vibras: ["Natural", "Colorido"],
    descripcion: "Plantas, colores alegres y luz cálida.",
    compartido: true,
  },
  {
    id: "mb5",
    nombre: "Comedor industrial",
    id_dueno: "u2",
    ideas: [
      { id: "i17", id_mueble: "m10" },
      { id: "i18", id_mueble: "m14" },
      { id: "i19", id_mueble: "m12" },
      { id: "i20", id_mueble: "m8" },
    ],
    vibras: ["Industrial"],
    descripcion: "Metal negro, vidrio ámbar y madera oscura.",
    compartido: true,
  },
];

export default moodboards;
