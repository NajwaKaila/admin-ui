import React, { useContext, useState } from "react";
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Icon from "../Elements/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import { logoutService } from "../../services/authService";
import { Backdrop, CircularProgress } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";

function MainLayout(props) {
  const { children } = props;
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction" },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expenses" }, 
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  const { user, logout } = useContext(AuthContext);
  
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setTimeout(async () => {
        try {
          await logoutService();
          logout(); 
          navigate("/login");
        } catch (err) {
          console.error(err);
          if (err.status === 401) {
            logout();
            navigate("/login");
          }
        } finally {
          setIsLoggingOut(false);
        }
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoggingOut(false);
    }
  };
  
  return (
    <>
      <div className={`flex min-h-screen ${theme.name} ${isDarkMode ? "bg-[#0f0f10] text-white" : "bg-white text-gray-800"} transition-colors duration-300`}>
        
        {/* SIDEBAR */}
        <aside className="bg-defaultBlack w-24 sm:w-56 text-special-bg2 flex flex-col justify-between px-4 py-12 flex-shrink-0 border-r border-neutral-800">
          <div>
            <div className="mb-10">
              <Logo variant="secondary" />
            </div>
            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
          </div>  

          {/* THEMES AREA */}
          <div>
            <div className="flex justify-between items-center mb-4 pr-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Themes</span>
              <button 
                onClick={toggleDarkMode}
                className="text-gray-400 hover:text-white transition-all cursor-pointer"
                type="button"
              >
                {isDarkMode ? <WbSunnyIcon fontSize="small" className="text-yellow-500" /> : <NightlightRoundIcon fontSize="small" />}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-center">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer mb-2`}
                  onClick={() => setTheme(t)}
                ></div>
              ))}
            </div>
          </div>              

          {/* FOOTER SIDEBAR */}
          <div>
            <div onClick={handleLogout} className="cursor-pointer">
              <div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md">
                <div className="mx-auto sm:mx-0 text-primary">
                  <Icon.Logout size={20} color="white" />
                </div>
                <div className="ms-3 hidden sm:block">Logout</div>
              </div>
            </div>
            <div className="border my-10 border-neutral-800"></div>
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden sm:block text-xs truncate flex-1 text-gray-400 ms-3">
                <div className="text-white font-medium">{user.name}</div>
                <div>View Profile</div>
              </div>
              <div className="hidden sm:block text-gray-400">
                <Icon.Detail size={15} />
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENT UTAMA */}
        <div className={`flex-1 flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0b]" : "bg-special-mainBg"}`}>
          
          {/* HEADER */}
          <header className={`px-6 py-7 flex justify-between items-center transition-colors duration-300 border-b ${
            isDarkMode ? "bg-[#0f0f10] border-neutral-800 text-white" : "border-gray-05 bg-white text-gray-800"
          }`}>
            <div className="flex items-center">
              {/* Beri kelas warna eksplisit agar teks nama user selalu putih kontras */}
              <div className={`font-bold text-2xl me-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>{user.name}</div> 
              <div className="text-gray-400 flex items-center">
                <Icon.ChevronRight size={20} />
                <span className="text-sm font-medium ms-1">May 19, 2023</span>
              </div> 
            </div>
            <div className="flex items-center gap-4">
              <div className="text-primary cursor-pointer">
                <NotificationsIcon className="scale-110" />
              </div> 
              <Input 
                backgroundColor={isDarkMode ? "bg-[#1c1c1e]" : "bg-white"} 
                border={isDarkMode ? "border-neutral-700 text-white" : "border-gray-200"} 
              /> 
            </div>
          </header>

          {/* MAIN CONTENT COMPONENT */}
          {/* Tambah paksaan style kontras global agar element teks kecil bawaan ikut menjadi abu terang/putih */}
          <main className={`flex-1 px-6 py-6 overflow-y-auto ${isDarkMode ? "[&_h2]:text-white [&_h3]:text-gray-200 [&_span]:text-gray-300 [&_div]:text-gray-200" : ""}`}>
            {children}
          </main>
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        open={isLoggingOut}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <CircularProgress color="inherit" size={50} />
          <p className="text-white text-sm font-medium tracking-wide">Logging Out</p>
        </div>
      </Backdrop>
    </>
  );
}

export default MainLayout;