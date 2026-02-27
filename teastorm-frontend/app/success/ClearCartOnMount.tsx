"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function ClearCartOnMount() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
}
