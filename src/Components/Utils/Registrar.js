import React from "react";
import { useState, useEffect } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { descriptions } from "../../Assets/strings.js";

export const Registrar = () => {
  const navigate = useNavigate();

  const urlCreateUser = "http://localhost:8080/api/users/";
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmContrasena: "",
    perfil: 0,
  });
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPerfil, setSelectedPerfil] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handleChange - Perfil:", formData.perfil);
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

  const handleConservador = () => {
    setSelectedPerfil("conservador");
    setShowModal(true);
  };

  const handleModerado = () => {
    setSelectedPerfil("moderado");
    setShowModal(true);
  };

  const handleArriesgado = () => {
    setSelectedPerfil("arriesgado");
    setShowModal(true);
  };

  useEffect(() => {
    if (formData.contrasena === "" && formData.confirmContrasena === "") {
      setPasswordError("");
    } else {
      if (formData.contrasena === formData.confirmContrasena) {
        setPasswordError("Confirmación ok!");
      } else {
        setPasswordError("Confirme su contraseña");
      }
    }
  }, [formData.contrasena, formData.confirmContrasena]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit - Perfil:", formData.perfil);
    try {
      const response = await fetch(urlCreateUser, {
        method: "POST",
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo,
          contrasena: formData.contrasena,
          perfil: formData.perfil,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        const data = await response.json();
        if (data) {
          sessionStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("mail", JSON.stringify(data.correo));
          localStorage.setItem("usuarioId", data.userId);
          localStorage.setItem("contrasena", formData.contrasena);
          console.log("Bienvenido a Fince!!");
          navigate("/Presupuesto");
        }
      } else {
        const errorResponse = await response.json();
        if (errorResponse.error) {
          console.error(`Error: ${response.status} ${errorResponse.error}`);
          alert(`Error: ${response.status} ${errorResponse.error}`);
        } else {
          console.error(`Error: ${response.status} ${response.statusText}`);
          alert(`Error: ${response.status} ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="w-50 mx-auto">
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

            <Row>
              <Col>
                <Form.Group controlId="perfil" className="mt-3">
                  <Form.Label>Seleccione su Perfil de inversor:</Form.Label>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="perfil" className="mt-2">
                  <div className="mb-2">
                    <label className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="perfil"
                        value="0"
                        checked={formData.perfil === 0}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            perfil: parseInt(e.target.value),
                          }))
                        }
                      />{" "}
                      <span className="ml-1">Conservador</span>
                      <Button
                        variant="link"
                        className="btn-link"
                        onClick={() => handleConservador()}
                      >
                        <FaInfoCircle />
                      </Button>
                    </label>
                  </div>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="perfil" className="mt-2">
                  <div className="mb-2">
                    <label className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="perfil"
                        value="1"
                        checked={formData.perfil === 1}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            perfil: parseInt(e.target.value),
                          }))
                        }
                      />{" "}
                      <span className="ml-2">Moderado</span>
                      <Button
                        variant="link"
                        className="btn-link"
                        onClick={() => handleModerado()}
                      >
                        <FaInfoCircle />
                      </Button>
                    </label>
                  </div>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="perfil" className="mt-2">
                  <div className="mb-2">
                    <label className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="perfil"
                        value="2"
                        checked={formData.perfil === 2}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            perfil: parseInt(e.target.value),
                          }))
                        }
                      />{" "}
                      <span className="ml-2">Arriesgado</span>
                      <Button
                        variant="link"
                        className="btn-link"
                        onClick={() => handleArriesgado()}
                      >
                        <FaInfoCircle />
                      </Button>
                    </label>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Button variant="primary" type="submit" className="mt-3">
                Registrarse
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Descripción del perfil {selectedPerfil}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{descriptions[selectedPerfil]}</Modal.Body>
      </Modal>
    </Container>
  );
};
