/*
  AdminFormulario:
  - Permite crear y editar perros (POST / PUT)
  - Reutiliza el mismo formulario para ambas acciones
  - Detecta si un perro está en modo edición
  - Usa la API_URL recibida por props (Xano)
*/

import React, { useState, useEffect } from "react";

function AdminFormulario({ perros, setPerros, apiUrl, perroEditar, setPerroEditar }) {

  // Estado inicial del formulario
  const estadoInicial = {
    id: null,
    nombre: "",
    tamano: "",
    descripcion: "",
    imagen: "",
  };

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

    // ✅ Enviar SOLO los campos que Xano espera (sin id, sin editar)
    const payload = {
      nombre: form.nombre,
      tamano: form.tamano,
      descripcion: form.descripcion,
      imagen: form.imagen,
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
          const errText = await response.text(); // ✅ ver error real
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
          const errText = await response.text(); // ✅ ver error real
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

        <input
          type="text"
          name="tamano"
          placeholder="Tamaño"
          value={form.tamano}
          onChange={handleChange}
          required
        />

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


        {/* correo y contraseña eliminados (no se usan para crear perros) */}

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
