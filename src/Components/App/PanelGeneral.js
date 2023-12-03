import React from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const PanelGeneral = () => {
  const urlStocks = "http://localhost:8080/api/instruments/TODOS";
  const token = sessionStorage.getItem("token").replace(/"/g, "");
  const userId = localStorage.getItem("usuarioId");
  const [panelGeneralData, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Todas");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(urlStocks, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      try {
        const responseBody = await response.json();
        if (
          responseBody &&
          Array.isArray(responseBody) &&
          responseBody.length > 0
        ) {
          setData(responseBody);
        } else {
          alert("Servidor IOL no responde intente más tarde");
        }
      } catch (error) {
        alert("Error al procesar la respuesta del servidor");
        console.error("Error Fince en la solicitud:", error);
      }
    };
    fetchData();
  }, [token, userId]);

  useEffect(() => {
    const filteredData = panelGeneralData.filter((item) => {
      const includesSearchText = item.simbolo
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesSelectedOption =
        selectedOption === "Todas" || item.tipo_instrumento === selectedOption;
      return includesSearchText && matchesSelectedOption;
    });

    setFilteredData(filteredData);
  }, [panelGeneralData, searchText, selectedOption, setFilteredData]);

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
              placeholder="Buscar por símbolo..."
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
              style={{ fontSize: "12px" }}
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
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="col-1">Símbolo</th>
              <th className="col-7">Nombre</th>
              <th className="col-2">Tipo</th>
              <th className="col-1">Precio</th>
              <th className="col-1">Variación</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="col-1">
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
                      {item.simbolo}
                    </Link>
                  </td>
                  <td className="col-7">{item.descripcion}</td>
                  <td className="col-1">{item.tipo_instrumento}</td>
                  <td className="col-1">{item.ultimoPrecio}</td>
                  <td
                    colSpan="2"
                    className={
                      item.variacionPorcentual >= 0
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {item.variacionPorcentual}
                  </td>
                </tr>
              ))
            ) : (
              <div>
                <p>Obteniendo datos...</p>
              </div>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
