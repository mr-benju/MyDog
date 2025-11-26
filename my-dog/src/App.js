/* app gestiona el layout principal rutas y el estado de filtros y busqueda */
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Descripcion from "./components/Descripcion";
import Filtros from "./components/Filtros";
import Galeria from "./components/Galeria";
import ModalPerro from "./components/ModalPerro";
import Formulario from "./components/Formulario";

import "./index.css";
import "./styles/global.css";
import "./styles/galeria.css";

function App() {
  const [filtro, setFiltro] = useState("all");
  const [busqueda, setBusqueda] = useState("");
  const [perros, setPerros] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const state = location.state; //Para el fondo del modal

  const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ZaBRNqOQ/perro";

  // Obtener perros desde API una sola vez
  useEffect(() => {
    async function cargarPerros() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPerros(data);
      } catch (error) {
        console.error("Error cargando perros:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarPerros();
  }, []);

  if (loading) return <p>Cargando perros...</p>;

  // Aplicar filtros y búsqueda SOBRE LOS DATOS API
  const perrosFiltrados = perros.filter((perro) => {
    const cumpleFiltro = filtro === "all" || perro.tamano === filtro;
    const cumpleBusqueda = perro.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  return (
    <>
      <Header />

      <Descripcion /> {/* Esto es el texto general de la página */}

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
