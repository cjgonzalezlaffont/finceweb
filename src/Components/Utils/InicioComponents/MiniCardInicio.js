import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export const MiniCardInicio = ({ datos }) => {
  console.log(datos);

  return (
    <Container className="mb-4 text-center">
      <Card className="bg-primary text-white mb-3 rounded-top">
        <Card.Body className="p-3">
          <div className="row">
            <div className="col">
              <strong>Simbolo</strong>
            </div>
            <div className="col">
              <strong>Variacion Diaria</strong>
            </div>
          </div>
        </Card.Body>
      </Card>
      {datos.map((data, index) => (
        <Card key={index} className="mt-2 rounded">
          <Card.Body className="p-0">
            <div className="row">
              <div className="col ps-4">{data.symbol}</div>
              <div className="col">{data.variation}</div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
