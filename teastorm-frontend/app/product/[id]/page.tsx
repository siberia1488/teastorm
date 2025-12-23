"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/app/cart-context";
import Link from "next/link";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();

  const product = products.find((p) => p.slug === params.id);

  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants[0]?.id ?? null
  );
  const [added, setAdded] = useState(false);

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

    addItem(
      {
        variantId: selectedVariant.id,
        title: `${product.title} – ${selectedVariant.label}`,
        priceUsd: selectedVariant.priceUsd,
      },
      1
    );

    setAdded(true);
    setTimeout(() => router.push("/cart"), 600);
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
        {/* IMAGE */}
        <div
          style={{
            background: "#f4f4f4",
            borderRadius: 16,
            height: 420,
          }}
        />

        {/* CONTENT */}
        <div>
          <h1 style={{ fontSize: 34 }}>{product.title}</h1>
          {product.subtitle && (
            <div style={{ color: "#666", marginBottom: 12 }}>
              {product.subtitle}
            </div>
          )}

          <p style={{ marginBottom: 20 }}>{product.shortDescription}</p>

          {/* VARIANTS */}
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

          {/* CTA */}
          <button
            disabled={!selectedVariant || added}
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
            {added
              ? "Added ✓"
              : `Add to cart — $${selectedVariant?.priceUsd.toFixed(2)}`}
          </button>

          {/* DETAILS */}
          <div style={{ marginTop: 40 }}>
            <Section title="About this tea">
              {product.description}
            </Section>

            <Section title="Aroma & Flavor">
              {product.flavorNotes.join(", ")}
            </Section>

            <Section title="Effect">
              {product.effect}
            </Section>

            <Section title="How to brew">
              {product.brewingGuide}
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 6 }}>{title}</h3>
      <p style={{ color: "#555", lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}
