import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center px-6 text-center">

      {/* Badge */}
      <span className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
        🎓 For Students, By Students
      </span>

      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-4">
        CampusSync
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-500 max-w-md mb-10">
        Share notes, collaborate with classmates, and never miss a deadline.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <Link href="/login">
          <button className="rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95">
            Login
          </button>
        </Link>

        <Link href="/register">
          <button className="rounded-xl border-2 border-blue-600 px-8 py-3 text-blue-600 font-semibold transition-all hover:bg-blue-50 hover:shadow-md active:scale-95">
            Register
          </button>
        </Link>
      </div>

      {/* Features row */}
      <div className="mt-16 flex gap-8 text-sm text-gray-400">
        <span>📚 Share Resources</span>
        <span>👥 Study Groups</span>
        <span>⏰ Deadline Tracker</span>
      </div>
    </main>
  );
}