"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

export type CartItem = {
  variantId: string;
  title: string;
  priceUsd: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  increase: (variantId: string) => void;
  decrease: (variantId: string) => void;
  remove: (variantId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (
    item: Omit<CartItem, "quantity">,
    qty: number = 1
  ) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.variantId === item.variantId
      );

      if (existing) {
        return prev.map((i) =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      return [...prev, { ...item, quantity: qty }];
    });
  };

  const increase = (variantId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.variantId === variantId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decrease = (variantId: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.variantId === variantId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const remove = (variantId: string) => {
    setItems((prev) =>
      prev.filter((i) => i.variantId !== variantId)
    );
  };

  // 🔥 ВАЖНО: useCallback — фикс бесконечного рендера
  const clear = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        increase,
        decrease,
        remove,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
