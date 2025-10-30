import React from 'react';

// Exportamos el componente 'Filtro'
// (Fíjate que el placeholder es 'Buscar raza...')

export function Filtro() {
  return (
    <input 
      type="text"
      placeholder="Buscar raza..." 
    />
  );
}

// NOTA: Si usas 'export default function Filtro() { ... }'
// la importación en el test será un poco diferente.