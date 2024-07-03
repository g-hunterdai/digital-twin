import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Canva from "./pages/canva/Canva";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Canva />} />
      </Routes>
    </Router>
  );
}
