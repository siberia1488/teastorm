"use client"

import { useParams } from "next/navigation"
import { products } from "@/data/products"
import { teaContent } from "@/data/teaContent"
import { useCart } from "@/lib/cart-context"
import { useCartDrawer } from "@/lib/cart-store"
import Link from "next/link"
import { useEffect, useState } from "react"

type PriceMap = Record<string, number> // stripePriceId → cents

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const { addItem } = useCart()
  const { open } = useCartDrawer()

  const product = products.find(p => p.slug === params.id)
  const content = teaContent[params.id]

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product?.variants[0]?.id ?? null
  )

  const [prices, setPrices] = useState<PriceMap>({})
  const [loadingPrices, setLoadingPrices] = useState(true)

  useEffect(() => {
    if (!product) return

    const priceIds = product.variants.map(v => v.stripePriceId)

    fetch("/api/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceIds }),
    })
      .then(res => res.json())
      .then(data => setPrices(data))
      .finally(() => setLoadingPrices(false))
  }, [product])

  if (!product || !content) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Product not found</h1>
        <Link href="/shop">← Back to shop</Link>
      </main>
    )
  }

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId)
  const selectedPrice =
    selectedVariant ? prices[selectedVariant.stripePriceId] : null

  const handleAdd = () => {
    if (!selectedVariant || !selectedPrice) return

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      slug: product.slug,
      title: content.displayName,
      variantLabel: selectedVariant.label,
      weightGrams: selectedVariant.weightGrams,
      price: selectedPrice, 
      stripePriceId: selectedVariant.stripePriceId,
      image: product.image,
      quantity: 1,
    })

    open()
  }

  const isSingleVariant = product.variants.length === 1

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
      <Link href="/shop" style={{ display: "inline-block", marginBottom: 24 }}>
        ← Back to shop
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div style={{ background: "#f4f4f4", borderRadius: 16, height: 420 }} />

        <div>
          <h1 style={{ fontSize: 34 }}>{content.displayName}</h1>
          <div style={{ color: "#666", marginBottom: 12 }}>
            {content.tagline}
          </div>

          <p style={{ marginBottom: 20 }}>{content.description}</p>

          {!isSingleVariant && (
            <div style={{ marginBottom: 28 }}>
              <strong>Choose size</strong>
              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                {product.variants.map(variant => {
                  const price = prices[variant.stripePriceId]

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 10,
                        border:
                          variant.id === selectedVariantId
                            ? "2px solid #000"
                            : "1px solid #ddd",
                        background: "#fff",
                        cursor: "pointer",
                        minWidth: 120,
                      }}
                    >
                      <div>{variant.label}</div>
                      <div style={{ fontSize: 14, color: "#555" }}>
                        {loadingPrices || !price
                          ? "—"
                          : `$${(price / 100).toFixed(2)}`}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <button
            disabled={!selectedVariant || !selectedPrice || loadingPrices}
            onClick={handleAdd}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 12,
              background: "#000",
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {loadingPrices || !selectedPrice
              ? "Loading price…"
              : `Add to cart — $${(selectedPrice / 100).toFixed(2)}`}
          </button>
        </div>
      </div>
    </main>
  )
}
