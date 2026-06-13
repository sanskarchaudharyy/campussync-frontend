"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } =
    useAuth();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "12px 24px",
        borderBottom: "1px solid #ddd",
        fontFamily: "sans-serif",
      }}
    >
      <Link
        href="/dashboard"
        style={{
          fontWeight: "bold",
        }}
      >
        CampusSync
      </Link>

      <Link href="/resources">
        Resources
      </Link>

      <Link href="/groups">
        Study Groups
      </Link>

      <Link href="/deadlines">
        Deadlines
      </Link>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        {user ? (
          <>
            <span>
              {user.name}
            </span>

            <button
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}