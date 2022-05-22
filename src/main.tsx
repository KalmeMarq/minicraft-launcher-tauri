import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.scss";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
