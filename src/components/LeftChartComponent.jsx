import React from "react";
import AreaSingleLineChart from "./AreaSingleLineChart";
import AreaDoubleLineChart from "./AreaDoubleLineChart";

const LeftChartComponent = () => {
  return (
    <div id="left-panel" className="panel-box">
      <div className="unit-box">
        <div className="title row">
          <img src="./layout/Union.svg" alt="" />
          <span>伺服器</span>
        </div>
        <div className="chart-box">
          <AreaSingleLineChart type={"CPU"} />
          <AreaSingleLineChart type={"Memory"} />
          <div className="data-area">
            <div className="data-box">
              <div className="title">啟動服務數</div>
              <div className="value">
                342
                <span className="unit">件</span>
              </div>
            </div>
            <div className="data-box">
              <div className="title">服務連線數</div>
              <div className="value">
                11,543
                <span className="unit">件</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="unit-box">
        <div className="title row">
          <img src="./layout/Union.svg" alt="" />
          <span>資料庫</span>
        </div>
        <div className="chart-box">
          <AreaDoubleLineChart chartType={"monotone"} />
          <AreaDoubleLineChart chartType={"monotone"} />
          <div className="data-area">
            <div className="data-box">
              <div className="title">執行數</div>
              <div className="value">
                223
                <span className="unit">件</span>
              </div>
            </div>
            <div className="data-box">
              <div className="title">執行等待數</div>
              <div className="value">
                343
                <span className="unit">件</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftChartComponent;
