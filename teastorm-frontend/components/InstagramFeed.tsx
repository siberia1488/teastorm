"use client"

import Image from "next/image"
import { Instagram } from "lucide-react"

const ritualImages = [
  {
    src: "/instagram/tea-preparation.jpeg",
    url: "https://www.instagram.com/_teastorm_/reel/DTgyzZmD3t_/",
    alt: "Tea Preparation",
  },
  {
    src: "/instagram/tea-brewing.jpeg",
    url: "https://www.instagram.com/_teastorm_/",
    alt: "Tea Brewing",
  },
  {
    src: "/instagram/tea-aroma.png",
    url: "https://www.instagram.com/_teastorm_/reel/DTolqVeDRIm/",
    alt: "Tea Aroma",
  },
  {
    src: "/instagram/tea-first-cup.png",
    url: "https://www.instagram.com/_teastorm_/reel/DTqGV5IjXxv/",
    alt: "The First Cup",
  },
  {
    src: "/instagram/tea-leaves.png",
    url: "https://www.instagram.com/_teastorm_/reel/DT4LPSUjZEt/",
    alt: "Tea Leaves",
  },
  {
    src: "/instagram/tea-moment.jpeg",
    url: "https://www.instagram.com/_teastorm_/",
    alt: "Tea Moment",
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

        {/* Ritual Gallery — mobile: horizontal scroll, tablet: 4-col grid, desktop: 6-col grid */}
        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:overflow-visible md:grid-cols-4 md:gap-6 xl:grid-cols-6 xl:gap-8"
          style={{ marginBottom: "clamp(48px, 5vw, 80px)" }}
        >
          {ritualImages.map((item, index) => {
            const isEmphasized = index === 0 || index === ritualImages.length - 1
            return (
              <a
                key={item.src}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "relative block overflow-hidden rounded-xl",
                  "min-w-[70%] sm:min-w-[45%] md:min-w-0",
                  "aspect-square",
                  "transition-all duration-500 ease-out hover:scale-[1.06]",
                  "after:absolute after:inset-0 after:bg-black/5",
                  "after:opacity-0 hover:after:opacity-100",
                  "after:transition-opacity after:duration-500 after:rounded-xl",
                  isEmphasized ? "scale-[1.05]" : "scale-100",
                ].join(" ")}
                style={{ textDecoration: "none" }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 33vw, 16vw"
                  priority={index === 0}
                />
              </a>
            )
          })}
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

    </section>
  )
}
