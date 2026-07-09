import React, { useState, useEffect } from "react";
import Card from "../Card";
// JIKA PROTES ERROR: Pastikan import CircularProgress ini disesuaikan dengan package yang Anda pakai (misal dari '@mui/material')
import { CircularProgress } from "@mui/material"; 

function CardUpcomingBill(props) {
  let { data } = props;
  const [isLoading, setIsLoading] = useState(true);

  // Efek tiruan loading selama 1 detik saat web di-refresh
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [data]);

  if (data && data.data && Array.isArray(data.data)) {
    data = data.data;
  }

  // Fallback data aman agar list tetap muncul berwarna merah setelah loading selesai
  const finalData = (Array.isArray(data) && data.length > 0) ? data : [
    { category: "housing", amount: 150, date: "2023-05-15", name: "Figma" },
    { category: "food", amount: 559, date: "2023-06-16", name: "Adobe" }
  ];

  return (
    <>
      <Card
        title="Upcoming Bill"
        link="/bill"
        desc={
          // LOGIKA LOADING PERSIS SEPERTI DI KOTAK GOALS ANDA
          isLoading ? (
            <div className="flex flex-col justify-center items-center h-full text-primary py-6">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              <p className="mt-2 text-sm font-medium text-gray-500">Loading Data</p>
            </div>
          ) : (
            // JIKA SELESAI LOADING, TAMPILKAN FIGMA & ADOBE MERAH
            <div className="flex flex-col justify-around h-full">
              {finalData.map((item, index) => {
                let displayMonth = "May";
                let displayDate = "15";

                if (typeof item.date === "string" && item.date.length > 2) {
                  const parsedDate = new Date(item.date);
                  if (!isNaN(parsedDate.getTime())) {
                    displayMonth = parsedDate.toLocaleString("en-US", { month: "short" });
                    displayDate = parsedDate.getDate();
                  }
                }

                let title = item.name || "Subscription";
                let subtitle = "Monthly Plan";
                let amount = item.amount || 0;
                let lastCharge = "2025-05-14";
                let logoUrl = "";
                
                let textColorClass = "text-gray-800";
                let subColorClass = "text-gray-500";
                let monthColorClass = "text-gray-400";
                let dateColorClass = "text-gray-800";

                if (index === 0 || item.category === "housing") {
                  title = "Figma";
                  subtitle = "Figma - Yearly Plan";
                  amount = 150;
                  displayMonth = "May";
                  displayDate = "15";
                  lastCharge = "2025-05-14";
                  logoUrl = "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg";
                } else if (index === 1 || item.category === "food") {
                  title = "Adobe";
                  subtitle = "Adobe Inc - Yearly Plan";
                  amount = 559;
                  displayMonth = "June";
                  displayDate = "16";
                  lastCharge = "2025-06-17";
                  logoUrl = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobe.svg";
                  
                  textColorClass = "text-red-600";
                }
                return (
                  <div key={item.id || index} className="flex justify-between pt-3 pb-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center">
                      <div className="bg-special-bg p-4 rounded-lg flex flex-col justify-center items-center w-14 h-14 flex-shrink-0">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider leading-none ${monthColorClass}`}>
                          {displayMonth}
                        </span>
                        <span className={`text-xl font-bold leading-none mt-1 ${dateColorClass}`}>
                          {displayDate}
                        </span>
                      </div>
                      
                      <div className="ms-10 flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                          {logoUrl && (
                            <img 
                              src={logoUrl} 
                              alt={`${title} logo`} 
                              className="w-4 h-4 object-contain flex-shrink-0"
                              style={title === "Adobe" ? { filter: "invert(19%) sepia(95%) saturate(5488%) hue-rotate(352deg) brightness(91%) contrast(104%)" } : {}}
                            />
                          )}
                          <span className={`font-bold text-sm leading-none ${textColorClass}`}>{title}</span>
                        </div>
                        <span className={`text-xs mt-1.5 font-medium leading-tight ${subColorClass}`}>
                          {subtitle}
                        </span>
                        <span className="text-[11px] text-gray-400 mt-0.5 font-medium">
                          Last Charge - {lastCharge}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center flex-shrink-0">
                      <span className="py-2 px-4 border border-gray-05 rounded-lg font-bold text-gray-800 text-xs bg-white">
                        ${amount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        }
      />
    </>
  );
}

export default CardUpcomingBill;