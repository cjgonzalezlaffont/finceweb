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

const datosCartera = [
  {
    simbolo: "AAPL",
    nombre: "Apple Inc.",
    cantidad: 100,
    valorCompra: 150.0,
    variacion: "20",
    valorActual: 10.0,
  },
  {
    simbolo: "GOOGL",
    nombre: "Alphabet Inc.",
    cantidad: 50,
    valorCompra: 2500.0,
    variacion: "5",
    valorActual: 12.0,
  },
  {
    simbolo: "MSFT",
    nombre: "Microsoft Corporation",
    cantidad: 75,
    valorCompra: 300.0,
    variacion: "15",
    valorActual: 14.0,
  },
  {
    simbolo: "AMZN",
    nombre: "Amazon.com Inc.",
    cantidad: 40,
    valorCompra: 3500.0,
    variacion: "10",
    valorActual: 9.0,
  },
  {
    simbolo: "TSLA",
    nombre: "Tesla, Inc.",
    cantidad: 30,
    valorCompra: 700.0,
    variacion: "-5",
    valorActual: 20.0,
  },
  {
    simbolo: "NVDA",
    nombre: "NVIDIA Corporation",
    cantidad: 60,
    valorCompra: 250.0,
    variacion: "18",
    valorActual: 25.0,
  },
  {
    simbolo: "FB",
    nombre: "Meta Platforms, Inc.",
    cantidad: 55,
    valorCompra: 320.0,
    variacion: "8",
    valorActual: 22.0,
  },
  {
    simbolo: "T",
    nombre: "AT&T Inc.",
    cantidad: 90,
    valorCompra: 28.0,
    variacion: "-2",
    valorActual: 27.0,
  },
  {
    simbolo: "GOOG",
    nombre: "Alphabet Inc. (Clase C)",
    cantidad: 45,
    valorCompra: 2550.0,
    variacion: "4",
    valorActual: 30.0,
  },
  {
    simbolo: "BABA",
    nombre: "Alibaba Group Holding Limited",
    cantidad: 35,
    valorCompra: 180.0,
    variacion: "12",
    valorActual: 45.0,
  },
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

const tablaDataPanelGeneral = [
  {
    simbolo: "BONO001",
    nombre: "Bono Corporativo A",
    precio: 100.5,
    variacionDiaria: 1.25,
    tipo: "Bonos",
  },
  {
    simbolo: "BONO002",
    nombre: "Bono Corporativo B",
    precio: 98.7,
    variacionDiaria: -0.75,
    tipo: "Bonos",
  },
  {
    simbolo: "BONO003",
    nombre: "Bono Gubernamental X",
    precio: 95.1,
    variacionDiaria: -0.3,
    tipo: "Bonos",
  },
  {
    simbolo: "BONO004",
    nombre: "Bono Municipal Y",
    precio: 102.3,
    variacionDiaria: 0.8,
    tipo: "Bonos",
  },
  {
    simbolo: "BONO005",
    nombre: "Bono Corporativo C",
    precio: 101.8,
    variacionDiaria: 0.6,
    tipo: "Bonos",
  },
  {
    simbolo: "FCI001",
    nombre: "Fondo Común de Inversión X",
    precio: 50.25,
    variacionDiaria: -0.75,
    tipo: "Fondo Común de Inversión",
  },
  {
    simbolo: "FCI002",
    nombre: "Fondo Común de Inversión Y",
    precio: 49.8,
    variacionDiaria: -0.9,
    tipo: "Fondo Común de Inversión",
  },
  {
    simbolo: "FCI003",
    nombre: "Fondo de Renta Fija A",
    precio: 48.6,
    variacionDiaria: -0.5,
    tipo: "Fondo Común de Inversión",
  },
  {
    simbolo: "FCI004",
    nombre: "Fondo de Renta Variable B",
    precio: 52.1,
    variacionDiaria: 1.2,
    tipo: "Fondo Común de Inversión",
  },
  {
    simbolo: "FCI005",
    nombre: "Fondo de Renta Variable C",
    precio: 53.5,
    variacionDiaria: 1.6,
    tipo: "Fondo Común de Inversión",
  },
  {
    simbolo: "CEDEAR001",
    nombre: "CEDEAR Empresa Y",
    precio: 75.1,
    variacionDiaria: 0.8,
    tipo: "CEDEARs",
  },
  {
    simbolo: "CEDEAR002",
    nombre: "CEDEAR Empresa Z",
    precio: 79.2,
    variacionDiaria: 1.2,
    tipo: "CEDEARs",
  },
  {
    simbolo: "CEDEAR003",
    nombre: "CEDEAR Tecnológico X",
    precio: 82.3,
    variacionDiaria: 1.8,
    tipo: "CEDEARs",
  },
  {
    simbolo: "CEDEAR004",
    nombre: "CEDEAR Energético A",
    precio: 78.5,
    variacionDiaria: 1.0,
    tipo: "CEDEARs",
  },
  {
    simbolo: "CEDEAR005",
    nombre: "CEDEAR Bancario B",
    precio: 85.7,
    variacionDiaria: 2.3,
    tipo: "CEDEARs",
  },
  {
    simbolo: "ACC001",
    nombre: "Acciones de Compañía Z",
    precio: 120.75,
    variacionDiaria: 2.1,
    tipo: "Acciones",
  },
  {
    simbolo: "ACC002",
    nombre: "Acciones de Compañía X",
    precio: 125.8,
    variacionDiaria: 2.7,
    tipo: "Acciones",
  },
  {
    simbolo: "ACC003",
    nombre: "Acciones de Compañía A",
    precio: 110.5,
    variacionDiaria: 1.5,
    tipo: "Acciones",
  },
  {
    simbolo: "ACC004",
    nombre: "Acciones de Compañía B",
    precio: 118.3,
    variacionDiaria: 2.0,
    tipo: "Acciones",
  },
  {
    simbolo: "ACC005",
    nombre: "Acciones de Compañía Y",
    precio: 130.2,
    variacionDiaria: 3.0,
    tipo: "Acciones",
  },
];

export {
  descriptions,
  dataBarChart,
  miniCardData,
  datosCartera,
  datosRecomendaciones,
  tablaDataPanelGeneral,
};
