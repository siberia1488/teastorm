import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About TeaStorm — Premium Chinese Tea",
  description:
    "Discover the story behind TeaStorm. We source exceptional loose-leaf teas directly from China's most storied growing regions.",
}

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 600px at 50% -100px, #ffffff 0%, #f3f2ee 55%, #ebe9e4 100%)",
      }}
    >
      {/* ── REGION PILL HOVER STYLES ── */}
      <style>{`
        .region-pill {
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .region-pill:hover {
          background: #1a1a1a !important;
          border-color: #1a1a1a !important;
          color: #ffffff !important;
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.32em",
            fontSize: 12,
            marginBottom: 24,
            color: "#7a776f",
          }}
        >
          Our Story
        </p>

        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            marginBottom: 36,
            lineHeight: 1.1,
          }}
        >
          Tea, Elevated.
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            lineHeight: 1.85,
            color: "#5f5d58",
          }}
        >
          TeaStorm was created to reconnect modern life with the timeless ritual
          of tea. We source rare loose-leaf teas directly from legendary growing
          regions across China — bringing centuries of craft, culture, and
          terroir to your cup.
        </p>
      </section>

      {/* ── IMAGE STORY BLOCK ── */}
      <section
        style={{
          padding: "0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(280px, 40vw, 560px)",
              borderRadius: 36,
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/tea-mountains.jpeg"
              alt="Ancient tea forests on misty mountain peaks"
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 100%)",
              }}
            />
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 14,
              color: "#8a8883",
              letterSpacing: "0.06em",
              fontStyle: "italic",
            }}
          >
            From ancient tea forests to your cup.
          </p>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section
        style={{
          background: "#ffffff",
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 96px)" }}>
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                fontSize: 12,
                marginBottom: 16,
                color: "#7a776f",
              }}
            >
              What We Stand For
            </p>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}
            >
              Our Values
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "clamp(24px, 3vw, 40px)",
            }}
          >
            {[
              {
                title: "Direct Sourcing",
                text: "We work directly with small tea gardens and family producers.",
              },
              {
                title: "Quality First",
                text: "Every tea is selected for purity, character, and expressive terroir.",
              },
              {
                title: "Small Batches",
                text: "Our teas are packed in limited runs to preserve aroma and freshness.",
              },
              {
                title: "Mindful Ritual",
                text: "Tea is more than a beverage — it's a moment to slow down.",
              },
            ].map((value) => (
              <div
                key={value.title}
                style={{
                  background: "#f6f5f2",
                  borderRadius: 24,
                  padding: "clamp(28px, 4vw, 44px)",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 500,
                    marginBottom: 14,
                  }}
                >
                  {value.title}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    lineHeight: 1.75,
                    color: "#6b6b65",
                    maxWidth: 280,
                  }}
                >
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEA REGIONS ── */}
      <section
        style={{
          background: "#f3f2ee",
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              fontSize: 12,
              marginBottom: 24,
              color: "#7a776f",
            }}
          >
            The Regions
          </p>

          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            Where Our Teas Come From
          </h2>

          <p
            style={{
              fontSize: "clamp(16px, 1.8vw, 20px)",
              lineHeight: 1.75,
              color: "#5f5d58",
              marginBottom: 48,
            }}
          >
            Each tea in our collection carries the spirit of its origin — from
            the misty cliffs of Wuyi Mountain to the ancient forests of Yunnan.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {["Yunnan", "Fujian", "Zhejiang", "Guangdong", "Taiwan"].map((region) => (
              <span
                key={region}
                className="region-pill"
                style={{
                  padding: "12px 28px",
                  borderRadius: 999,
                  border: "1px solid #d8d6cf",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#5f5d58",
                  background: "#ffffff",
                  cursor: "default",
                }}
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TEASTORM ── */}
      <section
        style={{
          background: "#ffffff",
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              fontSize: 12,
              marginBottom: 16,
              color: "#7a776f",
            }}
          >
            Our Promise
          </p>

          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              marginBottom: "clamp(48px, 6vw, 80px)",
            }}
          >
            Why TeaStorm
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "clamp(32px, 4vw, 64px)",
            }}
          >
            {[
              {
                label: "Direct partnerships with tea producers",
                icon: "○",
              },
              {
                label: "Carefully curated rare teas",
                icon: "○",
              },
              {
                label: "Small batch freshness",
                icon: "○",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    border: "1px solid #d8d6cf",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: "#5f5d58",
                  }}
                >
                  {item.icon}
                </div>

                <p
                  style={{
                    fontSize: "clamp(15px, 1.5vw, 18px)",
                    lineHeight: 1.6,
                    color: "#3a3a38",
                    fontWeight: 500,
                    maxWidth: 220,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "#1a1a1a",
          padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            marginBottom: 24,
            color: "#ffffff",
          }}
        >
          Discover Your Tea Ritual
        </h2>

        <p
          style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            lineHeight: 1.7,
            color: "#a7a69f",
            maxWidth: 480,
            margin: "0 auto 48px",
          }}
        >
          Explore our curated collection of rare Chinese teas.
        </p>

        <Link
          href="/shop"
          style={{
            display: "inline-block",
            padding: "20px 56px",
            borderRadius: 999,
            background: "#ffffff",
            color: "#1a1a1a",
            textDecoration: "none",
            fontSize: 14,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Shop the Collection
        </Link>
      </section>
    </main>
  )
}
