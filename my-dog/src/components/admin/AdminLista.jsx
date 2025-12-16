/*
  AdminLista:
  - Muestra la lista de perros obtenidos desde Xano
  - Permite eliminar un perro (DELETE)
  - No carga datos por sí mismo (los recibe desde App.js)
  - Usa la API_URL que viene por props
*/

import React from "react";

function AdminLista({ perros, setPerros, apiUrl, onEditar }) {

  // Elimina un perro por ID
  const eliminarPerro = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este perro?"
    );

    if (!confirmar) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el perro");
      }

      // Actualiza el estado local sin volver a consultar la API
      setPerros(perros.filter((perro) => perro.id !== id));
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el perro");
    }
  };

  return (
      <div className="admin-lista">
        <h3>Lista de perros</h3>
        {perros.length === 0 ? (
          <p>No hay perros registrados.</p>
        ) : (
          <ul>
            {perros.map((perro) => (
              <li key={perro.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  {perro.imagen && (
                    <img
                      src={perro.imagen}
                      alt={perro.nombre}
                      style={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '10px', border: '1px solid #ffe0b2', background: '#fff', display: 'block' }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <strong>{perro.nombre}</strong> – tamaño: {perro.tamano}
                  </div>
                </div>
                <div className="acciones-admin">
                  <button
                    onClick={() => onEditar(perro)}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarPerro(perro.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
  );
}

export default AdminLista;
