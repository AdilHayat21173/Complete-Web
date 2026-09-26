// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FeeSystem from "./pages/FeeSystem";
import ResultSystem from "./pages/ResultSystem";
import FinanceSystem from "./pages/FinanceSystem";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

function HomeRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === "admin" ? "/dashboard" : "/results"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/fees"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <FeeSystem />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute allowedRoles={["admin", "teacher"]}>
            <ResultSystem />
          </ProtectedRoute>
        }
      />
       <Route
        path="/finance"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <FinanceSystem />
          </ProtectedRoute>
        }
      />
 

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
