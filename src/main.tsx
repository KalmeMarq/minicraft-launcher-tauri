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

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
