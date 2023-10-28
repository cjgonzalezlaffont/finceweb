import React, {useState} from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Menu } from "./Menu";
import "./Menu.css"; 

export const Header = () => {
  
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  const menuClassName = `menu ${menuVisible ? 'visible' : 'oculto'}`;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Fince Logo</Navbar.Brand>
      <Button onClick={toggleMenu}>
              {menuVisible ? 'Ocultar Menú' : 'Mostrar Menú'}
      </Button>

      <Menu headerAMenu = {menuClassName}/>

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
