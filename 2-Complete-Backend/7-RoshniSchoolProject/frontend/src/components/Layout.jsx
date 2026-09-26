// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#8B8058]">
      <div className="flex min-h-screen">
        {menuOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
          />
        )}
        <Sidebar isOpen={menuOpen} onNavigate={() => setMenuOpen(false)} />

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 bg-[#5A5034] px-4 shadow-md sm:h-20 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="shrink-0 rounded-lg border border-[#a79d7c] px-3 py-2 text-sm font-semibold text-[#F8F5E9] transition hover:bg-[#6d6242] md:hidden"
              >
                Menu
              </button>
              <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-[#F8F5E9] sm:text-2xl">
                Roshni Public School
              </h1>
              <p className="hidden text-sm text-[#ddd6c2] sm:block">School Management System</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 text-right sm:gap-4">
              <div className="hidden max-w-32 sm:block">
                <p className="truncate text-sm font-semibold text-[#F8F5E9]">{user?.username}</p>
                <p className="text-xs capitalize text-[#ddd6c2]">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="rounded-lg border border-[#a79d7c] px-3 py-2 text-xs font-semibold text-[#F8F5E9] transition hover:bg-[#6d6242] sm:px-4 sm:text-sm"
              >
                Log out
              </button>
            </div>
          </header>

          <div className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
