import React from "react";
import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Registrar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmContrasena: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "correo") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(value)) {
        setEmailError("El correo electrónico no es válido");
      } else {
        setEmailError("");
      }
    }
  };

  useEffect(() => {
    if (formData.contrasena === "" && formData.confirmContrasena === "") {
      setPasswordError("");
    } else {
      if (formData.contrasena === formData.confirmContrasena) {
        setPasswordError("Confirmacion ok!");
      } else {
        setPasswordError("Confirme su contraseña");
      }
    }
  }, [formData.contrasena, formData.confirmContrasena]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch
    fetch("http://localhost:8080/users/new-user", {
      method: "POST",
      body: JSON.stringify({
        //paso el formato del endpoint
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        contrasena: formData.contrasena,
        perfil: "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // navegar a panel general u otra page
          navigate("/Ingresar");
          console.log("CARGA OK");
        } else {
          // errores de internos back existencia del usuario por ej.
          console.log("CARGA NO OK");
        }
      })
      .catch((error) => {
        // Manejar errores de red aquí
      });
  };

  return (
    <Card className="w-50 mx-auto mt-1">
      <Card.Body>
        <Card.Title>Registro de Usuario</Card.Title>
        <Form className="align-content-center" onSubmit={handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={formData.nombre}
              name="nombre"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="apellido" className="mt-2">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu apellido"
              value={formData.apellido}
              name="apellido"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="correo" className="mt-2">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={formData.correo}
              name="correo"
              onChange={handleChange}
            />
            {emailError && <div className="text-danger">{emailError}</div>}
          </Form.Group>

          <Form.Group controlId="contrasena" className="mt-2">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={formData.contrasena}
              name="contrasena"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="confirmContrasena" className="mt-2">
            <Form.Label>Confirmación de Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmar contraseña"
              value={formData.confirmContrasena}
              name="confirmContrasena"
              onChange={handleChange}
            />
            {passwordError && (
              <div className="text-danger">{passwordError}</div>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Registrarse
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
