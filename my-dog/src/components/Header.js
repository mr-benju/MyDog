/* 
  Header:
  - Muestra el título principal y el subtítulo decorativo 
  - Botón para activar el Modo Administrador
*/

import React from "react";

function Header({ onAdmin }) {
  return (
    <div className="titulo-fondo">

      {/* Título principal */}
      MY DOG 🐾

      {/* Subtítulo decorativo */}
      <div className="subtitulo-fondo">
        Tu galería de razas caninas
      </div>
    </div>
  );
}

export default Header;
