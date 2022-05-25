import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.scss";
import Modal from "react-modal";
import { SettingsProvider } from "@frontend/context/SettingsContext";

Modal.setAppElement("#root");

const Root = () => {
  return (
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
};

// console.log("_self" in React.createElement("div"));
const root = document.getElementById("root") as HTMLDivElement;
ReactDOM.createRoot(root).render(<Root />);
