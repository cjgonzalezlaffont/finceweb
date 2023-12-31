import React from "react";
import Table from "react-bootstrap/Table";

export const TablaRecomendaciones = ({ data }) => {
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
            <strong>Variación</strong>
          </th>
          <th>
            <strong>Valor Actual</strong>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((fila, index) => (
          <tr key={index}>
            <td>{fila.simbolo}</td>
            <td>{fila.nombre}</td>
            <td
              className={fila.variacion >= 0 ? "text-success" : "text-danger"}
            >
              {fila.variacion}%
            </td>
            <td>{fila.valorActual}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
