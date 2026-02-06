"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function InstagramFeed() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script")
    script.src = "//www.instagram.com/embed.js"
    script.async = true
    document.body.appendChild(script)

    // Process embeds if script is already loaded
    if ((window as any).instgrm?.Embeds?.process) {
      ;(window as any).instgrm.Embeds.process()
    }

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

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

        {/* Instagram Grid - Using Instagram embed iframe */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
            marginBottom: 80,
          }}
        >
          {/* You need to replace these with actual Instagram post URLs from @_teastorm_ */}
          {/* Format: https://www.instagram.com/p/POST_ID/ */}
          {[
            "https://www.instagram.com/p/DDW-VpXPAb9/",
            "https://www.instagram.com/p/DDV0rLgvXmm/",
            "https://www.instagram.com/p/DDURHzXvHEJ/",
            "https://www.instagram.com/p/DDTUFS4PNlQ/",
            "https://www.instagram.com/p/DDSqWHjPJ0e/",
            "https://www.instagram.com/p/DDRhtCePJkB/",
          ].map((url, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <iframe
                src={`${url}embed/captioned/`}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                allowTransparency
                style={{
                  borderRadius: 24,
                  maxWidth: "100%",
                }}
              />
            </div>
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
