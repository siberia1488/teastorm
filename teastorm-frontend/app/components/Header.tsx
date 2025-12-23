"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/cart-context";

export default function Header() {
  const pathname = usePathname();
  const { items } = useCart();

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const isActive = (path: string) =>
    pathname === path ? "active" : "";

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* LOGO */}
        <Link href="/" className="logo">
          TeaStorm
        </Link>

        {/* NAV */}
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

          <Link
            href="/cart"
            className={`nav-link ${isActive("/cart")}`}
          >
            Cart{itemCount > 0 && ` (${itemCount})`}
          </Link>
        </nav>
      </div>
    </header>
  );
}
