// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth.api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await registerUser({ username, email, password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#8B8058] flex items-center justify-center p-4">
      <div className="bg-[#F8F5E9] rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#5A5034] mb-1">Create Account</h1>
        <p className="text-sm text-[#71694f] mb-6">
          New accounts are created as <strong>Teacher</strong>. An admin can
          promote you afterward if needed.
        </p>

        {success ? (
          <p className="text-sm text-green-700">
            Account created! Redirecting to login...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#5A5034] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500]"
              />
            </div>

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
                minLength={6}
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
              {submitting ? "Creating..." : "Register"}
            </button>
          </form>
        )}

        <p className="text-sm text-[#71694f] mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF6500] font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
