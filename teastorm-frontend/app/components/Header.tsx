"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartDrawer } from "@/lib/cart-store";
import CartButtom from "./CartButtom";

export default function Header() {
  const pathname = usePathname();
  const { open } = useCartDrawer();

  const isActive = (path: string) =>
    pathname === path ? "active" : "";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo">
          TeaStorm
        </Link>

        <nav className="nav">
          <Link
            href="/shop"
            className={`nav-link ${isActive("/shop")}`}
          >
            Shop
          </Link>

          <Link
            href="/about"
            className={`nav-link ${isActive("/about")}`}
          >
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
            <CartButtom />
          </button>
        </nav>
      </div>
    </header>
  );
}
