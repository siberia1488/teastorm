import Link from "next/link"
import Image from "next/image"
import { products } from "@/data/products"
import InstagramFeed from "@/components/InstagramFeed"
import BrandMark from "@/components/BrandMark"
import cachedPricesJson from "@/data/prices.json"
const cachedPrices: Record<string, { unit_amount: number | null }> = cachedPricesJson as unknown as Record<string, { unit_amount: number | null }>

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HERO */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "clamp(80px, 12vh, 140px)",
          paddingBottom: "clamp(80px, 12vh, 160px)",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hero Background Image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/images/hero.svg"
            alt=""
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Overlay gradient for text readability */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(243,242,238,0.85) 0%, rgba(243,242,238,0.7) 50%, rgba(243,242,238,0.85) 100%)",
            pointerEvents: "none",
            zIndex: 1,
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
              fontSize: "clamp(10px, 1.2vw, 12px)",
              marginBottom: "clamp(18px, 3vw, 28px)",
              color: "#6d6b65",
            }}
          >
            Rare Loose-Leaf Collection
          </p>

          <h1
            style={{
              fontSize: "clamp(48px, 10vw, 82px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              marginBottom: "clamp(18px, 3vw, 28px)",
              lineHeight: 1,
            }}
          >
            <BrandMark size="hero" />
          </h1>

          <p
            style={{
              maxWidth: 640,
              margin: "0 auto",
              marginBottom: "clamp(28px, 4vw, 44px)",
              fontSize: "clamp(16px, 2vw, 22px)",
              lineHeight: 1.65,
              color: "#5f5d58",
            }}
          >
            Exceptional loose-leaf teas sourced directly from China&apos;s most
            storied growing regions — curated for ritual, clarity, and quiet
            power in every cup.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(12px, 2vw, 20px)",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/shop"
              style={{
                padding: "clamp(14px, 2vw, 18px) clamp(32px, 4vw, 48px)",
                borderRadius: 999,
                background: "#1a1a1a",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "clamp(12px, 1.4vw, 14px)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Shop the Collection
            </Link>

            <Link
              href="#origins"
              style={{
                padding: "clamp(14px, 2vw, 18px) clamp(32px, 4vw, 48px)",
                borderRadius: 999,
                border: "1px solid #cfcfc7",
                color: "#1a1a1a",
                textDecoration: "none",
                fontSize: "clamp(12px, 1.4vw, 14px)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Explore Origins
            </Link>
          </div>
        </div>

      </section>

      {/* FEATURED TEAS */}
      <section
        style={{
          background: "#ffffff",
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 8vw, 96px)" }}>
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
                fontSize: "clamp(32px, 5vw, 56px)",
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
                fontSize: "clamp(15px, 1.8vw, 18px)",
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
              gap: "clamp(24px, 4vw, 48px)",
            }}
          >
            {products.slice(0, 4).map((tea) => (
              <div
                key={tea.id}
                style={{
                  background: "#f6f5f2",
                  borderRadius: 24,
                  padding: "clamp(20px, 3vw, 32px)",
                  textAlign: "center",
                }}
              >
                <div style={{ height: "clamp(200px, 25vw, 280px)", borderRadius: 18, marginBottom: "clamp(18px, 3vw, 28px)", position: "relative", overflow: "hidden", width: "100%" }}>
                  {tea.images?.preview && (
                    <Image
                      src={tea.images.preview}
                      alt={tea.title}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    />
                  )}
                </div>

                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 22px)",
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
                    marginBottom: "clamp(16px, 2vw, 24px)",
                  }}
                >
                  {tea.variants.length > 0 ? tea.variants[0].label : "Coming Soon"}
                </p>

                {/* Cached price (hybrid) */}
                {(() => {
                  const priceId = tea.variants[0]?.stripePriceId
                  const amount = priceId ? cachedPrices[priceId]?.unit_amount ?? null : null
                  return amount ? (
                    <p style={{ fontSize: 14, color: "#222", marginBottom: 12 }}>
                      {`$${(amount / 100).toFixed(2)}`}
                    </p>
                  ) : null
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

          <div style={{ textAlign: "center", marginTop: "clamp(48px, 8vw, 96px)" }}>
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
          padding: "clamp(80px, 12vw, 180px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "clamp(48px, 8vw, 120px)",
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
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                marginBottom: 32,
                lineHeight: 1.1,
              }}
            >
              From Legendary
              <br />
              Mountain Gardens
            </h2>

            <p
              style={{
                fontSize: "clamp(16px, 1.8vw, 20px)",
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
              height: "clamp(320px, 40vw, 560px)",
              borderRadius: 36,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              src="/images/origins.svg"
              alt="Mountain tea gardens"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY / TRUST */}
      <section
        style={{
          background: "#f3f2ee",
          padding: "clamp(80px, 12vw, 180px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 10vw, 120px)" }}>
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
                fontSize: "clamp(28px, 5vw, 60px)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                marginBottom: 28,
                lineHeight: 1.15,
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
                fontSize: "clamp(15px, 1.8vw, 20px)",
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
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(24px, 4vw, 56px)",
              marginBottom: "clamp(48px, 10vw, 120px)",
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
                  padding: "clamp(28px, 4vw, 48px)",
                  boxShadow: "0 18px 60px rgba(0,0,0,0.05)",
                  border: "1px solid #e4e2dc",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: 500,
                    marginBottom: 16,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(14px, 1.5vw, 17px)",
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

      {/* INSTAGRAM */}
      <InstagramFeed />

      {/* FOOTER */}
      <footer
        style={{
          background: "#1a1a1a",
          color: "#f4f4f1",
          padding: "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px) clamp(48px, 6vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(32px, 6vw, 96px)",
          }}
        >
          {/* BRAND */}
          <div style={{ gridColumn: "span 1", minWidth: 240 }}>
            <div style={{ marginBottom: 28 }}>
              <BrandMark size="lg" className="text-white" />
            </div>

            <p
              style={{
                maxWidth: 420,
                lineHeight: 1.7,
                color: "#cfcfc7",
                marginBottom: 36,
                fontSize: "clamp(14px, 1.5vw, 16px)",
              }}
            >
              Premium loose-leaf teas sourced from China&apos;s most revered mountains —
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
                  minWidth: 180,
                  padding: "14px 18px",
                  borderRadius: 999,
                  border: "1px solid #3a3a3a",
                  background: "transparent",
                  color: "#ffffff",
                  outline: "none",
                  fontSize: 14,
                }}
              />

              <button
                type="submit"
                style={{
                  padding: "14px 28px",
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
              <li style={{ marginBottom: 14 }}>
                <Link
                  href="/about"
                  style={{
                    color: "#f4f4f1",
                    textDecoration: "none",
                    fontSize: 15,
                  }}
                >
                  Our Story
                </Link>
              </li>
              {["Origins", "Brewing Guide", "Sustainability"].map(
                (item) => (
                  <li key={item} style={{ marginBottom: 14 }}>
                    <Link
                      href="/about"
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
            marginTop: "clamp(48px, 8vw, 120px)",
            paddingTop: "clamp(24px, 4vw, 48px)",
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
