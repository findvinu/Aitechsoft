import { Route, Routes } from "react-router-dom";
import GridTable from "./pages/products/GridTable";
import Home from "./pages/Home";
import StepperComponent from "./pages/products/StepperComponent";
import TabsComponent from "./pages/products/TabsComponent";
import ModalComponent from "./pages/products/ModalComponent";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grid-table" element={<GridTable />} />
      <Route path="/stepper" element={<StepperComponent />} />
      <Route path="/tabs" element={<TabsComponent />} />
    </Routes>
  );
};

export default Routing;
