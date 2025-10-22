import React from "react";

export default function Galeria({ perros, setPerroSeleccionado }) {
  return (
    <div className="galeria">
      {perros.map((perro, index) => (
        <figure key={index} data-size={perro.tamano} onClick={() => setPerroSeleccionado(perro)}>
          <img
            src={perro.imagen}
            alt={perro.nombre}
            width="200"
            height="200"
          />
          <figcaption>{perro.nombre}</figcaption>
        </figure>
      ))}
    </div>
  );
}
