import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const CardPresupuesto = ({ datos }) => {
  return (
    <Container className="mb-4">
      <Card className="bg-primary text-white mb-3 rounded-top">
        <Card.Body className="p-3">
          <div className="row">
            <div className="col">
              <strong>Nombre</strong>
            </div>
            <div className="col">
              <strong>Categoría</strong>
            </div>
            <div className="col">
              <strong>Fecha</strong>
            </div>
            <div className="col">
              <strong>Monto</strong>
            </div>
          </div>
        </Card.Body>
      </Card>
      {datos.map((fila, index) => (
        <Card key={index} className="mt-2 rounded">
          <Card.Body className="p-0">
            <div className="row">
              <div className="col ps-4">{fila.nombre}</div>
              <div className="col">{fila.categoria}</div>
              <div className="col">{fila.fecha}</div>
              <div className="col">{fila.monto}</div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default CardPresupuesto;
