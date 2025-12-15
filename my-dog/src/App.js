/* 
  App:
  - Componente raíz
  - Gestiona estado global (perros, filtros, búsqueda)
  - Consume la API
  - Controla el Modo Administrador
*/

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Componentes existentes
import Header from "./components/Header";
import Descripcion from "./components/Descripcion";
import Filtros from "./components/Filtros";
import Galeria from "./components/Galeria";
import ModalPerro from "./components/ModalPerro";
import Formulario from "./components/Formulario";

// Componentes de administración
import AdminLogin from "./components/admin/AdminLogin_temp";
import AdminPanel from "./components/admin/AdminPanel";

// Estilos
import "./index.css";
import "./styles/global.css";
import "./styles/galeria.css";

function App() {
  /* -------------------- ESTADO GLOBAL -------------------- */

  const [filtro, setFiltro] = useState("all");
  const [busqueda, setBusqueda] = useState("");

  // Datos principales obtenidos desde la API
  const [perros, setPerros] = useState([]);

  // Estados de control
  const [loading, setLoading] = useState(true);

  // NUEVO: control del modo administrador
  const [modoAdmin, setModoAdmin] = useState(false);
  const [adminAutorizado, setAdminAutorizado] = useState(false);

  const location = useLocation();
  const state = location.state; // fondo del modal

  /* -------------------- CONFIGURACIÓN API -------------------- */

  // API_URL definida UNA sola vez (buena práctica)
  const API_URL =
    "https://x8ki-letl-twmt.n7.xano.io/api:ZaBRNqOQ/perro";

  /* -------------------- CARGA DE DATOS -------------------- */

  // Obtener perros desde la API (una sola vez)
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

  /* -------------------- FILTROS Y BÚSQUEDA -------------------- */

  const perrosFiltrados = perros.filter((perro) => {
    const cumpleFiltro = filtro === "all" || perro.tamano === filtro;
    const cumpleBusqueda = perro.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  /* -------------------- RENDER -------------------- */

  return (
    <>
      {/* Header con botón para activar modo administrador */}
      <Header onAdmin={() => setModoAdmin(true)} />

      {/* ---------------- MODO ADMINISTRADOR ---------------- */}
      {modoAdmin ? (
        adminAutorizado ? (
          <AdminPanel
            perros={perros}
            setPerros={setPerros}
            apiUrl={API_URL}
            onSalir={() => {
              setAdminAutorizado(false);
              setModoAdmin(false);
            }}
          />
        ) : (
          <AdminLogin
            onSuccess={() => setAdminAutorizado(true)}
            onCancel={() => setModoAdmin(false)}
          />
        )
      ) : (
        <>
          {/* ---------------- MODO USUARIO NORMAL ---------------- */}

          <Descripcion />

          <Filtros
            setFiltro={setFiltro}
            setBusqueda={setBusqueda}
          />

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
      )}
    </>
  );
}

export default App;
