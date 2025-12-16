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
        title="Modo Administrador"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(90deg, #ff914d, #f9d976)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '0.5rem 1.1rem',
          fontSize: '1rem',
          fontFamily: 'inherit',
          fontWeight: 600,
          boxShadow: '0 2px 8px 0 #ff914d33',
          cursor: 'pointer',
          margin: '1.2rem auto 0',
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ff6f61, #f9d976)'}
        onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ff914d, #f9d976)'}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="7" r="4" stroke="#fff" strokeWidth="2" fill="#ff914d"/>
          <rect x="5" y="15" width="14" height="6" rx="3" stroke="#fff" strokeWidth="2" fill="#ff914d"/>
          <path d="M12 11v2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{fontWeight: 600}}>Admin</span>
      </button>

    </div>
  );
}

export default Header;
