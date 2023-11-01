import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const CardPresupuesto = (props) => {
  const {tran, deleteTransaction} = props

  return (
    <Container className="mb-3">
      <Card className="mt-2 rounded">
        <Card.Body className="p-1">
          <div className="row">
            <div className="col ps-4">{tran.titulo}</div>
            <div className="col">{tran.categoriaNombre}</div>
            <div className="col">{tran.fecha}</div>
            <div className="col">{tran.montoConsumido}</div>
            <div style={{display:"none"}}>{tran.id}</div>
            <div className="col-1">
              <button
                className="me-1"
                variant="info"
                style={{ border: "none", backgroundColor:"#fff" }}
                onClick={() => deleteTransaction(tran)}
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
    </Container>
  );
};

export default CardPresupuesto;
