/* 
  Header:
  - Muestra el título principal y el subtítulo decorativo (existente)
  - NUEVO: incluye botón para activar el Modo Administrador
*/

import React from "react";

function Header({ onAdmin }) {
  return (
    <div className="titulo-fondo">

      {/* Título principal (EXISTENTE) */}
      MY DOG 🐾

      {/* Subtítulo decorativo (EXISTENTE) */}
      <div className="subtitulo-fondo">
        Tu galería de razas caninas
      </div>

      {/* 
        NUEVO:
        Botón para cambiar a Modo Administrador.
        No valida contraseña ni accede a la API.
        Solo notifica al componente App que el usuario
        quiere ingresar al modo desarrollador.
      */}
      <button
        className="btn-admin"
        onClick={onAdmin}
      >
        Modo Administrador
      </button>

    </div>
  );
}

export default Header;
