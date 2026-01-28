import Link from "next/link"
import { products } from "@/data/products"

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 600px at 50% -200px, #ffffff 0%, #f3f2ee 55%, #ebe9e4 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.06))",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 880,
            width: "100%",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              fontSize: 12,
              marginBottom: 28,
              color: "#6d6b65",
            }}
          >
            Rare Loose-Leaf Collection
          </p>

          <h1
            style={{
              fontSize: 82,
              fontWeight: 500,
              letterSpacing: "-0.04em",
              marginBottom: 28,
              lineHeight: 1,
            }}
          >
            TeaStorm
          </h1>

          <p
            style={{
              maxWidth: 640,
              margin: "0 auto 56px",
              fontSize: 22,
              lineHeight: 1.65,
              color: "#5f5d58",
            }}
          >
            Exceptional loose-leaf teas sourced directly from China’s most
            storied growing regions — curated for ritual, clarity, and quiet
            power in every cup.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/shop"
              style={{
                padding: "18px 48px",
                borderRadius: 999,
                background: "#1a1a1a",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Shop the Collection
            </Link>

            <Link
              href="#origins"
              style={{
                padding: "18px 48px",
                borderRadius: 999,
                border: "1px solid #cfcfc7",
                color: "#1a1a1a",
                textDecoration: "none",
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Explore Origins
            </Link>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 12,
            letterSpacing: "0.28em",
            color: "#7b7973",
          }}
        >
          Scroll
        </div>
      </section>

      {/* FEATURED TEAS */}
      <section
        style={{
          background: "#ffffff",
          padding: "140px 80px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 96 }}>
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                fontSize: 12,
                marginBottom: 16,
                color: "#7a776f",
              }}
            >
              Curated Selection
            </p>

            <h2
              style={{
                fontSize: 56,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                marginBottom: 24,
              }}
            >
              Featured Teas
            </h2>

            <p
              style={{
                maxWidth: 520,
                margin: "0 auto",
                fontSize: 18,
                color: "#6b6b65",
              }}
            >
              Hand-picked leaves from legendary Chinese terroirs — crafted for
              daily ritual and extraordinary flavor.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 48,
            }}
          >
            {products.slice(0, 6).map((tea) => (
              <div
                key={tea.id}
                style={{
                  background: "#f6f5f2",
                  borderRadius: 24,
                  padding: 32,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    height: 280,
                    borderRadius: 18,
                    backgroundImage: `url(${tea.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: 28,
                  }}
                />

                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                >
                  {tea.title}
                </h3>

                {tea.subtitle && (
                  <p
                    style={{
                      fontSize: 14,
                      color: "#8a8883",
                      marginBottom: 10,
                    }}
                  >
                    {tea.subtitle}
                  </p>
                )}

                <p
                  style={{
                    color: "#6f6d68",
                    marginBottom: 24,
                  }}
                >
                  {tea.variants[0].label}
                </p>

                <Link
                  href={`/product/${tea.slug}`}
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    borderRadius: 999,
                    border: "1px solid #1a1a1a",
                    color: "#1a1a1a",
                    textDecoration: "none",
                    fontSize: 13,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  View Tea
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 96 }}>
            <Link
              href="/shop"
              style={{
                display: "inline-block",
                padding: "18px 52px",
                borderRadius: 999,
                background: "#1a1a1a",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: 14,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
              }}
            >
              Explore All 14 Teas
            </Link>
          </div>
        </div>
      </section>

      {/* ORIGINS */}
      <section
        id="origins"
        style={{
          background: "#f3f2ee",
          padding: "180px 80px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 120,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                fontSize: 12,
                marginBottom: 22,
                color: "#7a776f",
              }}
            >
              Origins
            </p>

            <h2
              style={{
                fontSize: 64,
                fontWeight: 500,
                letterSpacing: "-0.04em",
                marginBottom: 32,
              }}
            >
              From Legendary
              <br />
              Mountain Gardens
            </h2>

            <p
              style={{
                fontSize: 20,
                lineHeight: 1.75,
                color: "#5f5d58",
                maxWidth: 520,
                marginBottom: 36,
              }}
            >
              TeaStorm sources rare loose-leaf teas from the most revered growing
              regions of China — where altitude, mist, mineral-rich soil and
              centuries-old craftsmanship shape every leaf.
            </p>

            <Link
              href="/shop"
              style={{
                display: "inline-block",
                padding: "18px 52px",
                borderRadius: 999,
                background: "#1a1a1a",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: 14,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
              }}
            >
              Explore the Regions
            </Link>
          </div>

          <div
            style={{
              height: 560,
              borderRadius: 36,
              background: "linear-gradient(135deg, #cfcac0, #bdb7ad)",
            }}
          />
        </div>
      </section>
    </main>
  )
}
