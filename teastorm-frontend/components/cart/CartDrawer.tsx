"use client";

import { useCartDrawer } from "@/lib/cart-store";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

export default function CartDrawer() {
  const { isOpen, close } = useCartDrawer();
  const { items, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={close}
      />

      {/* drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            Your cart
          </h2>
          <button onClick={close}>✕</button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-gray-500">
              Your cart is empty
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex justify-between text-sm"
            >
              <div>
                <div className="font-medium">
                  {item.title}
                </div>
                <div className="text-gray-500">
                  {item.quantity} × $
                  {(item.price / 100).toFixed(2)}
                </div>
              </div>
              <div className="font-medium">
                $
                {(
                  (item.price * item.quantity) /
                  100
                ).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4 space-y-3">
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span>
              ${(subtotal / 100).toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="block w-full bg-black text-white text-center py-3 rounded"
            onClick={close}
          >
            Checkout
          </Link>

          <Link
            href="/cart"
            className="block w-full border text-center py-3 rounded"
            onClick={close}
          >
            View cart
          </Link>

          <button
            onClick={close}
            className="block w-full text-sm text-gray-500"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}
