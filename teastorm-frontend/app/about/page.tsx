import Link from "next/link"
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
      {/* Hero */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
          maxWidth: 900,
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
            marginBottom: 32,
            lineHeight: 1.1,
          }}
        >
          Tea, Elevated.
        </h1>

        <p
          style={{
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.7,
            color: "#5f5d58",
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          TeaStorm was born from a simple belief: that exceptional tea can transform
          everyday moments into something extraordinary. We source rare loose-leaf
          teas directly from China&apos;s most legendary growing regions, bringing
          centuries of craft and terroir to your cup.
        </p>
      </section>

      {/* Values */}
      <section
        style={{
          background: "#ffffff",
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
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
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(32px, 4vw, 56px)",
            }}
          >
            {[
              {
                title: "Direct Sourcing",
                text: "We work directly with independent tea gardens and family producers across Yunnan, Fujian, Zhejiang, and Guangdong — cutting out middlemen to ensure freshness and fair prices.",
              },
              {
                title: "Quality First",
                text: "Every tea in our collection is carefully selected for purity, seasonality, and expressive terroir. We never compromise on leaf grade or processing quality.",
              },
              {
                title: "Small Batches",
                text: "Our teas are packed in limited runs to preserve freshness, aroma, and texture. Each batch is dated and traceable to its origin garden.",
              },
              {
                title: "Mindful Ritual",
                text: "We believe tea is more than a beverage — it's a practice of presence. Our packaging and guidance are designed to slow you down and invite intention.",
              },
            ].map((value) => (
              <div
                key={value.title}
                style={{
                  background: "#f6f5f2",
                  borderRadius: 28,
                  padding: "clamp(32px, 4vw, 48px)",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(20px, 2vw, 24px)",
                    fontWeight: 500,
                    marginBottom: 16,
                  }}
                >
                  {value.title}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(15px, 1.5vw, 17px)",
                    lineHeight: 1.7,
                    color: "#6b6b65",
                  }}
                >
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origins */}
      <section
        style={{
          background: "#f3f2ee",
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 900,
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
              marginBottom: 32,
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
            From the misty peaks of Wuyi Mountain to the ancient forests of Yunnan,
            each tea in our collection tells the story of its terroir. We partner
            with gardens that practice sustainable cultivation and honor traditional
            processing methods passed down through generations.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 16,
            }}
          >
            {["Yunnan", "Fujian", "Zhejiang", "Guangdong", "Taiwan"].map((region) => (
              <span
                key={region}
                style={{
                  padding: "12px 28px",
                  borderRadius: 999,
                  border: "1px solid #d8d6cf",
                  fontSize: 14,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#5f5d58",
                }}
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#1a1a1a",
          padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            marginBottom: 24,
            color: "#ffffff",
          }}
        >
          Ready to Explore?
        </h2>

        <p
          style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            lineHeight: 1.7,
            color: "#a7a69f",
            marginBottom: 40,
            maxWidth: 540,
            margin: "0 auto 40px",
          }}
        >
          Browse our curated collection of rare Chinese teas and find your new daily
          ritual.
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
