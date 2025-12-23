"use client";

import { useState } from "react";
import Link from "next/link";
import { products, getProductMinPrice } from "@/data/products";
import "./shop.css";

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
    const categoryMatch = category === "all" || p.category === category;
    const effectMatch = effect === "all" || p.effect === effect;
    return categoryMatch && effectMatch;
  });

  return (
    <main className="shop">
      <header className="shop-header">
        <h1>Tea Collection</h1>
        <p>Loose-leaf teas with calm power and clear character.</p>
      </header>

      <section className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>

        <select value={effect} onChange={(e) => setEffect(e.target.value)}>
          {effects.map((e) => (
            <option key={e.id} value={e.id}>
              {e.label}
            </option>
          ))}
        </select>
      </section>

      <section className="product-grid">
        {filteredProducts.map((product) => {
          const minPrice = getProductMinPrice(product);

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="product-card"
            >
              <div className="product-image" />

              {product.badge && (
                <span className="product-badge">{product.badge}</span>
              )}

              <div className="product-content">
                <h3>{product.title}</h3>

                {product.subtitle && (
                  <p className="subtitle">{product.subtitle}</p>
                )}

                <p className="description">
                  {product.shortDescription}
                </p>

                <div className="meta">
                  <span>
                    {product.origin.country} · {product.origin.region}
                  </span>
                  <strong>From ${minPrice.toFixed(2)}</strong>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {filteredProducts.length === 0 && (
        <p className="empty">No teas found with selected filters.</p>
      )}
    </main>
  );
}
