import React, { useEffect, useState, useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { expenseService } from "../services/dataService";
import { AuthContext } from "../context/authContext";
import Icon from "../components/Elements/Icon"; 

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchExpensesData = async () => {
      try {
        const data = await expenseService();
        console.log("ISI DATA ASLI DARI API EXPENSES:", data);
        setExpenses(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error(err);
        if (err.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExpensesData();
  }, []);

  // Mapping Icon berdasarkan kategori dari API
  const getIcon = (categoryName) => {
    switch (categoryName?.toLowerCase()) {
      case "housing": return <Icon.House />;
      case "food": return <Icon.Food />;
      case "transportation": return <Icon.Transport />;
      case "entertainment": return <Icon.Gamepad />;
      case "shopping": return <Icon.Shopping />;
      default: return <Icon.Other />;
    }
  };

  // SESUAIKAN: Menggunakan properti trend dari API Anda
  const getArrow = (trend) => {
    if (trend === "up") {
      return (
        <div className="text-special-red flex items-center">
          <Icon.ArrowUp size={16} />
        </div>
      );
    }
    return (
      <div className="text-special-green flex items-center">
        <Icon.ArrowDown size={16} />
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="w-full px-4 py-6 bg-gray-50 min-h-screen">
        <h2 className="text-xl font-medium text-gray-400 mb-6">Expenses Comparison</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-[#299D91] mb-4"></div>
            <p className="text-[#299D91] font-medium text-sm tracking-wide">Loading Data</p>
          </div>
        ) : (
          /* Grid 3 Kolom */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenses.map((item, index) => {
              const categoryTitle = item.category || "Others";
              const totalAmount = item.amount || 0;
              const percentValue = item.percentage || 0;
              const currentTrend = item.trend || "down"; // Menggunakan properti trend sesuai API

              return (
                <div key={item.id || index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  
                  {/* BAGIAN ATAS: Header Kategori */}
                  <div className="flex justify-between items-start mb-6 w-full">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-100 rounded-xl flex items-center justify-center w-12 h-12 flex-shrink-0 text-gray-500">
                        {getIcon(categoryTitle)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-semibold capitalize">{categoryTitle}</p>
                        <p className="text-xl font-bold text-gray-900 mt-0.5">${totalAmount}</p>
                        <div className="flex items-center text-xs font-semibold mt-1">
                          <span className="text-gray-500">{percentValue}%</span>
                          <span className="ml-1">{getArrow(currentTrend)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right max-w-[120px]">
                      <p className="text-[10px] text-gray-400 leading-normal">Compare to the last month</p>
                    </div>
                  </div>

                  {/* BAGIAN BAWAH: Rincian Transaksi (Membaca properti .detail dari API) */}
                  <div className="flex-1 flex flex-col justify-start w-full">
  {item.detail && item.detail.map((subItem, itemIdx) => {
    // Jalur alternatif jika API menggunakan nama properti berbeda (misal: name/title/item)
    const transactionTitle = subItem.title || subItem.name || subItem.item || "Unknown Transaction";
    // Jalur alternatif jika API menggunakan nama properti jumlah uang berbeda (misal: price/amount/value)
    const transactionPrice = subItem.price || subItem.amount || subItem.value || 0;

    return (
      <div key={itemIdx} className="border-t border-gray-100 py-4 flex justify-between items-start w-full">
        {/* Kolom Kiri: Nama Pengeluaran */}
        <div className="flex-1">
          <p className="font-semibold text-gray-700 text-sm">{transactionTitle}</p>
        </div>
        {/* Kolom Kanan: Harga dan Tanggal */}
        <div className="text-right flex flex-col items-end flex-shrink-0 ml-4">
          <p className="font-bold text-gray-800 text-sm">${transactionPrice}</p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">{subItem.date || '17 May 2023'}</p>
        </div>
      </div>
    );
  })}
</div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExpensesPage;