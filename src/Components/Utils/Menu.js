import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <Nav
      className="flex-column border pt-5 pb-5 ps-3 h-100 bg-primary"
      style={{ borderTopRightRadius: "10px" }}
    >
      <NavItem className="pb-2">
        <Link to="/Cartera" className="text-white">
          Cartera
        </Link>
      </NavItem>
      <NavItem className="pb-2">
        <Link to="/Configuracion" className="text-white">
          Configuracion
        </Link>
      </NavItem>
      <NavItem className="pb-2">
        <Link to="/Inicio" className="text-white">
          Inicio
        </Link>
      </NavItem>
      <NavItem className="pb-2">
        <Link to="/Objetivos" className="text-white">
          Objetivos
        </Link>
      </NavItem>
      <NavItem className="pb-2">
        <Link to="/PanelGeneral" className="text-white">
          Panel General
        </Link>
      </NavItem>
      <NavItem className="pb-2">
        <Link to="/Presupuesto" className="text-white">
          Presupuesto
        </Link>
      </NavItem>
    </Nav>
  );
};
