import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  CartesianAxis,
} from "recharts";
const AreaSingleLineChart = (props) => {
  const { type } = props;
  const data = [
    {
      name: "07:00",
      CPU: 80,
      Memory: 80,
    },
    {
      name: "08:00",
      CPU: 60,
      Memory: 60,
    },
    {
      name: "09:00",
      CPU: 98,
      Memory: 98,
    },
    {
      name: "10:00",
      CPU: 132,
      Memory: 132,
    },
    {
      name: "11:00",
      CPU: 31,
      Memory: 31,
    },
    {
      name: "12:00",
      CPU: 196,
      Memory: 196,
    },
    {
      name: "13:00",
      CPU: 74,
      Memory: 74,
    },
    {
      name: "14:00",
      CPU: 72,
      Memory: 72,
    },
  ];
  return (
    <>
      <span>{type}</span>
      <ResponsiveContainer width="100%" height="100%" minHeight={`100px`}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="single-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0.192708" stop-color="#E6E6E6" />
              <stop offset="1" stop-color="#E6E6E6" stopOpacity="0.2" />
              {/* <stop offset="100%" stopColor="#E6E6E6" stopOpacity={0.2} /> */}
              {/* <stop offset="20%" stopColor="#E6E6E6" stopOpacity={1} /> */}
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <CartesianAxis y={} /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={type}
            stroke="#E6E6E6"
            fill="url(#single-area)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default AreaSingleLineChart;
