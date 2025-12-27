"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main style={styles.center}>
        <p>Loading account…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main style={styles.center}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>
          Account
        </h1>
        <p style={{ color: "#555", marginBottom: 24 }}>
          You need to sign in to view your account.
        </p>
        <Link
          href="/api/auth/signin"
          style={{ textDecoration: "underline" }}
        >
          Sign in →
        </Link>
      </main>
    );
  }

  const user = session.user;

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>
          Account
        </h1>

        <div style={{ marginBottom: 20 }}>
          <div style={styles.label}>Email</div>
          <div>{user?.email}</div>
        </div>

        {user?.name && (
          <div style={{ marginBottom: 20 }}>
            <div style={styles.label}>Name</div>
            <div>{user.name}</div>
          </div>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={styles.logout}
        >
          Log out
        </button>
      </div>
    </main>
  );
}

/* ---------- styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 24,
    background: "#fff",
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 24,
    background: "#fff",
  },
  label: {
    fontSize: 13,
    color: "#777",
    marginBottom: 4,
  },
  logout: {
    marginTop: 24,
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid #000",
    background: "#fff",
    cursor: "pointer",
    fontSize: 15,
  },
};
