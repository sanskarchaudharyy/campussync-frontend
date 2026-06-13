"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await login(
        form.email,
        form.password
      );
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
      <h2>Login to CampusSync</h2>

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

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button type="submit">
          Login
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        New here?{" "}
        <Link href="/register">
          Create an account
        </Link>
      </p>
    </div>
  );
}