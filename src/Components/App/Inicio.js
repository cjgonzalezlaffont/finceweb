import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BarChartComponent } from "../Utils/InicioComponents/BarChartComponent";
import { LinearChartComponent } from "../Utils/InicioComponents/LinearChartComponent.js";
import { Card } from "react-bootstrap";
import { miniCardData } from "../../Assets/strings.js";
import { MiniCardInicio } from "../Utils/InicioComponents/MiniCardInicio.js";
import { useState, useEffect } from "react";

export const Inicio = () => {
  const dataMiniCard = miniCardData;
  const urlDataBarChart =
    "http://localhost:8080/api/transactions/getDataGraph/";
  const urlPredicion = "http://localhost:8080/api/transactions/getPrediction/";
  const token = sessionStorage.getItem("token").replace(/"/g, "");
  const userId = localStorage.getItem("usuarioId");

  const [dataBarChart, setDataBarChart] = useState([]);
  const [dataLinearChart, setDataLinearChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlDataBarChart + userId, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDataBarChart(data);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, userId]);

  useEffect(() => {
    const fetchLinearData = async () => {
      try {
        const response = await fetch(urlPredicion + userId, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDataLinearChart(data);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLinearData();
  }, [token, userId]);

  return (
    <Container className="mt-5 p-5 justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Container>
            <Card>
              <Card.Header className="bg-primary text-light">
                <h2>Gráfico de Ingresos y Egresos Mensuales</h2>
              </Card.Header>
              <Card.Body>
                <BarChartComponent data={dataBarChart} />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Container>
            <Card>
              <Card.Header className="bg-primary text-light">
                <h2>Pronóstico de Ingresos/egresos de los próximos meses</h2>
              </Card.Header>
              <Card.Body>
                <LinearChartComponent data={dataLinearChart} />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row className="col-12 mt-5">
        <Col>
          <Container className="col-6 mt-5 justify-content-center ">
            <MiniCardInicio datos={dataMiniCard} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
