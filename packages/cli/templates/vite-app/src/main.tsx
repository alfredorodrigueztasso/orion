import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@orion-ds/react";
import "@orion-ds/react/styles.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
