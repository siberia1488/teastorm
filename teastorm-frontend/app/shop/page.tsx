"use client";

import { useState } from "react";
import Link from "next/link";
import { products, getProductMinPrice } from "@/data/products";

const categories = [
  { id: "all", label: "All teas" },
  { id: "oolong", label: "Oolong" },
  { id: "green", label: "Green" },
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "puerh", label: "Pu-erh" },
];

const effects = [
  { id: "all", label: "All effects" },
  { id: "Calming", label: "Calm" },
  { id: "Energizing", label: "Energy" },
  { id: "Focusing", label: "Focus" },
  { id: "Balancing", label: "Balance" },
];

export default function ShopPage() {
  const [category, setCategory] = useState("all");
  const [effect, setEffect] = useState("all");

  const filteredProducts = products.filter((p) => {
    const categoryMatch =
      category === "all" || p.category === category;
    const effectMatch =
      effect === "all" || p.effect === effect;

    return categoryMatch && effectMatch;
  });

  return (
    <main style={{ padding: "40px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 36, marginBottom: 8 }}>
            Tea Collection
          </h1>
          <p style={{ color: "#555" }}>
            Premium loose leaf teas selected for balance, clarity and depth.
          </p>
        </div>

        {/* FILTERS */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={selectStyle}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={effect}
            onChange={(e) => setEffect(e.target.value)}
            style={selectStyle}
          >
            {effects.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {filteredProducts.map((product) => {
            const minPrice = getProductMinPrice(product);

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={cardStyle}>
                  {/* IMAGE */}
                  <div
                    style={{
                      height: 200,
                      background: "#f3f3f3",
                      borderRadius: 16,
                      marginBottom: 16,
                    }}
                  />

                  {/* BADGE */}
                  {product.badge && (
                    <div style={badgeStyle}>
                      {product.badge}
                    </div>
                  )}

                  {/* CONTENT */}
                  <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                    {product.title}
                  </h3>

                  {product.subtitle && (
                    <div style={{ fontSize: 14, color: "#777", marginBottom: 8 }}>
                      {product.subtitle}
                    </div>
                  )}

                  <div style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
                    {product.shortDescription}
                  </div>

                  <div style={{ fontSize: 13, color: "#777", marginBottom: 12 }}>
                    {product.origin.country} · {product.origin.region}
                  </div>

                  <div style={{ fontWeight: 500 }}>
                    From ${minPrice.toFixed(2)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* EMPTY */}
        {filteredProducts.length === 0 && (
          <p style={{ marginTop: 40, color: "#777" }}>
            No teas found with selected filters.
          </p>
        )}
      </div>
    </main>
  );
}

/* STYLES */

const selectStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 14,
  background: "#fff",
};

const cardStyle: React.CSSProperties = {
  padding: 20,
  borderRadius: 20,
  border: "1px solid #eee",
  background: "#fff",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 10px",
  fontSize: 12,
  borderRadius: 999,
  background: "#000",
  color: "#fff",
  marginBottom: 12,
};
