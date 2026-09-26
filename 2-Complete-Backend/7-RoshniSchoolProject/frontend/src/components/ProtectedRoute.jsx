// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

// Usage:
//   <ProtectedRoute allowedRoles={["admin"]}><Dashboard /></ProtectedRoute>
//   <ProtectedRoute allowedRoles={["admin", "teacher"]}><ResultSystem /></ProtectedRoute>
export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#8B8058]">
        <div className="bg-[#F8F5E9] rounded-xl shadow-lg p-8 text-center max-w-sm">
          <h2 className="text-xl font-bold text-[#5A5034] mb-2">Access Denied</h2>
          <p className="text-[#71694f]">
            Your account ({user.role}) doesn't have access to this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
