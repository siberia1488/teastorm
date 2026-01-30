"use client"

import { useParams } from "next/navigation"
import { products } from "@/data/products"
import { teaContent } from "@/data/teaContent"
import { useCart } from "@/lib/cart-context"
import { useCartDrawer } from "@/lib/cart-store"
import Link from "next/link"
import { useEffect, useState } from "react"

type PriceMap = Record<string, number>

export default function ProductPage() {
  const params = useParams<{ id: string }>()

  const { addItem } = useCart()
  const { open } = useCartDrawer()

  const product = products.find((p) => p.slug === params.id)
  const content = product ? teaContent[product.slug] : null

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product?.variants[0]?.id ?? null
  )

  const [prices, setPrices] = useState<PriceMap>({})
  const [loadingPrices, setLoadingPrices] = useState(true)

  useEffect(() => {
    if (!product) return

    const priceIds = product.variants.map((v) => v.stripePriceId)

    fetch("/api/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceIds }),
    })
      .then((res) => res.json())
      .then((data) => setPrices(data))
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

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0]

  const selectedPrice =
    selectedVariant && prices[selectedVariant.stripePriceId]

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

  const hasFlavor =
    Array.isArray(content.flavorProfile) &&
    content.flavorProfile.length > 0

  const hasEffect = Boolean(content.effect)

  const hasBrewing = Boolean(content.brewing)

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px" }}>
      <Link
        href="/shop"
        style={{
          display: "inline-block",
          marginBottom: 48,
          fontSize: 14,
          color: "#777",
        }}
      >
        ← Back to shop
      </Link>

      {/* TOP */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 96,
          marginBottom: 140,
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(800px 400px at 20% -20%, #f5f4f0 0%, #efede7 60%, #e8e6df 100%)",
            borderRadius: 32,
            height: 520,
          }}
        />

        <div>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              fontSize: 12,
              color: "#8a8883",
              marginBottom: 14,
            }}
          >
            {product.category}
          </p>

          <h1
            style={{
              fontSize: 48,
              fontWeight: 500,
              marginBottom: 14,
            }}
          >
            {content.displayName}
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "#777",
              marginBottom: 24,
            }}
          >
            {content.tagline}
          </p>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              color: "#555",
              marginBottom: 42,
              maxWidth: 520,
            }}
          >
            {content.description}
          </p>

          {/* VARIANTS */}
          {product.variants.length > 1 && (
            <div style={{ marginBottom: 42 }}>
              <strong>Select Size</strong>

              <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
                {product.variants.map((variant) => {
                  const price = prices[variant.stripePriceId]

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      style={{
                        padding: "14px 22px",
                        borderRadius: 999,
                        border:
                          variant.id === selectedVariantId
                            ? "2px solid #000"
                            : "1px solid #ddd",
                        background: "#fff",
                        cursor: "pointer",
                        minWidth: 130,
                      }}
                    >
                      <div>{variant.label}</div>
                      <div style={{ fontSize: 14, color: "#777" }}>
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

          {/* ADD */}
          <button
            disabled={!selectedVariant || !selectedPrice || loadingPrices}
            onClick={handleAdd}
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: 999,
              background: "#000",
              color: "#fff",
              fontSize: 14,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {loadingPrices || !selectedPrice
              ? "Loading…"
              : `Add to cart — $${(selectedPrice / 100).toFixed(2)}`}
          </button>
        </div>
      </div>

      {/* INFO CARDS */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 64,
        }}
      >
        {/* FLAVOR */}
        {hasFlavor && (
          <InfoCard icon="🍃" label="Flavor Profile" title="Flavor Notes">
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 6,
              }}
            >
              {content.flavorProfile!.map((note) => (
                <li key={note}>• {note}</li>
              ))}
            </ul>
          </InfoCard>
        )}

        {/* EFFECT */}
        {hasEffect && (
          <InfoCard icon="☁️" label="Effect" title="How It Feels">
            <p>{content.effect}</p>
          </InfoCard>
        )}

        {/* BREWING */}
        {hasBrewing && (
          <InfoCard icon="🍵" label="Brewing" title="How to Brew">
            {content.brewing?.gongfu && (
              <p>
                <strong>Gongfu:</strong> {content.brewing.gongfu}
              </p>
            )}

            {content.brewing?.western && (
              <p>
                <strong>Western:</strong> {content.brewing.western}
              </p>
            )}
          </InfoCard>
        )}
      </section>
    </main>
  )
}

function InfoCard({
  icon,
  label,
  title,
  children,
}: {
  icon: string
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background:
          "radial-gradient(900px 480px at 20% -30%, #ffffff 0%, #f6f4ef 60%, #efede7 100%)",
        borderRadius: 36,
        padding: "64px 52px",
        textAlign: "center",
        transition:
          "transform 0.45s cubic-bezier(.22,1,.36,1), box-shadow 0.45s cubic-bezier(.22,1,.36,1)",
        boxShadow: "0 10px 32px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-12px)"
        e.currentTarget.style.boxShadow =
          "0 28px 72px rgba(0,0,0,0.08)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow =
          "0 10px 32px rgba(0,0,0,0.04)"
      }}
    >
      <div style={{ fontSize: 34, marginBottom: 18 }}>{icon}</div>

      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          fontSize: 11,
          marginBottom: 12,
          color: "#9b978e",
        }}
      >
        {label}
      </p>

      <h3
        style={{
          fontSize: 26,
          fontWeight: 500,
          marginBottom: 20,
        }}
      >
        {title}
      </h3>

      <div
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: "#6b6b65",
        }}
      >
        {children}
      </div>
    </div>
  )
}
