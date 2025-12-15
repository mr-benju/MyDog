/*
  AdminLista:
  - Muestra la lista de perros obtenidos desde Xano
  - Permite eliminar un perro (DELETE)
  - No carga datos por sí mismo (los recibe desde App.js)
  - Usa la API_URL que viene por props
*/

import React from "react";

function AdminLista({ perros, setPerros, apiUrl }) {

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

              <strong>{perro.nombre}</strong>
              {" "}– tamaño: {perro.tamano}

              <div className="acciones-admin">

                {/* 
                  Botón Editar:
                  - No edita aquí directamente
                  - Solo prepara el perro para el formulario
                  (lo conectaremos en AdminFormulario)
                */}
                <button
                  onClick={() => setPerros((prev) =>
                    prev.map(p =>
                      p.id === perro.id
                        ? { ...p, editar: true }
                        : p
                    )
                  )}
                >
                  Editar
                </button>

                {/* Botón Eliminar */}
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
