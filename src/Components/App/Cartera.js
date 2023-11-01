import React from "react";
import { TablaCartera } from "../Utils/CarteraComponents/TablaCartera";
import { datosCartera } from "../../Assets/strings.js";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Cartera = () => {
  //aca va el fetch para datosCartera

  return (
    <Container className="mb-5">
      <Card>
        <Card.Header>
          <Card.Title
            as="h3"
            className="d-flex justify-content-between align-items-center"
          >
            <span>Cartera</span>
            <Link to="/Recomendaciones">
              <Button variant="primary">Ir a Recomendaciones</Button>
            </Link>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <TablaCartera data={datosCartera} />
        </Card.Body>
      </Card>
    </Container>
  );
};
