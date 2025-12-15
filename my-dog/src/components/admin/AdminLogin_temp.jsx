/*
  AdminLogin:
  - Formulario de acceso al Modo Administrador (simulado)
  - Usa una contraseña fija para fines académicos
  - NO utiliza tokens ni autenticación real
  - Solo controla acceso mediante estado en React
*/

import React, { useState } from "react";

function AdminLogin({ onSuccess, onCancel }) {

  // Estado para la contraseña ingresada
  const [password, setPassword] = useState("");

  // Estado para mostrar error si la contraseña es incorrecta
  const [error, setError] = useState("");

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple (modo desarrollador simulado)
    if (password === "1234") {
      setError("");
      onSuccess(); // Notifica a App que el acceso fue autorizado
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="admin-login">

      <h2>Panel de Administración</h2>
      <p>
        Acceso restringido – Modo desarrollador (simulado)
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Ingresar
        </button>

        {/* Botón para volver a la vista normal */}
        <button
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>

      </form>

      {/* Mensaje de error */}
      {error && <p className="error">{error}</p>}

    </div>
  );
}

export default AdminLogin;
