import React, { useEffect, useRef, useState } from "react";
import "../styles/modal.css"; // use existing modal styles

export default function ModalPerro({ perro, setPerroSeleccionado }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // small delay to allow CSS transition
    const id = setTimeout(() => setOpen(true), 10);
    // focus the close button for accessibility
    const prevActive = document.activeElement;
    setTimeout(() => closeButtonRef.current && closeButtonRef.current.focus(), 220);

    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      prevActive && prevActive.focus && prevActive.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    // play closing animation then remove modal
    setOpen(false);
    setTimeout(() => setPerroSeleccionado(null), 240);
  }

  // trap focus inside modal
  const handleTab = (e) => {
    if (e.key !== "Tab") return;
    const focusable = modalRef.current.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className={`modal-fondo ${open ? "open" : ""}`} onClick={handleClose}>
      <div
        className="modal-caja"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        onKeyDown={handleTab}
        role="dialog"
        aria-modal="true"
        aria-label={perro.nombre}
      >
        <button className="cerrar" onClick={handleClose} ref={closeButtonRef} aria-label="Cerrar">✖</button>
        <h3>{perro.nombre}</h3>
        <img src={perro.imagen} alt={perro.nombre} width="200" />
        <p>{perro.descripcion}</p>
      </div>
    </div>
  );
}
