import "./App.css";
import { Home } from "./Components/Home/Home";
import { Cartera } from "./Components/App/Cartera";
import { Configuracion } from "./Components/App/Configuracion";
import { Inicio } from "./Components/App/Inicio";
import { Objetivos } from "./Components/App/Objetivos";
import { PanelGeneral } from "./Components/App/PanelGeneral";
import { Presupuesto } from "./Components/App/Presupuesto";
//import { Menu } from "./Components/Utils/Menu";
import  Menu from "./Components/Utils/Menu";
//import { Footer } from "./Components/Utils/Footer";
import { Ingresar } from "./Components/Utils/Ingresar";
import { Registrar } from "./Components/Utils/Registrar";
import { Categorias } from "./Components/Utils/Categorias";
import { Simbolo } from "./Components/Utils/Simbolo";
//import React, { useState } from "react";
import { Container, Row, Col /*, Button*/ } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Movimientos } from "./Components/Utils/Movimientos";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cartera" element={<Cartera />} />
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
      </Routes>
    </>
  );
}

export default App;
