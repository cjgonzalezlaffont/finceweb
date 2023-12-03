const descriptions = {
  conservador:
    "Este perfil es adecuado para inversionistas que desean minimizar el riesgo y buscan un crecimiento estable a lo largo del tiempo.",
  moderado:
    "El perfil moderado ofrece un equilibrio entre riesgo y recompensa, adecuado para inversionistas que buscan un crecimiento moderado con cierto nivel de riesgo.",
  arriesgado:
    "Los inversionistas arriesgados buscan altas recompensas y están dispuestos a asumir un riesgo significativo. Este perfil es adecuado para aquellos que pueden tolerar la volatilidad en sus inversiones.",
};

const dataBarChart = [
  { month: "Enero", ingresos: 1000, egresos: 800 },
  { month: "Febrero", ingresos: 1500, egresos: 1100 },
  { month: "Marzo", ingresos: 1200, egresos: 1000 },
  { month: "Abril", ingresos: 2000, egresos: 1500 },
  { month: "Mayo", ingresos: 1800, egresos: 1400 },
  { month: "Junio", ingresos: 1600, egresos: 1200 },
  { month: "Julio", ingresos: 2200, egresos: 1800 },
  { month: "Agosto", ingresos: 2400, egresos: 1900 },
  { month: "Septiembre", ingresos: 2100, egresos: 1700 },
  { month: "Octubre", ingresos: 2500, egresos: 2000 },
  { month: "Noviembre", ingresos: 2700, egresos: 2100 },
  { month: "Diciembre", ingresos: 2300, egresos: 1900 },
];

const miniCardData = [
  { symbol: "AAPL", variation: 1.23 },
  { symbol: "GOOGL", variation: -0.56 },
  { symbol: "AMZN", variation: 0.87 },
  { symbol: "MSFT", variation: -0.32 },
  { symbol: "TSLA", variation: 2.45 },
  { symbol: "FB", variation: -1.12 },
  { symbol: "NFLX", variation: 1.76 },
  { symbol: "NVDA", variation: -0.64 },
  { symbol: "CASLA", variation: 0.99 },
  { symbol: "JPM", variation: -0.21 },
];

const datosRecomendaciones = [
  {
    simbolo: "AAPL",
    nombre: "Apple Inc.",
    variacion: "20",
    valorActual: 10.0,
  },
  {
    simbolo: "GOOGL",
    nombre: "Alphabet Inc.",
    variacion: "5",
    valorActual: 12.0,
  },
  {
    simbolo: "MSFT",
    nombre: "Microsoft Corporation",
    variacion: "15",
    valorActual: 14.0,
  },
  {
    simbolo: "AMZN",
    nombre: "Amazon.com Inc.",
    variacion: "10",
    valorActual: 9.0,
  },
  {
    simbolo: "TSLA",
    nombre: "Tesla, Inc.",
    variacion: "-5",
    valorActual: 20.0,
  },
  {
    simbolo: "NVDA",
    nombre: "NVIDIA Corporation",
    variacion: "18",
    valorActual: 25.0,
  },
  {
    simbolo: "FB",
    nombre: "Meta Platforms, Inc.",
    variacion: "8",
    valorActual: 22.0,
  },
  {
    simbolo: "T",
    nombre: "AT&T Inc.",
    vriacion: "-2",
    valorActual: 27.0,
  },
  {
    simbolo: "GOOG",
    nombre: "Alphabet Inc. (Clase C)",
    variacion: "4",
    valorActual: 30.0,
  },
  {
    simbolo: "BABA",
    nombre: "Alibaba Group Holding Limited",
    variacion: "12",
    valorActual: 45.0,
  },
];

export { descriptions, dataBarChart, miniCardData, datosRecomendaciones };
