"use client";

import Link from "next/link";
import { useCart } from "@/app/cart-context";

export default function SiteHeader() {
  const { items } = useCart();

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT */}
        <Link
          href="/"
          style={{
            fontSize: 18,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          TeaStorm
        </Link>

        {/* RIGHT */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 15,
          }}
        >
          <Link
            href="/shop"
            style={{ textDecoration: "none" }}
          >
            Shop
          </Link>

          <Link
            href="/cart"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Cart
            {totalItems > 0 && (
              <span
                style={{
                  minWidth: 20,
                  height: 20,
                  borderRadius: 999,
                  background: "#000",
                  color: "#fff",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 6px",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
