// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email, password);
      navigate(user.role === "admin" ? "/dashboard" : "/results");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#8B8058] flex items-center justify-center p-4">
      <div className="bg-[#F8F5E9] rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#5A5034] mb-1">Roshni Public School</h1>
        <p className="text-sm text-[#71694f] mb-6">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#5A5034] mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#5A5034] mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500]"
            />
          </div>

          {error && <p className="text-sm text-[#8a1f1f]">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#FF6500] hover:bg-[#e85b00] disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-[#71694f] mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#FF6500] font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
