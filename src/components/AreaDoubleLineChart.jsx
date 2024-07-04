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
const AreaDoubleLineChart = (props) => {
  const { chartType } = props;
  const data = [
    {
      name: "07:00",
      CPU: 80,
      connectiveNum: 60,
    },
    {
      name: "08:00",
      CPU: 60,
      connectiveNum: 98,
    },
    {
      name: "09:00",
      CPU: 98,
      connectiveNum: 21,
    },
    {
      name: "10:00",
      CPU: 132,
      connectiveNum: 56,
    },
    {
      name: "11:00",
      CPU: 31,
      connectiveNum: 189,
    },
    {
      name: "12:00",
      CPU: 196,
      connectiveNum: 160,
    },
    {
      name: "13:00",
      CPU: 74,
      connectiveNum: 123,
    },
    {
      name: "14:00",
      CPU: 72,
      connectiveNum: 33,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id="gradient1"
            x1="104.5"
            y1="1"
            x2="104.5"
            y2="61"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.213542" stop-color="#4DBEFE" />
            <stop offset="1" stop-color="#4DBEFE" stop-opacity="0.2" />
          </linearGradient>
          <linearGradient
            id="gradient2"
            x1="104.688"
            y1="1.375"
            x2="104.688"
            y2="55"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.192708" stop-color="#E6E6E6" />
            <stop offset="1" stop-color="#E6E6E6" stop-opacity="0.2" />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Tooltip />
        <Area
          type={chartType}
          dataKey="CPU"
          stroke="#4DBEFE"
          fillOpacity={1}
          fill="url(#gradient1)"
        />
        <Area
          type={chartType}
          dataKey="connectiveNum"
          stroke="#E6E6E6"
          fillOpacity={1}
          fill="url(#gradient2)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaDoubleLineChart;
