import React from "react";
import { Card, Form, Button } from "react-bootstrap";

export const Ingresar = () => {
  return (
    <Card className="w-50 mx-auto mt-5">
      <Card.Body>
        <Card.Title>Iniciar Sesión</Card.Title>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-5">
            Iniciar Sesión
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
