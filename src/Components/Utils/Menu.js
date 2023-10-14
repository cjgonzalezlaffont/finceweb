import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <Nav
      className="d-flex flex-column border pt-5 pb-5 ps-3 bg-primary"
      style={{ borderTopRightRadius: "40px" }}
    >
      <NavItem className="flex-grow-1 mt-5 mb-5">
        <Link to="/Cartera" className="text-white">
          Cartera
        </Link>
      </NavItem>
      <NavItem className="flex-grow-1 mb-5">
        <Link to="/Configuracion" className="text-white">
          Configuración
        </Link>
      </NavItem>
      <NavItem className="flex-grow-1 mb-5">
        <Link to="/Inicio" className="text-white">
          Inicio
        </Link>
      </NavItem>
      <NavItem className="flex-grow-1 mb-5">
        <Link to="/Objetivos" className="text-white">
          Objetivos
        </Link>
      </NavItem>
      <NavItem className="flex-grow-1 mb-5">
        <Link to="/PanelGeneral" className="text-white">
          Panel General
        </Link>
      </NavItem>
      <NavItem className="flex-grow-1 mb-5">
        <Link to="/Presupuesto" className="text-white">
          Presupuesto
        </Link>
      </NavItem>
    </Nav>
  );
};
