import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Fince Logo</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <Link to="/Ingresar" className="nav-link">
            Ingresar
          </Link>
          <Link to="/Registrar" className="nav-link">
            Registrarse
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
