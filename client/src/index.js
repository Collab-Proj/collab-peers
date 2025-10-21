import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/Header"; //import { AppContextProvider } from "./context/AppContext";
import AppContextProvider from "./context/AppContext.js";
// /import { AppContextProvider } from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
