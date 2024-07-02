import Canva2D from "./components/Canva2D";
import Canva3D from "./components/Canva3D";

const Canva = () => {
  return (
    <div className="canvaContainer">
      <Canva3D />
      <Canva2D />
    </div>
  );
};

export default Canva;
