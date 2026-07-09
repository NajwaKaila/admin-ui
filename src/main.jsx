import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
// 1. IMPORT DARKMODEPROVIDER YANG BARU KITA BUAT
import { DarkModeProvider } from "./context/darkModeContext.jsx"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        {/* 2. BUNGKUS APP MENGGUNAKAN DARKMODEPROVIDER */}
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);