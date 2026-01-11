"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, clear, subtotal } = useCart();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Your cart</h1>

      {items.length === 0 && (
        <div className="text-gray-500">
          Your cart is empty
        </div>
      )}

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.variantId}
            className="flex justify-between items-center border-b pb-4"
          >
            <div>
              <div className="font-medium">
                {item.title}
              </div>
              <div className="text-sm text-gray-500">
                {item.quantity} × $
                {(item.price / 100).toFixed(2)}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="font-medium">
                $
                {(
                  (item.price * item.quantity) /
                  100
                ).toFixed(2)}
              </div>

              <button
                onClick={() =>
                  removeItem(item.variantId)
                }
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-10 space-y-4">
          <div className="flex justify-between text-lg font-medium">
            <span>Subtotal</span>
            <span>
              ${(subtotal / 100).toFixed(2)}
            </span>
          </div>

          <div className="flex gap-4">
            <Link
              href="/checkout"
              className="flex-1 bg-black text-white py-3 text-center rounded"
            >
              Checkout
            </Link>

            <button
              onClick={clear}
              className="border px-6 rounded"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/shop"
          className="text-sm text-gray-500 hover:underline"
        >
          ← Continue shopping
        </Link>
      </div>
    </main>
  );
}
