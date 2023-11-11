import React from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
            <strong>Cantidad</strong>
          </th>
          <th>
            <strong>Valor de Compra</strong>
          </th>
          <th>
            <strong>Variación</strong>
          </th>
          <th>
            <strong>Valor Actual</strong>
          </th>
          <th>
            <strong>Detalles</strong>
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
              <Button variant="info" onClick={() => handleButtonClick(activo)}>
                Ver Detalles
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
