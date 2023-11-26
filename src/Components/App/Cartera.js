import React from "react";
import { useEffect, useState } from "react";
import { TablaCartera } from "../Utils/CarteraComponents/TablaCartera";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Cartera = () => {
  const [carteraData, setCarteraData] = useState([]);
  const urlPortfolio = "http://localhost:8080/api/portfolio/getPortfolio/";
  const token = sessionStorage.getItem("token").replace(/"/g, "");
  const userId = localStorage.getItem("usuarioId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlPortfolio + userId, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCarteraData(data.portfolio);
        } else {
          console.error("Error al obtener datos de la cartera");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchData();
  }, [token, userId]);

  return (
    <Container className="mb-5 mt-5">
      <Card>
        <Card.Header>
          <Card.Title
            as="h3"
            className="d-flex justify-content-between align-items-center"
          >
            <span>Cartera</span>
            <Link to="/Recomendaciones">
              <Button variant="primary">Ir a Recomendaciones</Button>
            </Link>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <TablaCartera data={carteraData} />
        </Card.Body>
      </Card>
    </Container>
  );
};
