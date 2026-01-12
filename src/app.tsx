import React from "react";
import { createRoot } from "react-dom/client";
import "./output.css"; // Import the global stylesheet
import App from "./app/index";

document.body.style.margin = "0";
document.body.style.padding = "0";

const root = createRoot(document.body);
root.render(<App />);
