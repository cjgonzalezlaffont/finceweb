import React, { useState } from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const categoriasDisponibles = [
    "Alimentos",
    "Transporte",
    "Vivienda",
    "Entretenimiento",
    "Salud",
    "Educación",
  ];

  const agregarMovimiento = () => {
    if (nombre && categoria && fecha && monto) {
      if (editMode) {
        const nuevosMovimientos = [...movimientos];
        nuevosMovimientos[editIndex] = { nombre, categoria, fecha, monto };
        setMovimientos(nuevosMovimientos);
        setEditMode(false);
        setEditIndex(null);
      } else {
        setMovimientos([...movimientos, { nombre, categoria, fecha, monto }]);
      }
      setNombre("");
      setCategoria("");
      setFecha("");
      setMonto("");
    }
  };

  const editarMovimiento = (index) => {
    const movimiento = movimientos[index];
    setNombre(movimiento.nombre);
    setCategoria(movimiento.categoria);
    setFecha(movimiento.fecha);
    setMonto(movimiento.monto);
    setEditMode(true);
    setEditIndex(index);
  };

  const eliminarMovimiento = (index) => {
    const nuevosMovimientos = movimientos.filter((_, i) => i !== index);
    setMovimientos(nuevosMovimientos);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>Movimientos Financieros</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    as="select"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categoriasDisponibles.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Row className="d-flex mt-4 justify-content-between">
                    <Col>
                      <Button variant="primary" onClick={agregarMovimiento}>
                        {editMode ? "Guardar Cambios" : "Agregar Movimiento"}
                      </Button>
                    </Col>
                    <Col>
                      <Link to="/Presupuesto">
                        <Button variant="primary" style={{ width: "100%" }}>
                          Ver Presupuesto
                        </Button>
                      </Link>
                    </Col>
                    <Col>
                      <Link to="/Categorias">
                        <Button variant="primary" style={{ width: "100%" }}>
                          Ver Categorías
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>

              <ul>
                {movimientos.map((movimiento, index) => (
                  <li key={index}>
                    {`${movimiento.nombre} - ${movimiento.categoria} - ${movimiento.fecha} - $${movimiento.monto}`}
                    <Button
                      className="ml-2"
                      variant="info"
                      onClick={() => editarMovimiento(index)}
                    >
                      Editar
                    </Button>
                    <Button
                      className="ml-2"
                      variant="danger"
                      onClick={() => eliminarMovimiento(index)}
                    >
                      Eliminar
                    </Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
