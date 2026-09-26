// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assests/logo.png";

const linkClasses = ({ isActive }) =>
  `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
    isActive ? "bg-[#FF6500] text-white" : "text-[#F8F5E9] hover:bg-[#6d6242]"
  }`;

export default function Sidebar({ isOpen, onNavigate }) {
  const { user } = useAuth();

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col bg-[#5A5034] text-white transition-transform md:sticky md:top-0 md:z-auto md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="p-6 border-b border-[#766b4b]">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Roshni Public School" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h2 className="font-bold text-sm">Roshni Public</h2>
            <p className="text-xs text-[#ddd6c2]">School & College</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {user?.role === "admin" && (
          <NavLink to="/dashboard" onClick={onNavigate} className={linkClasses}>
            <span className="w-6 text-center font-bold" aria-hidden="true">D</span>
            <span className="font-medium">Dashboard</span>
          </NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/fees" onClick={onNavigate} className={linkClasses}>
            <span className="w-6 text-center font-bold" aria-hidden="true">F</span>
            <span className="font-medium">Fee System</span>
          </NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/finance" onClick={onNavigate} className={linkClasses}>
            <span className="w-6 text-center font-bold" aria-hidden="true">P</span>
            <span className="font-medium">Profit & Loss</span>
          </NavLink>
        )}

        {/* Both admin and teacher see Results */}
        <NavLink to="/results" onClick={onNavigate} className={linkClasses}>
          <span className="w-6 text-center font-bold" aria-hidden="true">R</span>
          <span className="font-medium">Result System</span>
        </NavLink>
      </nav>

    </aside>
  );
}