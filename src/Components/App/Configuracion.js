import React from "react";
import { useState, useEffect } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Modal, Row, Col } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { descriptions } from "../../Assets/strings.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

export const Configuracion = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token").replace(/"/g, "");
  const userId = localStorage.getItem("usuarioId");
  const contrasena = localStorage.getItem("contrasena");
  const urlUser = "http://localhost:8080/api/users/";

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasenaAntigua: "",
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
    console.log("handleChange - Contrasena:", formData.contrasena);
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
      if (
        formData.contrasena === formData.confirmContrasena &&
        formData.contrasena !== contrasena
      ) {
        setPasswordError("Confirmación ok!");
      } else {
        setPasswordError("Confirme su contraseña");
      }
    }
    if (formData.contrasena === contrasena) {
      setPasswordError("La contraseña ingresada ya fue utilizada");
    }
  }, [formData.contrasena, formData.confirmContrasena, contrasena]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(urlUser + userId, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo,
          contrasena: formData.contrasena || contrasena,
          perfil: formData.perfil,
        }),
      });

      if (response.status === 200) {
        alert("Usuario actualizado exitosamente");
        localStorage.setItem("contrasena", formData.contrasena || contrasena);
        navigate("/Presupuesto");
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

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDown = () => {
    setShowPassword(true);
  };
  const handleMouseUp = () => {
    setShowPassword(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlUser + userId, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("DATAAAAAAAAAAAAAAAAAAAAAAA");
          console.log(data);
          setFormData({
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            contrasenaAntigua: contrasena,
            contrasena: "",
            confirmContrasena: "",
            perfil: data.perfil,
          });
        } else {
          console.error("Error al obtener datos del usuario");
        }
      } catch (error) {
        console.error("Error en la solicitud de datos del usuario:", error);
      }
    };

    fetchData();
  }, [userId, token, contrasena]);

  return (
    <Container
      className="mt-3 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="w-50 mx-auto">
        <Card.Body>
          <Card.Title>Configuración</Card.Title>

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

            <Form.Group className="mt-2">
              <Form.Label>Contraseña anterior</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={contrasena}
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ml-2 p-1"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="contrasena" className="mt-2">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nueva Contraseña"
                value={formData.contrasena}
                name="contrasena"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="confirmContrasena" className="mt-2">
              <Form.Label>Confirmar nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmar nueva contraseña"
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
                Actualizar Perfil
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
