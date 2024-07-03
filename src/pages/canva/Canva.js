import React, { useEffect, useState } from "react";
import Canva2D from "./components/Canva2D";
import Canva3D from "./components/Canva3D";

const Canva = () => {
  const [pue, setPue] = useState(1.4);
  const [kwh, setKwh] = useState(15651);

  useEffect(() => {
    setInterval(() => {
      if (pue < 15) {
        setPue((state) => state + Math.random());
      } else {
        setPue(1.4);
      }
      if (kwh < 26310) {
        setKwh((state) => state + Math.ceil(Math.random() * 100));
      } else {
        setKwh(15651);
      }
    }, 10000);
  }, []);
  return (
    <div className="canvaContainer">
      <Canva3D />
      <Canva2D pue={pue} kwh={kwh} />
    </div>
  );
};

export default Canva;
