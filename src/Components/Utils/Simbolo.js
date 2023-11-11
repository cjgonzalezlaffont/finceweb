import React, { useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export const Simbolo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const simboloData = location.state;
  console.log("simboldata SIMBOLO.JS");
  const urlCompraActivo = "http://localhost:8080/api/portfolio/buyAsset/";
  const urlVentaActivo = "http://localhost:8080/api/portfolio/sellAsset/";
  const userId = localStorage.getItem("usuarioId");
  const token = sessionStorage.getItem("token").replace(/"/g, "");

  const [cantidadCompra, setCantidadCompra] = useState("");
  const [cantidadVenta, setCantidadVenta] = useState("");
  const [precioDeVenta, setPrecioDeVenta] = useState("");
  console.log(cantidadVenta);
  // Función para manejar la compra del activo
  const handleCompraClick = async () => {
    // Lógica para consumir el endpoint de compra con la cantidad y datos del activo
    try {
      const response = await fetch(urlCompraActivo + userId, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          simbolo: simboloData.simbolo,
          nombre: simboloData.nombre,
          cantidad: cantidadCompra,
          valorDeCompra: simboloData.valorActual,
          fechaDeCompra: simboloData.fechaDeCompra || getDate(),
          tipo: simboloData.tipo,
          categoriaId: simboloData.categoriaId || "",
          activoId: simboloData.activoId || "",
        }),
      });

      if (response.ok) {
        navigate(`/Cartera`);
      } else {
        console.error("Error al comprar");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    console.log("Compra:", simboloData, "Cantidad:", cantidadCompra);
  };

  // Función para manejar la venta del activo
  const handleVentaClick = async () => {
    try {
      const response = await fetch(urlVentaActivo + userId, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activoId: simboloData.activoId,
          cantidad: parseInt(cantidadVenta),
          precioDeVenta: precioDeVenta,
        }),
      });

      if (response.ok) {
        navigate(`/Cartera`);
      } else {
        console.error("Error al vender");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleCantidadCompraChange = (newValue) => {
    setCantidadCompra(newValue);
  };

  const handleCantidadVentaChange = (newValue) => {
    setCantidadVenta(newValue);
  };

  const handleIncrementCompra = () => {
    setCantidadCompra((prevCantidad) => {
      const cantidadNumerica = parseInt(prevCantidad, 10);
      return isNaN(cantidadNumerica) ? 1 : cantidadNumerica + 1;
    });
  };

  const handleDecrementCompra = () => {
    setCantidadCompra((prevCantidad) => {
      const cantidadNumerica = parseInt(prevCantidad, 10);
      return isNaN(cantidadNumerica) || cantidadNumerica <= 0
        ? 0
        : cantidadNumerica - 1;
    });
  };

  const handleIncrementVenta = () => {
    setCantidadVenta((prevCantidad) => {
      const cantidadNumerica = parseInt(prevCantidad, 10);
      return isNaN(cantidadNumerica) ? 1 : cantidadNumerica + 1;
    });
  };

  const handleDecrementVenta = () => {
    setCantidadVenta((prevCantidad) => {
      const cantidadNumerica = parseInt(prevCantidad, 10);
      return isNaN(cantidadNumerica) || cantidadNumerica <= 0
        ? 0
        : cantidadNumerica - 1;
    });
  };
  const handlePrecioDeVentaChange = (newValue) => {
    setPrecioDeVenta(newValue);
  };

  const getDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Se suma 1 porque los meses en JavaScript van de 0 a 11
    const year = currentDate.getFullYear();

    // Asegurarse de que el día y el mes tengan dos dígitos
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Devolver la fecha en el formato deseado
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Card className="col-6 align-items-center justify-content-between mt-5">
        <Card.Header className="col-12 align-items-center justify-content-between">
          <Row>
            <Col>
              <Card.Text>Simbolo</Card.Text>
            </Col>
            <Col>
              <Button
                variant="primary"
                onClick={() => navigate("/PanelGeneral")}
              >
                Panel
              </Button>
            </Col>
            <Col>
              <Button variant="success" onClick={() => navigate("/Cartera")}>
                Cartera
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="col-12 align-items-center justify-content-between">
          <Row>
            <Col>
              <Card.Text className="mb-1">
                <strong>Ticker:</strong>
              </Card.Text>
              <Card.Text className="mb-1">
                <strong>Tipo:</strong>
              </Card.Text>
              <Card.Text className="mb-1">
                <strong>Nombre:</strong>
              </Card.Text>
              <Card.Text className="mb-1">
                <strong>Valor De Compra:</strong>
              </Card.Text>
              <Card.Text className="mb-1">
                <strong>Valor Actual:</strong>
              </Card.Text>
              <Card.Text className="mb-1">
                <strong>Variación Diaria:</strong>
              </Card.Text>
              <Card.Text className="mb-1">
                <strong>Cantidad:</strong>
              </Card.Text>
            </Col>

            <Col>
              <Card.Text className="mb-1">{simboloData.simbolo}</Card.Text>
              <Card.Text className="mb-1">{simboloData.tipo}</Card.Text>
              <Card.Text className="mb-1">{simboloData.nombre}</Card.Text>
              <Card.Text className="mb-1">
                {simboloData.valorDeCompra}
              </Card.Text>
              <Card.Text className="mb-1">{simboloData.valorActual}</Card.Text>
              <Card.Text className="mb-1">
                {`${simboloData.variacion}%`}
              </Card.Text>
              <Card.Text className="mb-1">{simboloData.cantidad}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center flex-column align-items-center">
          <Row className="mb-4 mt-3">
            <Col>
              <Button
                className="ms-5"
                variant="outline-secondary"
                onClick={handleDecrementCompra}
              >
                -
              </Button>
            </Col>
            <Col>
              <Form.Control
                value={cantidadCompra}
                placeholder="Cantidad"
                onChange={(e) => handleCantidadCompraChange(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                variant="outline-secondary"
                onClick={handleIncrementCompra}
                className="m-0"
              >
                +
              </Button>
            </Col>
            <Col>
              <Button
                className="ms-5"
                variant="primary"
                onClick={handleCompraClick}
              >
                Comprar
              </Button>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col lg={4}>
              <Form.Control
                value={precioDeVenta}
                placeholder="Ingrese el precio de Venta"
                onChange={(e) => handlePrecioDeVentaChange(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                variant="outline-secondary"
                onClick={handleDecrementVenta}
              >
                -
              </Button>
            </Col>
            <Col>
              <Form.Control
                value={cantidadVenta}
                placeholder="Cantidad"
                onChange={(e) => handleCantidadVentaChange(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                variant="outline-secondary"
                onClick={handleIncrementVenta}
              >
                +
              </Button>
            </Col>
            <Col className="ms-1">
              <Button variant="danger" onClick={handleVentaClick}>
                Vender
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};
