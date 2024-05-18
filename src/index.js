import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import store from "./store/store";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
  </React.StrictMode>
);
