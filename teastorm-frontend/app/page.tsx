import Link from "next/link"
import Image from "next/image"
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
                <div style={{ height: 280, borderRadius: 18, marginBottom: 28, position: "relative", overflow: "hidden", width: "100%" }}>
                  {tea.images?.preview && (
                    <Image
                      src={tea.images.preview}
                      alt={tea.title}
                      width={300}
                      height={300}
                      style={{ objectFit: "cover", objectPosition: "center", width: "100%", height: "100%" }}
                    />
                  )}
                </div>

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
                  {tea.variants.length > 0 ? tea.variants[0].label : "Coming Soon"}
                </p>

                {/* Cached price (hybrid) */}
                {(() => {
                  try {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const cachedPrices = require("@/data/prices.json") as Record<string, { unit_amount: number | null }>
                    const priceId = tea.variants[0]?.stripePriceId
                    const amount = priceId ? cachedPrices[priceId]?.unit_amount ?? null : null
                    return amount ? (
                      <p style={{ fontSize: 14, color: "#222", marginBottom: 12 }}>
                        {`$${(amount / 100).toFixed(2)}`}
                      </p>
                    ) : null
                  } catch (e) {
                    return null
                  }
                })()}

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
      {/* SUSTAINABILITY / TRUST */}
<section
  style={{
    background: "#f3f2ee",
    padding: "180px 80px",
  }}
>
  <div
    style={{
      maxWidth: 1280,
      margin: "0 auto",
    }}
  >
    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: 120 }}>
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          fontSize: 12,
          marginBottom: 18,
          color: "#7a776f",
        }}
      >
        Our Philosophy
      </p>

      <h2
        style={{
          fontSize: 60,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          marginBottom: 28,
        }}
      >
        Sourced With Intention.
        <br />
        Crafted With Respect.
      </h2>

      <p
        style={{
          maxWidth: 680,
          margin: "0 auto",
          fontSize: 20,
          lineHeight: 1.7,
          color: "#6b6b65",
        }}
      >
        TeaStorm works directly with small gardens and artisan producers across
        China. Every tea is selected for purity, seasonality, and expressive
        terroir — then packed fresh in small batches for peak vitality.
      </p>
    </div>

    {/* Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 56,
        marginBottom: 120,
      }}
    >
      {[
        {
          title: "Direct Garden Sourcing",
          text:
            "We collaborate with independent tea gardens and family producers in Yunnan, Fujian, Zhejiang, and Guangdong — prioritizing craftsmanship over commodity scale.",
        },
        {
          title: "Leaf-First Selection",
          text:
            "Whole leaves, intact buds, and careful post-harvest handling ensure depth of flavor, longevity across infusions, and a clean energetic profile.",
        },
        {
          title: "Small-Batch Packing",
          text:
            "Teas are packed in limited runs to preserve freshness, aroma, and texture — never sitting in warehouses for months.",
        },
        {
          title: "Respect for Nature",
          text:
            "We favor gardens that avoid heavy chemicals, protect biodiversity, and maintain soil vitality through traditional cultivation practices.",
        },
        {
          title: "Transparent Craft",
          text:
            "From cultivar to harvest season to processing style — we share the story behind every tea so you know exactly what is in your cup.",
        },
        {
          title: "Designed for Ritual",
          text:
            "Our packaging and brewing guidance are created to slow you down — inviting intention, calm, and appreciation into everyday tea moments.",
        },
      ].map((item) => (
        <div
          key={item.title}
          style={{
            background: "#ffffff",
            borderRadius: 32,
            padding: 48,
            boxShadow: "0 18px 60px rgba(0,0,0,0.05)",
            border: "1px solid #e4e2dc",
          }}
        >
          <h3
            style={{
              fontSize: 24,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            {item.title}
          </h3>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#6b6b65",
            }}
          >
            {item.text}
          </p>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div style={{ textAlign: "center" }}>
      <Link
        href="/shop"
        style={{
          display: "inline-block",
          padding: "20px 56px",
          borderRadius: 999,
          background: "#1a1a1a",
          color: "#ffffff",
          textDecoration: "none",
          fontSize: 14,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
        }}
      >
        Explore the Collection
      </Link>
    </div>
    </div>
    </section>
    {/* INSTAGRAM / SOCIAL */}
<section
  style={{
    background: "#ffffff",
    padding: "160px 80px",
  }}
>
  <div
    style={{
      maxWidth: 1400,
      margin: "0 auto",
    }}
  >
    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: 96 }}>
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          fontSize: 12,
          marginBottom: 18,
          color: "#7a776f",
        }}
      >
        Community
      </p>

      <h2
        style={{
          fontSize: 60,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          marginBottom: 24,
        }}
      >
        Follow the Ritual
      </h2>

      <p
        style={{
          maxWidth: 640,
          margin: "0 auto",
          fontSize: 20,
          lineHeight: 1.7,
          color: "#6b6b65",
        }}
      >
        Behind every cup is a moment of stillness.  
        Join our growing community and explore daily brewing rituals,
        origin stories, and seasonal releases.
      </p>
    </div>

    {/* Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 28,
        marginBottom: 80,
      }}
    >
      {[
        "/images/insta-1.jpg",
        "/images/insta-2.jpg",
        "/images/insta-3.jpg",
        "/images/insta-4.jpg",
        "/images/insta-5.jpg",
        "/images/insta-6.jpg",
      ].map((src, i) => (
        <div
          key={i}
          style={{
            aspectRatio: "1 / 1",
            borderRadius: 24,
            overflow: "hidden",
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
          }}
        />
      ))}
    </div>

    {/* CTA */}
    <div style={{ textAlign: "center" }}>
      <a
        href="https://www.instagram.com/_teastorm_/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "18px 56px",
          borderRadius: 999,
          border: "1px solid #1a1a1a",
          color: "#1a1a1a",
          textDecoration: "none",
          fontSize: 14,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
        }}
      >
        Follow @TeaStormUS
      </a>
    </div>
    </div>
    </section>
    {/* FOOTER */}
<footer
  style={{
    background: "#1a1a1a",
    color: "#f4f4f1",
    padding: "160px 80px 80px",
  }}
>
  <div
    style={{
      maxWidth: 1280,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr",
      gap: 96,
    }}
  >
    {/* BRAND */}
    <div>
      <h3
        style={{
          fontSize: 40,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          marginBottom: 28,
        }}
      >
        TeaStorm
      </h3>

      <p
        style={{
          maxWidth: 420,
          lineHeight: 1.7,
          color: "#cfcfc7",
          marginBottom: 36,
        }}
      >
        Premium loose-leaf teas sourced from China’s most revered mountains —
        curated for ritual, clarity, and quiet power in every cup.
      </p>

      {/* Newsletter */}
      <form
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            flex: 1,
            minWidth: 220,
            padding: "16px 20px",
            borderRadius: 999,
            border: "1px solid #3a3a3a",
            background: "transparent",
            color: "#ffffff",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "16px 36px",
            borderRadius: 999,
            background: "#ffffff",
            color: "#1a1a1a",
            border: "none",
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Join
        </button>
      </form>
    </div>

    {/* SHOP */}
    <div>
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          fontSize: 12,
          marginBottom: 28,
          color: "#a7a69f",
        }}
      >
        Shop
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {["All Teas", "Green Tea", "Oolong", "Pu-erh", "White Tea", "Black Tea"].map(
          (item) => (
            <li key={item} style={{ marginBottom: 14 }}>
              <Link
                href="/shop"
                style={{
                  color: "#f4f4f1",
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                {item}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>

    {/* ABOUT */}
    <div>
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          fontSize: 12,
          marginBottom: 28,
          color: "#a7a69f",
        }}
      >
        Company
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {["Our Story", "Origins", "Brewing Guide", "Sustainability"].map(
          (item) => (
            <li key={item} style={{ marginBottom: 14 }}>
              <Link
                href="/"
                style={{
                  color: "#f4f4f1",
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                {item}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>

    {/* SOCIAL */}
    <div>
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          fontSize: 12,
          marginBottom: 28,
          color: "#a7a69f",
        }}
      >
        Follow
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ marginBottom: 14 }}>
          <a
            href="https://www.instagram.com/_teastorm_/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#f4f4f1",
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Instagram
          </a>
        </li>
      </ul>
    </div>
  </div>

  {/* Bottom bar */}
  <div
    style={{
      marginTop: 120,
      paddingTop: 48,
      borderTop: "1px solid #333",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 20,
      fontSize: 13,
      color: "#a7a69f",
    }}
  >
    <p>© {new Date().getFullYear()} TeaStorm. All rights reserved.</p>

    <div style={{ display: "flex", gap: 28 }}>
      <Link
        href="/privacy"
        style={{ color: "#a7a69f", textDecoration: "none" }}
      >
        Privacy
      </Link>
      <Link
        href="/terms"
        style={{ color: "#a7a69f", textDecoration: "none" }}
      >
        Terms
      </Link>
    </div>
    </div>
    </footer>

    </main>
  )
}
