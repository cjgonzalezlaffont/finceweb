import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Ingresar = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const loginUrl = "http://localhost:8080/api/users/login";
  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (
      (correo === "" && contrasena === "") ||
      (correo !== "" && emailPattern.test(correo))
    ) {
      setError("");
    } else {
      if (!emailPattern.test(correo)) {
        setError("El correo electrónico no válido");
      } else {
        setError("El correo electrónico válido");
      }
    }
  }, [correo, contrasena]);

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: correo, contrasena: contrasena }),
      });
      if (response.status === 200) {
        const data = await response.json();

        if (data) {
          sessionStorage.setItem("token", JSON.stringify(data.token));
          console.log("el token es" + data.token);
          localStorage.setItem("mail", JSON.stringify(data.user.correo));
          localStorage.setItem("usuarioId", data.userId);
          console.log("Validacion Exitosa!!");
          navigate("/Presupuesto");
        }
      } else {
        setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      setError(
        "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <Card className="w-50 mx-auto mt-5">
      <Card.Body>
        <Card.Title>Iniciar Sesión</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={correo}
              onChange={handleCorreoChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={handleContrasenaChange}
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button variant="primary" type="submit" className="mt-3">
            Iniciar Sesión
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
