/* app gestiona el layout principal rutas y el estado de filtros y busqueda */
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const state = location.state; //Para el fondo del modal

  const perrosFiltrados = perrosData.filter((perro) => {
    const cumpleFiltro = filtro === "all" || perro.tamano === filtro;
    const cumpleBusqueda = perro.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  return (
    <>
      <Header />
      <Descripcion />
      <Filtros setFiltro={setFiltro} setBusqueda={setBusqueda} />

      <Routes location={state?.backgroundLocation || location}>
        <Route
          path="/"
          element={<Galeria perros={perrosFiltrados} />}
        /> 
      </Routes>
    
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/perro/:id" element={<ModalPerro />} />
        </Routes>
      )}

      <Formulario />
    </>
  );
}

export default App;
