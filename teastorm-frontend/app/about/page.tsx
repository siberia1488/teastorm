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
      {/* ── SCOPED STYLES ── */}
      <style>{`
        .cta-button {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-button:hover {
          transform: scale(1.02);
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          padding: "clamp(64px, 8vw, 96px) clamp(24px, 5vw, 80px)",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
          }}
        >
          {/* Left: text */}
          <div>
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
                fontSize: "clamp(44px, 6vw, 72px)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                marginBottom: 24,
                lineHeight: 1.05,
              }}
            >
              Tea, Elevated.
            </h1>

            <p
              style={{
                fontSize: "clamp(17px, 1.8vw, 20px)",
                lineHeight: 1.7,
                color: "#5f5d58",
                marginBottom: 16,
                maxWidth: 460,
              }}
            >
              Exceptional tea transforms everyday moments.
            </p>

            <p
              style={{
                fontSize: "clamp(14px, 1.4vw, 16px)",
                lineHeight: 1.8,
                color: "#8a8883",
                maxWidth: 440,
                marginBottom: 36,
              }}
            >
              We source rare loose-leaf teas directly from legendary Chinese
              growing regions, bringing centuries of craft and terroir into
              every cup.
            </p>

            {/* Trust metrics */}
            <p
              style={{
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6b6b65",
                marginTop: 28,
                lineHeight: 2,
              }}
            >
              14 curated teas · 5 legendary regions · direct producer partnerships
            </p>
          </div>

          {/* Right: image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 420,
              aspectRatio: "3 / 4",
              borderRadius: 24,
              overflow: "hidden",
              justifySelf: "end",
            }}
          >
            <Image
              src="/images/teastorm-hero.png"
              alt="Premium Chinese tea preparation"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── IMAGE STORY BLOCK ── */}
      <section
        style={{
          padding: "0 clamp(24px, 5vw, 80px) clamp(56px, 7vw, 80px)",
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
          borderTop: "1px solid #e8e6e1",
          padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 72px)" }}>
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
                text: "Our teas are packed in limited runs to preserve freshness, aroma, and texture. Each batch is traceable to its origin garden.",
              },
            ].map((value) => (
              <div key={value.title}>
                <h3
                  style={{
                    fontSize: "clamp(18px, 1.8vw, 22px)",
                    fontWeight: 500,
                    marginBottom: 14,
                    color: "#1a1a1a",
                  }}
                >
                  {value.title}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(14px, 1.3vw, 15px)",
                    lineHeight: 1.8,
                    color: "#7a776f",
                  }}
                >
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEA PHILOSOPHY ── */}
      <section
        style={{
          background: "#f3f2ee",
          borderTop: "1px solid #e0ddd7",
          padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              fontSize: 12,
              marginBottom: 36,
              color: "#7a776f",
            }}
          >
            Philosophy
          </p>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              marginBottom: 40,
            }}
          >
            Our Tea Philosophy
          </h2>

          <p
            style={{
              fontSize: "clamp(18px, 2vw, 24px)",
              lineHeight: 1.85,
              color: "#5f5d58",
              fontStyle: "italic",
              marginBottom: 28,
            }}
          >
            Great tea is never rushed.
            <br />
            It is grown slowly, harvested with care,
            <br />
            and shared with intention.
          </p>

          <p
            style={{
              fontSize: "clamp(14px, 1.4vw, 16px)",
              lineHeight: 1.8,
              color: "#9a9890",
            }}
          >
            We believe tea should create a quiet moment
            <br />
            in the middle of a busy day.
          </p>
        </div>
      </section>

      {/* ── TEA REGIONS ── */}
      <section
        style={{
          background: "#ffffff",
          borderTop: "1px solid #e8e6e1",
          padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 620,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              fontSize: 12,
              marginBottom: 20,
              color: "#7a776f",
            }}
          >
            The Regions
          </p>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            Where Our Teas Come From
          </h2>

          <p
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              lineHeight: 1.75,
              color: "#5f5d58",
              marginBottom: 32,
            }}
          >
            Each tea in our collection carries the spirit of its origin — from
            the misty cliffs of Wuyi Mountain to the ancient forests of Yunnan.
          </p>

          <p
            style={{
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8a8883",
              marginTop: 24,
            }}
          >
            Yunnan · Fujian · Zhejiang · Guangdong · Taiwan
          </p>
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
          Ready to Explore?
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
          Browse our curated collection of rare Chinese teas and discover your
          daily ritual.
        </p>

        <Link
          href="/shop"
          className="cta-button"
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
