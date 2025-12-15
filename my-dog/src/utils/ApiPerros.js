/*
  apiPerros:
  - Centraliza las llamadas a la API de Xano
  - No define la URL fija (se recibe como parámetro)
  - Evita duplicación de fetch en los componentes
*/

export const getPerros = async (apiUrl) => {
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("Error al obtener perros");
  return res.json();
};

export const crearPerro = async (apiUrl, data) => {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear perro");
  return res.json();
};

export const actualizarPerro = async (apiUrl, id, data) => {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar perro");
  return res.json();
};

export const eliminarPerro = async (apiUrl, id) => {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar perro");
};
