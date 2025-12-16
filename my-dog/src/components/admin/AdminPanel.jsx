/*
  AdminPanel:
  - Vista principal del Modo Administrador
  - Controla el estado de edición (perroEditar)
  - Orquesta CRUD sin mutar los datos de la API
*/

import React, { useState } from "react";
import AdminLista from "./AdminLista";
import AdminFormulario from "./AdminFormulario";

function AdminPanel({
  perros,
  setPerros,
  apiUrl,
  onSalir,
}) {
  // Estado separado para el perro en edición
  const [perroEditar, setPerroEditar] = useState(null);

  // Al editar la pagina sube hacia el formulario
  const handleEditar = (perro) => {
    setPerroEditar(perro);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="admin-panel">

      {/* Título del panel */}
      <h2>Panel de Administración</h2>
      <p>Modo desarrollador (simulado)</p>

      {/* Botón para salir del modo administrador */}
      <button onClick={onSalir}>
        Salir del modo administrador
      </button>

      <hr />

      {/* Formulario para crear / editar perros */}
      <AdminFormulario
        perros={perros}
        setPerros={setPerros}
        apiUrl={apiUrl}
        perroEditar={perroEditar}
        setPerroEditar={setPerroEditar}
      />

      <hr />

      {/* Lista de perros con opciones editar / eliminar */}
      <AdminLista
        perros={perros}
        setPerros={setPerros}
        apiUrl={apiUrl}
        onEditar={handleEditar}
      />
    </div>
  );
}

export default AdminPanel;
