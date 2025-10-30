/* formulario captura datos de usuario valida y muestra confirmacion */
import React, { useState, useRef, useEffect } from "react";
import "../styles/formulario.css";
import { validarCorreo } from "../utils/validarCorreo";

export default function Formulario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkInfo, setCheckInfo] = useState(false);
  const [checkOfertas, setCheckOfertas] = useState(false);
  const [checkEventos, setCheckEventos] = useState(false);
  const [calificacion, setCalificacion] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const confirmBtnRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    // open modal instead of alert
    setModalOpen(true);
        // ahora se usa la función que probamos en Jasmine
    if (!validarCorreo(email)) {
      setError("Correo electrónico inválido");
      return;
    }

  };

  function handleConfirm() {
    setModalOpen(false);
    // clear form
    setEmail("");
    setPassword("");
    setCheckInfo(false);
    setCheckOfertas(false);
    setCheckEventos(false);
    setCalificacion("");
    // focus back to email field
    const emailField = document.querySelector('.margen input[type="email"]');
    emailField && emailField.focus();
  }

  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => confirmBtnRef.current && confirmBtnRef.current.focus(), 150);
    }
  }, [modalOpen]);

  return (
    <>
      <form className="margen" onSubmit={handleSubmit}>
        <h2>¡Queremos conocerte!<br /><span className="sp1">Completa este formulario 🐶✨</span></h2>
        <div className="email">
          <label>Correo electrónico:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="password">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <div className="checkbox">
          <label><input type="checkbox" checked={checkInfo} onChange={e => setCheckInfo(e.target.checked)} /> Quiero recibir información de nuevas razas</label>
          <label><input type="checkbox" checked={checkOfertas} onChange={e => setCheckOfertas(e.target.checked)} /> Quiero recibir ofertas y novedades</label>
          <label><input type="checkbox" checked={checkEventos} onChange={e => setCheckEventos(e.target.checked)} /> Quiero recibir información de eventos</label>
        </div>

        <div className="radio">
          <label>¿Cómo calificarías la página?</label><br />
          {['excelente', 'buena', 'regular', 'mala'].map(val => (
            <label key={val}><input type="radio" name="calificacion" value={val} checked={calificacion===val} onChange={e=>setCalificacion(e.target.value)} /> {val.charAt(0).toUpperCase()+val.slice(1)}</label>
          ))}
        </div>

        <div className="comentario">
          <label>Comentarios:</label>
          <textarea rows={3} placeholder="Escribe aquí tus comentarios..."></textarea>
        </div>

        <button type="submit" className="btn btn-orange">Enviar</button>
      </form>

      {modalOpen && (
        <div className={`form-modal-fondo ${modalOpen ? 'open' : ''}`} onClick={() => setModalOpen(false)}>
          <div className="form-modal-caja" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3>¡Cuenta registrada!</h3>
            <p>Por favor verifica tu email para activar tu cuenta.</p>
            <div className="form-modal-actions">
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
              <button ref={confirmBtnRef} className="btn btn-orange" onClick={handleConfirm}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
