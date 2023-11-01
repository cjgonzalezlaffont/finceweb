import React, {useEffect, useState} from "react";
import CardPresupuesto from "../Utils/CardPresupuesto";
import { Row, Col, Button, Container, Card, CardBody} from "react-bootstrap";
import { Link } from "react-router-dom";

export const Presupuesto = () => {
  const id = localStorage.getItem("usuarioId");
  const token = sessionStorage.getItem("token");
  const tokenWithoutQuotes = token.replace(/"/g, ""); // Elimina comillas si están presentes
  const authorizationHeader = `Bearer ${tokenWithoutQuotes}`;
  const [transactions, setTransactions] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    
    try {
      const response = await fetch(
        "http://localhost:8080/api/transactions/getTransactions/" + id,
        {
          headers: {
            Authorization : authorizationHeader
          }
        }
      )
      if (response.status == 200) {
        const data = await response.json();
        if (data) {
          setIncomeAmount(data.incomeAmount);
          setExpenseAmount(data.expenseAmount);
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
  };

  const deleteTransaction = async (tran) => {
    console.log(tran)
      const response = await fetch(
        "http://localhost:8080/api/transactions/deleteTransaction/" +
          id +
          "/" +
          tran.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization :  authorizationHeader
          },
        }
      );
      try {
        const data = await response.json();
        if (data.status == 200) {
          //navigate("/Presupuesto") 
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
      getTransactions();
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Card  style={{width:"400px", borderRadius:"30px"}}>
            <CardBody>
              <a>SALDO INGRESADO </a> <strong style={{color:"green"}}>${incomeAmount}</strong>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card style={{width:"400px", borderRadius:"30px"}}>
            <CardBody>
              <a>SALDO EGRESADO </a> <strong style={{color:"red"}}>${expenseAmount}</strong>
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
                <div className="col">
                  <strong>Nombre</strong>
                </div>
                <div className="col">
                  <strong>Categoría</strong>
                </div>
                <div className="col">
                  <strong>Fecha</strong>
                </div>
                <div className="col">
                  <strong>Monto</strong>
                </div>
                <div className="col-1">
                  <strong></strong>
                </div>
              </div>
            </Card.Body>
          </Card>
          {transactions.map((tran, index) => (
            <CardPresupuesto tran={tran}
                             deleteTransaction={deleteTransaction}
            />
          ))}
        </Col>
      </Row>
      <Row >
        <Col>
          <Card className="bg-primary text-white mx-2 rounded-top">
            <Card.Body className="p-3">
              <div className="row">
                <div className="col-8">
                  <strong>Total:</strong>
                </div>
                <div className="col" style={{marginLeft:"20px"}}>
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
