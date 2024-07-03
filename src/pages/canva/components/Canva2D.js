import LeftChartComponent from "../../../components/LeftChartComponent";
import LogoComponent from "../../../components/LogoComponent";
import RightChartComponent from "../../../components/RightChartComponent";
import React from "react";

import "../../../style.css";
import Header from "../../../components/Header";
import BottomTable from "../../../components/BottomTable";

const Canva2D = (props) => {
  const { pue, kwh } = props;
  return (
    <div id="canvas2d">
      <Header />
      <LeftChartComponent />
      <BottomTable />
      <LogoComponent />
      <RightChartComponent pue={pue} kwh={kwh} />
    </div>
  );
};

export default Canva2D;
