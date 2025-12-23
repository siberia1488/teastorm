"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCart } from "../cart-context";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},          // subscribe (не нужен)
    () => true,              // client snapshot
    () => false              // server snapshot
  );
}

export default function CartButton() {
  const mounted = useMounted();
  const { items } = useCart();

  if (!mounted) return null;

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      style={{
        padding: "6px 12px",
        border: "1px solid #ddd",
        borderRadius: 6,
        textDecoration: "none",
        fontSize: 14,
      }}
    >
      🛒 Cart ({count})
    </Link>
  );
}
