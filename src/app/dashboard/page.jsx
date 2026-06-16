"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const {
    user,
    loading,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (
      !loading &&
      !user
    ) {
      router.push(
        "/login"
      );
    }
  }, [
    loading,
    user,
    router,
  ]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Welcome back,
          {" "}
          {user.name}
          {" "}
          👋
        </h1>

        <p className="mt-2 text-gray-600">
          Here's your CampusSync overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            ⭐ Points
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {user.points}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            🎓 Year
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {user.year}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            🏫 Branch
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {user.branch}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            📧 Email
          </p>

          <h2 className="mt-2 text-sm font-medium break-all">
            {user.email}
          </h2>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-12">

        <h2 className="mb-6 text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <Link
            href="/resources"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-xl font-semibold">
              📚 Resources
            </h3>

            <p className="mt-2 text-gray-600">
              Upload and access study materials.
            </p>
          </Link>

          <Link
            href="/groups"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-xl font-semibold">
              👥 Study Groups
            </h3>

            <p className="mt-2 text-gray-600">
              Collaborate and chat with peers.
            </p>
          </Link>

          <Link
            href="/deadlines"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-xl font-semibold">
              📅 Deadlines
            </h3>

            <p className="mt-2 text-gray-600">
              Keep track of important dates.
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}