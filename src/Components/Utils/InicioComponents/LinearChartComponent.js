import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const LinearChartComponent = ({ data }) => {
  const ventanaMediaMovil = data.length;

  const calcularMediaMovil = (data, ventanaMediaMovil, tipo) => {
    return data.map((entry, index) => {
      const sum = data
        .slice(Math.max(0, index - ventanaMediaMovil + 1), index + 1)
        .reduce((acc, d) => acc + d[tipo], 0);

      const mediaMovil = sum / Math.min(ventanaMediaMovil, index + 1);

      return { ...entry, [`${tipo}MediaMovil`]: mediaMovil };
    });
  };

  const dataConMediaMovilIngresos = calcularMediaMovil(
    data,
    ventanaMediaMovil,
    "ingresos"
  );
  const dataConMediaMovil = calcularMediaMovil(
    dataConMediaMovilIngresos,
    ventanaMediaMovil,
    "egresos"
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={dataConMediaMovil}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontFamily: "Arial", fontSize: 8 }} />
        <YAxis tick={{ fontFamily: "Arial", fontSize: 8 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ingresos" stroke="#8884d8" />
        <Line type="monotone" dataKey="ingresosMediaMovil" stroke="#FF0000" />
        <Line type="monotone" dataKey="egresos" stroke="#00FF00" />
        <Line type="monotone" dataKey="egresosMediaMovil" stroke="#FFFF00" />
      </LineChart>
    </ResponsiveContainer>
  );
};
