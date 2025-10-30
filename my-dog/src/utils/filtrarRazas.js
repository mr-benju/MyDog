/**
 * Filtra una lista de perros por tamaño y por texto de búsqueda.
 * @param {Array} perros - Lista de perros con { raza, tamaño }.
 * @param {string} filtro - "small", "large" o "all".
 * @param {string} busqueda - Texto para buscar por raza.
 * @returns {Array} - Lista filtrada.
 */
export function filtrarRazas(perros, filtro, busqueda) {
  return perros.filter(perro => {
    const coincideTamaño =
      filtro === "all" || perro.tamaño.toLowerCase() === filtro.toLowerCase();
    const coincideRaza = perro.raza
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideTamaño && coincideRaza;
  });
}
