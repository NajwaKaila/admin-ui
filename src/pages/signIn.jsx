import React, { useContext, useState } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignIn from "../components/Elements/Fragments/FormSignIn";
import { loginService } from "../services/authService";
import { AuthContext } from "../context/authContext";
import AppSnackbar from "../components/Elements/AppSnackbar";
import { DarkModeContext } from "../context/darkModeContext";
// Import icon dari material UI
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";

function SignIn() {
  const { login } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await loginService(email, password);
      const tokenBaru = response?.refreshToken;

      if (tokenBaru) {
        localStorage.setItem("token", tokenBaru);
        login(tokenBaru);

        setSnackbar({
          open: true,
          message: "Login berhasil",
          severity: "success",
        });
      } else {
        console.error("Token kosong dari API");
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.msg || "Login gagal, periksa email/password Anda",
        severity: "error",
      });
    }
  };

  return (
    /* SOLUSI: Bungkus AuthLayout dengan div yang memaksakan skema warna 
      gelap pekat #1e1e1f jika isDarkMode bernilai true.
    */
    <div className={`min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? "bg-[#1e1e1f] text-white dark" : "bg-white text-gray-800"
    }`}>
      <AuthLayout>
        {/* Form Input Login */}
        <FormSignIn onSubmit={handleLogin} />

        {/* TOMBOL TOGGLE DI BAWAH FORM LOGIN */}
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleDarkMode}
            type="button"
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isDarkMode 
                ? "border-neutral-700 bg-[#2d2d2e] hover:bg-neutral-800 text-yellow-500" 
                : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <WbSunnyIcon fontSize="small" className="transition-transform duration-300" />
            ) : (
              <NightlightRoundIcon fontSize="small" className="transition-transform duration-300" />
            )}
          </button>
        </div>

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </AuthLayout>
    </div>
  );
}

export default SignIn;