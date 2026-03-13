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
      {/* ── HERO ── */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
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
          Our Story
        </p>

        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            marginBottom: 28,
            lineHeight: 1.1,
          }}
        >
          Tea, Elevated.
        </h1>

        <p
          style={{
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.65,
            color: "#5f5d58",
            marginBottom: 24,
          }}
        >
          Rare Chinese teas sourced directly from legendary mountains —
          crafted for modern ritual.
        </p>

        <p
          style={{
            fontSize: "clamp(15px, 1.6vw, 18px)",
            lineHeight: 1.8,
            color: "#7a776f",
          }}
        >
          TeaStorm connects you to centuries of tea craft.
          <br />
          We source rare loose-leaf teas directly from small producers across
          China&apos;s most revered growing regions.
        </p>
      </section>

      {/* ── IMAGE STORY BLOCK ── */}
      <section
        style={{
          padding: "0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
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
                text: "We work directly with small tea gardens across China.",
              },
              {
                title: "Quality First",
                text: "Every tea is carefully selected for purity and terroir.",
              },
              {
                title: "Small Batches",
                text: "Our teas are packed in limited runs to preserve freshness.",
              },
              {
                title: "Mindful Ritual",
                text: "Tea is more than a drink — it's a daily moment of calm.",
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
            Each tea in our collection reflects the character of its region.
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
                style={{
                  padding: "12px 28px",
                  borderRadius: 999,
                  border: "1px solid #d8d6cf",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#5f5d58",
                  background: "#ffffff",
                }}
              >
                {region}
              </span>
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
