/* galeria muestra lista de perros en un grid abre modal o ruta al seleccionar */
import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Galeria({ perros }) {
  const location = useLocation();

  function toSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD") // elimina acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // reemplaza espacios por guiones
    .replace(/[^a-z0-9-]/g, ""); // elimina caracteres raros
}

  
  return (
    <div className="galeria">
      {perros.map((perro, index) => (
        <figure key={index} data-size={perro.tamano}>
          <Link
            to={`/perro/${toSlug(perro.nombre)}`}
            state={{ backgroundLocation: location }}
          >
            <img
              src={perro.imagen}
              alt={perro.nombre}
              width="200"
              height="200"
            />
            <figcaption>{perro.nombre}</figcaption>
          </Link>  
        </figure>
      ))}
    </div>
  );
}
