import Link from "next/link"

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
        {/* subtle texture overlay */}
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

        {/* Scroll cue */}
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
    </main>
  )
}
