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
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          TeaStorm
        </Link>

        
        <nav
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
            fontSize: 15,
          }}
        >
          <NavLink href="/shop" label="Shop" active={isActive("/shop")} />
          <NavLink href="/about" label="About" active={isActive("/about")} />
          <NavLink
            href="/cart"
            label={`Cart${itemCount > 0 ? ` (${itemCount})` : ""}`}
            active={isActive("/cart")}
          />
        </nav>
      </div>
    </header>
  );
}

/* ---------- Subcomponent ---------- */

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: string;
}) {
  return (
    <Link
      href={href}
      className={`nav-link ${active}`}
      style={{
        position: "relative",
        paddingBottom: 4,
        transition: "color 0.2s ease",
      }}
    >
      {label}
    </Link>
  );
}
