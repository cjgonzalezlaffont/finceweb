import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <Nav className="flex-column border pt-5 pb-5 ps-5 h-100 d-flex flex-column justify-content-between">
      <NavItem>
        <Link to="/Cartera">Cartera</Link>
      </NavItem>
      <NavItem>
        <Link to="/Configuracion">Configuracion</Link>
      </NavItem>
      <NavItem>
        <Link to="/Inicio">Inicio</Link>
      </NavItem>
      <NavItem>
        <Link to="/Objetivos">Objetivos</Link>
      </NavItem>
      <NavItem>
        <Link to="/PanelGeneral">Panel General</Link>
      </NavItem>
      <NavItem>
        <Link to="/Presupuesto">Presupuesto</Link>
      </NavItem>
    </Nav>
  );
};
