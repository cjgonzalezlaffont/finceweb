import React from "react";
import { Container } from "react-bootstrap";
import { TablaCartera } from "../Utils/TablaCartera";

export const Cartera = () => {
  //aca va el fetch

  const datos = [
    {
      simbolo: "AAPL",
      nombre: "Apple Inc.",
      cantidad: 100,
      valorCompra: 150.0,
      variacion: "20%",
      valorActual: 10.0,
    },
    {
      simbolo: "GOOGL",
      nombre: "Alphabet Inc.",
      cantidad: 50,
      valorCompra: 2500.0,
      variacion: "5%",
      valorActual: 12.0,
    },
    {
      simbolo: "MSFT",
      nombre: "Microsoft Corporation",
      cantidad: 75,
      valorCompra: 300.0,
      variacion: "15%",
      valorActual: 14.0,
    },
    {
      simbolo: "AMZN",
      nombre: "Amazon.com Inc.",
      cantidad: 40,
      valorCompra: 3500.0,
      variacion: "10%",
      valorActual: 9.0,
    },
    {
      simbolo: "TSLA",
      nombre: "Tesla, Inc.",
      cantidad: 30,
      valorCompra: 700.0,
      variacion: "-5%",
      valorActual: 20.0,
    },
    {
      simbolo: "NVDA",
      nombre: "NVIDIA Corporation",
      cantidad: 60,
      valorCompra: 250.0,
      variacion: "18%",
      valorActual: 25.0,
    },
    {
      simbolo: "FB",
      nombre: "Meta Platforms, Inc.",
      cantidad: 55,
      valorCompra: 320.0,
      variacion: "8%",
      valorActual: 22.0,
    },
    {
      simbolo: "T",
      nombre: "AT&T Inc.",
      cantidad: 90,
      valorCompra: 28.0,
      variacion: "-2%",
      valorActual: 27.0,
    },
    {
      simbolo: "GOOG",
      nombre: "Alphabet Inc. (Clase C)",
      cantidad: 45,
      valorCompra: 2550.0,
      variacion: "4%",
      valorActual: 30.0,
    },
    {
      simbolo: "BABA",
      nombre: "Alibaba Group Holding Limited",
      cantidad: 35,
      valorCompra: 180.0,
      variacion: "12%",
      valorActual: 45.0,
    },
  ];

  return (
    <Container className="mb-5">
      <TablaCartera data={datos} />
    </Container>
  );
};
