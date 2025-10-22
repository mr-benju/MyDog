import React from "react";

function Filtros({ setFiltro, setBusqueda }) {
  const manejarFiltro = (e) => setFiltro(e.target.value);
  const manejarBusqueda = (e) => setBusqueda(e.target.value);

  return (
    <div className="filters" role="toolbar">
      <div className="opc-filtro">
        <select onChange={manejarFiltro} className="filter-select">
          <option value="all">Todas</option>
          <option value="small">Pequeñas</option>
          <option value="large">Grandes</option>
        </select>
        <input
          type="text"
          placeholder="Buscar raza..."
          onChange={manejarBusqueda}
        />
      </div>
    </div>
  );
}

export default Filtros;
