"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await signIn("email", {
      email,
      callbackUrl: "/account",
    });
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>Sign in</h1>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          required
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Sending link…" : "Sign in with Email"}
        </button>
      </form>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 24,
  },
  label: {
    display: "block",
    fontSize: 14,
    marginBottom: 6,
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 16,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: 10,
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
  },
};
