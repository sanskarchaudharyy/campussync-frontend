import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <h1>CampusSync 🎓</h1>

      <p>
        Share notes and collaborate with classmates.
      </p>

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <Link href="/login">
          <button>Login</button>
        </Link>

        <Link href="/register">
          <button>Register</button>
        </Link>
      </div>
    </main>
  );
}