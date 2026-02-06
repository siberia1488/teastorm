"use client"

import Link from "next/link"

export default function InstagramFeed() {
  const posts = [
    {
      id: "1",
      url: "https://www.instagram.com/_teastorm_/reel/DTqGV5IjXxv/",
      title: "Tea Ritual",
    },
    {
      id: "2",
      url: "https://www.instagram.com/_teastorm_/reel/DTgyzZmD3t_/",
      title: "Morning Brew",
    },
    {
      id: "3",
      url: "https://www.instagram.com/_teastorm_/reel/DTolqVeDRIm/",
      title: "Tea Journey",
    },
    {
      id: "4",
      url: "https://www.instagram.com/_teastorm_/reel/DT4LPSUjZEt/",
      title: "Tea Culture",
    },
  ]

  return (
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

        {/* Instagram Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 32,
            marginBottom: 80,
          }}
        >
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "block",
                borderRadius: 24,
                overflow: "hidden",
                background: "#f6f5f2",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                aspectRatio: "1 / 1",
                position: "relative",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)"
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #f3f2ee 0%, #e8e5dd 100%)",
                  padding: 32,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 48,
                      marginBottom: 16,
                    }}
                  >
                    📸
                  </div>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: "#1a1a1a",
                      marginBottom: 12,
                    }}
                  >
                    {post.title}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#7a776f",
                    }}
                  >
                    Open on Instagram →
                  </p>
                </div>
              </div>
            </a>
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
  )
}
