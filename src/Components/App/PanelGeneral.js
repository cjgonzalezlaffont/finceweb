import React, { useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PanelGeneral = (/* { tablaData } */) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Todas");

  //tabla data por props o por fetch

  const tablaData = [
    {
      simbolo: "BONO001",
      nombre: "Bono Corporativo A",
      precio: 100.5,
      variacionDiaria: 1.25,
      tipo: "Bonos",
    },
    {
      simbolo: "BONO002",
      nombre: "Bono Corporativo B",
      precio: 98.7,
      variacionDiaria: -0.75,
      tipo: "Bonos",
    },
    {
      simbolo: "BONO003",
      nombre: "Bono Gubernamental X",
      precio: 95.1,
      variacionDiaria: -0.3,
      tipo: "Bonos",
    },
    {
      simbolo: "BONO004",
      nombre: "Bono Municipal Y",
      precio: 102.3,
      variacionDiaria: 0.8,
      tipo: "Bonos",
    },
    {
      simbolo: "BONO005",
      nombre: "Bono Corporativo C",
      precio: 101.8,
      variacionDiaria: 0.6,
      tipo: "Bonos",
    },
    {
      simbolo: "FCI001",
      nombre: "Fondo Común de Inversión X",
      precio: 50.25,
      variacionDiaria: -0.75,
      tipo: "Fondo Común de Inversión",
    },
    {
      simbolo: "FCI002",
      nombre: "Fondo Común de Inversión Y",
      precio: 49.8,
      variacionDiaria: -0.9,
      tipo: "Fondo Común de Inversión",
    },
    {
      simbolo: "FCI003",
      nombre: "Fondo de Renta Fija A",
      precio: 48.6,
      variacionDiaria: -0.5,
      tipo: "Fondo Común de Inversión",
    },
    {
      simbolo: "FCI004",
      nombre: "Fondo de Renta Variable B",
      precio: 52.1,
      variacionDiaria: 1.2,
      tipo: "Fondo Común de Inversión",
    },
    {
      simbolo: "FCI005",
      nombre: "Fondo de Renta Variable C",
      precio: 53.5,
      variacionDiaria: 1.6,
      tipo: "Fondo Común de Inversión",
    },
    {
      simbolo: "CEDEAR001",
      nombre: "CEDEAR Empresa Y",
      precio: 75.1,
      variacionDiaria: 0.8,
      tipo: "CEDEARs",
    },
    {
      simbolo: "CEDEAR002",
      nombre: "CEDEAR Empresa Z",
      precio: 79.2,
      variacionDiaria: 1.2,
      tipo: "CEDEARs",
    },
    {
      simbolo: "CEDEAR003",
      nombre: "CEDEAR Tecnológico X",
      precio: 82.3,
      variacionDiaria: 1.8,
      tipo: "CEDEARs",
    },
    {
      simbolo: "CEDEAR004",
      nombre: "CEDEAR Energético A",
      precio: 78.5,
      variacionDiaria: 1.0,
      tipo: "CEDEARs",
    },
    {
      simbolo: "CEDEAR005",
      nombre: "CEDEAR Bancario B",
      precio: 85.7,
      variacionDiaria: 2.3,
      tipo: "CEDEARs",
    },
    {
      simbolo: "ACC001",
      nombre: "Acciones de Compañía Z",
      precio: 120.75,
      variacionDiaria: 2.1,
      tipo: "Acciones",
    },
    {
      simbolo: "ACC002",
      nombre: "Acciones de Compañía X",
      precio: 125.8,
      variacionDiaria: 2.7,
      tipo: "Acciones",
    },
    {
      simbolo: "ACC003",
      nombre: "Acciones de Compañía A",
      precio: 110.5,
      variacionDiaria: 1.5,
      tipo: "Acciones",
    },
    {
      simbolo: "ACC004",
      nombre: "Acciones de Compañía B",
      precio: 118.3,
      variacionDiaria: 2.0,
      tipo: "Acciones",
    },
    {
      simbolo: "ACC005",
      nombre: "Acciones de Compañía Y",
      precio: 130.2,
      variacionDiaria: 3.0,
      tipo: "Acciones",
    },
  ];

  const filteredData = tablaData.filter((item) => {
    const includesSearchText = item.simbolo
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesSelectedOption =
      selectedOption === "Todas" || item.tipo === selectedOption;
    return includesSearchText && matchesSelectedOption;
  });

  return (
    <Container>
      <h1>Panel General</h1>
      <Row className="mb-3">
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Simbolo"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Control
              as="select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="Todas">Todas</option>
              <option value="Bonos">Bonos</option>
              <option value="Fondo Común de Inversión">
                Fondo Común de Inversión
              </option>
              <option value="CEDEARs">CEDEARs</option>
              <option value="Acciones">Acciones</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Variación Diaria</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>
                <Link to={`/Simbolo/${item.simbolo}`} state={item}>
                  {item.simbolo}
                </Link>
              </td>
              <td>{item.nombre}</td>
              <td>{item.precio}</td>
              <td>{item.variacionDiaria}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
