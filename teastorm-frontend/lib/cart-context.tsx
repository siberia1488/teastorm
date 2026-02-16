"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
  useMemo,
} from "react"

export type CartItem = {
  variantId: string
  productId: string
  slug: string
  title: string
  variantLabel: string
  weightGrams?: number
  price: number // cents
  stripePriceId: string
  image: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, qty: number) => void
  clear: () => void
  subtotal: number
}

const STORAGE_KEY = "teastorm_cart_v1"

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof item.variantId === "string" &&
        typeof item.stripePriceId === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0
    )
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const hydrated = useRef(false)

  // Hydrate cart from localStorage on first client render
  useEffect(() => {
    const stored = loadCart()
    if (stored.length > 0) {
      setItems(stored)
    }
    hydrated.current = true
  }, [])

  // Persist cart to localStorage on every change after hydration
  useEffect(() => {
    if (!hydrated.current) return
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage full or unavailable — silently ignore
    }
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === newItem.variantId)

      if (existing) {
        return prev.map((i) =>
          i.variantId === newItem.variantId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        )
      }

      return [...prev, newItem]
    })
  }

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId))
  }

  const updateQuantity = (variantId: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: qty }
            : item
        )
        .filter((i) => i.quantity > 0)
    )
  }

  const clear = () => {
    setItems([])
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)

  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider")
  }

  return ctx
}
