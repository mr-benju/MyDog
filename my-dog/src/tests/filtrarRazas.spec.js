import { filtrarRazas } from "../utils/filtrarRazas.js";

describe("Función filtrarRazas", function () {
  const perros = [
    { raza: "Labrador", tamaño: "large" },
    { raza: "Chihuahua", tamaño: "small" },
    { raza: "Pastor Alemán", tamaño: "large" },
    { raza: "Poodle", tamaño: "small" },
  ];

  it("debe devolver todos los perros si el filtro es 'all' y la búsqueda está vacía", function () {
    const resultado = filtrarRazas(perros, "all", "");
    expect(resultado.length).toBe(4);
  });

  it("debe filtrar por tamaño 'small'", function () {
    const resultado = filtrarRazas(perros, "small", "");
    expect(resultado).toEqual([
      { raza: "Chihuahua", tamaño: "small" },
      { raza: "Poodle", tamaño: "small" },
    ]);
  });

  it("debe buscar por raza 'Labrador'", function () {
    const resultado = filtrarRazas(perros, "all", "Labrador");
    expect(resultado).toEqual([{ raza: "Labrador", tamaño: "large" }]);
  });

  it("debe combinar filtro y búsqueda (por ejemplo 'small' + 'poodle')", function () {
    const resultado = filtrarRazas(perros, "small", "poodle");
    expect(resultado).toEqual([{ raza: "Poodle", tamaño: "small" }]);
  });
});
