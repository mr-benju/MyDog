/* formulario captura datos de usuario valida y muestra confirmacion */
import React, { useState, useRef, useEffect } from "react";
import "../styles/formulario.css";
import { validarCorreo } from "../utils/validarCorreo"; // prueba unitaria

export default function Formulario() {
  // Estados para los campos
  const [email, setEmail] = useState("");
  const [comentario, setComentario] = useState("");
  
  // Estados de opciones
  const [checkInfo, setCheckInfo] = useState(false);
  const [checkOfertas, setCheckOfertas] = useState(false);
  const [checkEventos, setCheckEventos] = useState(false);
  const [calificacion, setCalificacion] = useState("");

  // Estados de control visual
  const [error, setError] = useState(""); 
  const [modalOpen, setModalOpen] = useState(false);

  const confirmBtnRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (!email || !validarCorreo(email)) {
      setError("Por favor escribe un correo válido para continuar.");
      return; 
    }

    // Si pasa, abre el modal
    setError(""); // Borramos errores viejos
    setModalOpen(true); 
  };

  // Al cerrar el modal
  const handleConfirm = () => {
    setModalOpen(false);
    
    // Resetea el formulario
    setEmail("");
    setComentario("");
    setCheckInfo(false);
    setCheckOfertas(false);
    setCheckEventos(false);
    setCalificacion("");
  };

  // Efecto para enfocar el botón del modal cuando se abre 
  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => confirmBtnRef.current && confirmBtnRef.current.focus(), 150);
    }
  }, [modalOpen]);

  return (
    <>
      <form className="margen" onSubmit={handleSubmit}>
        <h2>¡Queremos conocerte!<br /><span className="sp1">Completa este formulario 🐶✨</span></h2>

        {/* EMAIL */}
        <div className="email">
          <label>Correo electrónico:</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => {
                setEmail(e.target.value);
                setError(""); // Quita el error en cuanto el usuario escribe
            }} 
            required 
            style={{ border: error ? "2px solid red" : "" }}
          />
          {error && <small style={{ color: "red", display: "block", marginTop: "5px" }}>{error}</small>}
        </div>

        {/* CHECKBOXES */}
        <div className="checkbox">
          <label><input type="checkbox" checked={checkInfo} onChange={e => setCheckInfo(e.target.checked)} /> Quiero recibir información de nuevas razas</label>
          <label><input type="checkbox" checked={checkOfertas} onChange={e => setCheckOfertas(e.target.checked)} /> Quiero recibir ofertas y novedades</label>
          <label><input type="checkbox" checked={checkEventos} onChange={e => setCheckEventos(e.target.checked)} /> Quiero recibir información de eventos</label>
        </div>

        {/* RADIOS */}
        <div className="radio">
          <label>¿Cómo calificarías la página?</label><br />
          {['excelente', 'buena', 'regular', 'mala'].map(val => (
            <label key={val} style={{ marginRight: "10px", cursor: "pointer" }}>
                <input 
                    type="radio" 
                    name="calificacion" 
                    value={val} 
                    checked={calificacion === val} 
                    onChange={e => setCalificacion(e.target.value)} 
                /> 
                {val.charAt(0).toUpperCase() + val.slice(1)}
            </label>
          ))}
        </div>

        {/* COMENTARIOS */}
        <div className="comentario">
          <label>Comentarios:</label>
          <textarea 
            rows={3} 
            placeholder="Escribe aquí tus comentarios..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-orange">Enviar</button>
      </form>

      {/* MODAL DE ÉXITO */}
      {modalOpen && (
        <div className={`form-modal-fondo ${modalOpen ? 'open' : ''}`} onClick={handleConfirm}>
          <div className="form-modal-caja" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3>¡Formulario Enviado!</h3>
            <p>Gracias por tus comentarios</p>
            <div className="form-modal-actions">
              <button ref={confirmBtnRef} className="btn btn-orange" onClick={handleConfirm}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
