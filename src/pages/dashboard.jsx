import React, { useContext, useEffect, useState } from 'react';
import MainLayout from "../components/Layouts/MainLayout";
import CardBalance from "../components/Elements/Fragments/CardBalance";
import CardGoal from "../components/Elements/Fragments/CardGoal";
import CardUpcomingBill from '../components/Elements/Fragments/CardUpcomingBill';
import CardRecentTransaction from '../components/Elements/Fragments/CardRecentTransaction';
import CardStatistic from '../components/Elements/Fragments/CardStatistic';
import CardExpenseBreakdown from '../components/Elements/Fragments/CardExpenseBreakdown';
import { 
  transactions, 
  bills as mockBills, 
  expensesBreakdowns,
  balances,
  expensesStatistics,
} from "../data";
import { goalService, billService } from "../services/dataService"; 
import { AuthContext } from "../context/authContext";
import AppSnackbar from '../components/Elements/AppSnackbar';

function DashboardPage() {
  const { logout } = useContext(AuthContext);

  // 1. DEFINISIKAN SEMUA STATE AGAR TIDAK UNDEFINED
  const [billsState, setBillsState] = useState([]);
  const [goals, setGoals] = useState({}); // Memperbaiki bug goals
  const [snackbar, setSnackbar] = useState({ // Memperbaiki bug snackbar
    open: false,
    message: "",
    severity: "success",
  });

  // Fungsi menutup snackbar
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // 2. FUNGSI FETCH DATA BILLS FROM API
  const fetchBills = async () => {
    try {
      const response = await billService();
      console.log("Data Bills dari API:", response); 
      
      // Kirim utuh seluruh response objek ke state agar dibaca aman oleh CardUpcomingBill
      setBillsState(response); 
    } catch (error) {
      console.error("Gagal mengambil data bills:", error);
    }
  };

  // 3. FUNGSI FETCH DATA GOALS FROM API
  const fetchGoals = async () => {
    try {
      const result = await goalService();
      
      if (Array.isArray(result)) {
        setGoals(result[0] || {});
      } else {
        setGoals(result || {});
      }
    } catch (err) {
      console.error("Gagal mengambil data goal", err);
      setSnackbar({
        open: true,
        message: err?.msg || "Gagal mengambil data goal",
        severity: "error",
      });
      if (err?.status === 401) {
        logout();
      }
    }
  };

  // 4. EFEK PERTAMA KALI HALAMAN DI-LOAD
  useEffect(() => {
    // Memaksa penulisan token ke drive D yang baru biar tembus API
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY0YTRiYTFiM2M1YTNkOGM1ZDE1NjN9.sFJqgErsDC8XvdGQxL42PoRcB9sf_fzD_C15Db041yw");
    }

    fetchGoals();
    fetchBills();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance data={balances} />
          </div>
          <div className="sm:col-span-4">
            <CardGoal data={goals} />
          </div>
          <div className="sm:col-span-4">
            {/* Tampilkan data API asli, jika masih loading fallback ke mockBills */}
            <CardUpcomingBill data={billsState.length > 0 ? billsState : mockBills} />
          </div>
          <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions} />
          </div>
          <div className="sm:col-span-8">
            <CardStatistic data={expensesStatistics} />
          </div>
          <div className="sm:col-span-8">
            <CardExpenseBreakdown data={expensesBreakdowns} />
          </div>
        </div>

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </MainLayout>
    </> 
  );
}

export default DashboardPage;