import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Radar, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Register the account
      await authService.register({
        name: form.fullName,
        email: form.email,
        password: form.password,
      });

      // Auto-login using AuthContext login() so user state is set immediately
      await login({ email: form.email, password: form.password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-2xl border border-slate-800">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400">
          <Radar className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          InternTrack <span className="text-indigo-400">AI</span>
        </span>
      </div>

      <h2 className="text-2xl font-bold text-white">Create Account</h2>
      <p className="mt-1 text-sm text-slate-400">Start tracking your internship applications.</p>

      {error && (
        <div className="mt-4 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Full name</label>
          <input
            name="fullName"
            type="text"
            required
            placeholder="Your full name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800/80 border border-slate-700/80 p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Email address</label>
          <input
            name="email"
            type="email"
            required
            placeholder="name@company.com"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800/80 border border-slate-700/80 p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800/80 border border-slate-700/80 p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Confirm password</label>
          <input
            name="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800/80 border border-slate-700/80 p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-lg shadow-indigo-600/20"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Register</span>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400">
        Already have an account?
        <Link to="/login" className="ml-1.5 font-semibold text-indigo-400 hover:text-indigo-300">
          Login
        </Link>
      </p>
    </div>
  );
}
