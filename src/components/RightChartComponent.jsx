import React from "react";
import AreaDoubleLineChart from "./AreaDoubleLineChart";

const RightChartComponent = () => {
  const cellData = [
    {
      title: "PDU",
      image: "./layout/server.svg",
      value: 201,
    },
    {
      title: "Access",
      image: "./layout/database.svg",
      value: 113,
    },
    {
      title: "Water Leak",
      image: "./layout/water.svg",
      value: 14,
    },
    {
      title: "Aircon",
      image: "./layout/air-conditioning.svg",
      value: 85,
    },
    {
      title: "Fire",
      image: "./layout/fire-extinguisher.svg",
      value: 71,
    },
    {
      title: "UPS",
      image: "./layout/battery.svg",
      value: 55,
    },
    {
      title: "Temp/Humi",
      image: "./layout/temperature.svg",
      value: "22/50",
    },
  ];
  const ProgressComponent = () => {
    return (
      <div className="progress-item">
        <span>HQ14F-MX480</span>
        <hr />
        <div className="data-area">
          <div className="title">IN-Total</div>
          <div className="value">
            4,382
            <span className="unit">Mbps </span>
          </div>
        </div>
        <div className="progress">
          <div></div>
          <div></div>
        </div>
        <div className="data-area">
          <div className="title tar">IN-Total</div>
          <div className="value blue">
            4,382
            <span className="unit">Mbps </span>
          </div>
        </div>
      </div>
    );
  };
  const CellComponent = (data) => {
    return (
      <div className="cell-item">
        <span>{data.title}</span>
        <div className="data-area">
          <div className="icon">
            <img src={data.image} alt="" />
          </div>
          <div className="value">{data.value}</div>
        </div>
      </div>
    );
  };
  return (
    <div id="right-panel" className="panel-box">
      <div className="tab-area"></div>
      <div className="chart-box">
        <div className="vertical-box">
          <div className="data-area">
            <div className="title">Today PUE</div>
            <div className="value">1.40</div>
          </div>
          <div className="data-area">
            <div className="title">Highest</div>
            <div className="value">1.44</div>
          </div>
          <div className="data-area">
            <div className="title">Lowest</div>
            <div className="value">1.38</div>
          </div>
        </div>
        <AreaDoubleLineChart />
      </div>
      <div className="chart-box">
        <div className="vertical-box">
          <div className="data-area">
            <div className="title">Today KWH</div>
            <div className="value">15,651</div>
          </div>
          <div className="data-area">
            <div className="title">Highest</div>
            <div className="value">699</div>
          </div>
          <div className="data-area">
            <div className="title">Lowest</div>
            <div className="value">607</div>
          </div>
        </div>
        <AreaDoubleLineChart />
      </div>
      <div className="col-box">
        <ProgressComponent />
        <ProgressComponent />
        <ProgressComponent />
      </div>
      <div className="cell-box">
        {cellData.map((data) => CellComponent(data))}
      </div>
    </div>
  );
};

export default RightChartComponent;
