"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { useCartDrawer } from "@/lib/cart-store";
import Link from "next/link";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { open } = useCartDrawer();

  const product = products.find((p) => p.slug === params.id);

  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants[0]?.id ?? null
  );

  if (!product) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Product not found</h1>
        <Link href="/shop">← Back to shop</Link>
      </main>
    );
  }

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  );

  const handleAdd = () => {
    if (!selectedVariant) return;

    addItem({
      variantId: selectedVariant.id,
      title: `${product.title} – ${selectedVariant.label}`,
      price: Math.round(selectedVariant.priceUsd * 100),
      quantity: 1,
    });

    open(); // открываем мини-корзину
  };

  return (
    <main
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: "32px 24px",
      }}
    >
      <Link href="/shop" style={{ display: "inline-block", marginBottom: 24 }}>
        ← Back to shop
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div
          style={{
            background: "#f4f4f4",
            borderRadius: 16,
            height: 420,
          }}
        />

        <div>
          <h1 style={{ fontSize: 34 }}>{product.title}</h1>

          {product.subtitle && (
            <div style={{ color: "#666", marginBottom: 12 }}>
              {product.subtitle}
            </div>
          )}

          <p style={{ marginBottom: 20 }}>
            {product.shortDescription}
          </p>

          <div style={{ marginBottom: 28 }}>
            <strong>Choose size</strong>
            <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
              {product.variants.map((variant) => (
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
                    ${variant.priceUsd.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedVariant}
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
            Add to cart — $
            {selectedVariant?.priceUsd.toFixed(2)}
          </button>
        </div>
      </div>
    </main>
  );
}
