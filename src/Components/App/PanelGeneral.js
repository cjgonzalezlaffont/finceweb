import React from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const PanelGeneral = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Todas");
  const urlStocks = "http://localhost:8080/api/instruments/TODOS";
  const token = sessionStorage.getItem("token").replace(/"/g, "");
  const userId = localStorage.getItem("usuarioId");

  const [panelGeneralData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlStocks, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.error("Error al obtener datos del Panel General");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchData();
  }, [token, userId]);

  const filteredData = panelGeneralData.filter((item) => {
    const includesSearchText = item.tipo_instrumento
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesSelectedOption =
      selectedOption === "Todas" || item.tipo_instrumento === selectedOption;
    return includesSearchText && matchesSelectedOption;
  });

  return (
    <Container>
      <Row className="mt-2">
        <h1>Panel General</h1>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Buscar por símbolo"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Control
              placeholder=""
              as="select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="Todas">Ver todos los instrumentos...</option>
              <option value="FCI">Fondos Comunes de Inversión</option>
              <option value="cedears">CEDEARs</option>
              <option value="acciones">Acciones</option>
              <option value="obligacionesNegociables">
                Obligaciones Negociables
              </option>
              <option value="titulosPublicos">Títulos Públicos</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Variación Diaria</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>
                <Link
                  to={`/Simbolo/${item.simbolo}`}
                  state={{
                    simbolo: item.simbolo,
                    nombre: item.descripcion,
                    tipo: item.tipo_instrumento,
                    cantidad: 0,
                    valorActual: item.ultimoPrecio,
                    valorDeCompra: 0,
                    variacion: item.variacionPorcentual,
                  }}
                >
                  {/* {activo.simbolo}
                        {activo.nombre}
                        {activo.cantidad}
                        {activo.valorDeCompra}
                        {activo.variacion}
                        {activo.valorActual}*/}

                  {item.simbolo}
                </Link>
              </td>
              <td>{item.descripcion}</td>
              <td>{item.tipo_instrumento}</td>
              <td>{item.ultimoPrecio}</td>
              <td
                className={
                  item.variacionPorcentual >= 0 ? "text-success" : "text-danger"
                }
              >
                {item.variacionPorcentual}
              </td>

              {/* descripcion: "AMERICAN AIRLINES GROUP INC."
                 simbolo:"AAL"
                 tipo_instrumento:"cedears"
                 ultimoPrecio:5204.5
                 variacionPorcentual:3.24 */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
