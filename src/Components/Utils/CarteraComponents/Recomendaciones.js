import React from "react";
import { TablaRecomendaciones } from "./TablaRecomendaciones";
import { datosRecomendaciones } from "../../../Assets/strings";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Recomendaciones = () => {
  //aca va el fetch para datosRecomendaciones

  return (
    <Container className="m-5">
      <Card>
        <Card.Header>
          <Card.Title
            as="h3"
            className="d-flex justify-content-between align-items-center"
          >
            <span>Recomendaciones</span>
            <Link to="/Cartera">
              <Button variant="primary">Volver a Cartera</Button>
            </Link>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <TablaRecomendaciones data={datosRecomendaciones} />
        </Card.Body>
      </Card>
    </Container>
  );
};
