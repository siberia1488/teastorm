"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{
        marginTop: 24,
        width: "100%",
        padding: "12px 16px",
        borderRadius: 8,
        border: "1px solid #000",
        background: "#fff",
        cursor: "pointer",
        fontSize: 15,
      }}
    >
      Log out
    </button>
  );
}
