"use client";

import Link from "next/link";
import { useCartDrawer } from "@/lib/cart-store";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { open } = useCartDrawer();
  const { items } = useCart();

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* LOGO */}
        <Link href="/" className="logo">
          TeaStorm
        </Link>

        {/* NAV */}
        <nav className="nav">
          <Link href="/shop" className="nav-link">
            Shop
          </Link>

          <Link href="/about" className="nav-link">
            About
          </Link>

          <button
            onClick={open}
            className="nav-link"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Cart{itemCount > 0 && ` (${itemCount})`}
          </button>
        </nav>
      </div>
    </header>
  );
}
