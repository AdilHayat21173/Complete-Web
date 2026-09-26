// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#8B8058] flex items-center justify-center">
      <div className="bg-[#F8F5E9] rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-[#5A5034] mb-2">Page Not Found</h1>
        <Link to="/" className="text-[#FF6500] font-semibold">
          Go home
        </Link>
      </div>
    </div>
  );
}
