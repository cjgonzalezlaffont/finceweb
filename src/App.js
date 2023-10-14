import "./App.css";
import { Home } from "./Components/Home/Home";
import { Cartera } from "./Components/App/Cartera";
import { Configuracion } from "./Components/App/Configuracion";
import { Inicio } from "./Components/App/Inicio";
import { Objetivos } from "./Components/App/Objetivos";
import { PanelGeneral } from "./Components/App/PanelGeneral";
import { Presupuesto } from "./Components/App/Presupuesto";
import { Menu } from "./Components/Utils/Menu";
import { Header } from "./Components/Utils/Header";
import { Footer } from "./Components/Utils/Footer";
import { Ingresar } from "./Components/Utils/Ingresar";
import { Registrar } from "./Components/Utils/Registrar";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header className="fixed-top w-100" />
        </Col>
      </Row>
      <Row>
        <Col md={2} p-0>
          <Container fluid p-0>
            <Menu className="fixed" />
          </Container>
        </Col>
        <Col md={10}>
          <Container fluid>
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
            </Routes>
          </Container>
        </Col>
      </Row>
      <Row className="fixed-bottom w-100">
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
