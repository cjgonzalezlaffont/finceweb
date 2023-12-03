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
  const [isDataFetched, setIsDataFetched] = useState(false);

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

        if (!response.ok) {
          console.error(`Error en fetch: ${response.status}`);
          alert(`Error: recopilando datdos del usuario`);
          return;
        }
        if (!isDataFetched) {
          const data = await response.json();
          setCarteraData(data.portfolio);
          setIsDataFetched(true);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        alert(`Error en la solicitud: ${error.message}`);
      }
    };

    if (!isDataFetched) {
      console.log("FETCH");
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {carteraData.length > 0 ? (
            <TablaCartera data={carteraData} />
          ) : (
            <p>Recopilando datos disponibles.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
