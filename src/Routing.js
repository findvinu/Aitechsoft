import { Route, Routes } from "react-router-dom";
import GridTable from "./pages/products/GridTable";
import Home from "./pages/Home";
import StepperComponent from "./pages/products/StepperComponent";
import TabsComponent from "./pages/products/TabsComponent";

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/grid-table" element={<GridTable />} />
      <Route path="/stepper" element={<StepperComponent />} />
      <Route path="/tabs" element={<TabsComponent />} />
      <Route path="*" component={() => <div>404 Not Found</div>} />
    </Routes>
  );
};

export default Routing;
