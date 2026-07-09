import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        return jwtDecode(token);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        return null;
      }
    };

    return null;
  });

  const login = (token) => {
    try {
      // 1. Ambil nilai string token murni jika yang dikirim berupa objek
      const tokenString = typeof token === "string" 
        ? token 
        : token?.refreshToken || token?.token || token?.accessToken;

      if (!tokenString) {
        console.error("Token tidak ditemukan pada argumen login");
        return;
      }

      // 2. LANGSUNG SIMPAN KE LOCALSTORAGE (Ditaruh paling atas agar PASTI masuk & tidak terhalang error)
      localStorage.setItem("token", tokenString);

      // 3. Proses decode ditaruh di dalam try-catch internal agar jika gagal, aplikasi tidak mogok
      try {
        const decoded = jwtDecode(tokenString);
        setUser(decoded);
      } catch (decodeErr) {
        console.error("Gagal men-decode JWT, tetapi token tetap disimpan:", decodeErr);
        // Fallback jika tidak bisa didecode, set user dengan data minimal agar tidak null
        setUser({ name: "User" }); 
      }

    } catch (err) {
      console.error("Error pada fungsi login context:", err);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
