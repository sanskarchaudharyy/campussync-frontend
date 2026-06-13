"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await register(form);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Create your CampusSync account</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 20,
        }}
      >
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          required
        />

        <input
          placeholder="Branch"
          value={form.branch}
          onChange={(e) =>
            setForm({
              ...form,
              branch: e.target.value,
            })
          }
          required
        />

        <input
          placeholder="Year"
          value={form.year}
          onChange={(e) =>
            setForm({
              ...form,
              year: e.target.value,
            })
          }
          required
        />

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button type="submit">
          Register
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        Already have an account?{" "}
        <Link href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}