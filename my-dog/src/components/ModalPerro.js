/* modal perro muestra informacion detallada de un perro imagen titulo descripcion y boton cerrar */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/modal.css";

export default function ModalPerro({ perros = []}) {
  const { id } = useParams(); // ID real del perro
  const navigate = useNavigate();

  const perroEncontrado = perros.find((p) => p.id == id)

  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const idTimeout = setTimeout(() => setOpen(true), 10);
    const onKey = (e) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(idTimeout);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate(-1), 100);
  };

  if (!perroEncontrado) return null;

  return (
    <div className={`modal-fondo ${open ? "open" : ""}`} onClick={handleClose}>
      <div
        className="modal-caja"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={perroEncontrado.nombre}
      >
        <button 
          className="cerrar" 
          onClick={handleClose} 
          ref={closeButtonRef} 
          aria-label="Cerrar"
        >
          ✖
        </button>
        
        <img src={perroEncontrado.imagen} alt={perroEncontrado.nombre} />

        <div className="modal-content">
          <h3>{perroEncontrado.nombre}</h3>
          <p>{perroEncontrado.descripcion}</p>
        </div>
      </div>
    </div>
  );
}
