import React, { useState } from "react";
import Header from "./components/Header";
import Descripcion from "./components/Descripcion";
import Filtros from "./components/Filtros";
import Galeria from "./components/Galeria";
import ModalPerro from "./components/ModalPerro";
import Formulario from "./components/Formulario";
import perrosData from "./data/perrosData";
import "./index.css";
import "./styles/global.css";
import "./styles/galeria.css";

function App() {
  const [filtro, setFiltro] = useState("all");
  const [busqueda, setBusqueda] = useState("");
  const [perroSeleccionado, setPerroSeleccionado] = useState(null);

  const perrosFiltrados = perrosData.filter((perro) => {
    const cumpleFiltro = filtro === "all" || perro.tamano === filtro;
    const cumpleBusqueda = perro.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  return (
    <div className="App">
      <Header />
      <Descripcion />
      <Filtros setFiltro={setFiltro} setBusqueda={setBusqueda} />
      <Galeria perros={perrosFiltrados} setPerroSeleccionado={setPerroSeleccionado} />
      {perroSeleccionado && (
        <ModalPerro perro={perroSeleccionado} setPerroSeleccionado={setPerroSeleccionado} />
      )}
      <Formulario />
    </div>
  );
}

export default App;
