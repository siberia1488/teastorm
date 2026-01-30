"use client"

import { useCartDrawer } from "@/lib/cart-store"
import { useCart } from "@/lib/cart-context"

export default function CartDrawer() {
  const { isOpen, close } = useCartDrawer()
  const { items, removeItem } = useCart()

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
      <div className="absolute inset-0 bg-black/30" onClick={close} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your cart</h2>
          <button onClick={close}>✕</button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-gray-500">Your cart is empty</p>
          )}

          {items.map((item) => (
            <div key={item.variantId} className="flex justify-between text-sm">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-gray-500">
                  {item.variantLabel} × {item.quantity}
                </div>
              </div>

              <button
                onClick={() => removeItem(item.variantId)}
                className="text-xs text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t p-4 space-y-3">
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="block w-full bg-black text-white py-3 rounded disabled:opacity-50"
          >
            Checkout
          </button>

          <button onClick={close} className="block w-full text-sm text-gray-500">
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  )
}
