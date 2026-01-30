"use client"

import { useMemo } from "react"
import { useCartDrawer } from "@/lib/cart-store"
import { useCart } from "@/lib/cart-context"

export default function CartDrawer() {
  const { isOpen, close } = useCartDrawer()
  const { items, removeItem } = useCart()

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  }, [items])

  if (!isOpen) return null

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert("Checkout failed")
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />

      {/* DRAWER */}
      <div className="absolute right-0 top-0 h-full w-full max-w-[440px] bg-[#fbfaf7] shadow-2xl flex flex-col animate-slideIn">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <h2 className="text-xl font-serif tracking-tight">
            Your Cart
          </h2>

          <button
            onClick={close}
            className="text-xl opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-auto px-6 py-6 space-y-6">

          {items.length === 0 && (
            <p className="text-sm text-neutral-500">
              Your cart is currently empty.
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex items-start justify-between gap-4 border-b pb-5"
            >
              <div className="flex gap-4">

                {/* IMAGE PLACEHOLDER */}
                <div className="h-20 w-20 rounded-xl bg-stone-200" />

                <div className="space-y-1">
                  <div className="font-medium tracking-tight">
                    {item.title}
                  </div>

                  <div className="text-xs text-neutral-500">
                    {item.variantLabel}
                  </div>

                  <div className="text-xs text-neutral-500">
                    Qty: {item.quantity}
                  </div>

                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-xs underline text-neutral-400 hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t border-black/10 px-6 py-6 space-y-4">

          {/* SUBTOTAL */}
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Subtotal</span>
            <span className="font-medium">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          {/* CHECKOUT */}
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full rounded-full bg-black text-white py-4 text-sm tracking-wide hover:bg-neutral-900 disabled:opacity-40"
          >
            Proceed to Checkout
          </button>

          {/* CONTINUE */}
          <button
            onClick={close}
            className="block w-full text-xs tracking-wide uppercase text-neutral-500 hover:text-black"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
