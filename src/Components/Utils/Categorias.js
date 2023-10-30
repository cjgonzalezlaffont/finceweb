import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export const Categorias = () => {
  const id = localStorage.getItem("usuarioId"); //por ahora hardcodeado
  const [categorias, setCategorias] = useState([]);
  const token = sessionStorage.getItem("token").toString()

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    
    try {
      const response = await fetch(
        "http://localhost:8080/api/categories/" + id,
        {
          headers: {
            Authorization :  'Bearer ' + token,
          }
        }
      )
      if (response.status == 201) {
        console.log(token)
        const data = await response.json();
        if (data) {
          const categorias = data;
          setCategorias(categorias);
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
      console.log(error.message);
    }
  };

  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    montoMax: 0,
    descripcion: "",
    tipo: 0,
  });
  const [showModal, setShowModal] = useState(false);

  const [categoriaAEditar, setCategoriaAEditar] = useState({
    montoMax: 0,
    descripcion: "",
    tipo: 0,
  });
  const [editMode, setEditMode] = useState(false);

  const agregarCategoria = async () => {
    if (nuevaCategoria) {
      setNuevaCategoria("");

      const response = await fetch(
        "http://localhost:8080/categorias/new-categorie/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" :  `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(nuevaCategoria),
        }
      );
      try {
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.result);
        }
      } catch (error) {
        console.log(error.message);
      }
      obtenerCategorias();
      setShowModal(false);
    }
  };

  const editarCategoria = async () => {
    if (nuevaCategoria) {
      //setNuevaCategoria("");
      const categoriaEdit = {
        montoMax: nuevaCategoria.montoMax,
        descripcion: nuevaCategoria.descripcion,
        tipo: nuevaCategoria.tipo,
      };
      const response = await fetch(
        "http://localhost:8080/categorias/edit-categorie/" +
          id +
          "/" +
          nuevaCategoria.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization" :  `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(categoriaEdit),
        }
      );
      try {
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
      obtenerCategorias();
      setShowModal(false);
      setEditMode(false);
      setCategoriaAEditar("");
      setNuevaCategoria("");
    }
  };

  const eliminarCategoria = async (categoria) => {
    const response = await fetch(
      "http://localhost:8080/categorias/delete-categorie/" +
        id +
        "/" +
        categoria.id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization" :  `Bearer ${localStorage.getItem("token")}`
        },
      }
    );
    try {
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    obtenerCategorias();
  };

  const openEditModal = (categoria) => {
    setCategoriaAEditar(categoria);
    setNuevaCategoria(categoria);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Categorías</h1>
          <Button
            className="mb-3"
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            Agregar Categoría
          </Button>

          <Container className="mb-4">
            <Card className="bg-primary text-white mb-3 rounded-top">
              <Card.Body className="p-3">
                <div className="row">
                  <div className="col">
                    <strong>Nombre</strong>
                  </div>
                  <div className="col">
                    <strong>Monto Maximo</strong>
                  </div>
                  <div className="col">
                    <strong>Descripcion</strong>
                  </div>
                  <div className="col">
                    <strong>Tipo</strong>
                  </div>
                  <div className="col">
                    <strong></strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
            {categorias.map((categoria, index) => (
              <Card
                key={index}
                className="mt-2 rounded"
                style={{ height: "auto" }}
              >
                <Card.Body className="p-2">
                  <div className="row">
                    <div className="col ps-4">{categoria.nombre}</div>
                    <div className="col">{categoria.montoMax}</div>
                    <div
                      className="col"
                      style={{ maxHeight: "50px", overflow: "hidden" }}
                    >
                      {categoria.descripcion}
                    </div>
                    <div className="col">
                      {categoria.tipo ? "Ingreso" : "Egreso"}
                    </div>
                    <div className="col">
                      <button
                        className="me-1"
                        style={{ border: "none" }}
                        variant="info"
                        onClick={() => openEditModal(categoria)}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: "#1764e8" }}
                        />{" "}
                        {/* Icono de edit */}
                      </button>
                      <button
                        className="me-1"
                        variant="info"
                        style={{ border: "none" }}
                        onClick={() => eliminarCategoria(categoria)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          style={{ color: "#f00000" }}
                        />{" "}
                        {/* Icono de borrar */}
                      </button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Container>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Editar Categoría" : "Agregar Categoría"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              value={nuevaCategoria.nombre}
              onChange={(e) =>
                setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })
              }
              disabled={editMode ? true : false}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Monto maximo a destinar</Form.Label>
            <Form.Control
              type="number"
              value={nuevaCategoria.montoMax}
              onChange={(e) =>
                setNuevaCategoria({
                  ...nuevaCategoria,
                  montoMax: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              value={nuevaCategoria.descripcion}
              onChange={(e) =>
                setNuevaCategoria({
                  ...nuevaCategoria,
                  descripcion: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as="select"
              name="tipo"
              value={nuevaCategoria.tipo}
              onChange={(e) =>
                setNuevaCategoria({ ...nuevaCategoria, tipo: e.target.value })
              }
            >
              <option value="1">Ingreso</option>
              <option value="0">Egreso</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setNuevaCategoria("");
              setEditMode(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={editMode ? editarCategoria : agregarCategoria}
          >
            {editMode ? "Guardar Cambios" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
