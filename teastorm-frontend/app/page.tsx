import Link from "next/link";
import { products } from "@/data/products";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          padding: "80px 24px",
          background:
            "linear-gradient(180deg, #fafafa 0%, #f4f4f4 100%)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* TEXT */}
          <div>
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
                maxWidth: 520,
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

          {/* IMAGE */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 460,
              borderRadius: 24,
              overflow: "hidden",
              background: "#eaeaea",
            }}
          >
            <Image
              src="/images/hero-tea.jpg"
              alt="Tea ritual"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
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

      {/* CHOOSE BY EFFECT */}
      <section style={{ padding: "80px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, marginBottom: 16 }}>
            Choose by effect
          </h2>

          <p
            style={{
              maxWidth: 520,
              color: "#555",
              marginBottom: 48,
              lineHeight: 1.6,
            }}
          >
            Each tea is curated for a specific state —
            calm focus, gentle energy, or deep balance.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
          >
            {[
              { effect: "Calming", label: "Calm", emoji: "🌙" },
              { effect: "Focusing", label: "Focus", emoji: "🎯" },
              { effect: "Energizing", label: "Energy", emoji: "⚡" },
            ].map(({ effect, label, emoji }) => {
              const tea = products.find(
                (p) => p.effect === effect
              );
              if (!tea) return null;

              return (
                <Link
                  key={tea.id}
                  href={`/product/${tea.slug}`}
                  className="card-hover"
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 20,
                    padding: 28,
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 260,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 28,
                        marginBottom: 12,
                      }}
                    >
                      {emoji} {label}
                    </div>

                    <h3 style={{ marginBottom: 8 }}>
                      {tea.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 14,
                        color: "#666",
                        marginBottom: 12,
                      }}
                    >
                      {tea.subtitle}
                    </p>

                    <p
                      style={{
                        fontSize: 14,
                        color: "#777",
                        lineHeight: 1.5,
                      }}
                    >
                      {tea.shortDescription}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: 24,
                      fontSize: 14,
                      textDecoration: "underline",
                    }}
                  >
                    Explore →
                  </div>
                </Link>
              );
            })}
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
