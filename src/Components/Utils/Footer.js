import React from "react";
import { Container, Row, Col } from "react-bootstrap";
//import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <Container>
      <Row className="align-items-center bg-light">
        <Col xs={12} md={6}>
          <p className="mb-0">FINCE</p>
        </Col>
        <Col xs={12} md={6}>
          <div className="social-icons">
            <p>aca van los iconos</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
