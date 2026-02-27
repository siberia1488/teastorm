"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";

import { useCartDrawer } from "@/lib/cart-store";
import { useCart } from "@/lib/cart-context";

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const FREE_SHIPPING_THRESHOLD = 5000; // $50 in cents

export default function CartDrawer() {
  const isOpen = useCartDrawer((s) => s.isOpen);
  const close = useCartDrawer((s) => s.close);

  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderProtection, setOrderProtection] = useState(false);
  const scrollLockRef = useRef(false);

  const itemCount = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items]
  );

  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountUntilFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

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
      // Cleanup on unmount
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
          "fixed inset-0 z-backdrop bg-black/40 backdrop-blur-sm",
          "transition-opacity duration-300",
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
          "fixed right-0 top-0 z-drawer h-screen w-full sm:w-[400px] sm:max-w-[100vw]",
          "bg-[#fbfaf7] shadow-2xl",
          "flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl sm:text-lg font-serif font-semibold text-gray-900">Your Cart</h2>
            <span className="text-sm text-gray-500">({itemCount})</span>
          </div>

          <button
            type="button"
            onClick={close}
            className="rounded-lg p-3 sm:p-2 hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-6 w-6 sm:h-5 sm:w-5 text-gray-600" />
          </button>
        </div>

        {/* Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li
                  key={item.variantId}
                  className="flex gap-4 border-b border-gray-100 pb-6"
                >
                  {/* Product Image */}
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-24 w-24 object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.variantLabel}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.variantId, item.quantity - 1)
                        }
                        className="rounded border border-gray-200 p-1 hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} className="text-gray-600" />
                      </button>

                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.variantId, item.quantity + 1)
                        }
                        className="rounded border border-gray-200 p-1 hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.price / 100).toFixed(2)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeItem(item.variantId)}
                      className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer - Sticky */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-[#fbfaf7]">
          {/* Free Shipping Bar */}
          {!qualifiesForFreeShipping && items.length > 0 && (
            <div className="px-6 py-3 bg-amber-50">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-amber-900">
                  Free shipping on orders over $50
                </p>
                <p className="text-xs text-amber-700">
                  ${(amountUntilFreeShipping / 100).toFixed(2)} away
                </p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-amber-200">
                <div
                  className="h-full bg-amber-600 transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Order Protection */}
          {items.length > 0 && (
            <div className="px-6 py-3 border-b border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={orderProtection}
                  onChange={(e) => setOrderProtection(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300"
                />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">
                    Order Protection
                  </p>
                  <p className="text-xs text-gray-500">
                    $1.95 • Protection for Damage, Loss & Theft
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Subtotal & Checkout */}
            <div className="px-6 py-4 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-lg font-semibold text-gray-900">
                ${(subtotal / 100).toFixed(2)}
              </span>
            </div>

            {qualifiesForFreeShipping && items.length > 0 && (
              <div className="flex justify-between items-baseline text-xs text-green-600 font-medium">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={!items.length || loading}
              className={cn(
                "w-full rounded-lg font-semibold",
                "transition-all duration-200",
                items.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed py-3 text-sm"
                  : "bg-black text-white hover:bg-gray-900 active:scale-95 py-4 text-base sm:py-3 sm:text-sm"
              )}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Shipping & taxes calculated at checkout
            </p>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={close}
                className="text-sm text-gray-700 hover:underline"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
