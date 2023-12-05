import React from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../Images/LogoNuevo.png";

export const Home = () => {
  const cardStyle = {
    backgroundColor: "#105f93",
    padding: "20px",
    borderRadius: "10px",
  };
  const imageContainerStyle = {
    width: "50%",
    margin: "0 auto",
  };
  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col md={6}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title className="text-center">
                <div style={imageContainerStyle}>
                  <Image src={Logo} alt="Logo" fluid />
                </div>
              </Card.Title>
              <Card.Text className="text-center text-white">
                Bienvenido a Fince. Por favor, selecciona una opción:
              </Card.Text>
              <div className="text-center mt-4">
                <Link to="/Ingresar" className="btn btn-primary mr-2">
                  Ingresar
                </Link>
                <Link to="/Registrar" className="btn btn-secondary">
                  Registrarse
                </Link>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="text-center">
                <Link to="/Recordar" className="text-light">
                  ¿Olvido su contraseña?
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
