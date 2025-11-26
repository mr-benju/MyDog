/* galeria muestra lista de perros en un grid abre modal o ruta al seleccionar */
import { Link, useLocation } from "react-router-dom";

export default function Galeria({ perros }) {
  const location = useLocation();

  function toSlug(nombre) {
    return nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  return (
    <div className="galeria">
      {perros.map((perro, index) => (
        <figure key={index} data-size={perro.tamano}>
          <Link
            to={`/perro/${perro.id}`} 
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
// La app js hace el fetch porque así solo se hace una vez y puedo 
// pasar los datos filtrados a galeria como propiedades