import "./App.css";
import { Home } from "./Components/Home/Home";
import { Cartera } from "./Components/App/Cartera";
import { Configuracion } from "./Components/App/Configuracion";
import { Inicio } from "./Components/App/Inicio";
import { Objetivos } from "./Components/App/Objetivos";
import { PanelGeneral } from "./Components/App/PanelGeneral";
import { Presupuesto } from "./Components/App/Presupuesto";
import { Menu } from "./Components/Utils/Menu";
import { Ingresar } from "./Components/Utils/Ingresar";
import { Registrar } from "./Components/Utils/Registrar";
import { Categorias } from "./Components/Utils/Categorias";
import { Simbolo } from "./Components/Utils/Simbolo";
import { Route, Routes, useLocation } from "react-router-dom";
import { Movimientos } from "./Components/Utils/Movimientos";
import { useState, useEffect } from "react";
import { Recomendaciones } from "./Components/Utils/CarteraComponents/Recomendaciones";

export default function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    const newToken = sessionStorage.getItem("token");
    if (newToken !== token) {
      setToken(newToken);
    }
  }, [location, token]);

  return (
    <>
      {token ? (
        <>
          <Menu />
          <Routes>
            <Route path="/Cartera" element={<Cartera />} />
            <Route path="/Presupuesto" element={<Presupuesto />} />
            <Route path="/PanelGeneral" element={<PanelGeneral />} />
            <Route path="/Objetivos" element={<Objetivos />} />
            <Route path="/Configuracion" element={<Configuracion />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Ingresar" element={<Ingresar />} />
            <Route path="/Registrar" element={<Registrar />} />
            <Route path="/Categorias" element={<Categorias />} />
            <Route path="/Movimientos" element={<Movimientos />} />
            <Route path="/Simbolo/:simbolo" element={<Simbolo />} />
            <Route path="/Recomendaciones" element={<Recomendaciones />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Ingresar" element={<Ingresar />} />
          <Route path="/Registrar" element={<Registrar />} />
        </Routes>
      )}
    </>
  );
}
