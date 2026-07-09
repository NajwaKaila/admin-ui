import React, { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    
    // TRIK TOTAL: Pasang class "dark" di <html> SEKALIGUS di <body> agar Tailwind tidak lolos
    const html = window.document.documentElement;
    const body = window.document.body;

    if (isDarkMode) {
      html.classList.add("dark");
      body.classList.add("dark");
      body.style.backgroundColor = "#121212"; // Paksa warna background body menjadi gelap
    } else {
      html.classList.remove("dark");
      body.classList.remove("dark");
      body.style.backgroundColor = ""; // Kembalikan ke normal
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};