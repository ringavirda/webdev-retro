import "./src/style.css";
import App from "./src/App";
import { createRoot } from "react-dom/client";
import React from "react";

const renderer = document.querySelector("app-root");
if (renderer !== null) {
  createRoot(renderer).render(React.createElement(App));
}
