import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import perrosData from "../data/perrosData";
import "../styles/modal.css"; // use existing modal styles

export default function ModalPerro() {
  function toSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  }
  
  const { id: nombreURL } = useParams();
  const perro = perrosData.find((p) => toSlug(p.nombre) === nombreURL);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 10);
    const onKey = (e) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate(-1), 240);
  }

  if (!perro) return null;

  return (
    <div className={`modal-fondo ${open ? "open" : ""}`} onClick={handleClose}>
      <div
        className="modal-caja"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={perro.nombre}
      >
        <button 
          className="cerrar" 
          onClick={handleClose} 
          ref={closeButtonRef} 
          aria-label="Cerrar"
        >
          ✖
        </button>
        <h3>{perro.nombre}</h3>
        <img src={perro.imagen} alt={perro.nombre} width="200" />
        <p>{perro.descripcion}</p>
      </div>
    </div>
  );
}
