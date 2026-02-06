"use client"

import { useState } from "react"
import Link from "next/link"
@@import Image from "next/image"
import { products } from "@/data/products"
import { teaContent } from "@/data/teaContent"
import "./shop.css"

const categories = [
  { id: "all", label: "All teas" },
  { id: "oolong", label: "Oolong" },
  { id: "green", label: "Green" },
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "puerh", label: "Pu-erh" },
]

export default function ShopPage() {
  const [category, setCategory] = useState("all")

  const filteredProducts = products.filter(
    (p) => category === "all" || p.category === category
  )

  return (
    <main className="shop">
      <header className="shop-header">
        <h1>Tea Collection</h1>
        <p>Whole-leaf Chinese teas, curated by TeaStorm.</p>
      </header>

      <section className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </section>

      <section className="product-grid">
        {filteredProducts.map((product) => {
          const content = teaContent[product.slug]

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="product-card"
            >
              <div className="product-image">
                {product.images?.preview && (
                  <Image
                    src={product.images.preview}
                    alt={content?.displayName || product.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                )}
              </div>

              <div className="product-content">
                <h3>{content?.displayName || product.title}</h3>

                {content?.tagline && (
                  <p className="subtitle">{content.tagline}</p>
                )}

                <p className="description">
                {content?.description}
                </p>


                <div className="meta">
                  <span>{product.variants.length} sizes</span>
                  <strong>View options</strong>
                </div>
              </div>
            </Link>
          )
        })}
      </section>

      {filteredProducts.length === 0 && (
        <p className="empty">No teas found.</p>
      )}
    </main>
  )
}
