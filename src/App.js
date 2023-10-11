//import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Components/Home/Home";
import { Cartera } from "./Components/Fince/Cartera";
import { Configuracion } from "./Components/Fince/Configuracion";
import { Inicio } from "./Components/Fince/Inicio";
import { Objetivos } from "./Components/Fince/Objetivos";
import { PanelGeneral } from "./Components/Fince/PanelGeneral";
import { Presupuesto } from "./Components/Fince/Presupuesto";
import { Menu } from "./Components/Menu/Menu";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Header />
      <Container fluid className="flex-grow-1">
        {/* Contenedor de toda la pagina */}
        <Row className="h-100">
          {/* Desplegamos un menu (2 col disp med / 12 disp. peq.) */}
          <Col xs={12} md={2} className="bg-light">
            {/* Aca va menú vertical */}
            <Menu />
          </Col>
          {/* Acá va Contenido (10 col. disp. med / 12 col. disp. peq.) */}
          <Col xs={12} md={10}>
            {/* Acá va el contenido que cambia según el menú */}
            <main className="h-100">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cartera" element={<Cartera />} />
                <Route path="/Presupuesto" element={<Presupuesto />} />
                <Route path="/PanelGeneral" element={<PanelGeneral />} />
                <Route path="/Objetivos" element={<Objetivos />} />
                <Route path="/Configuracion" element={<Configuracion />} />
                <Route path="/Inicio" element={<Inicio />} />
              </Routes>
            </main>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
