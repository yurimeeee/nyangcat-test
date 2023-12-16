import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(process.env.PUBLIC_URL);
root.render(
  // <HashRouter>
  <App />
  // </HashRouter>
);
