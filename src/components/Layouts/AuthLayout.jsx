import React, { useContext } from 'react';
import Logo from "../Elements/Logo";
import { ThemeContext } from '../../context/themeContext';
import { DarkModeContext } from '../../context/darkModeContext'; 

function AuthLayout(props) {
    const { children } = props;
    const { theme } = useContext(ThemeContext);
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        /* Menambahkan selektor CSS dinamis: [&_label]:text-gray-200 dan [&_p]:text-white 
           sehingga judul input form login terpaksa berubah putih abu terang yang jernih saat dark mode aktif
        */
        <main 
            className={`min-h-screen flex justify-center items-center transition-colors duration-300 ${theme.name} ${
                isDarkMode 
                  ? "bg-[#1e1e1f] text-white [&_label]:text-gray-200 [&_p]:text-white [&_span]:text-gray-300" 
                  : "bg-special-mainBg text-gray-800"
            }`}
        >
            <div className="w-full max-w-[340px]">
                <Logo />
                {children}
            </div>
        </main>
    );
}

export default AuthLayout;