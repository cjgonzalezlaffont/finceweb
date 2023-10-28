import React from "react";
import { Container, Card, Button, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const Simbolo = () => {
  const location = useLocation();
  const simboloData = location.state;

  return (
    <Container>
      <Col xs={4} className="mx-auto mt-5">
        <Card>
          <Card.Header>Simbolo</Card.Header>
          <Card.Body>
            <Card.Title>{simboloData.simbolo}</Card.Title>
            <Card.Text>
              <strong>Tipo:</strong> {simboloData.tipo}
              <br />
              <strong>Nombre:</strong> {simboloData.nombre}
              <br />
              <strong>Precio:</strong> {simboloData.precio}
              <br />
              <strong>Variación Diaria:</strong> {simboloData.variacionDiaria}
              <br />
              <div className="d-flex justify-content-between mt-3">
                <Button
                  as={Link}
                  to="/PanelGeneral"
                  variant="primary"
                  className="m-1"
                >
                  Volver al Panel General
                </Button>
                <Button variant="success" className="m-1">
                  Agregar a Cartera
                </Button>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};
