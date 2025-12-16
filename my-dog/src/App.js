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

  // Control del modo administrador
  const [modoAdmin, setModoAdmin] = useState(false);
  const [adminAutorizado, setAdminAutorizado] = useState(false);

  const location = useLocation();
  const state = location.state; // fondo del modal


  /* ----------- DETECTA ATAJO DE TECLADO PARA ADMIN ---------*/
  useEffect(() => {
    const detectarAtajo = (e) => {
      // Ctrl + Shift + H
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        setModoAdmin(true);
      }
    };

    // Se agrega lo que permite detectar el atajo 
    window.addEventListener("keydown", detectarAtajo);

    // Limpieza si el comoponente se desmonta
    return () => window.removeEventListener("keydown", detectarAtajo);
  }, []);

  /* -------------------------- API -------------------------- */

  const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ZaBRNqOQ/perro";

  /* -------------------- CARGA DE DATOS -------------------- */

  // Obtener perros desde la API 
  useEffect(() => {
    async function cargarPerros() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error("El servidor esta saturado, intenta más tarde");
          }
          throw new Error(`Error en la peticion: ${response.status}`);
        }

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
      <Header />

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
              <Route path="/perro/:id" element={<ModalPerro perros={perros}/>} />
            </Routes>
          )}

          <Formulario />
        </>
      )}
    </>
  );
}

export default App;
