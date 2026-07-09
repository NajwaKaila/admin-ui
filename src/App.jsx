import "./App.css";
import { useContext } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/authContext";

// Import Halaman-Halaman
import SignInPage from "./pages/signIn";
import SignUpPage from "./pages/signUp";
import ErrorPage from "./pages/error";
import DashboardPage from "./pages/dashboard";
import BalancePage from "./pages/balance";
import ExpensesPage from "./pages/expenses"; // <-- 1. Tambahkan import halaman expenses

function App() {
  const { user } = useContext(AuthContext);

  // Komponen pembatas: Hanya boleh diakses jika sudah login
  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  // Komponen pembatas: Hanya boleh diakses jika BELUM login (Guest)
  const NotRequireAuth = ({ children }) => {
    return user ? <Navigate to="/" /> : children;
  };

  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth>
          <DashboardPage />
        </RequireAuth>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: (
        <NotRequireAuth>
          <SignInPage />
        </NotRequireAuth>
      ),
    },
    {
      path: "/register",
      element: (
        <NotRequireAuth>
          <SignUpPage />
        </NotRequireAuth>
      ),
    },
    {
      path: "/balance",
      element: (
        <RequireAuth>
          <BalancePage />
        </RequireAuth>
      ),
    },
    {
      path: "/expenses",
      element: (
        <RequireAuth>
          <ExpensesPage /> {/* <-- 2. Daftarkan route expenses di bawah proteksi RequireAuth */}
        </RequireAuth>
      ),
    },
  ]);

  return <RouterProvider router={myRouter} />;
}

export default App;