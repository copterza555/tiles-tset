import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // ✅ ต้อง import App ที่ถูกต้อง
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ ใช้ BrowserRouter ที่นี่ เท่านั้น! */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
