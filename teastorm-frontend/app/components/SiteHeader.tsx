"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartDrawer } from "@/lib/cart-store";
import { useCart } from "@/lib/cart-context";
import BrandMark from "@/components/BrandMark";

export default function SiteHeader() {
  const open = useCartDrawer((s) => s.open);
  const { items } = useCart();

  const count = items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo" style={{ textDecoration: "none" }}>
          <BrandMark size="md" />
        </Link>

        <nav className="nav">
          <Link href="/shop" className="nav-link">
            Shop
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>

          <button
            type="button"
            onClick={open}
            className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 rounded-full bg-amber-600 text-white text-xs font-bold grid place-items-center">
                {count}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
