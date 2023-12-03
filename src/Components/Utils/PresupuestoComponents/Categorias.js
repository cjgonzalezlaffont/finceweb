import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    montoMax: 0,
    descripcion: "",
    tipo: 1,
  });
  const [categoriaAEditar, setCategoriaAEditar] = useState({
    id: null,
    nombre: "",
    montoMax: 0,
    descripcion: "",
    tipo: 1,
  });
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const urlGetCat = "http://localhost:8080/api/categories/";
  const urlCreateCat = "http://localhost:8080/api/categories/";
  const urlUpdateCat = "http://localhost:8080/api/categories/update/";
  const urlDeleteCat = "http://localhost:8080/api/categories/delete/";
  const token = sessionStorage.getItem("token").replace(/"/g, "");
  const userId = localStorage.getItem("usuarioId");
  const navigate = useNavigate();

  const obtenerCategorias = useCallback(async () => {
    try {
      const response = await fetch(urlGetCat + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
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
  }, [userId, token]);

  const agregarCategoria = async () => {
    if (nuevaCategoria.nombre.trim() !== "") {
      try {
        const response = await fetch(urlCreateCat + userId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nuevaCategoria),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error(`Error: ${response.status} ${errorResponse.error}`);
          alert(`Error: ${response.status} ${errorResponse.error}`);
          return;
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.result);
        }

        setShowAgregarModal(false);
        await obtenerCategorias();
        setNuevaCategoria({
          nombre: "",
          montoMax: 0,
          descripcion: "",
          tipo: 1,
        });
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const editarCategoria = async () => {
    if (categoriaAEditar.nombre.trim() !== "") {
      try {
        const categoriaEdit = {
          nombre: categoriaAEditar.nombre,
          montoMax: parseFloat(categoriaAEditar.montoMax),
          descripcion: categoriaAEditar.descripcion,
          tipo: categoriaAEditar.tipo,
        };

        const response = await fetch(
          urlUpdateCat + userId + "/" + categoriaAEditar.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(categoriaEdit),
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error(`Error: ${response.status} ${errorResponse.error}`);
          alert(`Error: ${response.status} ${errorResponse.error}`);
          return;
        }

        const data = await response.json();

        if (data) {
          alert("Update exitoso");
        } else {
          throw new Error("Error actualizando categoria");
        }

        await obtenerCategorias();
        setShowEditarModal(false);
        setEditMode(false);
        setCategoriaAEditar({
          id: null,
          nombre: "",
          montoMax: 0,
          descripcion: "",
          tipo: 1,
        });
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const eliminarCategoria = async (categoria) => {
    const response = await fetch(urlDeleteCat + userId + "/" + categoria.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

  const openAgregarModal = () => {
    setEditMode(false);
    setShowAgregarModal(true);
  };

  const openEditarModal = (categoria) => {
    setEditMode(true);
    setCategoriaAEditar({
      id: categoria.id,
      nombre: categoria.nombre,
      montoMax: categoria.montoMax,
      descripcion: categoria.descripcion,
      tipo: categoria.tipo,
    });
    setShowEditarModal(true);
  };

  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Categorías</h1>
          <Button className="mb-3" variant="primary" onClick={openAgregarModal}>
            Agregar Categoría
          </Button>

          <Container className="mb-4">
            <Card className="bg-primary text-white mb-3 rounded-top">
              <Card.Body className="p-3">
                <div className="row">
                  <div className="col-2">
                    <strong>Nombre</strong>
                  </div>
                  <div className="col-2">
                    <strong>Monto Maximo</strong>
                  </div>
                  <div className="col">
                    <strong>Descripcion</strong>
                  </div>
                  <div className="col-2">
                    <strong>Tipo</strong>
                  </div>
                  <div className="col-1">
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
                    <div className="col-2 ps-4">{categoria.nombre}</div>
                    <div className="col-2">{categoria.montoMax}</div>
                    <div className="col" style={{ overflow: "hidden" }}>
                      {categoria.descripcion}
                    </div>
                    <div className="col-2">
                      {categoria.tipo === 1 ? "Ingreso" : "Egreso"}
                    </div>
                    <div className="col-1">
                      <button
                        className="me-1"
                        style={{ border: "none", backgroundColor: "#fff" }}
                        variant="info"
                        onClick={() => openEditarModal(categoria)}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: "#1764e8" }}
                        />
                      </button>
                      <button
                        className="me-1"
                        variant="info"
                        style={{
                          border: "none",
                          backgroundColor: "#fff",
                          marginLeft: "10px",
                        }}
                        onClick={() => eliminarCategoria(categoria)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          style={{ color: "#f00000" }}
                        />
                      </button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Container>
          <Button
            className="mb-3"
            variant="primary"
            onClick={() => navigate("/Presupuesto")}
          >
            Volver a presupuesto
          </Button>
        </Col>
      </Row>

      {/* Modal para agregar categoría */}
      <Modal show={showAgregarModal} onHide={() => setShowAgregarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              value={nuevaCategoria.nombre}
              onChange={(e) =>
                setNuevaCategoria({
                  ...nuevaCategoria,
                  nombre: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Monto máximo a destinar</Form.Label>
            <Form.Control
              type="number"
              value={nuevaCategoria.montoMax}
              onChange={(e) =>
                setNuevaCategoria({
                  ...nuevaCategoria,
                  montoMax: e.target.value,
                })
              }
              disabled={parseInt(nuevaCategoria.tipo) === 1}
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
                setNuevaCategoria({
                  ...nuevaCategoria,
                  tipo: parseInt(e.target.value, 10),
                })
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
              setShowAgregarModal(false);
              setNuevaCategoria({
                nombre: "",
                montoMax: 0,
                descripcion: "",
                tipo: 1,
              });
            }}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={agregarCategoria}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar categoría */}
      <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              value={editMode ? categoriaAEditar.nombre : ""}
              onChange={(e) =>
                setCategoriaAEditar({
                  ...categoriaAEditar,
                  nombre: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Monto máximo a destinar</Form.Label>
            <Form.Control
              type="number"
              value={categoriaAEditar.montoMax}
              onChange={(e) =>
                setCategoriaAEditar({
                  ...categoriaAEditar,
                  montoMax: e.target.value,
                })
              }
              disabled={parseInt(categoriaAEditar.tipo, 10) === 1}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              value={editMode ? categoriaAEditar.descripcion : ""}
              onChange={(e) =>
                setCategoriaAEditar({
                  ...categoriaAEditar,
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
              value={editMode ? categoriaAEditar.tipo : 1}
              onChange={(e) =>
                setCategoriaAEditar({
                  ...categoriaAEditar,
                  tipo: parseInt(e.target.value, 10),
                })
              }
            >
              <option value="0">Egreso</option>
              <option value="1">Ingreso</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowEditarModal(false);
              setEditMode(false);
              setCategoriaAEditar({
                id: null,
                nombre: "",
                montoMax: 0,
                descripcion: "",
                tipo: 1,
              });
            }}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={editarCategoria}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
