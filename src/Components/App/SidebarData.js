import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
    {
        title:"Inicio",
        path:"/",
        icons: <AiIcons.AiFillHome />,
        cName:"nav-text",
    },
    {
        title:"Cartera",
        path:"/cartera",
        icons: <FaIcons.FaCartPlus />,
        cName:"nav-text",
    },
    {
        title:"Presupuesto",
        path:"/Presupuesto",
        icons: <IoIcons.IoIosPaper />,
        cName:"nav-text",
    },
    {
        title:"Panel General",
        path:"/PanelGeneral",
        icons: <IoIcons.IoIosPaper />,
        cName:"nav-text",
    },
    {
        title:"Objetivos",
        path:"/Objetivos",
        icons: <IoIcons.IoIosPaper />,
        cName:"nav-text",
    },
    {
        title:"Configuracion",
        path:"/Configuracion",
        icons: <IoIcons.IoIosPaper />,
        cName:"nav-text",
    }
]

