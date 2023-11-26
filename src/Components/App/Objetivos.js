import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import { Card, Button, Row, Col, Container, Form } from "react-bootstrap";

export const Objetivos = () => {
  const urlObtenerObjetivos = "http://localhost:8080/api/objectives/";
  const urlCrearObjetivo = "http://localhost:8080/api/objectives/newObjective/";
  const urlEditarObjetivo =
    "http://localhost:8080/api/objectives/updateObjective/";
  const urlEliminarObjetivo =
    "http://localhost:8080/api/objectives/deleteObjective/";

  const token = sessionStorage.getItem("token").replace(/"/g, "");
  const userId = localStorage.getItem("usuarioId");

  const [objetivos, setObjetivos] = useState({ objetivos: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    monto: "",
    fecha: "",
    progreso: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(urlObtenerObjetivos + userId, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setObjetivos(data);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [token, userId, setObjetivos]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAgregarObjetivo = async () => {
    try {
      const response = await fetch(urlCrearObjetivo + userId, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchData();
        closeModal();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error adding objective:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, userId, fetchData]);

  const openModal = (index = null) => {
    setEditingIndex(index);
    setModalIsOpen(true);

    if (index !== null) {
      const objetivo = objetivos.objetivos[index];
      setFormData({
        objetivoId: objetivo.objetivoId,
        nombre: objetivo.nombre,
        descripcion: objetivo.descripcion,
        monto: objetivo.monto,
        fecha: objetivo.fecha,
        progreso: objetivo.progreso,
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        monto: "",
        fecha: "",
        progreso: "",
      });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditarObjetivo = async () => {
    try {
      const response = await fetch(`${urlEditarObjetivo}${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newObjetivos = [...objetivos.objetivos];
        newObjetivos[editingIndex] = formData;
        setObjetivos({ objetivos: newObjetivos });
        closeModal();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error editing objective:", error);
    }
  };

  const handleEliminarObjetivo = async (objetivoId, index) => {
    try {
      const response = await fetch(
        `${urlEliminarObjetivo}${userId}/${objetivoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const newObjetivos = objetivos.objetivos.filter((_, i) => i !== index);
        setObjetivos({ objetivos: newObjetivos });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error deleting objective:", error);
    }
  };

  return (
    <Container className="mt-5 align-items-center justify-content-center">
      <Button className="m-3" onClick={() => openModal()}>
        Agregar Objetivo
      </Button>
      <Row xs={1} md={3} className="g-4 m-5">
        {objetivos.objetivos.map((objetivo, index) => (
          <Col key={index}>
            <Card>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{objetivo.nombre}</Card.Title>
                <Card.Text>{objetivo.descripcion}</Card.Text>
                <Card.Text>{objetivo.monto}</Card.Text>
                <Card.Text>{objetivo.fecha}</Card.Text>
                <Card.Text>{objetivo.progreso}%</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button onClick={() => openModal(index)}>Editar</Button>
                  <Button
                    className="bg-danger"
                    onClick={() =>
                      handleEliminarObjetivo(objetivo.objetivoId, index)
                    }
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        className="col-12"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <Container className="mt-3 d-flex align-items-center justify-content-center">
          <Card className="m-5 col-5">
            <Card.Body>
              <Card.Title>
                {editingIndex !== null ? "Editar" : "Agregar"} Objetivo
              </Card.Title>
              <Form>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
                <Form.Label>Monto:</Form.Label>
                <Form.Control
                  type="text"
                  name="monto"
                  value={formData.monto}
                  onChange={handleInputChange}
                />
                <Form.Label>Fecha:</Form.Label>
                <Form.Control
                  type="text"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />

                <div className="d-flex justify-content-between m-3">
                  <Button
                    type="button"
                    onClick={
                      editingIndex !== null
                        ? handleEditarObjetivo
                        : handleAgregarObjetivo
                    }
                  >
                    {editingIndex !== null ? "Editar" : "Agregar"}
                  </Button>
                  <Button onClick={closeModal}>Volver</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </Modal>
    </Container>
  );
};
