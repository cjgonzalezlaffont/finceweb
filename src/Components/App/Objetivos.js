import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";

export const Objetivos = () => {
  const [fechaLimite, setFechaLimite] = useState("");
  const [monto, setMonto] = useState("");
  const [tituloObjetivo, setTituloObjetivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [notificacionesActivadas, setNotificacionesActivadas] = useState(false);

  const handleNotificacionesChange = (e) => {
    setNotificacionesActivadas(e.target.checked);
  };

  const handleGuardarObjetivo = () => {};
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card>
        <Card.Header as="h5">Establecer Objetivo Presupuestario</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} controlId="tituloObjetivo">
              <Form.Label column sm="4">
                Título del Objetivo
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={tituloObjetivo}
                  onChange={(e) => setTituloObjetivo(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="fechaLimite">
              <Form.Label column sm="4">
                Fecha Límite
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="date"
                  value={fechaLimite}
                  onChange={(e) => setFechaLimite(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="objetivoPesos">
              <Form.Label column sm="4">
                Monto
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="descripcion">
              <Form.Label column sm="4">
                Descripción
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="notificaciones">
              <Form.Label column sm="4">
                Notificaciones
              </Form.Label>
              <Col sm="8">
                <Form.Check
                  type="checkbox"
                  label="Activar notificaciones"
                  checked={notificacionesActivadas}
                  onChange={handleNotificacionesChange}
                />
              </Col>
            </Form.Group>

            <Button variant="primary" onClick={handleGuardarObjetivo}>
              Guardar Objetivo
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
