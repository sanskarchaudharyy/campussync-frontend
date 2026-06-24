"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", branch: "", year: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name", label: "Full Name", placeholder: "Enter your full name...", type: "text" },
    { key: "email", label: "Email", placeholder: "Enter your college domain mail", type: "email" },
    { key: "password", label: "Password", placeholder: "••••••••", type: "password" },
    { key: "branch", label: "Branch", placeholder: "e.g. CSE, ECE", type: "text" },
    { key: "year", label: "Year", placeholder: "e.g. 2nd Year", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Join CampusSync 🎓</h1>
          <p className="mt-2 text-gray-500 text-sm">Create your free student account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          ))}

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold transition-all hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}