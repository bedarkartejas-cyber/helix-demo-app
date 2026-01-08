import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/index";
import "./output.css"; // Import the global stylesheet

document.body.style.margin = "0";
document.body.style.padding = "0";

const root = createRoot(document.body);
root.render(<App />);
