"use client"

import Image from "next/image"
import { Instagram } from "lucide-react"

const posts = [
  {
    id: "1",
    image: "/instagram/ig-1.svg",
    url: "https://www.instagram.com/_teastorm_/reel/DTqGV5IjXxv/",
    alt: "Tea Ritual",
  },
  {
    id: "2",
    image: "/instagram/ig-2.svg",
    url: "https://www.instagram.com/_teastorm_/reel/DTgyzZmD3t_/",
    alt: "Morning Brew",
  },
  {
    id: "3",
    image: "/instagram/ig-3.svg",
    url: "https://www.instagram.com/_teastorm_/reel/DTolqVeDRIm/",
    alt: "Tea Journey",
  },
  {
    id: "4",
    image: "/instagram/ig-4.svg",
    url: "https://www.instagram.com/_teastorm_/reel/DT4LPSUjZEt/",
    alt: "Tea Culture",
  },
  {
    id: "5",
    image: "/instagram/ig-5.svg",
    url: "https://www.instagram.com/_teastorm_/",
    alt: "Leaf Selection",
  },
  {
    id: "6",
    image: "/instagram/ig-6.svg",
    url: "https://www.instagram.com/_teastorm_/",
    alt: "Mindful Moments",
  },
]

export default function InstagramFeed() {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "clamp(80px, 10vw, 160px) clamp(24px, 5vw, 80px)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 96px)" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <Instagram size={20} strokeWidth={1.5} style={{ color: "#7a776f" }} />
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                fontSize: 12,
                color: "#7a776f",
                margin: 0,
              }}
            >
              @_teastorm_
            </p>
          </div>

          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
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
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.7,
              color: "#6b6b65",
            }}
          >
            Behind every cup is a moment of stillness. Join our growing community
            and explore daily brewing rituals, origin stories, and seasonal releases.
          </p>
        </div>

        {/* Instagram Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(16px, 2vw, 32px)",
            marginBottom: "clamp(48px, 5vw, 80px)",
          }}
        >
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-tile"
              style={{
                textDecoration: "none",
                display: "block",
                borderRadius: 20,
                overflow: "hidden",
                background: "#f6f5f2",
                aspectRatio: "1 / 1",
                position: "relative",
              }}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
              />
              {/* Hover overlay */}
              <div
                className="instagram-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <Instagram size={32} color="#fff" />
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
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 48px",
              borderRadius: 999,
              border: "1px solid #1a1a1a",
              color: "#1a1a1a",
              textDecoration: "none",
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
          >
            <Instagram size={18} strokeWidth={1.5} />
            Follow @_teastorm_
          </a>
        </div>
      </div>

      <style jsx>{`
        .instagram-tile:hover .instagram-overlay {
          opacity: 1 !important;
        }
        .instagram-tile {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .instagram-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </section>
  )
}
