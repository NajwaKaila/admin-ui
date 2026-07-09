import React, { useContext } from "react"; 
import { DarkModeContext } from "../../context/darkModeContext"; 

function Card(props) {
  const { title, link = false, desc } = props;
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className="h-full flex flex-col">
      {/* Judul Card Utama */}
      <div className={`flex justify-between items-center mb-3 transition-colors duration-300 ${
        isDarkMode ? "text-gray-300" : "text-gray-500"
      }`}>
        <div className="text-sm font-bold tracking-wide uppercase">{title}</div> 
        {link && <div className="text-xs text-primary cursor-pointer hover:underline">View All</div>}
      </div>
      
      {/* Box Putih / Gelap pembungkus data internal */}
      <div 
        className={`flex-1 rounded-xl px-6 py-5 shadow-sm border transition-all duration-300 ${
          isDarkMode 
            ? "bg-[#0f0f10] text-gray-200 border-neutral-800/60" 
            : "bg-white text-gray-800 border-gray-100"
        }`}
      >
        {desc}
      </div>
    </div>
  );
}

export default Card;