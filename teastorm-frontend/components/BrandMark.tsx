"use client"

import Image from "next/image"

type Props = {
  size?: "sm" | "md" | "lg" | "xl" | "hero"
  className?: string
}

// Logo is 1800x1200pt (3:2 aspect ratio), so width = height * 1.5
const sizes = {
  sm: { text: 20, iconH: 20, gap: 6 },
  md: { text: 24, iconH: 24, gap: 8 },
  lg: { text: 32, iconH: 32, gap: 10 },
  xl: { text: 48, iconH: 40, gap: 12 },
  hero: { text: 72, iconH: 44, gap: 14 },
}

export default function BrandMark({ size = "md", className = "" }: Props) {
  const s = sizes[size]

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 700,
        fontSize: s.text,
        letterSpacing: "-0.02em",
        color: "currentColor",
        gap: s.gap,
      }}
    >
      <span>Tea</span>
      <Image
        src="/brand/mark.svg"
        alt=""
        width={Math.round(s.iconH * 1.5)}
        height={s.iconH}
        style={{ display: "inline-block" }}
        aria-hidden="true"
      />
      <span>Storm</span>
    </span>
  )
}
