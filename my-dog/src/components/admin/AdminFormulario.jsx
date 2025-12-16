/*
  AdminFormulario:
  - Permite crear y editar perros (POST / PUT)
  - Reutiliza el mismo formulario para ambas acciones
  - Detecta si un perro está en modo edición
  - Usa la API_URL recibida por props 
*/

import React, { useState, useEffect } from "react";

// Estado inicial del formulario
  const estadoInicial = {
    id: null,
    nombre: "",
    tamano: "",
    descripcion: "",
    imagen: "",
  };

function AdminFormulario({ perros, setPerros, apiUrl, perroEditar, setPerroEditar }) {

  const [form, setForm] = useState(estadoInicial);
  
  /*
    Detecta si hay un perro marcado para edición
    (flag 'editar' seteada desde AdminLista)
  */
  useEffect(() => {
    if (perroEditar) {
      setForm(perroEditar);
    } else {
      setForm(estadoInicial);
    }
  }, [perroEditar]);

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Limpia el formulario
  const resetFormulario = () => {
    setForm(estadoInicial);
    setPerroEditar(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre:      form.nombre,
      tamano:      form.tamano,
      descripcion: form.descripcion,
      imagen:      form.imagen,
    };

    try {
      // EDITAR (PUT)
      if (form.id) {
        const response = await fetch(`${apiUrl}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errText = await response.text(); 
          console.error("PUT error:", response.status, errText);
          throw new Error("Error al actualizar");
        }

        const actualizado = await response.json();

        setPerros(perros.map((p) => (p.id === actualizado.id ? actualizado : p)));
        setPerroEditar(null);
      }
      // CREAR (POST)
      else {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errText = await response.text(); 
          console.error("POST error:", response.status, errText);
          throw new Error("Error al crear");
        }

        const creado = await response.json();
        setPerros([...perros, creado]);
      }

      resetFormulario();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar el perro");
    }
  };


  return (
    <div className="admin-formulario">

      <h3>
        {form.id ? "Editar perro" : "Agregar nuevo perro"}
      </h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <select
          name="tamano"
          value={form.tamano} // Aquí vendrá 'small' o 'large' desde la DB
          onChange={handleChange}
          required
          className="admin-input"
        >
          <option value=""> Selecciona tamaño </option>
      
          <option value="small">Pequeño</option>
          <option value="large">Grande</option>
        </select>

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={form.imagen}
          onChange={handleChange}
          required
        />

        {form.imagen && (
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <img
              src={form.imagen}
              alt="Vista Previa"
              style={{ maxHeight: '150px', borderRadius: '8px', border: '1px solid #ccc' }}
              onError={(e) => e.target.style.display = 'none'} // Si el link esta roto se oculta
              />
          </div>
        )}

        <button type="submit">
          {form.id ? "Actualizar" : "Crear"}
        </button>

        {form.id && (
          <button
            type="button"
            onClick={resetFormulario}
          >
            Cancelar edición
          </button>
        )}
      </form>
    </div>
  );
}

export default AdminFormulario;
