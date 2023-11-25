import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as HiIcons from "react-icons/hi2";
import * as BiIcons from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

export const SidebarData = [
  {
    title: "Inicio",
    path: "/Inicio",
    icons: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Cartera",
    path: "/Cartera",
    icons: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Presupuesto",
    path: "/Presupuesto",
    icons: <BiIcons.BiSolidWallet />,
    cName: "nav-text",
  },
  {
    title: "Panel General",
    path: "/PanelGeneral",
    icons: <IoIcons.IoIosPaper />,
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
    icons: <HiIcons.HiWrenchScrewdriver />,
    cName: "nav-text",
  },
];
