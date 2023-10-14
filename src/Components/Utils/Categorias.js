import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

export const Categorias = () => {
  const [categorias, setCategorias] = useState([
    //fetch
    "Alimentos",
    "Transporte",
    "Vivienda",
    "Entretenimiento",
    "Salud",
    "Educación",
  ]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState("");
  const [editMode, setEditMode] = useState(false);

  const agregarCategoria = () => {
    if (nuevaCategoria) {
      setCategorias([...categorias, nuevaCategoria]);
      setNuevaCategoria("");
      setShowModal(false);
    }
  };

  const editarCategoria = () => {
    if (categoriaAEditar) {
      const categoriasActualizadas = [...categorias];
      categoriasActualizadas[categorias.indexOf(categoriaAEditar)] =
        nuevaCategoria;
      setCategorias(categoriasActualizadas);
      setCategoriaAEditar("");
      setNuevaCategoria("");
      setShowModal(false);
      setEditMode(false);
    }
  };

  const eliminarCategoria = (categoria) => {
    const categoriasFiltradas = categorias.filter((cat) => cat !== categoria);
    setCategorias(categoriasFiltradas);
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
          <ListGroup>
            {categorias.map((categoria, index) => (
              <ListGroup.Item
                className="d-flex justify-content-between"
                key={index}
              >
                {categoria}
                <div>
                  <Button
                    className="me-1"
                    variant="info"
                    onClick={() => openEditModal(categoria)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => eliminarCategoria(categoria)}
                  >
                    Eliminar
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
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
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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
