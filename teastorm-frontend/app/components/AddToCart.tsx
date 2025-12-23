"use client";

import { useState } from "react";
import { useCart } from "@/app/cart-context";

type Props = {
  variantId: string;
  title: string;
  priceUsd: number;
};

export default function AddToCartButton({
  variantId,
  title,
  priceUsd,
}: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
          −
        </button>
        <span>{qty}</span>
        <button onClick={() => setQty((q) => q + 1)}>+</button>
      </div>

      <button
        onClick={() =>
          addItem(
            { variantId, title, priceUsd },
            qty
          )
        }
      >
        Add to cart
      </button>
    </div>
  );
}
