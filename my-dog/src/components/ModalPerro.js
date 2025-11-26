/* modal perro muestra informacion detallada de un perro imagen titulo descripcion y boton cerrar */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/modal.css";

export default function ModalPerro() {
  const { id } = useParams(); // ID real del perro
  const navigate = useNavigate();

  const [perro, setPerro] = useState(null);
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ZaBRNqOQ/perro";

  useEffect(() => {
    async function cargarPerro() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener el perro");
        
        const data = await response.json();
        setPerro(data);
      } catch (error) {
        console.error("Error cargando perro:", error);
      }
    }
    cargarPerro();
  }, [id]);

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
    setTimeout(() => navigate(-1), 240);
  };

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
        
        <img src={perro.imagen} alt={perro.nombre} />

        <div className="modal-content">
          <h3>{perro.nombre}</h3>
          <p>{perro.descripcion}</p>
        </div>
      </div>
    </div>
  );
}
