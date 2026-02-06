"use client"

import Image from "next/image"

type Props = {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizes = {
  sm: { text: 20, icon: 18, gap: 1 },
  md: { text: 24, icon: 22, gap: 2 },
  lg: { text: 32, icon: 28, gap: 3 },
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
        width={s.icon}
        height={s.icon}
        style={{ display: "inline-block" }}
        aria-hidden="true"
      />
      <span>Storm</span>
    </span>
  )
}
