import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";

export const Categorias = () => {
  const id = "NLUJ7tgp0jKsRivoglHx" //por ahora hardcodeado
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/categorias/" + id)
      try {
        const data = await response.json()
        const categorias = data.categorias
        setCategorias(categorias)
      } catch(error) {

      }
    }
    fetchData()
  }, [])
  
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
                    <strong></strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
            {categorias.map((categoria, index) => (
              <Card key={index} className="mt-2 rounded" style={{height: '50px'}}>
                <Card.Body className="p-2">
                  <div className="row">
                    <div className="col ps-4">{categoria.nombre}</div>
                    <div className="col">{categoria.montoMax}</div>
                    <div className="col">{categoria.descripcion}</div>
                    <div className="col">
                      <button
                        className="me-1"
                        style={{border:"none"}}
                        variant="info"
                        onClick={() => openEditModal(categoria)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} style={{color: "#1764e8",}}/> {/* Icono de edit */}
                      </button>
                      <button
                        className="me-1"
                        variant="info"
                        style={{border:"none"}}
                        onClick={() => eliminarCategoria(categoria)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} style={{color: "#f00000",}}/> {/* Icono de edit */}
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
