import React, { useEffect, useState, useCallback } from "react";
import CardPresupuesto from "../Utils/PresupuestoComponents/CardPresupuesto";
import { Row, Col, Button, Container, Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Presupuesto = () => {
  const urlDelete = "http://localhost:8080/api/transactions/deleteTransaction/";
  const urlGetTrans = "http://localhost:8080/api/transactions/getTransactions/";
  const userId = localStorage.getItem("usuarioId");
  const token = sessionStorage.getItem("token").replace(/"/g, "");
  const [transactions, setTransactions] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);

  const getTransactions = useCallback(async () => {
    try {
      const response = await fetch(urlGetTrans + userId, {
        headers: {
          method: "GET",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        if (data) {
          setIncomeAmount(parseInt(data.incomeAmount));
          setExpenseAmount(parseInt(data.expenseAmount));
          setTransactions(data.transactions);
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

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const deleteTransaction = async (tran) => {
    const confirmacion = window.confirm(
      "¿Está seguro que desea eliminar el registro?"
    );

    if (confirmacion) {
      const transactionToDelete = {
        titulo: tran.titulo,
        categoriaId: tran.categoriaId,
        categoriaNombre: tran.categoriaNombre,
        montoConsumido: tran.montoConsumido,
        fecha: tran.fecha,
        tipo: tran.tipo,
        id: tran.id,
      };

      const response = await fetch(urlDelete + userId, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionToDelete),
      });
      try {
        const res = await response.json();

        if (res.status === 200) {
          alert("Transaccion eliminada con exito");
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
      getTransactions();
    }
  };

  return (
    <Container className="mb-2">
      <Row className="mt-4">
        <Col>
          <Card style={{ width: "400px", borderRadius: "30px" }}>
            <CardBody>
              <span>SALDO INGRESADO </span>{" "}
              <strong style={{ color: "green" }}>${incomeAmount}</strong>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "400px", borderRadius: "30px" }}>
            <CardBody>
              <span>SALDO EGRESADO </span>{" "}
              <strong style={{ color: "red" }}>${expenseAmount}</strong>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="m-3">
          <Link to="/Movimientos">
            <Button variant="primary">Agregar Movimiento</Button>
          </Link>
        </Col>
        <Col className="m-3">
          <Link to="/Categorias">
            <Button variant="primary">Ver Categorías</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="bg-primary text-white mx-2 rounded-top">
            <Card.Body className="p-3">
              <div className="row">
                <div className="col-4">
                  <strong>Nombre</strong>
                </div>
                <div className="col-4">
                  <strong>Categoría</strong>
                </div>
                <div className="col-2">
                  <strong>Fecha</strong>
                </div>
                <div className="col-1">
                  <strong>Monto</strong>
                </div>
                <div className="col-1">
                  <strong></strong>
                </div>
              </div>
            </Card.Body>
          </Card>

          <>
            {transactions.length > 0 ? (
              transactions.map((tran, index) => (
                <CardPresupuesto
                  key={tran.id}
                  tran={tran}
                  deleteTransaction={deleteTransaction}
                />
              ))
            ) : (
              <div>
                <br />
                <p>Recopilando datos</p>
                <br />
              </div>
            )}
          </>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="bg-primary text-white mx-2 rounded-top">
            <Card.Body className="p-3">
              <div className="row">
                <div className="col-8">
                  <strong>Total:</strong>
                </div>
                <div className="col" style={{ marginLeft: "20px" }}>
                  <strong>${incomeAmount - expenseAmount}</strong>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
