"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const {
    user,
    loading,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        padding: 30,
        fontFamily: "sans-serif",
      }}
    >
      <h1>
        Welcome, {user.name}! 🎉
      </h1>

      <p>Email: {user.email}</p>

      <p>Branch: {user.branch}</p>

      <p>Year: {user.year}</p>

      <p>Points: {user.points}</p>
    </div>
  );
}