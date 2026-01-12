"use client";

import { useSyncExternalStore } from "react";
import { useCart } from "@/lib/cart-context";
import { useCartDrawer } from "@/lib/cart-store";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function CartButtom() {
  const mounted = useMounted();
  const { items } = useCart();
  const { open } = useCartDrawer();

  if (!mounted) return null;

  const count = items.reduce(
    (sum: number, item) => sum + item.quantity,
    0
  );

  return (
    <button
      onClick={open}
      style={{
        padding: "6px 12px",
        border: "1px solid #ddd",
        borderRadius: 6,
        background: "white",
        fontSize: 14,
        cursor: "pointer",
      }}
    >
      🛒 Cart ({count})
    </button>
  );
}
