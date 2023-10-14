import React from "react";
import Table from "react-bootstrap/Table";

export const TablaCartera = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Símbolo</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Valor de Compra</th>
          <th>Variación</th>
          <th>Valor Actual</th>
        </tr>
      </thead>
      <tbody>
        {data.map((fila, index) => (
          <tr key={index}>
            <td>{fila.simbolo}</td>
            <td>{fila.nombre}</td>
            <td>{fila.cantidad}</td>
            <td>{fila.valorCompra}</td>
            <td>{fila.variacion}</td>
            <td>{fila.valorActual}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
