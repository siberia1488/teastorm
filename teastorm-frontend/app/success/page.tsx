"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/app/cart-context";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          animation: "fadeInUp 0.4s ease forwards",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#000",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            margin: "0 auto 24px",
          }}
        >
          ✓
        </div>

        <h1 style={{ fontSize: 28, marginBottom: 12 }}>
          Payment successful
        </h1>

        <p style={{ color: "#555", marginBottom: 32 }}>
          Thank you for your order.  
          We’ve received your payment and are processing it.
        </p>

        <Link
          href="/shop"
          style={{
            display: "inline-block",
            padding: "12px 20px",
            borderRadius: 8,
            border: "1px solid #000",
            color: "#000",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Continue shopping →
        </Link>

        {/* Inline keyframes — zero dependencies */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </main>
  );
}
