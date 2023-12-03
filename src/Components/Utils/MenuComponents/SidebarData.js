import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faWallet,
  faHouse,
  faCartPlus,
  faScrewdriverWrench,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";

export const SidebarData = [
  {
    title: "Inicio",
    path: "/Inicio",
    icons: <FontAwesomeIcon icon={faHouse} />,
    cName: "nav-text",
  },
  {
    title: "Cartera",
    path: "/Cartera",
    icons: <FontAwesomeIcon icon={faCartPlus} />,
    cName: "nav-text",
  },
  {
    title: "Presupuesto",
    path: "/Presupuesto",
    icons: <FontAwesomeIcon icon={faWallet} />,
    cName: "nav-text",
  },
  {
    title: "Panel General",
    path: "/PanelGeneral",
    icons: <FontAwesomeIcon icon={faMoneyBillTrendUp} />,
    cName: "nav-text",
  },
  {
    title: "Objetivos",
    path: "/Objetivos",
    icons: <FontAwesomeIcon icon={faMedal} />,
    cName: "nav-text",
  },
  {
    title: "Configuracion",
    path: "/Configuracion",
    icons: <FontAwesomeIcon icon={faScrewdriverWrench} />,
    cName: "nav-text",
  },
];
