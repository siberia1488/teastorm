"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/cart-context";

export default function CheckoutPage() {
  const { items } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce(
    (sum, i) => sum + i.priceUsd * i.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>
            Checkout
          </h1>
          <p style={{ color: "#555", marginBottom: 24 }}>
            Your cart is empty.
          </p>
          <Link
            href="/shop"
            style={{
              textDecoration: "underline",
              color: "#000",
            }}
          >
            Go to shop →
          </Link>
        </div>
      </main>
    );
  }

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await res.json();

      if (!data.url) {
        throw new Error("Stripe session URL missing");
      }

      window.location.href = data.url;
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something went wrong"
      );
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: 24,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          animation: "fadeIn 0.3s ease forwards",
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 24 }}>
          Checkout
        </h1>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.variantId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{item.title}</strong>
                <div style={{ color: "#666", fontSize: 14 }}>
                  ${item.priceUsd.toFixed(2)} × {item.quantity}
                </div>
              </div>

              <div>
                ${(item.priceUsd * item.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {error && (
          <p style={{ color: "red", marginTop: 16 }}>
            {error}
          </p>
        )}

        <button
          onClick={handleCheckout}
          disabled={isLoading}
          style={{
            marginTop: 32,
            width: "100%",
            padding: "14px 20px",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            background: "#000",
            color: "#fff",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading
            ? "Redirecting to secure checkout…"
            : "Pay securely"}
        </button>

        <p
          style={{
            marginTop: 16,
            fontSize: 13,
            color: "#777",
            textAlign: "center",
          }}
        >
          Payments are processed securely by Stripe
        </p>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(6px);
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
