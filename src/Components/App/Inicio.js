import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BarChartComponent } from "../Utils/BarChartComponent.js";
import { Card } from "react-bootstrap";
import { dataBarChart, miniCardData } from "../../Assets/strings.js";
import { MiniCardInicio } from "../Utils/MiniCardInicio.js";

export const Inicio = () => {
  //fetch
  const dataBarCharttt = dataBarChart;
  const dataMiniCard = miniCardData;
  return (
    <Container className="mt-5 justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Container>
            <Card>
              <Card.Header className="bg-primary text-light">
                <h2>Gráfico de Ingresos y Egresos Mensuales</h2>
              </Card.Header>
              <Card.Body>
                <BarChartComponent data={dataBarCharttt} />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Container>
        </Col>
      </Row>
      <Row className="col-6 mt-5 justify-content-center ">
        <Col>
          <Container className="col-6 mt-5 justify-content-center ">
            <MiniCardInicio datos={dataMiniCard} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
