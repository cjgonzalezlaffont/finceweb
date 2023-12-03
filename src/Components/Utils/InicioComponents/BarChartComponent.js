import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Tooltip, Legend, ResponsiveContainer } from "recharts";

export const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontFamily: "Arial", fontSize: 8 }} />
        <YAxis tick={{ fontFamily: "Arial", fontSize: 8 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="ingresos" stackId="a" fill="#8884d8" />
        <Bar dataKey="egresos" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
