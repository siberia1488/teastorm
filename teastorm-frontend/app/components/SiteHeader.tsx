"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useCartDrawer } from "@/lib/cart-store";

export default function SiteHeader() {
  const { items } = useCart();
  const { open } = useCartDrawer();

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

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 15,
          }}
        >
          <Link href="/shop" style={{ textDecoration: "none" }}>
            Shop
          </Link>

          <button
            onClick={open}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 15,
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
          </button>
        </nav>
      </div>
    </header>
  );
}
