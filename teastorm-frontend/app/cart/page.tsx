"use client";

import Link from "next/link";
import { useCart } from "@/app/cart-context";

export default function CartPage() {
  const { items, increase, decrease, remove, clear } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.priceUsd * item.quantity,
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
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Your cart</h1>
          <p style={{ color: "#555", marginBottom: 24 }}>Your cart is empty.</p>
          <Link href="/shop" style={{ textDecoration: "underline", color: "#000" }}>
            Go to shop →
          </Link>
        </div>
      </main>
    );
  }

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
          maxWidth: 720,
          width: "100%",
          animation: "fadeIn 0.3s ease forwards",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
          }}
        >
          <h1 style={{ fontSize: 28, margin: 0 }}>Your cart</h1>

          <button
            onClick={clear}
            style={{
              border: "1px solid #ddd",
              background: "#fff",
              borderRadius: 8,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li
              key={item.variantId}
              style={{
                padding: "16px 0",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ flex: 1 }}>
                <strong>{item.title}</strong>
                <div style={{ color: "#666", fontSize: 14, marginTop: 4 }}>
                  ${item.priceUsd.toFixed(2)} each
                </div>

                <button
                  onClick={() => remove(item.variantId)}
                  style={{
                    marginTop: 10,
                    padding: 0,
                    border: "none",
                    background: "transparent",
                    color: "#555",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Remove
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => decrease(item.variantId)}
                    style={{
                      width: 38,
                      height: 38,
                      border: "none",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: 18,
                    }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <div style={{ width: 44, textAlign: "center", fontWeight: 500 }}>
                    {item.quantity}
                  </div>

                  <button
                    onClick={() => increase(item.variantId)}
                    style={{
                      width: 38,
                      height: 38,
                      border: "none",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: 18,
                    }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div style={{ width: 90, textAlign: "right", fontWeight: 500 }}>
                  ${(item.priceUsd * item.quantity).toFixed(2)}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <Link
            href="/shop"
            style={{
              flex: 1,
              textAlign: "center",
              padding: "12px 16px",
              borderRadius: 8,
              border: "1px solid #000",
              color: "#000",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Continue shopping
          </Link>

          <Link
            href="/checkout"
            style={{
              flex: 1,
              textAlign: "center",
              padding: "12px 16px",
              borderRadius: 8,
              background: "#000",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Proceed to checkout →
          </Link>
        </div>

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
