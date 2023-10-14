import React from "react";
import { Card, Form, Button } from "react-bootstrap";

export const Registrar = () => {
  return (
    <Card className="w-50 mx-auto mt-5">
      <Card.Body>
        <Card.Title>Registro de Usuario</Card.Title>
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu apellido" />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirmación de Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Confirmar contraseña" />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-2">
            Registrarse
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
