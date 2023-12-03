import React from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./TablaCartera.css";

export const TablaCartera = ({ data }) => {
  const navigate = useNavigate();

  const handleButtonClick = (activo) => {
    navigate(`/Simbolo/${activo.simbolo}`, { state: activo });
  };

  return (
    <Table striped bordered hover responsive className="mt-2">
      <thead>
        <tr>
          <th>
            <strong>Símbolo</strong>
          </th>
          <th>
            <strong>Nombre</strong>
          </th>
          <th>
            <strong>Cant.</strong>
          </th>
          <th>
            <strong>Precio Comp.</strong>
          </th>
          <th>
            <strong>Variación</strong>
          </th>
          <th>
            <strong>Precio Act.</strong>
          </th>
          <th>
            <strong>Info</strong>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((activo, index) => (
          <tr key={index}>
            <td>{activo.simbolo}</td>
            <td>{activo.nombre}</td>
            <td>{activo.cantidad}</td>
            <td>{activo.valorDeCompra}</td>
            <td
              className={activo.variacion >= 0 ? "text-success" : "text-danger"}
            >
              {activo.variacion}%
            </td>
            <td>{activo.valorActual}</td>
            <td>
              <Button
                style={{ fontSize: "12px" }}
                variant="info"
                onClick={() => handleButtonClick(activo)}
              >
                Ver
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
