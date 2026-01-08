import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/index";
import "./output.css"; // Import the global stylesheet

const root = createRoot(document.body);
root.render(<App />);
