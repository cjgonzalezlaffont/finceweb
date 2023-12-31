import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const Movimientos = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("usuarioId");
  const token = sessionStorage.getItem("token").replace(/"/g, "");
  //const [movimientos, setMovimientos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState({});
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/categories/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          if (data) {
            setCategorias(data);
          }
        } else {
          const errorResponse = await response.json();
          if (errorResponse.error) {
            console.error(`Error: ${response.status} ${errorResponse.error}`);
            alert(`Error: ${response.status} ${errorResponse.error}`);
          } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            alert(`Error: ${response.status} ${response.statusText}`);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchData = async () => {
      await obtenerCategorias();
    };

    fetchData();
  }, [id, token, setCategorias]);

  const agregarMovimiento = async () => {
    if (nombre && categoria && fecha && monto) {
      const selectedCategory = categorias.find(
        (cat) => cat.nombre === categoria
      );

      //Correccion en las fechas asi quedan las de los activos y las tx iguales.

      const originalValue = fecha;
      const [anio, mes, dia] = originalValue.split("-");
      const fechaNuevoFormato = `${dia}/${mes}/${anio}`;
      const newTransaction = {
        titulo: nombre,
        categoriaNombre: selectedCategory.nombre,
        fecha: fechaNuevoFormato,
        montoConsumido: monto,
        tipo: selectedCategory.tipo,
        categoriaId: selectedCategory.id,
      };
      try {
        const response = await fetch(
          "http://localhost:8080/api/transactions/createTransaction/" + id,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransaction),
          }
        );
        const data = await response.json();
        if (response.status === 201) {
          navigate("/Presupuesto");
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="justify-content-center">
        <Col md={10}>
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
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((cat, index) => (
                      <option key={index} value={cat.nombre}>
                        {cat.nombre}
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
                        {"Agregar Movimiento"}
                      </Button>
                    </Col>
                    <Col>
                      <Link to="/Presupuesto">
                        <Button variant="primary">Ver Presupuesto</Button>
                      </Link>
                    </Col>
                    <Col>
                      <Link to="/Categorias">
                        <Button variant="primary">Ver Categorías</Button>
                      </Link>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
