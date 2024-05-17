import { Route, Routes } from "react-router-dom";
import GridTable from "./pages/products/GridTable";
import Home from "./pages/Home";
import StepperComponent from "./pages/Products_bk/StepperComponent";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<GridTable />} />
            <Route path="/grid-table" element={<GridTable />} />
            <Route path="/stepper" element={<StepperComponent />} />
        </Routes>
    )
}

export default Routing;
