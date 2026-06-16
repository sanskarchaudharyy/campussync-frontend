"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/resources", label: "Resources" },
    { href: "/groups", label: "Study Groups" },
    { href: "/deadlines", label: "Deadlines" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-2xl font-bold text-blue-600 tracking-tight hover:text-blue-700 transition-colors"
        >
          CampusSync 🎓
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === link.href
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                👤 {user.name}
              </span>
              <button
                onClick={logout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white font-medium transition-all hover:bg-red-600 hover:shadow-md active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white font-medium transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}