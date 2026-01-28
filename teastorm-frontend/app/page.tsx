import Link from "next/link"

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F7F6F3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: 64,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          marginBottom: 24,
        }}
      >
        TeaStorm
      </h1>

      <p
        style={{
          maxWidth: 520,
          fontSize: 20,
          lineHeight: 1.6,
          color: "#6B6B6B",
          marginBottom: 48,
        }}
      >
        A premium loose-leaf tea collection sourced from China’s most revered
        growing regions. Crafted for ritual, clarity, and calm.
      </p>

      <div style={{ display: "flex", gap: 16 }}>
        <Link
          href="/shop"
          style={{
            padding: "16px 40px",
            borderRadius: 999,
            background: "#1A1A1A",
            color: "#FFFFFF",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Shop Teas
        </Link>

        <Link
          href="#"
          style={{
            padding: "16px 40px",
            borderRadius: 999,
            border: "1px solid #D8D6CF",
            textDecoration: "none",
            color: "#1A1A1A",
          }}
        >
          Learn More
        </Link>
      </div>
    </main>
  )
}
