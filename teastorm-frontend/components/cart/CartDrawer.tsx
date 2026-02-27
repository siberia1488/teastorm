"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";

import { useCartDrawer } from "@/lib/cart-store";
import { useCart } from "@/lib/cart-context";

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function CartDrawer() {
  const isOpen = useCartDrawer((s) => s.isOpen);
  const close = useCartDrawer((s) => s.close);

  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const scrollLockRef = useRef(false);

  // Handle scroll locking with ref to prevent race conditions
  useEffect(() => {
    if (isOpen && !scrollLockRef.current) {
      scrollLockRef.current = true;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else if (!isOpen && scrollLockRef.current) {
      scrollLockRef.current = false;
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      if (scrollLockRef.current) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        scrollLockRef.current = false;
      }
    };
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  const handleQuantityChange = (variantId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(variantId);
    } else {
      updateQuantity(variantId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!items.length || loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          subtotalAmount: subtotal,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("Checkout failed:", data);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout failed: missing url", data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-backdrop bg-black/50 backdrop-blur-sm",
          "transition-opacity duration-300 ease-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={handleBackdropClick}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "fixed right-0 top-0 z-drawer h-dvh w-full sm:w-[440px]",
          "bg-white shadow-2xl",
          "flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 sm:px-6 py-4 sm:py-5 pt-safe">
          <h2 className="text-xl font-semibold text-gray-900">Your cart</h2>
          <button
            type="button"
            onClick={close}
            className="rounded-full p-2.5 sm:p-2 hover:bg-gray-100 transition-colors -mr-1"
            aria-label="Close cart"
          >
            <X className="h-6 w-6 sm:h-5 sm:w-5 text-gray-600" />
          </button>
        </div>

        {/* Items - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-5 sm:px-6 py-12">
              <p className="text-gray-500 text-center mb-6">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={close}
                className="py-3 px-8 rounded-full bg-black text-white text-sm font-medium tracking-wide uppercase hover:bg-gray-900 transition-colors"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5">
                  {/* Product Image */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.variantLabel}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.variantId, item.quantity - 1)
                          }
                          className="p-2.5 sm:p-2 hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-l-lg"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} className="text-gray-600" />
                        </button>

                        <span className="text-sm font-medium w-8 text-center tabular-nums">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.variantId, item.quantity + 1)
                          }
                          className="p-2.5 sm:p-2 hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-r-lg"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} className="text-gray-600" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="p-2.5 sm:p-2 text-gray-400 hover:text-red-500 active:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-gray-900">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        ${(item.price / 100).toFixed(2)} each
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white px-5 sm:px-6 py-5 pb-safe">
            {/* Subtotal */}
            <div className="flex justify-between items-baseline mb-5">
              <span className="text-base text-gray-600">Subtotal</span>
              <span className="text-xl font-semibold text-gray-900">
                ${(subtotal / 100).toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Shipping & taxes calculated at checkout.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading}
                className={cn(
                  "w-full py-4 rounded-lg font-semibold text-base",
                  "bg-black text-white",
                  "hover:bg-gray-900 active:scale-[0.98]",
                  "transition-all duration-150",
                  loading && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>

              <Link
                href="/shop"
                onClick={close}
                className="w-full py-3.5 rounded-lg font-medium text-base text-center border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
