import React from "react";
import CardPresupuesto from "../Utils/CardPresupuesto";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Presupuesto = () => {
  //fetch

  const datosPresupuesto = [
    {
      nombre: "Apple Inc.",
      categoria: "Tecnología",
      fecha: "01/01/2023",
      monto: 1000.0,
    },
    {
      nombre: "Walmart Inc.",
      categoria: "Supermercado",
      fecha: "05/01/2023",
      monto: 300.0,
    },
    {
      nombre: "AT&T Inc.",
      categoria: "Telecomunicaciones",
      fecha: "10/01/2023",
      monto: 200.0,
    },
    {
      nombre: "Ford Motor Company",
      categoria: "Automoción",
      fecha: "15/01/2023",
      monto: 150.0,
    },
    {
      nombre: "Walt Disney Company",
      categoria: "Entretenimiento",
      fecha: "20/01/2023",
      monto: 50.0,
    },
    {
      nombre: "Johnson & Johnson",
      categoria: "Salud",
      fecha: "25/01/2023",
      monto: 250.0,
    },
    {
      nombre: "American Airlines Group Inc.",
      categoria: "Aerolíneas",
      fecha: "02/02/2023",
      monto: 100.0,
    },
    {
      nombre: "Nike, Inc.",
      categoria: "Deportes",
      fecha: "07/02/2023",
      monto: 75.0,
    },
    {
      nombre: "Netflix, Inc.",
      categoria: "Streaming",
      fecha: "12/02/2023",
      monto: 80.0,
    },
    {
      nombre: "Verizon Communications Inc.",
      categoria: "Telecomunicaciones",
      fecha: "18/02/2023",
      monto: 180.0,
    },
    {
      nombre: "Procter & Gamble Co.",
      categoria: "Cuidado del Hogar",
      fecha: "03/03/2023",
      monto: 320.0,
    },
    {
      nombre: "Delta Air Lines, Inc.",
      categoria: "Aerolíneas",
      fecha: "08/03/2023",
      monto: 130.0,
    },
    {
      nombre: "McDonald's Corporation",
      categoria: "Comida Rápida",
      fecha: "13/03/2023",
      monto: 280.0,
    },
    {
      nombre: "Exxon Mobil Corporation",
      categoria: "Energía",
      fecha: "19/03/2023",
      monto: 1050.0,
    },
    {
      nombre: "Pfizer Inc.",
      categoria: "Farmacéuticas",
      fecha: "24/03/2023",
      monto: 90.0,
    },
    {
      nombre: "Amazon.com, Inc.",
      categoria: "Comercio Electrónico",
      fecha: "29/03/2023",
      monto: 70.0,
    },
    {
      nombre: "The Coca-Cola Company",
      categoria: "Bebidas",
      fecha: "04/04/2023",
      monto: 45.0,
    },
    {
      nombre: "The Home Depot, Inc.",
      categoria: "Bricolaje",
      fecha: "09/04/2023",
      monto: 190.0,
    },
    {
      nombre: "Facebook, Inc.",
      categoria: "Redes Sociales",
      fecha: "14/04/2023",
      monto: 310.0,
    },
    {
      nombre: "General Electric Company",
      categoria: "Industria",
      fecha: "20/04/2023",
      monto: 140.0,
    },
  ];

  return (
    <Container>
      <Row>
        <Col className="m-3">
          <Link to="/Movimientos">
            <Button variant="primary">Agregar Movimiento</Button>
          </Link>
        </Col>
        <Col className="m-3">
          <Link to="/Categorias">
            <Button variant="primary">Ver Categorías</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <CardPresupuesto datos={datosPresupuesto} />
        </Col>
      </Row>
    </Container>
  );
};
