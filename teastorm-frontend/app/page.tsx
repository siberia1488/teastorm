import Link from "next/link";
import { products } from "@/data/products";

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          background:
            "linear-gradient(180deg, #fafafa 0%, #f4f4f4 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, width: "100%" }}>
          <div style={{ maxWidth: 700 }}>
            <h1
              style={{
                fontSize: 56,
                lineHeight: 1.1,
                marginBottom: 24,
                letterSpacing: -1,
              }}
            >
              Premium loose-leaf tea
              <br />
              for focus, calm & ritual
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "#555",
                marginBottom: 36,
                lineHeight: 1.6,
              }}
            >
              TeaStorm curates rare Chinese and Taiwanese teas —
              crafted for mindful mornings, deep focus, and slow evenings.
            </p>

            <div style={{ display: "flex", gap: 16 }}>
              <Link href="/shop">
                <button className="primary-btn">
                  Shop teas
                </button>
              </Link>

              <Link href="/about">
                <button className="secondary-btn">
                  Our philosophy
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section
        style={{
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
          padding: "24px",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            textAlign: "center",
            fontSize: 14,
            color: "#555",
          }}
        >
          <div>🌱 Direct sourcing</div>
          <div>🍃 Small-batch quality</div>
          <div>🌍 Worldwide shipping</div>
        </div>
      </section>

      {/* FEATURED TEAS */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 36,
              marginBottom: 40,
            }}
          >
            Featured teas
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
          >
            {featured.map((tea) => (
              <Link
                key={tea.id}
                href={`/product/${tea.slug}`}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 16,
                  padding: 24,
                  background: "#fff",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                className="card-hover"
              >
                <div
                  style={{
                    height: 200,
                    background: "#f3f3f3",
                    borderRadius: 12,
                    marginBottom: 20,
                  }}
                />

                <h3 style={{ marginBottom: 8 }}>
                  {tea.title}
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    color: "#555",
                    marginBottom: 12,
                  }}
                >
                  {tea.subtitle}
                </p>

                <p
                  style={{
                    fontSize: 14,
                    color: "#777",
                  }}
                >
                  {tea.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 24px",
          background: "#111",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 36, marginBottom: 20 }}>
          Build your daily tea ritual
        </h2>

        <p
          style={{
            maxWidth: 600,
            margin: "0 auto 32px",
            color: "#ccc",
          }}
        >
          Choose teas designed for how you want to feel —
          energized, calm, or deeply focused.
        </p>

        <Link href="/shop">
          <button className="primary-btn invert">
            Explore the collection
          </button>
        </Link>
      </section>
    </main>
  );
}
