import React from "react";
import AreaDoubleLineChart from "./AreaDoubleLineChart";
import AnimatedNumbers from "react-animated-numbers";
const RightChartComponent = (props) => {
  const { pue, kwh } = props;
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
  const progressData = [
    {
      id: "HQ14F-MX480",
      in: 4382,
      out: 5472,
    },
    {
      id: "HQ14F-MX960",
      in: 4772,
      out: 3200,
    },
    {
      id: "TG3F-MX480",
      in: 320,
      out: 281,
    },
  ];

  const ProgressComponent = (data) => {
    return (
      <div className="progress-item">
        <span>{data.id}</span>
        <hr />
        <div className="data-area">
          <div className="title">IN-Total</div>
          <div className="value">
            {data.in}
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
            {data.out}
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
      <div className="tab-area">
        <img src="./layout/burger.svg" alt="" />
        <div className="tab-box">
          <div className="tab active">Digicentre</div>
          <div className="tab">中和</div>
          <div className="tab">國分</div>
        </div>
      </div>
      <div className="chart-box">
        <div className="vertical-box">
          <div className="data-area">
            <div className="title">Today PUE</div>
            <div className="value">
              <AnimatedNumbers
                includeComma
                transitions={(index) => ({
                  type: "spring",
                  duration: index + 0.3,
                })}
                animateToNumber={pue}
              />
            </div>
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
            <div className="value">
              <AnimatedNumbers
                includeComma
                transitions={(index) => ({
                  type: "spring",
                  duration: index + 0.3,
                })}
                animateToNumber={kwh}
              />
            </div>
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
        {progressData.map((data) => ProgressComponent(data))}
      </div>
      <div className="cell-box">
        {cellData.map((data) => CellComponent(data))}
      </div>
    </div>
  );
};

export default RightChartComponent;
