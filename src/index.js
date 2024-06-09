import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const basename = process.env.REACT_APP_GH_PAGES_BASE_URL || "";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
