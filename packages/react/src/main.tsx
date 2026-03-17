import React from "react";
import ReactDOM from "react-dom/client";
// import { ComponentShowcase } from './ComponentShowcase';
import { LandingPageExample } from "./examples";
import "../../../theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LandingPageExample />
  </React.StrictMode>,
);
